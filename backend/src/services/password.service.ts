import bcryptjs from "bcryptjs";
import { throwError } from "../utils/error.utils.js";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  try {
    const salt: string = await bcryptjs.genSalt(saltRounds);
    const hash: string = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error: unknown) {
    return throwError("❌ Password - Error hashing password", error);
  }
};

export const isPasswordMatch = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const isMatch = await bcryptjs.compare(password, hash);
    return isMatch;
  } catch (error) {
    return throwError("❌ Password - Error matching password", error);
  }
};
