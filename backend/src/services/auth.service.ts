// Utilities
import { generateDigitToken } from "../utils/generate_token.js";
import { throwError } from "../utils/error.utils.js";

// Models
import { User } from "../models/user.model.js";

// External Packages
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import type { AnyAaaaRecord } from "dns";

/******************
 *   Password    *
 ******************/

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

/**************
 *    JWT     *
 ***************/

export const generateJwtToken = (
  payload: Record<string, any>,
  secretKey: string
): string => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    return throwError("❌ Auth Service (JWT) - Error signing JWT", error);
  }
};

export const verifyJwtToken = (
  token: string,
  secretKey: string
): Record<string, any> => {
  try {
    const decoded = jwt.verify(token, secretKey) as Record<string, any>;
    return decoded;
  } catch (error) {
    return throwError("❌ Auth Service (JWT) - Error verifying JWT", error);
  }
};

/*****************
 *    Signup    *
 ******************/

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
  try {
    if (!email || !username || !password) {
      return throwError("❌ Auth Service (Signup) - Missing required fields");
    }
    const userExistByEmail = await User.findOne({ email });
    if (userExistByEmail) {
      throw new Error("❌ Auth Service (Signup) - Email already Taken");
    }

    const userExistByUsername = await User.findOne({ username });
    if (userExistByUsername) {
      throw new Error("❌ Auth Service (Signup) - Username already Taken");
    }

    const hashPw = await hashPassword(password);
    const verificationToken = generateDigitToken();

    const newUser = await User.create({
      email: email,
      username: username,
      password: hashPw,
      verificationToken: verificationToken,
    });

    await newUser.save();

    // send verification email -- needed, implement in email service latr
  } catch (error: unknown) {
    return throwError("❌ Auth Service (Signup) - Error signing up", error);
  }
};
