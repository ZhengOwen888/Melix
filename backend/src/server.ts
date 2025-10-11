// Choose the enviroment base on NODE_ENV
import dotenv from "dotenv";
// !!! NOTE TO SELF !!! - this is for scaling purposes, use different
//                        NODE ENVIROMENT for different phases
// const envPath = `.env.${process.env.NODE_ENV || "development"}`;
// dotenv.config({ path: envPath });
dotenv.config();

import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB, disconnectDB } from "./db/db.js";
import { logError } from "./utils/error.utils.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB(); // connect to database

    const app: Application = express();
    const PORT: number = parseInt(process.env.PORT || "5000", 10);

    app.use(express.json()); // use to parse json
    app.use(cookieParser());

    // Routes
    app.use("/api/auth", authRoutes);

    const server = app.listen(PORT, (): void => {
      console.log(
        `✅ App listening on port: ${PORT}, (Node Env: ${process.env.NODE_ENV})`
      );
    });

    const gracefulShutdown = async (): Promise<void> => {
      console.log("🟡 Shutting down server ...");
      try {
        // disconnect database
        server.close(async (): Promise<void> => await disconnectDB());
      } catch (error: unknown) {
        logError("❌ Server - Error shutting down server", error);
        process.exit(0);
      }
    };

    // Handle termination signals and uncaught exceptions
    process.once("SIGINT", () => gracefulShutdown()); // Ctrl + C
    process.once("SIGTERM", () => gracefulShutdown()); // kill pid
    process.once("uncaughtException", () => gracefulShutdown());
  } catch (error: unknown) {
    logError("❌ Server - Error starting server", error);
    process.exit(1);
  }
};

startServer();
