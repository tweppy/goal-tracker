import AWS from "aws-sdk";

export const db = new AWS.DynamoDB.DocumentClient();
