import dotenv from "dotenv";

dotenv.config();

import { connectToDatabase } from "./database/mongo";
import trackingRoutes from "./routes/trackingRoutes";

import express from "express";
import cors from "cors";

async function setup() {
  await connectToDatabase();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/", trackingRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setup();
