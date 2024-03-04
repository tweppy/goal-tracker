import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import dayjs from "dayjs";
import { db } from "../../../services/db";
import middy from "@middy/core";
import { sendResponse } from "../../../responses/index";
import httpErrorHandler from "@middy/http-error-handler";
import { validateTokenParam } from "../../../middleware/auth";

const getToday = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.queryStringParameters?.userId) {
      return sendResponse(400, { success: false, message: "Missing valid query string parameter" });
    }

    const userId = event.queryStringParameters.userId;
    const todayNum = dayjs().day();
    const todayDate = dayjs().format("YYYY-MM-DD");

    const params = {
      TableName: "goalsDb",
      FilterExpression: "userId = :userId AND (dueDate = :dueDate OR repeatType = :repeatType OR contains(repeatDay, :repeatDay))",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":repeatDay": todayNum,
        ":repeatType": "daily",
        ":dueDate": todayDate,
      },
    };

    const todayGoals = await db.scan(params).promise();

    if (todayGoals.Count === 0) {
      return sendResponse(404, { success: false, message: "Found no goals due today" });
    }

    return sendResponse(200, {
      success: true,
      message: "Today's goals successfully retrieved",
      body: { userId, date: todayDate, todayGoals: todayGoals.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getToday).use(httpErrorHandler()).use(validateTokenParam);
