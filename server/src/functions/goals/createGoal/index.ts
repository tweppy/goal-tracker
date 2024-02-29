import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { sendResponse } from "../../../responses/index";
import { db } from "../../../services/db";
import { Goal } from "../../../interfaces/index";
import { v4 } from "uuid";
import { validateToken } from "../../../middleware/auth";

const createGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return sendResponse(400, { success: false, message: "Missing request body" });
    }

    const reqBody = JSON.parse(event.body);

    const newGoal: Goal = {
      goalId: v4(),
      ...reqBody
    };

    await db
      .put({
        TableName: "goalsDb",
        Item: newGoal,
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: "Goal created successfully",
      body: { newGoal },
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(createGoal).use(httpErrorHandler()).use(validateToken);
