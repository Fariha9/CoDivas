import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
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

    paymentStatus: {
      type: String,
      default: "Completed",
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
enrollmentSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);
export default mongoose.model(
  "Enrollment",
  enrollmentSchema
);