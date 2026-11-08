import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Review from "../models/Review.js";
import Payment from "../models/Payment.js";

export const getInstructorStats = async (req,res)=>{

try{

const courses = await Course.find({
    instructor:req.user._id
});


const courseIds = courses.map(course=>course._id);
const payments = await Payment.find({
  status: "Completed",
}).populate("courses");

let totalRevenue = 0;

payments.forEach((payment) => {
  payment.courses.forEach((course) => {
    if (courseIds.some(id => id.toString() === course._id.toString())) {
      totalRevenue += payment.amount;
    }
  });
});

const totalStudents = await Enrollment.countDocuments({
    courseId:{
        $in:courseIds
    }
});


// add reviews data
const coursesWithReviews = await Promise.all(

courses.map(async(course)=>{


const reviews = await Review.find({
    course:course._id
});


const avgRating = reviews.length
?
(
reviews.reduce((sum,r)=>sum+r.rating,0)
/
reviews.length
).toFixed(1)

:
0;



return {

...course._doc,

rating:avgRating,

reviews:reviews.length

};


})

);



res.json({

instructor:req.user,

courses:coursesWithReviews,

totalStudents,

totalRevenue,



});


}catch(error){

res.status(500).json({
message:error.message
});

}

};
export const createCourse = async (req, res) => {
  try {
    const { id, name, pic, page } = req.body;

    const course = await Course.create({
      id,
      name,
      pic,
      page,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInstructorCourses = async (req, res) => {
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

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getInstructorStudents = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    const courseIds = courses.map(course => course._id);

    const students = await Enrollment.find({
      courseId: { $in: courseIds },
    })
      .populate("userId", "name email")
      .populate("courseId", "name");

    res.json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};