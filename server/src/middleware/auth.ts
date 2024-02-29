import jwt from "jsonwebtoken";
import { sendResponse } from "../responses/index";
import dotenv from "dotenv";
import { TokenData } from "../interfaces";
import { ValidateTokenRequest } from "../interfaces";

dotenv.config();

export const validateToken = {
  before: async (request: ValidateTokenRequest) => {
    try {
      const token = request.event.headers.authorization?.replace("Bearer ", "");
      const body = JSON.parse(request.event.body);
      const bodyId = body.userId;

      if (!token) {
        return sendResponse(404, { success: false, message: "No token" });
      }

      const data = jwt.verify(token, process.env.JWT_SECRET || "default-value") as TokenData;

      if (bodyId !== data.userId) {
        return sendResponse(401, { success: false, message: "UserId doesn't match token" });
      }

      return request.response;
    } catch (error) {
      console.log(error);

      return sendResponse(401, { success: false, message: "Invalid or expired token" });
    }
  },
  onError: async (request: ValidateTokenRequest) => {
    request.event.error = "401";
    return request.response;
  },
};

export const validateTokenParam = {
  before: async (request: ValidateTokenRequest) => {
    try {
      const token = request.event.headers.authorization?.replace("Bearer ", "");
      const userId = request.event.queryStringParameters?.userId;

      if (!token) {
        return sendResponse(404, { success: false, message: "No token" });
      }

      const data = jwt.verify(token, process.env.JWT_SECRET || "default-value") as TokenData;

      if (userId !== data.userId) {
        return sendResponse(401, { success: false, message: "UserId doesn't match token" });
      }

      return request.response;
    } catch (error) {
      console.log(error);

      return sendResponse(401, { success: false, message: "Invalid or expired token" });
    }
  },
  onError: async (request: ValidateTokenRequest) => {
    request.event.error = "401";
    return request.response;
  },
};
