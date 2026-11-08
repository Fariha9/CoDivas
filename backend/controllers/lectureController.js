import Lecture from "../models/Lecture.js";

// Upload a new video lecture
export const uploadLecture = async (req, res) => {
    try {
        const { title, courseId } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please select a video file to upload." });
        }

        const lecture = await Lecture.create({
            title,
            videoFile: req.file.filename,
            course: courseId,
            uploadedBy: req.user._id
        });

        res.status(201).json({
            message: "Lecture video uploaded successfully!",
            lecture
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Retrieve lectures for a specific course
export const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find({
            course: req.params.courseId
        }).sort({ createdAt: 1 }); // Plays lectures in sequential order of creation

        res.json(lectures);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};