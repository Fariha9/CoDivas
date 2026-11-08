import express from "express";
import { createLiveClass, getLiveClasses } from "../controllers/liveClassController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createLiveClass);
router.get("/:courseId", getLiveClasses);

export default router;