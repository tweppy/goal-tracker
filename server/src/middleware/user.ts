import { db } from "../services/db";
import { User } from "../interfaces/index";
import { v4 } from "uuid";
import { hashPassword } from "../middleware/bcrypt";

export const checkUsername = async (username: string) => {
  const params = {
    TableName: "allUsersDb",
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": username,
    },
  };

  const result = await db.scan(params).promise();

  return result;
};

export const addNewUser = async (username: string, email: string, password: string) => {
  const hashedPwd = await hashPassword(password);

  const newUser: User = {
    userId: v4(),
    username: username,
    email: email,
    password: hashedPwd,
  };

  await db
    .put({
      TableName: "allUsersDb",
      Item: newUser,
    })
    .promise();

  return newUser;
};
