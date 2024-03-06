import { db } from "../services/db";

export const findGoalByGoalId = async (goalId: string) => {
  const params = {
    TableName: "goalsDb01",
    Key: {
      goalId: goalId,
    },
  };

  const result = await db.get(params).promise();

  return result;
};

export const findGoalsByUserId = async (userId: string, table: string) => {
  const params = {
    TableName: table,
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  const result = await db.scan(params).promise();

  return result;
};
