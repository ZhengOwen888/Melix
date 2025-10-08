import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    // Remove and clear event listeners
    mongoose.connection.removeAllListeners("connnected");
    mongoose.connection.removeAllListeners("diconnected");
    mongoose.connection.removeAllListeners("reconnected");
    mongoose.connection.removeAllListeners("close");

    // Connection event listeners for debugging and logging
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("🔴 MongoDB disconnected");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("🟢 MongoDB reconnected");
    });
    mongoose.connection.on("close", () => {
      console.log("⚪ MongoDB connection closed");
    });
  } catch (error: unknown) {
    // Handle connection errors
    if (error instanceof Error) {
      console.error("❌ Error while MongoDB connection: ", error.message);
      throw new Error(`❌ Error while MongoDB connection: ${error.message}`);
    } else {
      console.error("❌ Unknown Error while MongoDB connection: ", error);
      throw new Error("❌ Unknown Error while MongoDB connection");
    }
  }
};

// Gracefully close MongoDB connection on app termination
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close(); // close default connection
    console.log("⚪ MongoDB connection closed");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error while MongoDB disconnection: ", error.message);
      throw new Error(`❌ Error while MongoDB disconnection: ${error.message}`);
    } else {
      console.error("❌ Unknown Error while MongoDB disconnection: ", error);
      throw new Error("❌ Unknown Error while MongoDB disconnection");
    }
  }
};
