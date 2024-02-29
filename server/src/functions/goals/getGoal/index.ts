import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { db } from "../../../services/db";
import { sendResponse } from "../../../responses/index";
import { validateTokenParam } from "../../../middleware/auth";

const getGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const goalId = event.pathParameters?.goalId;
    const userId = event.queryStringParameters?.userId;

    const params = {
      TableName: "goalsDb",
      Key: {
        goalId: goalId,
      },
    };

    const result = await db.get(params).promise();

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    if (userId !== result.Item.userId) {
      return sendResponse(401, { success: false, message: "Unauthorized user" });
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
