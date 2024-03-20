import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import dayjs from "dayjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken } from "../../middleware/validation";

const getToday = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid request context authorizer",
      });
    }

    const userId = event.requestContext.authorizer.userId;

    const todayNum = dayjs().day();
    const todayDate = dayjs().format("YYYY-MM-DD");

    const params = {
      TableName: "goalsDb02",
      FilterExpression: "userId = :userId AND contains(repeatDay, :repeatDay)",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":repeatDay": todayNum,
      },
    };

    const result = await db.scan(params).promise();

    if (result.Items && result.Items.length === 0) {
      return sendResponse(404, { success: false, message: "Found no goals due today" });
    }

    const completedGoalsParams = {
      TableName: "completedGoalsDb02",
      FilterExpression: "userId = :userId AND completedOn = :completedOn",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":completedOn": todayDate,
      },
    };

    const completedGoalsResult = await db.scan(completedGoalsParams).promise();

    const filteredGoals = result.Items?.filter((goal) => {
      return !completedGoalsResult.Items?.some((completedGoal) => completedGoal.goalId === goal.goalId);
    });

    return sendResponse(200, {
      success: true,
      message: "Today's goals successfully retrieved",
      body: { userId, date: todayDate, goalsDueToday: filteredGoals },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getToday).use(httpEventNormalizer()).use(validateToken).use(httpErrorHandler());
