import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignmentId: String,
    textAnswer: String,
    questionAnswers: Object,
    fileName: String,
    submittedAt: { type: Date, default: Date.now }
});


export default mongoose.model("Submission", submissionSchema);