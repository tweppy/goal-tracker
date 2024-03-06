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
      TableName: "goalsDb01",
      FilterExpression: "dueDate = :dueDate OR contains(repeatDay, :repeatDay)",
      ExpressionAttributeValues: {
        ":repeatDay": todayNum,
        ":dueDate": todayDate,
      },
    };

    const result = await db.scan(params).promise();

    if (!result.Items) {
      return sendResponse(404, { success: false, message: "Found no goals due today" });
    }

    if (userId !== result.Items[0].userId) {
      return sendResponse(403, {
        success: false,
        message: "Unauthorized: You do not have permission to access these goals",
      });
    }

    return sendResponse(200, {
      success: true,
      message: "Today's goals successfully retrieved",
      body: { userId, date: todayDate, goalsDueToday: result.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getToday).use(httpEventNormalizer()).use(validateToken).use(httpErrorHandler());
