import type { Response, CookieOptions } from "express";

export enum CookieType {
  AUTH_TOKEN = "AUTH_TOKEN",
}

export const cookieOptions: Record<CookieType, CookieOptions> = {
  [CookieType.AUTH_TOKEN]: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
};

export const setCookie = (
  res: Response,
  cookieName: CookieType,
  cookieValue: string
): void => {
  res.cookie(cookieName, cookieValue, cookieOptions[cookieName]);
};

export const clearCookie = (res: Response, cookieName: CookieType): void => {
  res.clearCookie(cookieName);
};
