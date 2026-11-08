// models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lessonId: {
      type: String, 
      required: true, // We use String here because your YouTube IDs (e.g., "WDX1gLtCIlc") are strings
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// This ensures we only have one progress document per user, per course, per lesson.
progressSchema.index({ userId: 1, courseId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);