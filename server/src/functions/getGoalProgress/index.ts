import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken } from "../../middleware/validation";

const getGoalProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid path parameter or request context authorizer",
      });
    }

    const goalId = event.pathParameters.goalId;
    const userId = event.requestContext.authorizer.userId;

    const params = {
      TableName: "completedGoalsDb01",
      KeyConditionExpression: "goalId = :goalId",
      ExpressionAttributeValues: {
        ":goalId": goalId,
      },
    };

    const result = await db.query(params).promise();

    if (!result.Items) {
      return sendResponse(404, { success: false, message: "Goal progress not found" });
    }

    if (userId !== result.Items[0].userId) {
      return sendResponse(401, {
        success: false,
        message: "Unauthorized: You do not have permission to access this goal progress data",
      });
    }

    return sendResponse(200, {
      success: true,
      message: "Goal found",
      body: { goalProgress: result.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoalProgress).use(httpEventNormalizer()).use(validateToken).use(httpErrorHandler());
