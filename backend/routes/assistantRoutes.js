import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { askAssistant } from "../controllers/assistantController.js";

const router = express.Router();

router.post("/", protect, askAssistant);

export default router;