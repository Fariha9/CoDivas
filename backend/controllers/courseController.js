import Course from "../models/Course.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "name email"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Course
export const createCourse = async (req, res) => {
  try {
    const { id, pic, name, page } = req.body;

    const newCourse = await Course.create({
      id,
      pic,
      name,
      page,
      instructor: req.user._id,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    Object.assign(course, req.body);

    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Instructor courses only
export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};