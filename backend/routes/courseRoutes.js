import express from "express";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCourses,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCourses);

// Instructor
router.get(
  "/my-courses",
  protect,
  roleMiddleware("instructor"),
  getMyCourses
);

router.post(
  "/",
  protect,
  roleMiddleware("instructor"),
  createCourse
);

router.put(
  "/:id",
  protect,
  roleMiddleware("instructor"),
  updateCourse
);

router.delete(
  "/:id",
  protect,
  roleMiddleware("instructor"),
  deleteCourse
);

export default router;