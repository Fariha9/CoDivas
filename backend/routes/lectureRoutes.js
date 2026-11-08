import express from "express";
import { uploadLecture, getLectures } from "../controllers/lectureController.js";
import { protect } from "../middleware/authMiddleware.js";
import videoUpload from "../middleware/videoUploadMiddleware.js";

const router = express.Router();

// Route for instructor uploading video
router.post(
    "/upload",
    protect,
    videoUpload.single("video"), // Matches frontend FormData key field name
    uploadLecture
);

// Route for users to retrieve course videos
router.get(
    "/:courseId",
    getLectures
);

export default router;