// controllers/progressController.js
import Progress from "../models/Progress.js";

export const updateProgress = async (req, res) => {
  const { courseId, lessonId, currentTime, isCompleted } = req.body;
  const userId = req.user._id;

  try {
    const progress = await Progress.findOneAndUpdate(
      { userId, courseId, lessonId },
      { currentTime, isCompleted },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ message: "Progress saved", progress });
  } catch (error) {
    res.status(500).json({ error: "Failed to save progress." });
  }
};
export const getProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const progressRecords = await Progress.find({ userId, courseId });
    res.status(200).json(progressRecords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress." });
  }
};