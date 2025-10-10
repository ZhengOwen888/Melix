import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  try {
    const salt: string = await bcryptjs.genSalt(saltRounds);
    const hash: string = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`❌ Password - Error hashing password: ${error.message}`);
    } else {
      throw new Error(`❌ Password - Error hashing password`);
    }
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
    if (error instanceof Error) {
      throw new Error(
        `❌ Password - Error matching password: ${error.message}`
      );
    } else {
      throw new Error(`❌ Password - Error matching password`);
    }
  }
};
