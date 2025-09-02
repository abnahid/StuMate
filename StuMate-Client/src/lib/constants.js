import { BrainCircuit, Frown, Meh, Smile, Zap } from 'lucide-react';

export const SUBJECT_COLORS = {
    default: 'border-gray-500',
    Math: 'border-blue-500',
    Science: 'border-green-500',
    History: 'border-yellow-500',
    English: 'border-purple-500',
    Art: 'border-pink-500',
    PE: 'border-orange-500',
    Music: 'border-indigo-500',
    Technology: 'border-sky-500',
    Languages: 'border-rose-500',
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
    focused: { label: "Focused", icon: BrainCircuit, color: "text-green-500" },
    motivated: { label: "Motivated", icon: Zap, color: "text-blue-500" },
    distracted: { label: "Distracted", icon: Meh, color: "text-yellow-500" },
    tired: { label: "Tired", icon: Frown, color: "text-red-500" },
    unknown: { label: "Unknown", icon: Smile, color: "text-gray-500" },
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
