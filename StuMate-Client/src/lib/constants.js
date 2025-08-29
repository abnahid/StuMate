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