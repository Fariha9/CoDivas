import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Course from "../models/Course.js";
import {getInstructorStudents, getInstructorStats, createCourse, getInstructorCourses,deleteCourse  } from "../controllers/instructorController.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  roleMiddleware("instructor"),
  getInstructorStats
);

router.post(
  "/courses",
  protect,
  roleMiddleware("instructor"),
  createCourse
);
router.get(
  "/students",
  protect,
  roleMiddleware("instructor"),
  getInstructorStudents
);

router.get(
"/courses",
protect,
roleMiddleware("instructor"),
async(req,res)=>{

try{

const courses = await Course.find({
  instructor:req.user._id
});


res.status(200).json(courses);


}catch(error){

res.status(500).json({
message:error.message
});

}

}
);


router.delete(
  "/courses/:id",
  protect,
  roleMiddleware("instructor"),
  deleteCourse
);





export default router;