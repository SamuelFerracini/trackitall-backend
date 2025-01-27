import express from "express";
import trackingsController from "../controllers/trackingsController";

const router = express.Router();

router.get(
  "/trackings/:reference",
  trackingsController.getTracking.bind(trackingsController)
);

router.get(
  "/trackings",
  trackingsController.getTrackings.bind(trackingsController)
);

router.post(
  "/trackings",
  trackingsController.createTracking.bind(trackingsController)
);

router.post(
  "/trackings/:reference/update",
  trackingsController.updateTracking.bind(trackingsController)
);

export default router;
