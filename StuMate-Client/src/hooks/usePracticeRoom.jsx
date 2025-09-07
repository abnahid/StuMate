
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useToast } from './useToast';

const fetchRoomByCode = async (axiosPublic, roomCode) => {
    if (!roomCode) return null;
    const response = await axiosPublic.get(`/practice-room/${roomCode}`);
    console.log('API Response:', response.data); // <-- check here
    return response.data;
}


const createRoomFn = async (axiosPublic, roomData, user) => {
    const response = await axiosPublic.post('/practice-room', {
        ...roomData,
        hostEmail: user.email,
        hostName: user.displayName,
        hostPhotoURL: user.photoURL,
    });
    return response.data;
}

export function usePracticeRoom() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const useRoomByCode = (roomCode) => {
        return useQuery({
            queryKey: ['practice-room', roomCode],
            queryFn: async () => {
                const data = await fetchRoomByCode(axiosPublic, roomCode);
                console.log('Fetched room data:', data);
                return data;
            },
            enabled: !!roomCode,
            retry: (failureCount, error) => {
                if (error.response?.status === 404) {
                    return false;
                }
                return failureCount < 2;
            }
        });
    };

    const createRoom = useMutation({
        mutationFn: (roomData) => createRoomFn(axiosPublic, roomData, user),
        onSuccess: (data) => {
            queryClient.setQueryData(['practice-room', data.code], data);
            toast({
                title: 'Room Created!',
                description: 'Your practice room is ready to be shared.'
            });
        },
        // eslint-disable-next-line no-unused-vars
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to create a room. Please try again.'
            });
        }
    });

    return {
        useRoomByCode,
        createRoom
    };
}
