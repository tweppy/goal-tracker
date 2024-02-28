import bcrypt from "bcryptjs";

const salt = 10;

export async function hashPassword(password: string) {
  const hashedPwd = await bcrypt.hash(password, salt);

  return hashedPwd;
}

export async function comparePassword(password: string, hashedPwd: string) {
  const isMatch = await bcrypt.compare(password, hashedPwd);

  return isMatch ? true : false;
}
