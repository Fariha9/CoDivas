import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  prompt: { type: String, required: true },
  questions: { type: [String], default: [] } // আপনার JSON-এর questions array
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;