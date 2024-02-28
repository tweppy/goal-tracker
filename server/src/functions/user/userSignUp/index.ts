import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { db } from "../../../services/db";
import middy from "@middy/core";
import { v4 } from "uuid";
import { sendResponse } from "../../../responses/index";
import { hashPassword } from "../../../middleware/bcrypt";
import { checkUsername } from "../../../middleware/user";
import { User } from "../../../interfaces/index";
import httpErrorHandler from "@middy/http-error-handler";

const userSignup = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, { success: false, message: "Request body is missing" });
    }

    const { username, email, password } = JSON.parse(event.body);

    if (!username || !password || !email) {
      return sendResponse(400, { success: false, message: "Username, password, and email are required" });
    }

    const existingUsername = await checkUsername(username);

    if (existingUsername.Count !== 0) {
      return sendResponse(400, { success: false, message: "Username already exists" });
    }

    const hashedPwd = await hashPassword(password);

    const newUser: User = {
      userId: v4(),
      username: username,
      email: email,
      password: hashedPwd,
    };

    await db
      .put({
        TableName: "allUsersDb",
        Item: newUser,
      })
      .promise();

    return sendResponse(201, {
      success: true,
      message: "User signed up successfully",
      body: { username: username, userId: newUser.userId },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(userSignup).use(httpErrorHandler());
