import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateToken } from "../../middleware/auth";
import { Goal } from "../../interfaces";
import { findGoalByGoalId } from "../../middleware/goal";

const editGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body || !event.pathParameters?.goalId) {
      return sendResponse(400, { success: false, message: "Missing request body or valid path parameter" });
    }

    const goalId = event.pathParameters.goalId;
    const reqBody = JSON.parse(event.body);

    const result = await findGoalByGoalId(goalId);

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    if (reqBody.userId !== result.Item.userId) {
      return sendResponse(401, { success: false, message: "Unauthorized user" });
    }

    const updatedGoal: Goal = {
      ...result.Item,
      ...reqBody,
    };

    await db
      .put({
        TableName: "goalsDb01",
        Item: updatedGoal,
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: "Goal edited successfully",
      body: { updatedGoal, old: result },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(editGoal).use(httpErrorHandler()).use(validateToken);
