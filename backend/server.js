import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js"; 
import quizRoutes from "./routes/quizRoutes.js"; 
import quizSubmissionRoutes from "./routes/quizSubmissionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import course from "./models/Course.js";
import courseRoutes from "./routes/courseRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import Enrollment from "./models/Enrollment.js";
import progressRoutes from "./routes/progressRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js";
import assistantRoutes from "./routes/assistantRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
connectDB();

//middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Backend is running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", rateLimiter);
app.use("/api/notes",notesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/quiz-submissions", quizSubmissionRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/materials",materialRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/uploads",express.static("uploads"));
app.use("/api/payment", paymentRoutes);
app.use("/api/assistant", assistantRoutes);

app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
});
//for production standard setup use this
// connectDB().then(() =>{
//    app.listen(PORT, () => {
//     console.log("Server running on PORT:", PORT);
// }); 
// });

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you get 5 notes");
// });

// app.post("/api/notes",(req,res) => {
//     res.status(201).json({message:"Post created successfully"})
// })

// app.put("/api/notes/:id",(req,res) => {
//     res.status(200).json({message:"Post updated successfully"})
// })

// app.delete("/api/notes/:id",(req,res) => {
//     res.status(200).json({message:"Post deleted successfully"})
// })


