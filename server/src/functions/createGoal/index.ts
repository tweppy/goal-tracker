import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { v4 } from "uuid";

import { db } from "../../services/db";
import { sendResponse } from "../../responses/index";
import { validateToken, validateSchema } from "../../middleware/validation";
import { Goal } from "../../interfaces/index";
import { createGoalSchema } from "../../schemas/index";

const createGoal = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = event.body as unknown as Goal;

    const newGoal: Goal = {
      goalId: v4(),
      ...reqBody,
    };

    await db
      .put({
        TableName: "goalsDb01",
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
  .use(httpErrorHandler())
  .use(validateToken)
  .use(jsonBodyParser())
  .use(validateSchema(createGoalSchema));
