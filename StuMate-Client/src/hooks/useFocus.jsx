
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const fetchSessions = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/focus-sessions/${email}`);
    return response.data;
}

const addSessionFn = async (axiosPublic, newSession, email) => {
    const sessionWithEmail = { ...newSession, email };
    const response = await axiosPublic.post('/focus-sessions', sessionWithEmail);
    return response.data;
}

export function useFocus() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['focus-sessions', user?.email];

    const { data: sessions, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchSessions(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email,
    });

    const addFocusSession = useMutation({
        mutationFn: (newSession) => addSessionFn(axiosPublic, newSession, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        },
    });

    return {
        sessions: sessions || [],
        addFocusSession,
        isLoading,
        error
    };
}
