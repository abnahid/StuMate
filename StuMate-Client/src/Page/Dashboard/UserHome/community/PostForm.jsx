


import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../../../components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Textarea } from '../../../../components/ui/textarea';
import useAuth from '../../../../hooks/useAuth';
import { useCommunity } from '../../../../hooks/useCommunity';

const postSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long.'),
    content: z.string().min(10, 'Content must be at least 10 characters long.'),
    category: z.enum(['discussion', 'announcements', 'resources']),
});

const ALL_CATEGORIES = [
    { value: 'discussion', label: 'Discussion' },
    { value: 'resources', label: 'Resources' },
    { value: 'announcements', label: 'Announcement' },
];

export function PostForm({ isOpen, setIsOpen, post }) {
    const { addPost, updatePost } = useCommunity();
    const { user } = useAuth();
    const isEditMode = !!post;

    // For demonstration, we assume a user is an admin if their email matches.
    // In a real application, this should come from a secure source like a JWT.
    const isAdmin = useMemo(() => user?.email === 'admin@stumate.com', [user]);

    const availableCategories = useMemo(() => {
        if (isAdmin) return ALL_CATEGORIES;
        return ALL_CATEGORIES.filter(cat => cat.value !== 'announcements');
    }, [isAdmin]);

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            content: '',
            category: 'discussion',
        },
    });

    useEffect(() => {
        if (post) { // isEditMode
            form.reset(post);
        } else {
            form.reset({
                title: '',
                content: '',
                category: 'discussion',
            });
        }
    }, [post, isOpen, form]);

    const onSubmit = (values) => {
        if (!user) return;

        if (isEditMode) {
            updatePost.mutate({ ...values, _id: post._id, authorEmail: user.email });
        } else {
            addPost.mutate({
                ...values,
                authorName: user.displayName,
                authorEmail: user.email,
                authorPhotoURL: user.photoURL,
                commentCount: 0,
            });
        }

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Post' : 'Create a New Post'}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? 'Update your post details below.' : 'Share your thoughts, ask a question, or start a discussion.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditMode}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableCategories.map(cat => (
                                                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a catchy title for your post" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your post content here..." {...field} rows={6} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (isEditMode ? "Saving..." : "Posting...") : (isEditMode ? 'Save Changes' : 'Create Post')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

