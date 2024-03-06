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

    if (!result.Items) {
      return sendResponse(404, { success: false, message: "No progress or completed goals found" });
    }

    if (userId !== result.Items[0].userId) {
      return sendResponse(403, {
        success: false,
        message: "Unauthorized: You do not have permission to access this progress data",
      });
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
