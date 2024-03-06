import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import dayjs from "dayjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken } from "../../middleware/validation";
import { CompletedGoal } from "../../interfaces";
import { findGoalByGoalId } from "../../middleware/goal";

const addCompletedGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid path parameter or request context authorizer",
      });
    }

    const goalId = event.pathParameters.goalId;
    const userId = event.requestContext.authorizer.userId;

    const todayDate = dayjs().format("YYYY-MM-DD");

    const result = await findGoalByGoalId(goalId);

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    if (userId !== result.Item.userId) {
      return sendResponse(403, {
        success: false,
        message: "Unauthorized: You do not have permission to access this goal",
      });
    }

    const params = {
      TableName: "completedGoalsDb01",
      KeyConditionExpression: "goalId = :goalId AND completionDate = :completionDate",
      ExpressionAttributeValues: {
        ":goalId": goalId,
        ":completionDate": todayDate,
      },
    };

    const isGoalCompleted = await db.query(params).promise();

    if (isGoalCompleted.Items && isGoalCompleted.Items.length > 0) {
      return sendResponse(404, {
        success: false,
        message: "Goal already marked as complete for today",
        body: { item: isGoalCompleted.Items },
      });
    }

    const newCompletedGoal: CompletedGoal = {
      goalId,
      userId,
      completionDate: todayDate,
      goalName: result.Item.goalName,
      description: result.Item.description,
    };

    await db
      .put({
        TableName: "completedGoalsDb01",
        Item: newCompletedGoal,
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: "Goal marked as completed successfully",
      body: { newCompletedGoal },
    });
  } catch (error) {
    console.error("Error adding completed goal:", error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(addCompletedGoal)
  .use(httpEventNormalizer())
  .use(validateToken)
  .use(httpErrorHandler());
