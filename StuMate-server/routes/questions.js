import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { generateExamQuestions } from "../genkit.js";
import Question from "../models/Question.js";
const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { topic, difficulty, gradeLevel = "High School", email, numberOfQuestions = 5 } = req.body;

        if (!topic || topic.trim().length < 3) {
            return res.status(400).json({ success: false, error: "Topic is required (min 3 characters)" });
        }

        const examSessionId = uuidv4();
        const generated = await generateExamQuestions({ topic, difficulty, gradeLevel, numberOfQuestions });

        const saved = await Question.insertMany(
            generated.map(q => ({ ...q, difficulty, gradeLevel, email, examSessionId }))
        );

        res.json({ success: true, questions: saved, examSessionId });
    } catch (err) {
        console.error("Error generating questions:", err);
        res.status(500).json({ success: false, error: "Failed to generate questions" });
    }
});

router.get("/generate", async (req, res) => {
    try {
        const { email, examSessionId } = req.query;
        if (!email) return res.status(400).json({ success: false, error: "Email is required" });
        const questions = await Question.find({ email, examSessionId });
        res.json(questions);
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ success: false, error: "Failed to fetch questions" });
    }
});

export default router;
