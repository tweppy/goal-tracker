import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateToken } from "../../middleware/auth";

const removeGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body || !event.pathParameters?.goalId) {
      return sendResponse(400, { success: false, message: "Missing request body or valid path parameter" });
    }

    const goalId = event.pathParameters.goalId;
    const reqBody = JSON.parse(event.body);

    const params = {
      TableName: "goalsDb01",
      Key: {
        goalId: goalId,
      },
    };

    const result = await db.get(params).promise();

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    if (reqBody.userId !== result.Item.userId) {
      return sendResponse(401, { success: false, message: "Unauthorized user" });
    }

    await db.delete(params).promise();

    return sendResponse(200, {
      success: true,
      message: "Goal removed successfully",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(removeGoal).use(httpErrorHandler()).use(validateToken);
