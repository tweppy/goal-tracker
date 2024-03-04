import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateToken } from "../../../middleware/auth";
import { CompletedGoal } from "../../../interfaces";
import { v4 } from "uuid";
import dayjs from "dayjs";

const addCompletedGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.body) {
      return sendResponse(400, { success: false, message: "Missing valid path parameter or body" });
    }

    const goalId = event.pathParameters.goalId;
    const reqBody = JSON.parse(event.body);
    const todayDate = dayjs().format("YYYY-MM-DD");

    const newCompletedGoal: CompletedGoal = {
      completedGoalId: v4(),
      goalId,
      userId: reqBody.userId,
      completionDate: todayDate,
    };

    await db
      .put({
        TableName: "completedGoalsDb",
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

export const handler = middy(addCompletedGoal).use(httpErrorHandler()).use(validateToken);
