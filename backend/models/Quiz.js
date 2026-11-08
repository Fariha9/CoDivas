import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    image: String,
    lessons: Array
});

export default mongoose.model("Quiz", quizSchema);