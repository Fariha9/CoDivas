import express from "express";
import { purchaseCourse, checkAccess, getUserCourses } from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All enrollment routes require the user to be logged in
router.post("/purchase", protect, purchaseCourse);
router.get("/check-access/:courseId", protect, checkAccess);
router.get("/my-courses", protect, getUserCourses);

export default router;