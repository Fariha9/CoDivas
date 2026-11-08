import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  liveLink: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("LiveClass", liveClassSchema);