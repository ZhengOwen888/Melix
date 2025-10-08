import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    // Connection event listeners for debugging and logging
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });
    mongoose.connection.on("open", () => {
      console.log("🟢 Connection open");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("🔴 MongoDB disconnected");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("🟢 MongoDB reconnected");
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("🟡 MongoDB disconnecting");
    });
    mongoose.connection.on("close", () => {
      console.log("⚪ MongoDB connection closed");
    });
  } catch (error: unknown) {
    // Handle connection errors
    if (error instanceof Error) {
      console.error(`❌ MongoDB connection failed: ${error.message}`);
    } else {
      console.error(`❌ MongoDB connection failed: ${error}`);
    }
    process.exit(1);
  }
};

// Gracefully close MongoDB connection on app termination
const gracefulShutdown = async (): Promise<void> => {
  try {
    await mongoose.connection.close(); // close default connection
    console.log("⚪ MongoDB connection closed");
    process.exit(0); // exit process on success
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error during graceful shutdown: ", error.message);
    } else {
      console.error("❌ Error during graceful shutdown: ", error);
    }
    process.exit(1); // exit process on failure
  }
};

// Handle termination signals and uncaught exceptions
process.once("SIGINT", () => gracefulShutdown()); // Ctrl + C
process.once("SIGTERM", () => gracefulShutdown()); // kill pid
process.once("uncaughtException", () => gracefulShutdown());
