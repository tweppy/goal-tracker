import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";

import { sendResponse } from "../../responses/index";
import { validateTokenParam } from "../../middleware/validation";
import { findGoalByGoalId } from "../../middleware/goal";

const getGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.queryStringParameters?.userId) {
      return sendResponse(400, { success: false, message: "Missing valid path parameter or query string parameter" });
    }

    const goalId = event.pathParameters.goalId;
    const userId = event.queryStringParameters.userId;

    const result = await findGoalByGoalId(goalId);

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    return sendResponse(200, {
      success: true,
      message: "Goal found",
      body: { userId, goal: result.Item },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoal).use(httpErrorHandler()).use(validateTokenParam);
