import { APIGatewayProxyResult } from "aws-lambda";

export interface ResponseBody {
  success: boolean;
  message: string;
  body?: object | string;
}

export interface ValidateTokenRequest {
  event: {
    queryStringParameters: {
      [key: string]: string;
    };
    headers: {
      authorization?: string;
    };
    body: string;
    error?: string;
  };
  response: APIGatewayProxyResult;
}

export interface TokenData {
  userId: string;
}

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface Goal {
  goalId: string;
  userId: string;
  goalName: string;
  description?: string;
  dueDate?: string | null;
  repeatType: "daily" | "weekly" | "weekdays" | "weekends" | "none";
  repeatDay?: number[];
}

export interface CompletedGoal {
  completedGoalId: string;
  goalId: string;
  userId: string;
  completionDate: string;
}
