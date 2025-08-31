
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchPracticeSessions = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/practice-sessions/${email}`);
    return response.data;
}

const addPracticeSessionFn = async (axiosPublic, newSession, email) => {
    const sessionWithEmail = { ...newSession, email };
    const response = await axiosPublic.post('/practice-sessions', sessionWithEmail);
    return response.data;
}


export function useExamPrep() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['practice-sessions', user?.email];

    const { data: practiceSessions, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchPracticeSessions(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email
    });

    const addPracticeSession = useMutation({
        mutationFn: (newSession) => addPracticeSessionFn(axiosPublic, newSession, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
            queryClient.invalidateQueries({ queryKey: ['classes', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['transactions', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['tasks', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['focus-sessions', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['journals', user?.email] });
        },
    });

    return {
        practiceSessions: practiceSessions || [],
        addPracticeSession,
        isLoading,
        error
    };
}
