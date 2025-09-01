import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true },
    type: { type: String, enum: ["mcq", "short", "truefalse"], required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    gradeLevel: { type: String, default: "High School" },
    email: { type: String, required: true },
    examSessionId: { type: String, required: true },
    expiresAt: { type: Date, default: () => Date.now() + 60 * 60 * 1000 }
});

QuestionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Question = mongoose.model("Question", QuestionSchema);

export default Question; 
