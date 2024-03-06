import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";

import { sendResponse } from "../../responses/index";
import { validateTokenParam } from "../../middleware/validation";
import { findGoalsByUserId } from "../../middleware/goal";

const getGoals = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.queryStringParameters?.userId) {
      return sendResponse(400, { success: false, message: "Missing valid query string parameter" });
    }

    const userId = event.queryStringParameters.userId;

    const userGoals = await findGoalsByUserId(userId, "goalsDb01");

    if (userGoals.Count === 0) {
      return sendResponse(404, { success: false, message: `Failed to retrieve goals for userId: '${userId}'` });
    }

    return sendResponse(200, {
      success: true,
      message: "Goals retrieved successfully",
      body: { userId, goals: userGoals.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoals).use(httpErrorHandler()).use(validateTokenParam);
