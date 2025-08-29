

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const fetchJournals = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/journals/${email}`);
    return response.data;
}

const addJournalFn = async (axiosPublic, newJournal, email) => {
    const journalWithEmail = { ...newJournal, email };
    const response = await axiosPublic.post('/journals', journalWithEmail);
    return response.data;
}

export function useJournal() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['journals', user?.email];

    const { data: journals, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchJournals(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email,
    });

    const addJournal = useMutation({
        mutationFn: (newJournal) => addJournalFn(axiosPublic, newJournal, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        },
    });

    return {
        journals: journals || [],
        addJournal,
        isLoading,
        error
    };
}
