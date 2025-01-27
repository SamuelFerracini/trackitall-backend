import express from "express";
import PublicTrackingsController from "../controllers/publicTrackingsController";

const router = express.Router();

router.get("/test", (_, res) => {
  res.send({ works: true });
});

router.get(
  "/trackings/:reference",
  PublicTrackingsController.getTracking.bind(PublicTrackingsController)
);

export default router;
