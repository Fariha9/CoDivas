import Submission from "../models/Submission.js";

export const createSubmission = async (req, res) => {
    try {
        const { assignmentId, textAnswer, questionAnswers } = req.body;
        const fileName = req.file ? req.file.filename : null;

        const newSubmission = new Submission({
            assignmentId,
            textAnswer,
            questionAnswers: JSON.parse(questionAnswers),
            fileName
        });

        await newSubmission.save();
        res.status(201).json({ message: "Submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};