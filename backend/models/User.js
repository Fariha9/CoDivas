import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name too short"],
    maxlength: [50, "Name too long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: "Name can only contain letters and spaces",
    },
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password too short"],
  },

   role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);

export default User;