import { addDays, set, startOfWeek } from 'date-fns';

const today = new Date();
const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

export const initialClasses = [
    { _id: '1', name: 'Calculus I', date: set(addDays(startOfThisWeek, 0), { hours: 10, minutes: 0 }).toISOString(), time: '10:00', subject: 'Math' },
    { _id: '2', name: 'Intro to Physics', date: set(addDays(startOfThisWeek, 1), { hours: 13, minutes: 0 }).toISOString(), time: '13:00', subject: 'Science' },
    { _id: '3', name: 'World History', date: set(addDays(startOfThisWeek, 2), { hours: 9, minutes: 0 }).toISOString(), time: '09:00', subject: 'History' },
    { _id: '4', name: 'Shakespearean Lit', date: set(addDays(startOfThisWeek, 3), { hours: 11, minutes: 0 }).toISOString(), time: '11:00', subject: 'English' },
    { _id: '5', name: 'Calculus I', date: set(addDays(startOfThisWeek, 4), { hours: 10, minutes: 0 }).toISOString(), time: '10:00', subject: 'Math' },
];

export const initialTransactions = [
    { _id: '1', type: 'income', category: 'Part-time Job', amount: 300, date: new Date().toISOString(), description: 'Bi-weekly paycheck' },
    { _id: '2', type: 'expense', category: 'Food', amount: 50, date: new Date().toISOString(), description: 'Groceries' },
    { _id: '3', type: 'expense', category: 'Books', amount: 75, date: new Date().toISOString(), description: 'Physics textbook' },
    { _id: '4', type: 'expense', category: 'Transport', amount: 20, date: new Date().toISOString(), description: 'Bus pass' },
];

export const initialTasks = [
    { _id: '1', title: 'Read Chapter 3 of Physics book', status: 'todo', priority: 'high', subject: 'Science' },
    { _id: '2', title: 'Complete Calculus problem set', status: 'in-progress', priority: 'high', subject: 'Math' },
    { _id: '3', title: 'Write essay on Hamlet', status: 'done', priority: 'medium', subject: 'English' },
    { _id: '4', title: 'Study for History quiz', status: 'todo', priority: 'medium', subject: 'History' },
];
