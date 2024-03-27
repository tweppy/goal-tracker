import jwt from "jsonwebtoken";
import Joi, { ValidationError } from "joi";
import dotenv from "dotenv";

import { sendResponse } from "../responses/index";
import { TokenData, ValidateTokenRequest, ValidateSchemaRequest } from "../interfaces/index";

dotenv.config();

export const validateSchema = (schema: Joi.Schema) => {
  return {
    before: async (request: ValidateSchemaRequest) => {
      try {
        await schema.validateAsync(request.event.body);
      } catch (error) {
        const validationError = error as ValidationError;
        return sendResponse(400, {
          success: false,
          message: "Invalid request body",
          body: { error: validationError.details },
        });
      }
    },
  };
};

export const validateToken = {
  before: async (request: ValidateTokenRequest) => {
    try {
      const token = request.event.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return sendResponse(404, { success: false, message: "No token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-value") as TokenData;

      request.event.requestContext.authorizer = { userId: decoded.userId };
    } catch (error) {
      console.log(error);
      return sendResponse(401, { success: false, message: "Failed to verify token" });
    }
  },
  onError: async (request: ValidateTokenRequest) => {
    request.event.error = "401";
    return request.response;
  },
};
