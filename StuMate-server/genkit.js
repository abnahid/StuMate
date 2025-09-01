import { googleAI } from '@genkit-ai/googleai';
import dotenv from 'dotenv';
import { genkit, z } from 'genkit';

dotenv.config();

if (!process.env.GENKIT_API_KEY) {
    throw new Error('GENKIT_API_KEY not found in environment variables!');
}

const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GENKIT_API_KEY })],
    model: googleAI.model("gemini-2.5-flash", { temperature: 0.8 }),
});

const QuestionInputSchema = z.object({
    topic: z.string().describe('Topic name, e.g., Photosynthesis, The Cold War'),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    gradeLevel: z.string().default('High School'),
    numberOfQuestions: z.number().min(1).max(10).default(5)
});

const QuestionSchema = z.array(z.object({
    type: z.enum(['mcq', 'truefalse']),
    question: z.string(),
    options: z.array(z.string()).optional(),
    answer: z.string()
}));


export const generateExamQuestions = ai.defineFlow(
    {
        name: 'examQuestionFlow',
        inputSchema: QuestionInputSchema,
        outputSchema: QuestionSchema
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
            output: { schema: QuestionSchema }
        });



        if (!output) {
            console.error('[generateExamQuestions] Failed to generate questions');
            throw new Error('Failed to generate questions');
        }
        return output;
    }
);