import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Tracking from "./models/tracking";

import cors from "cors";

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://root:root@localhost:27017/?authSource=admin");

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Route to create a new user
app.get("/trackings/:reference", async (req: any, res: any) => {
  const { reference } = req.params;

  const tracking = await Tracking.findOne({ reference });

  return res.status(200).json(tracking);
});

mongoose
  .connect("mongodb://root:root@localhost:27017/?authSource=admin")
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

// Start the server
