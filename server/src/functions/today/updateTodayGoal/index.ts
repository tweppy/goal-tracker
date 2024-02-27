import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../../responses/index";

const updateTodayGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // code
    return sendResponse(200, {
      success: true,
      message: "msg", // edit
      // body: { },
    });
  } catch (error) {
    return sendResponse(500, { success: false, message: "Internal Server Error" });
  }
};

export const handler = middy(updateTodayGoal).handler(updateTodayGoal);
