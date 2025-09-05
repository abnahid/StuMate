/* eslint-disable no-unused-vars */

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, LinkIcon, Loader2, Route, Sparkles } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../../components/ui/form';
import { Textarea } from '../../../../components/ui/textarea';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { RoadmapDisplay } from './RoadmapDisplay';

const formSchema = z.object({
    objective: z.string().min(10, 'Please describe your goal in more detail (at least 10 characters).'),
});

const Suggestion = ({ text, onClick }) => (
    <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={onClick}
    >
        {text}
    </Button>
)

export function StudyPathGenerator() {
    const [isPending, startTransition] = useTransition();
    const [roadmapData, setRoadmapData] = useState(null);

    const [error, setError] = useState(null);
    const [view, setView] = useState('form'); // 'form', 'loading', 'response', 'roadmap'
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            objective: '',
        },
    });

    const onSubmit = (values) => {
        setError(null);
        setRoadmapData(null);
        setView('loading');
        startTransition(async () => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            try {



                const response = await axiosPublic.post('/study-path/generate', { ...values, email: user?.email });
                const res = response.data;

                if (!res || !res.roadmap || res.roadmap.length === 0) {
                    throw new Error("The AI failed to generate a study path. Please try a different objective.");
                }
                setRoadmapData(res);
                setView('response');

            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred.');
                setView('form');
            }
        });
    };

    const handleTryAgain = () => {
        setView('form');
        setRoadmapData(null);
        setError(null);
        form.reset();
    }

    const handleSetSuggestion = (text) => {
        form.setValue('objective', text);
    }

    if (view === 'roadmap' && roadmapData) {
        return <RoadmapDisplay roadmapData={roadmapData} onTryAgain={handleTryAgain} />;
    }

    return (
        <div className="flex flex-col justify-between min-h-[calc(100vh-12rem)] w-full">
            <div className="flex-grow flex items-center justify-center w-full max-w-3xl mx-auto p-4 mb-20">
                <AnimatePresence mode="wait">
                    {view === 'form' && (
                        <motion.div
                            key="form-intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <Route className="mx-auto h-12 w-12 text-primary" />
                            <h1 className="text-xl md:text-3xl font-bold mt-4">AI Study Path Generator</h1>
                            <p className="text-muted-foreground mt-2">Describe your learning goal, and I'll create a personalized roadmap for you.</p>
                        </motion.div>
                    )}

                    {view === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center rounded-lg text-muted-foreground p-12 space-y-4"
                        >
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-xl font-semibold">Building your roadmap...</p>
                            <p className="text-sm text-center max-w-sm">The AI is analyzing your goal. This might take a few moments.</p>
                        </motion.div>
                    )}

                    {view === 'response' && roadmapData && (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-lg border p-6 text-center space-y-4">
                                <Sparkles className="mx-auto h-10 w-10 text-primary" />
                                <h2 className="text-2xl font-bold">Your study path is ready!</h2>
                                <p className="text-muted-foreground">I've generated a step-by-step plan to help you achieve your goal.</p>
                                <Button onClick={() => setView('roadmap')}>
                                    <LinkIcon className="mr-2 h-4 w-4" /> View Your Roadmap
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            <div className="w-full max-w-3xl mx-auto p-4 sticky bottom-4">
                {view === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-3xl"
                    >

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-lg border p-4 transition-all duration-300">
                                    <FormField
                                        control={form.control}
                                        name="objective"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        rows={3}
                                                        className="w-full p-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none resize-none text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                        placeholder="e.g., 'Master calculus derivatives in 2 weeks for my final exam'"
                                                    />
                                                </FormControl>
                                                <FormMessage className="px-2 pb-1" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-sm font-medium text-muted-foreground mr-2  hidden ,md:blank">Suggestions:</div>
                                        <div className="hidden  md:flex items-center flex-wrap gap-2">

                                            <p className="text-sm font-medium text-muted-foreground hidden sm:block">Suggestions:</p>
                                            <Suggestion text="Learn React in 1 week" onClick={() => handleSetSuggestion('Learn React in 1 week')} />
                                            <Suggestion text="Prep for a History exam" onClick={() => handleSetSuggestion('Prepare for my World War II history exam in 10 days')} />
                                        </div>
                                        <Button type="submit" size="icon" className="rounded-full h-10 w-10 flex-shrink-0" disabled={isPending || !form.watch('objective')}>
                                            <ArrowUp size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                        <p className="text-xs text-muted-foreground text-center mt-3 px-4">
                            Be specific! Include the topic, timeframe, and any key areas of focus.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}