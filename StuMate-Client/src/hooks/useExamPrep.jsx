
import useSWR, { mutate } from 'swr';
import useAxiosPublic from './useAxiosPublic';

const fetcher = (url, axios) => axios().get(url).then((res) => res.data);

// Hardcoded user for demonstration purposes. Replace with actual user context.
const userEmail = 'user@example.com';

export function useExamPrep() {
    const axiosPublic = useAxiosPublic();
    const endpoint = `/practice-sessions/${userEmail}`;

    const { data: practiceSessions, error, isLoading } = useSWR(endpoint, (url) => fetcher(url, axiosPublic), {
        fallbackData: []
    });

    const addPracticeSession = async (newSession) => {
        try {
            const sessionWithEmail = { ...newSession, email: userEmail };
            const response = await axiosPublic.post('/practice-sessions', sessionWithEmail);
            const createdSession = response.data;
            mutate(endpoint, [...(practiceSessions || []), createdSession], false);
            return createdSession;
        } catch (error) {
            console.error('Failed to add practice session:', error);
            mutate(endpoint);
        }
    };

    return {
        practiceSessions: practiceSessions || [],
        addPracticeSession,
        isLoading,
        error
    };
}
