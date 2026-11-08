import express from "express";
import QuizSubmission from "../models/QuizSubmission.js";

const router = express.Router();

router.post("/submit", async (req, res) => {
    try {
        const { userEmail, quizId, score, totalQuestions } = req.body;
        const newSubmission = new QuizSubmission({ userEmail, quizId, score, totalQuestions });
        await newSubmission.save();
        res.status(201).json({ message: "Quiz result saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;