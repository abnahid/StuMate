'use client';

import { Award, CheckCircle2, Target, XCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '../../../../components/ui/chart';
import { useExamPrep } from '../../../../hooks/useExamPrep';
import { cn } from '../../../../lib/utils';

export function QuizResults({ quizData, userAnswers, onRetry }) {
    const { addPracticeSession } = useExamPrep();

    const results = useMemo(() => {
        let score = 0;
        const details = quizData.questions.map((q, index) => {
            const isCorrect = q.answer === userAnswers[index];
            if (isCorrect) {
                score++;
            }
            return {
                ...q,
                userAnswer: userAnswers[index],
                isCorrect,
            };
        });
        return { score, details };
    }, [quizData, userAnswers]);

    useEffect(() => {
        addPracticeSession.mutate({
            date: new Date().toISOString(),
            topic: quizData.settings.topic,
            difficulty: quizData.settings.difficulty,
            numberOfQuestions: quizData.questions.length,
            score: results.score
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const chartData = [
        { name: 'Correct', value: results.score, fill: 'hsl(var(--chart-1))' },
        { name: 'Incorrect', value: quizData.questions.length - results.score, fill: 'hsl(var(--destructive))' },
    ];

    const chartConfig = {
        score: { label: 'Score' },
        Correct: { label: 'Correct', color: 'hsl(var(--chart-1))' },
        Incorrect: { label: 'Incorrect', color: 'hsl(var(--destructive))' },
    };


    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <Award className="mx-auto h-12 w-12 text-yellow-500" />
                <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
                <CardDescription>Here's how you did.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="flex items-center gap-4">
                        <Target className="h-10 w-10 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Your Score</p>
                            <p className="text-4xl font-bold">{results.score} / {quizData.questions.length}</p>
                        </div>
                    </div>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-32">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={30}
                                outerRadius={40}
                                strokeWidth={5}
                            >
                                {chartData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-center">Review Your Answers</h3>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-4 rounded-lg border p-4">
                        {results.details.map((item, index) => (
                            <div key={index} className="p-3 rounded-md bg-muted/50">
                                <p className="font-medium mb-2">{index + 1}. {item.question}</p>
                                <div className="space-y-1 text-sm">
                                    <div className={cn("flex items-center gap-2", item.isCorrect ? 'text-green-500' : 'text-red-500')}>
                                        {item.isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                        <span>Your answer: {item.userAnswer || 'Not answered'}</span>
                                    </div>
                                    {!item.isCorrect && (
                                        <div className="flex items-center gap-2 text-green-500">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Correct answer: {item.answer}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onRetry} className="w-full">
                    Take Another Quiz
                </Button>
            </CardFooter>
        </Card>
    );
}
