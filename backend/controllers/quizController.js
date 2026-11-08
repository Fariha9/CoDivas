import Quiz from "../models/Quiz.js";

export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        console.log("Quizzes found:", quizzes.length); 
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createQuiz = async (req, res) => {
    const newQuiz = new Quiz(req.body);
    try {
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};