import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";

const getGoalProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // code
    return sendResponse(200, {
      success: true,
      message: "msg", // edit
      // body: { },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoalProgress).use(httpErrorHandler());
