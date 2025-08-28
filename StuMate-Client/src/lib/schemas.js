import { z } from 'zod';

export const classSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    date: z.string().min(1, 'Date is required.'),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
    subject: z.string().min(2, 'Subject must be at least 2 characters.'),
});

export const transactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    category: z.string().min(2, 'Category must be at least 2 characters.'),
    amount: z.coerce.number().positive('Amount must be a positive number.'),
    date: z.string().min(1, 'Date is required.'),
    description: z.string().min(2, 'Description must be at least 2 characters.'),
});

export const taskSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters.'),
    status: z.enum(['todo', 'in-progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    subject: z.string().min(2, 'Subject must be at least 2 characters.'),
    deadline: z.string().optional(),
});
