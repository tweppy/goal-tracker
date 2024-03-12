import { APIGatewayProxyResult } from "aws-lambda";

export interface ResponseBody {
  success: boolean;
  message: string;
  body?: object;
}

export interface ValidateSchemaRequest {
  event: {
    body: Goal | User | CompletedGoal;
  };
}

export interface ValidateTokenRequest {
  event: {
    headers: {
      authorization: string;
    };
    requestContext: {
      authorizer: {
        userId: string;
      };
    };
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
  dueDate: string;
  repeatType: string;
  repeatDay: number[] | string;
}

export interface CompletedGoal {
  goalId: string;
  userId: string;
  completedOn: string;
  goalName: string;
  description?: string;
}
