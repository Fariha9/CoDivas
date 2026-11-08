import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById
} from "../controllers/notesController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;




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

