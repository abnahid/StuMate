
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const fetchProfile = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/users/${email}`);
    return response.data;
}

const updateProfileFn = async (axiosPublic, updatedProfile, email) => {
    const response = await axiosPublic.put(`/users/${email}`, updatedProfile);
    return response.data;
}

export function useProfile() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['profile', user?.email];

    const { data: profile, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchProfile(axiosPublic, user.email),
        enabled: !!user?.email,
    });

    const updateProfile = useMutation({
        mutationFn: (newProfileData) => updateProfileFn(axiosPublic, newProfileData, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
            queryClient.invalidateQueries({ queryKey: ['classes', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['transactions', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['tasks', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['focus-sessions', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['journals', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['practice-sessions', user?.email] });
        },
    });

    return {
        profile,
        updateProfile,
        isLoading,
        error
    };
}
