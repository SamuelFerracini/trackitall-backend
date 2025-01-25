import dotenv from "dotenv";

dotenv.config();

import FileManagerService from "./services/FileManagerService";
import TrackingService from "./services/TrackingService";

async function main() {
  const fileData = await FileManagerService.readFile("./codes.json");

  if (!fileData) {
    return;
  }

  const codes = JSON.parse(fileData.toString());

  const trackingService = new TrackingService();

  const respose = await trackingService.processTrackingCodes(codes);
  console.log(respose);
}

main();
