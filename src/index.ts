import dotenv from "dotenv";
import mongoose from "mongoose";
import FileManagerService from "./services/fileManagerService";
import TrackingService from "./services/trackingService";
import { extractCodes } from "./helpers/helper";

dotenv.config();

async function connectToDatabase() {
  const mongoUri =
    process.env.MONGO_URI ||
    "mongodb://root:root@localhost:27017/?authSource=admin";

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

async function main() {
  try {
    await connectToDatabase();

    const filePath = process.env.CODES_FILE_PATH || "./codes.json";
    const fileData = await FileManagerService.readFile(filePath);

    if (!fileData) {
      console.error("No data found in the file.");
      return;
    }

    const codes = JSON.parse(fileData.toString());
    const fullCode = extractCodes(codes).join("-");

    const trackingService = new TrackingService();
    const response = await trackingService.processTrackingCodes(codes);

    await trackingService.saveTracking(fullCode, response);
    console.log("Tracking data saved successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

main();
