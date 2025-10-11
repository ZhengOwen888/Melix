import { throwError } from "../utils/error.utils.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";

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
  payload: object,
  secretKey: string
): string => {
  const token: string = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyJwtToken = (
  token: string,
  secretKey: string
): string | JwtPayload => {
  const decoded: string | JwtPayload = jwt.verify(token, secretKey);
  return decoded;
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
      throw new Error("❌ Auth Service (Signup) - Missing required fields");
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
    const verificationToken = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    const newUser = await User.create({
      email: email,
      username: username,
      password: hashPw,
      verificationToken: verificationToken,
    });

    await newUser.save();
  } catch (error: unknown) {
    return throwError("❌ Auth Service (Signup) - Error signing up", error);
  }
};
