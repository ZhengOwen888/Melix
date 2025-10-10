import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Remove and clear event listeners
    mongoose.connection.removeAllListeners("connected");
    mongoose.connection.removeAllListeners("disconnected");
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

    // MongoDB environment variables
    const user: string = encodeURIComponent(process.env.MONGO_USER!);
    const pass: string = encodeURIComponent(process.env.MONGO_PASS!);
    const dbName: string = process.env.MONGO_DBNAME!;
    const appName: string = process.env.MONGO_APPNAME!;
    const clusterUrl: string = process.env.MONGO_CLUSTER_URL!;

    const mongoUri: string =
      `mongodb+srv://${user}:${pass}@${clusterUrl}/${dbName}` +
      `?retryWrites=true&w=majority&appName=${appName}`;

    // Connect to the database
    const conn = await mongoose.connect(mongoUri);
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
