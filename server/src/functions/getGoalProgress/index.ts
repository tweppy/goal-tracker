import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateTokenParam } from "../../middleware/auth";

const getGoalProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.queryStringParameters?.userId) {
      return sendResponse(400, { success: false, message: "Missing valid path parameter or query string parameter" });
    }

    const goalId = event.pathParameters.goalId;
    const userId = event.queryStringParameters.userId;

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
      return sendResponse(401, { success: false, message: "Unauthorized user" });
    }

    return sendResponse(200, {
      success: true,
      message: "Goal found",
      body: { userId, goal: result.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoalProgress).use(httpErrorHandler()).use(validateTokenParam);
