import LiveClass from "../models/LiveClass.js";
import Enrollment from "../models/Enrollment.js";
import Notification from "../models/Notification.js";

// Create a new live class (Instructor only)
export const createLiveClass = async (req, res) => {
  try {
    const { courseId, title, liveLink, scheduledAt } = req.body;
    
    // 🚨 ADDED SAFETY CHECK: Stop the function if courseId is missing
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required to create a live class." });
    }

    // 1. Create the Live Class
    const newClass = await LiveClass.create({
      courseId, 
      title, 
      liveLink, 
      scheduledAt, 
      instructorId: req.user._id,
    });

    // 2. Find all students enrolled ONLY in this specific course
    const enrollments = await Enrollment.find({ courseId: courseId });

    // 3. Create a notification for each enrolled user
    const notifications = enrollments.map(enrollment => ({
      userId: enrollment.userId,
      message: `New Live Class "${title}" is scheduled!`,
      scheduledAt: scheduledAt, 
      liveLink: liveLink, 
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get live classes for a specific course
export const getLiveClasses = async (req, res) => {
  try {
    const classes = await LiveClass.find({ courseId: req.params.courseId });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch live classes" });
  }
};