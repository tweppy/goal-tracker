import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { db } from "../../../services/db";
import { sendResponse } from "../../../responses/index";

const getGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.goalId;

    const result = await db
      .get({
        TableName: "goalsDb",
        Key: {
          goalId: id,
        },
      })
      .promise();

    console.log(result.Item);

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    return sendResponse(200, {
      success: true,
      message: "Goal found",
      body: { goal: result.Item },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoal).use(httpErrorHandler());
