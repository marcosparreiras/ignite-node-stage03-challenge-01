import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const passwordHashed = await hash(password, 8);
  return passwordHashed;
}

export async function valdiatePassword(
  password: string,
  passwordHashed: string
): Promise<boolean> {
  const isValid = await compare(password, passwordHashed);
  return isValid;
}
