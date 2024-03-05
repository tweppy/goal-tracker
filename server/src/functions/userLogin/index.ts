import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jwt from "jsonwebtoken";
import httpErrorHandler from "@middy/http-error-handler";
import { sendResponse } from "../../responses/index";
import { checkUsername } from "../../middleware/user";
import { comparePassword } from "../../middleware/bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userLogin = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, { success: false, message: "Request body is missing" });
    }

    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return sendResponse(400, { success: false, message: "Username and password are required" });
    }

    const existingUsername = await checkUsername(username);

    if (!existingUsername.Items || existingUsername.Items.length === 0) {
      return sendResponse(404, { success: false, message: "Username does not exist" });
    }

    const userData = existingUsername.Items[0];
    const storedPasswordHash = userData.password;

    const passwordMatch = await comparePassword(password, storedPasswordHash);

    if (!passwordMatch) {
      return sendResponse(400, { success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: userData.userId }, process.env.JWT_SECRET || "default-value", {
      expiresIn: 21600,
    });

    return sendResponse(200, {
      success: true,
      message: `User ${username} successfully logged in!`,
      body: { token, userId: userData.userId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(userLogin).use(httpErrorHandler());
