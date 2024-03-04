import { db } from "../services/db";

export const findGoalByGoalId = async (goalId: string) => {
  const params = {
    TableName: "goalsDb",
    Key: {
      goalId: goalId,
    },
  };

  const result = await db.get(params).promise();

  return result;
};

export const isGoalCompletedToday = async (goalId: string, date: string) => {};
