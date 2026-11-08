import express from "express";
import { getQuizzes, createQuiz } from "../controllers/quizController.js";
const router = express.Router();

router.get("/", getQuizzes);
router.post("/", createQuiz);

export default router;