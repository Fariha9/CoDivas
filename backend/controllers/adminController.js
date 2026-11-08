import User from "../models/User.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Payment from "../models/Payment.js";

export const getAdminStats = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const totalCourses = await Course.countDocuments();

    const totalQuizzes = await Quiz.countDocuments();
    
    const totalStudents =
  await User.countDocuments({ role: "student" });

const totalInstructors =
  await User.countDocuments({ role: "instructor" });

const totalAdmins =
  await User.countDocuments({ role: "admin" });
  const completedPayments = await Payment.find({
  status: "Completed",
});

const totalRevenue = completedPayments.reduce(
  (total, payment) => total + payment.amount,
  0
);

    res.json({
  users,
  totalUsers: users.length,
  totalStudents,
  totalInstructors,
  totalAdmins,
  totalCourses,
  totalQuizzes,
  totalRevenue,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // prevent deleting admin
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin cannot be deleted"
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const upgradeToInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "instructor";
    await user.save();

    res.json({ message: "User upgraded to instructor", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};