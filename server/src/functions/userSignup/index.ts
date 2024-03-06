import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";

import { sendResponse } from "../../responses/index";
import { addNewUser, checkUsername } from "../../middleware/user";
import { userSchema } from "../../schemas";
import { validateSchema } from "../../middleware/validation";
import { User } from "../../interfaces/index";

const userSignup = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, { success: false, message: "Missing valid request body" });
    }

    const { username, email, password } = event.body as unknown as User;

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
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(userSignup)
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(validateSchema(userSchema))
  .use(httpErrorHandler());
