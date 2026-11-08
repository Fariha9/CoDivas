import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    quizId: { type: Number, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuizSubmission", quizSubmissionSchema);