import { BrainCircuit, Frown, Meh, Zap } from 'lucide-react';

export const SUBJECT_COLORS = {
    default: 'border-gray-500',

    // Science Stream
    Physics: 'border-blue-500',
    Chemistry: 'border-green-500',
    Biology: 'border-emerald-500',
    Math: 'border-indigo-500',
    ComputerScience: 'border-cyan-500',
    WebDevelopment: 'border-teal-500',
    "Web Development": 'border-cyan-500',
    // Arts Stream
    History: 'border-yellow-500',
    Geography: 'border-lime-500',
    Literature: 'border-purple-500',
    Art: 'border-pink-500',
    Music: 'border-indigo-400',
    Drama: 'border-rose-400',

    // Commerce Stream
    Accounting: 'border-orange-500',
    Economics: 'border-amber-500',
    BusinessStudies: 'border-fuchsia-500',
    Entrepreneurship: 'border-rose-500',

    // Common subjects for all students / children
    English: 'border-violet-500',
    Languages: 'border-rose-600',
    PhysicalEducation: 'border-orange-400',
    MoralEducation: 'border-sky-400',
    ComputerBasics: 'border-sky-500',
};


export const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const MOODS = [
    { value: 'focused', label: 'Focused', icon: BrainCircuit },
    { value: 'motivated', label: 'Motivated', icon: Zap },
    { value: 'distracted', label: 'Distracted', icon: Meh },
    { value: 'tired', label: 'Tired', icon: Frown },
];

export const MOOD_CONFIG = {
    focused: { label: "Focused", icon: "😊", color: "text-green-500", bg: "bg-green-100" },
    motivated: { label: "Motivated", icon: "😊", color: "text-green-500", bg: "bg-green-100" },
    distracted: { label: "Distracted", icon: "😐", color: "text-yellow-500", bg: "bg-yellow-100" },
    tired: { label: "Tired", icon: "😔", color: "text-red-500", bg: "bg-red-100" },
    unknown: { label: "Unknown", icon: "🙂", color: "text-gray-500", bg: "bg-gray-100" },
};

export const DAILY_QUOTES = [
    { title: "One small step starts the journey", subtitle: "Sunday prep makes the week smoother." }, // Sunday
    { title: "Start early to get ahead in life", subtitle: "Monday sets the tone for success." }, // Monday
    { title: "Believe in yourself to achieve", subtitle: "Face Tuesday with full confidence." }, // Tuesday
    { title: "Keep moving forward with strength", subtitle: "Wednesday is for steady progress." }, // Wednesday
    { title: "Courage and focus keep you going", subtitle: "Thursday is time to reflect ahead." }, // Thursday
    { title: "What you do today shapes tomorrow", subtitle: "Friday’s effort brings weekend joy." }, // Friday
    { title: "Every professional was once a newbie", subtitle: "Saturday is for learning and growth." }, // Saturday
];
