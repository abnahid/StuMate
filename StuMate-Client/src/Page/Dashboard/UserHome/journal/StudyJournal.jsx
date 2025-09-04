/* eslint-disable no-unused-vars */


import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { ScrollArea } from '../../../../components/ui/scroll-area';
import { Textarea } from '../../../../components/ui/textarea';
import { useJournal } from '../../../../hooks/useJournal';
import { MOODS, MOOD_CONFIG } from '../../../../lib/constants';
import { journalSchema } from '../../../../lib/schemas';
import { cn } from '../../../../lib/utils';

export function StudyJournal() {
    const { journals, addJournal } = useJournal();
    const [searchTerm, setSearchTerm] = useState('');

    const form = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues: {
            date: new Date().toISOString(),
            subjectStudied: '',
            mood: 'focused',
            notes: '',
        },
    });

    const onSubmit = (values) => {
        addJournal.mutate(values);
        form.reset({
            ...values,
            subjectStudied: '',
            notes: '',
        });
    };

    const filteredJournals = journals.filter(journal =>
        journal.subjectStudied.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.notes.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>New Journal Entry</CardTitle>
                        <CardDescription>Reflect on your study session.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="subjectStudied"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>What did you study?</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Algebra, Chapter 5" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mood"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>How did you feel?</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {MOODS.map(({ value, label, icon: Icon }) => (
                                                        <Button
                                                            key={value}
                                                            type="button"
                                                            variant={field.value === value ? 'default' : 'outline'}
                                                            onClick={() => field.onChange(value)}
                                                            className="flex-1"
                                                        >
                                                            <Icon className="mr-2 h-4 w-4" />
                                                            {label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quick notes or takeaways</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., I finally understood the quadratic formula..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Saving...' : 'Save Entry'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Past Entries</CardTitle>
                        <CardDescription>Review your study history.</CardDescription>
                        <Input
                            placeholder="Search entries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-4"
                        />
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[60vh] pr-4">
                            {filteredJournals.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredJournals.map(journal => {
                                        const moodConfig = MOOD_CONFIG[journal.mood] || MOOD_CONFIG.unknown;
                                        const MoodIcon = moodConfig.icon;
                                        return (
                                            <div key={journal._id} className="flex items-center gap-4">
                                                <div className="flex flex-col items-center w-20">
                                                    <span className={cn("text-2xl", moodConfig.color)}>{moodConfig.icon}</span>
                                                    <span className="text-xs text-muted-foreground text-center">{moodConfig.label}</span>
                                                </div>
                                                <div className="flex-1 rounded-md border bg-muted/20 p-3">
                                                    <p className="font-semibold">{journal.subjectStudied}</p>
                                                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{journal.notes}</p>
                                                    <p className="text-xs text-muted-foreground mt-2">{format(new Date(journal.date), 'MMMM d, yyyy')}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <p>No journal entries found.</p>
                                    <p className="text-sm">{searchTerm ? "Try a different search term." : "Create your first entry to get started!"}</p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
