import { User } from "../models/user.model.js";
import { hashPassword } from "./password.service.js";

interface SignupInput {
  email: string;
  username: string;
  password: string;
}

export const signupService = async ({
  email,
  username,
  password,
}: SignupInput): Promise<void> => {
  if (!email || !username || !password) {
    throw new Error("SignUp - Missing required fields");
  }
  const userExistByEmail = await User.findOne({ email });
  if (userExistByEmail) {
    throw new Error("SignUp - Email already Taken");
  }

  const userExistByUsername = await User.findOne({ username });
  if (userExistByUsername) {
    throw new Error("SignUp - Username already Taken");
  }

  const hashPw = await hashPassword(password);
};
