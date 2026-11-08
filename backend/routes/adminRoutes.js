import express from "express";
import { getAdminStats, deleteUser, upgradeToInstructor } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  adminOnly,
  getAdminStats
);

router.delete(
  "/user/:id",
  protect,
  adminOnly,
  deleteUser
);

router.put(
  "/upgrade/:id",
  protect,
  adminOnly,
  upgradeToInstructor
);

export default router;