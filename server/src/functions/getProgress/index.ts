import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";

import { sendResponse } from "../../responses/index";
import { validateToken } from "../../middleware/validation";
import { findGoalsByUserId } from "../../middleware/goal";

const getProgress = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return sendResponse(400, {
        success: false,
        message: "Missing valid request context authorizer",
      });
    }

    const userId = event.requestContext.authorizer.userId;

    const result = await findGoalsByUserId(userId, "completedGoalsDb01");

    if (result.Items && result.Items.length === 0) {
      return sendResponse(404, { success: false, message: "No progress or completed goals found" });
    }

    return sendResponse(200, {
      success: true,
      message: "Progress retrieved successfully",
      body: { progress: result.Items },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const handler = middy(getProgress).use(httpEventNormalizer()).use(validateToken).use(httpErrorHandler());
