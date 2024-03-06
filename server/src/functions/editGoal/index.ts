import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken, validateSchema } from "../../middleware/validation";
import { findGoalByGoalId } from "../../middleware/goal";
import { Goal } from "../../interfaces/index";
import { goalSchema } from "../../schemas/index";

const editGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.goalId || !event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid path parameter or request context authorizer",
      });
    }

    const goalId = event.pathParameters.goalId;
    const userId = event.requestContext.authorizer.userId;
    const reqBody = event.body as unknown as Goal;

    const result = await findGoalByGoalId(goalId);

    if (!result.Item) {
      return sendResponse(404, { success: false, message: "Goal not found" });
    }

    if (userId !== result.Item.userId) {
      return sendResponse(403, {
        success: false,
        message: "Unauthorized: You do not have permission to access this goal",
      });
    }

    const updatedGoal: Goal = {
      ...result.Item,
      ...reqBody,
    };

    await db
      .put({
        TableName: "goalsDb01",
        Item: updatedGoal,
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: "Goal edited successfully",
      body: { updatedGoal },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(editGoal)
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(validateToken)
  .use(validateSchema(goalSchema))
  .use(httpErrorHandler());
