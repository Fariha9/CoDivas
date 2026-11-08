import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, 
    pic: { type: String, required: true },
    name: { type: String, required: true },
    page: { type: String, required: true },
    
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Course = mongoose.model("Course", courseSchema);
export default Course;