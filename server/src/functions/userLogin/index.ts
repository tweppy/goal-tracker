import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jwt from "jsonwebtoken";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import dotenv from "dotenv";

import { sendResponse } from "../../responses/index";
import { checkUsername } from "../../middleware/user";
import { comparePassword } from "../../middleware/bcrypt";
import { validateSchema } from "../../middleware/validation";
import { loginSchema } from "../../schemas";
import { User } from "../../interfaces/index";

dotenv.config();

const userLogin = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, { success: false, message: "Missing valid request body" });
    }

    const { username, password } = event.body as unknown as User;

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

    const token = jwt.sign({ userId: userData.userId, username: userData.username }, process.env.JWT_SECRET || "default-value", {
      expiresIn: 21600,
    });

    return sendResponse(200, {
      success: true,
      message: `User ${username} successfully logged in!`,
      body: { token, userId: userData.userId, username: userData.username },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(userLogin)
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(validateSchema(loginSchema))
  .use(httpErrorHandler());
