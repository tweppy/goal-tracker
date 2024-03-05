import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { db } from "../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateTokenParam } from "../../middleware/auth";

const getGoals = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.queryStringParameters?.userId;

    const params = {
      TableName: "goalsDb01",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const userGoals = await db.scan(params).promise();

    if (userGoals.Count === 0) {
      return sendResponse(404, { success: false, message: `Failed to retrieve goals for userId: '${userId}'` });
    }

    return sendResponse(200, {
      success: true,
      message: "Goals retrieved successfully",
      body: { userId, goals: userGoals.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoals).use(httpErrorHandler()).use(validateTokenParam);