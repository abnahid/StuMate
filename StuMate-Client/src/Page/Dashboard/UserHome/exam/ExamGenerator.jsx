import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, History, Loader2, Sparkles } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '../../../../components/ui/alert';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { QuizDisplay } from './QuizDisplay';

const formSchema = z.object({
    topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    gradeLevel: z.string().min(2, "Grade level is required."),
    numberOfQuestions: z.coerce.number().min(1).max(10),
});

export function ExamGenerator() {
    const [isPending, startTransition] = useTransition();
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState(null);
    const [view, setView] = useState('form');
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: '',
            difficulty: 'medium',
            gradeLevel: 'High School',
            numberOfQuestions: 5,
        },
    });

    const onSubmit = (values) => {
        setError(null);
        setQuizData(null);
        setView('loading');
        startTransition(async () => {
            try {
                const response = await axiosPublic.post('/questions/generate', { ...values, email: user?.email });
                const res = response.data;

                if (!res || !res.questions || res.questions.length === 0) {
                    throw new Error("The AI failed to generate questions. Please try a different topic.");
                }
                setQuizData({ ...res, settings: values });
                setView('quiz');
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred.');
                setView('form');
            }
        });
    };

    const handleExit = () => {
        setView('form');
        setQuizData(null);
        setError(null);
    }

    const renderContent = () => {
        switch (view) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center rounded-lg text-muted-foreground p-12 space-y-4 min-h-[50vh]">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="font-semibold">Generating your exam questions...</p>
                        <p className="text-sm text-center">This may take a moment. Please wait.</p>
                    </div>
                );
            case 'quiz':
                return <QuizDisplay quizData={quizData} onExit={handleExit} />;

            case 'form':
            default:
                return (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <CardContent className="space-y-4 ">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Error Generating Quiz</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Topic</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Photosynthesis, The Cold War" {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gradeLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Grade Level</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 8th Grade, University" {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="difficulty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Difficulty</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="easy">Easy</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="hard">Hard</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="numberOfQuestions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Questions</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min="1" max="10" {...field}   {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="mt-6">
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                                        </>
                                    ) : (
                                        'Generate Quiz'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                );
        }
    }


    return (
        <Card className="lg:col-span-1 max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <CardTitle>AI Quiz Generator</CardTitle>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link to="/dashboard/exam-history">
                            <History className="mr-2 h-4 w-4" />
                            View History
                        </Link>
                    </Button>
                </div>
                <CardDescription>Generate a timed, multiple-choice quiz to test your knowledge.</CardDescription>
            </CardHeader>

            {renderContent()}

        </Card>
    );
}

export default ExamGenerator;