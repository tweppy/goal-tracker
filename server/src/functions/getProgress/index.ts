import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateTokenParam } from "../../middleware/auth";

const getProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.queryStringParameters?.userId;

    const params = {
      TableName: "completedGoalsDb01",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const userProgress = await db.scan(params).promise();

    if (userProgress.Count === 0) {
      return sendResponse(404, { success: false, message: "No progress or completed goals found" });
    }

    return sendResponse(200, {
      success: true,
      message: "Progress retrieved successfully",
      body: { userId, progress: userProgress.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getProgress).use(httpErrorHandler()).use(validateTokenParam);
