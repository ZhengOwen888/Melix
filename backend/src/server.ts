// Choose the enviroment base on NODE_ENV
import dotenv from "dotenv";
const envPath = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envPath });

import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./db/connectdb.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB(); // connect to database

    const app: Application = express();
    const PORT = process.env.PORT || 5000;

    app.use(express.json()); // use to parse json
    app.use(cookieParser());

    app.use("/api/auth", authRoutes);

    app.listen(PORT, (): void => {
      console.log(
        `✅ App listening on port: ${PORT}, (Node Env: ${process.env.NODE_ENV})`
      );
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error starting server: ", error.message);
    } else {
      console.error("❌ Error starting server: ", error);
    }
  }
};

startServer();
