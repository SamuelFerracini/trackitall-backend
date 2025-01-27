import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import cors from "cors";

import express, { Express } from "express";

export async function registerRoutes(app: Express) {
  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => {
    res.send("works");
  });

  app.use("/public-api", publicRoutes);
  app.use("/private-api", privateRoutes);
}
