import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { sendResponse } from "../../responses/index";
import { findGoalsByUserId } from "../../middleware/goal";
import { validateToken } from "../../middleware/validation";

const getGoals = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid request context authorizer",
      });
    }

    const userId = event.requestContext.authorizer.userId;

    const result = await findGoalsByUserId(userId, "goalsDb01");

    if (!result.Items) {
      return sendResponse(404, { success: false, message: `Failed to retrieve goals for userId: '${userId}'` });
    }
    
    return sendResponse(200, {
      success: true,
      message: "Goals retrieved successfully",
      body: { goals: result.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getGoals).use(httpEventNormalizer()).use(validateToken).use(httpErrorHandler());
