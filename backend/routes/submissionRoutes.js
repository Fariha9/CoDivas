import express from "express";
import multer from "multer";
import Submission from "../models/Submission.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ১. অ্যাসাইনমেন্ট সাবমিশন রুট (বর্তমান রুট)
router.post("/", upload.single('file'), async (req, res) => {
    try {
        const { assignmentId, textAnswer, questionAnswers, userEmail } = req.body;
        const fileName = req.file ? req.file.filename : null;

        const newSubmission = new Submission({
            userEmail, // ইউজার ইমেইল যোগ করুন
            assignmentId,
            textAnswer,
            questionAnswers: questionAnswers ? JSON.parse(questionAnswers) : {},
            fileName,
            submissionType: "assignment" // টাইপ সেট করলাম
        });

        await newSubmission.save();
        res.status(201).json({ message: "Assignment submitted successfully!" });
    } catch (error) {
        console.error("Assignment Submission Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


export default router;