import { useState } from "react";

const faqs = [
    {
        question: "How do I add a new class to my schedule?",
        answer:
            'Go to the "Schedule" page and click the "Add Event" button. Fill in the details like event name, subject, date, and time, then click "Save". Your new class will appear on the calendar.',
    },
    {
        question: "How does the budget tracker work?",
        answer:
            'On the "Budget" page, click "Add Transaction". You can log both income and expenses. Categorize each transaction to see a breakdown of your spending habits in the chart.',
    },
    {
        question: "What is the Study Planner for?",
        answer:
            'The "Study Planner" uses a Kanban board to help you organize your tasks. You can create tasks, assign them a subject and priority, and drag them between "To Do", "In Progress", and "Done" columns to track your progress.',
    },
    {
        question: "How do I use the AI Exam Prep feature?",
        answer:
            'Navigate to the "Exam Prep" page. Enter a topic you want to study, select a difficulty and grade level, and choose the number of questions. The AI will generate a custom quiz for you to practice.',
    },
    {
        question: "What happens if I close the tab during a Focus Mode session?",
        answer:
            "The Focus Timer is persistent. If you accidentally close the tab or refresh the page, the timer will continue running from where you left off. You won't lose your progress.",
    },
    {
        question: "What are achievements and how do I unlock them?",
        answer:
            'Achievements are gamified badges you earn for using the app\'s features, like logging transactions or completing focus sessions. Go to the "Achievements" page to see all available badges and your progress toward unlocking them.',
    },
    {
        question: "How do I post in the community forum?",
        answer:
            'Visit the "Community" page and click the "New Post" button. You can then write your post, select a category, and share it with other students. Only admins can post in the "Announcements" category.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0); // first FAQ open by default

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-10 bg-sidebar sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">

                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Answers to the most common questions about how to use the app.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow cursor-pointer hover:bg-gray-50"
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(index)}
                                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            >
                                <span className="flex text-lg font-semibold text-black">
                                    {faq.question}
                                </span>

                                <svg
                                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : "rotate-0"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`px-4 pb-5 sm:px-6 sm:pb-6 transition-all duration-300 ${openIndex === index ? "block" : "hidden"
                                    }`}
                            >
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
