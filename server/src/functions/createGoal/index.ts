import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import { v4 } from "uuid";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken, validateSchema } from "../../middleware/validation";
import { Goal } from "../../interfaces/index";
import { goalSchema } from "../../schemas/index";

const createGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid request context authorizer",
      });
    }

    const reqBody = event.body as unknown as Goal;
    const userId = event.requestContext.authorizer.userId;

    const newGoal: Goal = {
      ...reqBody,
      goalId: v4(),
      userId,
    };

    await db
      .put({
        TableName: "goalsDb02",
        Item: newGoal,
      })
      .promise();

    return sendResponse(200, {
      success: true,
      message: "Goal created successfully",
      body: { newGoal },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(createGoal)
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(validateToken)
  .use(validateSchema(goalSchema))
  .use(httpErrorHandler());
