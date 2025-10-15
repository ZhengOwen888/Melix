// Authentication Controller
import type { Request, Response } from "express";
import { logError } from "../utils/error.utils.js";
import { signupService } from "../services/auth.service.js";

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { email, username, password } = req.body;
  try {
    await signupService({ email, username, password });
    res.status(200).json({ success: true, message: "signup successful" });
  } catch (error: unknown) {
    logError("❌ Controller (Signup) - Error signing up", error);
    res.status(400).json({ success: true, message: error });
  }
};
export const login = async (req: Request, res: Response): Promise<any> => {};
export const logout = async (req: Request, res: Response): Promise<any> => {};
