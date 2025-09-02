

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import { useToast } from './useToast';

const fetchPosts = async (axiosPublic, category) => {
    const response = await axiosPublic.get('/posts', { params: { category } });
    return response.data;
}

const fetchPost = async (axiosPublic, postId) => {
    const response = await axiosPublic.get(`/posts/${postId}`);
    return response.data;
}

const addPostFn = async (axiosPublic, newPost) => {
    const response = await axiosPublic.post('/posts', newPost);
    return response.data;
}

const updatePostFn = async (axiosPublic, updatedPost) => {
    const response = await axiosPublic.put(`/posts/${updatedPost._id}`, updatedPost);
    return response.data;
}

const deletePostFn = async (axiosPublic, { postId, authorEmail }) => {
    // This is not perfectly secure but good for a demo.
    // In a real app, the email/role would come from a verified JWT on the backend.
    const response = await axiosPublic.delete(`/posts/${postId}`, { data: { email: authorEmail } });
    return response.data;
}


// --- Comments ---
const fetchComments = async (axiosPublic, postId) => {
    const response = await axiosPublic.get(`/comments/${postId}`);
    return response.data;
}

const addCommentFn = async (axiosPublic, newComment) => {
    const response = await axiosPublic.post('/comments', newComment);
    return response.data;
}

export function useCommunity() {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // --- Post Queries and Mutations ---
    const usePosts = (category) => {
        return useQuery({
            queryKey: ['posts', category],
            queryFn: () => fetchPosts(axiosPublic, category),
            initialData: [],
        });
    }

    const usePost = (postId) => {
        return useQuery({
            queryKey: ['post', postId],
            queryFn: () => fetchPost(axiosPublic, postId),
            enabled: !!postId,
        });
    }

    const addPost = useMutation({
        mutationFn: (newPost) => addPostFn(axiosPublic, newPost),
        onSuccess: (data) => {
            toast({ title: 'Success', description: 'Your post has been created.' });
            queryClient.invalidateQueries({ queryKey: ['posts', data.category] });
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Error', description: error.response?.data?.message || 'Failed to create post.' });
        }
    });

    const updatePost = useMutation({
        mutationFn: (updatedPost) => updatePostFn(axiosPublic, updatedPost),
        onSuccess: (data) => {
            toast({ title: 'Success', description: 'Your post has been updated.' });
            queryClient.invalidateQueries({ queryKey: ['posts', data.category] });
            queryClient.invalidateQueries({ queryKey: ['post', data._id] });
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Error', description: error.response?.data?.message || 'Failed to update post.' });
        }
    });

    const deletePost = useMutation({
        mutationFn: (data) => deletePostFn(axiosPublic, data),
        onSuccess: (data) => {
            toast({ title: 'Success', description: 'The post has been deleted.' });
            queryClient.invalidateQueries({ queryKey: ['posts', data.category] });
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Error', description: error.response?.data?.message || 'Failed to delete post.' });
        }
    });

    // --- Comment Queries and Mutations ---
    const useComments = (postId) => {
        return useQuery({
            queryKey: ['comments', postId],
            queryFn: () => fetchComments(axiosPublic, postId),
            enabled: !!postId,
            initialData: [],
        });
    }

    const addComment = useMutation({
        mutationFn: (newComment) => addCommentFn(axiosPublic, newComment),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['comments', data.postId] });
            queryClient.invalidateQueries({ queryKey: ['post', data.postId] });
            queryClient.invalidateQueries({ queryKey: ['posts', 'discussion'] });
            queryClient.invalidateQueries({ queryKey: ['posts', 'resources'] });
            queryClient.invalidateQueries({ queryKey: ['posts', 'announcements'] });
        },
        onError: (error) => {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to add comment.' });
        }
    });

    return {
        usePosts,
        addPost,
        updatePost,
        deletePost,
        usePost,
        useComments,
        addComment,
    };
}

