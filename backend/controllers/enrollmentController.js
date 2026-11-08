import Enrollment from "../models/Enrollment.js";

// @desc    Purchase / Enroll in a course
// @route   POST /api/enrollments/purchase
// @access  Private
export const purchaseCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id; // Extracted from protect middleware

  try {
    const newEnrollment = new Enrollment({ userId, courseId });
    await newEnrollment.save();
    res.status(201).json({ message: "Purchase successful!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Already enrolled in this course." });
    }
    res.status(500).json({ error: "Purchase failed." });
  }
};

// @desc    Check if a user has access to a specific course
// @route   GET /api/enrollments/check-access/:courseId
// @access  Private
export const checkAccess = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.courseId,
    });
    res.status(200).json({ hasAccess: !!enrollment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all courses purchased by the logged-in user for their dashboard
// @route   GET /api/enrollments/my-courses
// @access  Private
export const getUserCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id }).populate("courseId");

    // Filter out any enrollments where the course item might have been deleted from the database
    const purchasedCourses = enrollments
      .filter((enrollment) => enrollment.courseId !== null)
      .map((enrollment) => enrollment.courseId);

    res.status(200).json(purchasedCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Failed to load dashboard courses." });
  }
};