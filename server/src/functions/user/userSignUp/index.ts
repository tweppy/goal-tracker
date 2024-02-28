import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { sendResponse } from "../../../responses/index";
import { addNewUser, checkUsername } from "../../../middleware/user";

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

    const newUser = await addNewUser(username, email, password);

    return sendResponse(201, {
      success: true,
      message: "User signed up successfully",
      body: { username: newUser.username, userId: newUser.userId },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(userSignup).use(httpErrorHandler());
