import dotenv from "dotenv";

dotenv.config();

import { connectToDatabase } from "./database/mongo";

import express from "express";
import { registerRoutes } from "./routes";

import rateLimit from "express-rate-limit";

async function setup() {
  await connectToDatabase();

  const app = express();

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes in milliseconds
    max: 5, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after later",
    standardHeaders: true, // Include rate limit info in the response headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
  });

  app.get("/", (_, res) => {
    res.send("Express Typescript on Vercel");
  });

  app.use(limiter);

  registerRoutes(app);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setup();
