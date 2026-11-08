import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import { connectDB } from "../config/db.js";

const quizData = [
  {
    "id": 1,
    "title": "Introduction To Programming",
    "description": "Basic programming concepts and problem solving.",
    "image": "https://i.ibb.co/1Gb3rMrL/Introduction-To-Programming.webp",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  },
  {
    "id": 2,
    "title": "Data Structures & Algorithms",
    "description": "Organizing data and solving problems efficiently.",
    "image": "https://i.ibb.co.com/jPFQfSgt/Data-Structures-Algorithms.png",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  },
  {
    "id": 3,
    "title": "Web Development",
    "description": "Building and designing websites.",
    "image": "https://i.ibb.co/jZ8RctmN/Web-Development.png",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  },
  {
    "id": 4,
    "title": "JavaScript",
    "description": "Core concepts of JavaScript programming.",
    "image": "https://i.ibb.co.com/XZ1hkWnt/Java-Script.png",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  },
  {
    "id": 5,
    "title": "Artificial Intelligence",
    "description": "Basics of intelligent machines and systems.",
    "image": "https://i.ibb.co.com/fY4qvwrW/Artificial-Intelligence.jpg",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  },
  {
    "id": 6,
    "title": "Machine Learning",
    "description": "Teaching machines to learn from data.",
    "image": "https://i.ibb.co/d4xsTfhQ/Machine-Learning.png",
    "lessons": [ /* আপনার পুরো lesson 1, 2, 3 এর ডেটা */ ]
  }
];
const seedDB = async () => {
  try {
    await connectDB();
    console.log("Database connected for seeding...");

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizData);

    console.log("Quiz Data Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();