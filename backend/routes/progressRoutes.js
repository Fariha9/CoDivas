// routes/progressRoutes.js
import express from "express";
import { updateProgress, getProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Both routes must be protected so we can extract req.user._id safely
router.post("/update", protect, updateProgress);
router.get("/:courseId", protect, getProgress);

export default router;