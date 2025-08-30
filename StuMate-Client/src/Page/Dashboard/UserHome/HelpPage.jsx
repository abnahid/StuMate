import { LifeBuoy, Mail } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../../components/ui/accordion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

const faqs = [
    {
        question: 'How do I add a new class to my schedule?',
        answer:
            'Go to the "Schedule" page and click the "Add Event" button. Fill in the details like event name, subject, date, and time, then click "Save". Your new class will appear on the calendar.',
    },
    {
        question: 'How does the budget tracker work?',
        answer:
            'On the "Budget" page, click "Add Transaction". You can log both income and expenses. Categorize each transaction to see a breakdown of your spending habits in the chart.',
    },
    {
        question: 'What is the Study Planner for?',
        answer:
            'The "Study Planner" uses a Kanban board to help you organize your tasks. You can create tasks, assign them a subject and priority, and drag them between "To Do", "In Progress", and "Done" columns to track your progress.',
    },
    {
        question: 'How do I use the AI Exam Prep feature?',
        answer:
            'Navigate to the "Exam Prep" page. Enter a topic you want to study, select a difficulty and grade level, and choose the number of questions. The AI will generate a custom quiz for you to practice.',
    },
    {
        question: 'What happens if I close the tab during a Focus Mode session?',
        answer:
            'The Focus Timer is persistent. If you accidentally close the tab or refresh the page, the timer will continue running from where you left off. You won\'t lose your progress.',
    },
    {
        question: 'How do I save my Gemini API Key?',
        answer:
            'Click on your user profile in the sidebar, then select "Settings". You can paste your Google AI (Gemini) API key there. It will be saved securely in your browser\'s local storage for the AI features to use.',
    },
];

export function HelpPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <LifeBuoy className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight">How can we help?</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Find answers to common questions below.
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                        Here are some of the most common questions we get.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Still need help?</CardTitle>
                    <CardDescription>
                        If you can't find the answer you're looking for, feel free to reach out to our support team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <Button asChild>
                            <a href="mailto:support@studentsavvy.app">
                                <Mail className="mr-2 h-4 w-4" /> Contact Support
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
