

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './usea';
import useAxiosPublic from './useAxiosPublic';

// --- Posts ---
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
    const { user } = useAuth();
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries({ queryKey: ['posts', data.category] });
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
        },
    });

    return {
        usePosts,
        addPost,
        usePost,
        useComments,
        addComment,
    };
}
