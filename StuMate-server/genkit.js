import { googleAI } from '@genkit-ai/googleai';
import dotenv from 'dotenv';
import { genkit, z } from 'genkit';

dotenv.config();

if (!process.env.GENKIT_API_KEY) {
    throw new Error('GENKIT_API_KEY not found in environment variables!');
}

const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GENKIT_API_KEY })],
    model: googleAI.model('gemini-2.5-flash', { temperature: 0.8 }),
});

/* =========================
   Exam Question Generator
   ========================= */

const QuestionInputSchema = z.object({
    topic: z.string().describe('Topic name, e.g., Photosynthesis, The Cold War'),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    gradeLevel: z.string().default('High School'),
    numberOfQuestions: z.number().min(1).max(10).default(5),
});

const QuestionSchema = z.array(
    z.object({
        type: z.enum(['mcq', 'truefalse']),
        question: z.string(),
        options: z.array(z.string()).optional(),
        answer: z.string(),
    })
);

export const generateExamQuestions = ai.defineFlow(
    {
        name: 'examQuestionFlow',
        inputSchema: QuestionInputSchema,
        outputSchema: QuestionSchema,
    },
    async (input) => {
        const prompt = `
      Generate ${input.numberOfQuestions} practice exam questions on the topic "${input.topic}".
      Include a mix of MCQ and true/false.
      Difficulty: ${input.difficulty}.
      Grade Level: ${input.gradeLevel}.
      Return JSON array with fields: type, question, options (if MCQ), answer.
    `;

        const { output } = await ai.generate({
            prompt,
            output: { schema: QuestionSchema },
        });

        if (!output) {
            console.error('[generateExamQuestions] Failed to generate questions');
            throw new Error('Failed to generate questions');
        }
        return output;
    }
);

/* =========================
   Study Path Generator
   ========================= */

const StudyPathGeneratorInputSchema = z.object({
    objective: z
        .string()
        .describe(
            "The user's study goal, including the topic and timeframe. e.g., 'Pass my Calculus exam in 14 days.'"
        ),
});

const StudyPathGeneratorOutputSchema = z.object({
    roadmap: z
        .array(
            z.object({
                day: z.number().describe("The day number in the study plan."),
                title: z.string().describe("A concise, motivational title for the day's study session."),
                tasks: z.array(z.string()).describe("A list of specific, actionable tasks for the day."),
                tip: z.string().describe("A helpful tip or piece of advice for the day."),
            })
        )
        .describe('The generated study plan.'),
});

const studyPathGeneratorPrompt = ai.definePrompt({
    name: 'studyPathGeneratorPrompt',
    input: { schema: StudyPathGeneratorInputSchema },
    output: { schema: StudyPathGeneratorOutputSchema },
    prompt: `You are an expert academic advisor and study planning assistant. Your goal is to create a structured, actionable, and encouraging study roadmap for a student.

The user's objective is: "{{objective}}"

Analyze the user's objective to understand the subject, goal, and timeframe.

Generate a day-by-day study plan that breaks down the objective into manageable tasks. The plan should cover the entire duration mentioned in the objective.

For each day, provide:
1. A "day" number.
2. A short, motivational "title" for that day's session.
3. An array of specific, actionable "tasks". These should be concrete actions, not vague goals.
4. A helpful "tip" to keep the student motivated or provide a useful study strategy.

Ensure the final output is a valid JSON object matching the defined schema.
`,
});

const studyPathGeneratorFlow = ai.defineFlow(
    {
        name: 'studyPathGeneratorFlow',
        inputSchema: StudyPathGeneratorInputSchema,
        outputSchema: StudyPathGeneratorOutputSchema,
    },
    async (input) => {
        const { output } = await studyPathGeneratorPrompt(input);
        return output;
    }
);

export async function studyPathGenerator(input) {
    return studyPathGeneratorFlow(input);
}
