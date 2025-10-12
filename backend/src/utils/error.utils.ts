// Helper for logging errors
export const logError = (context: string, error?: unknown): void => {
  if (error instanceof Error) {
    console.error(`${context}: ${error.message}`);
    if (error.stack) {
      console.error(error.stack); // traceback to locate error
    }
  } else {
    console.error(`${context}`);
  }
};

// Helper for throwing errors
export const throwError = (context: string, error?: unknown): never => {
  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`);
  } else {
    throw new Error(`${context}`);
  }
};
