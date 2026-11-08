import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};