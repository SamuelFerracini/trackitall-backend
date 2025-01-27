import express from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import trackingRoutes from "./trackingRoutes";

const router = express.Router();

router.use(AuthMiddleware.isAuthenticated);
router.use("/", trackingRoutes);

export default router;
