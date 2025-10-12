import crypto from "crypto";

// generate a token ranging 0 - 999999
export const generateDigitToken = (): string => {
  const randomInt = crypto.randomBytes(4).readUInt32BE(0);

  return String(randomInt % 1_000_000).padStart(6, "0");
};
