
import useSWR, { mutate } from 'swr';
import useAxiosPublic from './useAxiosPublic';

const fetcher = (url, axios) => axios().get(url).then((res) => res.data);

// Hardcoded user for demonstration purposes. Replace with actual user context.
const userEmail = 'user@example.com';


export function useSchedule() {
    const axiosPublic = useAxiosPublic();
    const endpoint = `/classes/${userEmail}`;

    const { data: classes, error, isLoading } = useSWR(endpoint, (url) => fetcher(url, axiosPublic), {
        fallbackData: [],
    });

    const addClass = async (newClass) => {
        try {
            const classWithEmail = { ...newClass, email: userEmail };
            const response = await axiosPublic.post('/classes', classWithEmail);
            const createdClass = response.data;
            mutate(endpoint, [...(classes || []), createdClass], false);
            return createdClass;
        } catch (error) {
            console.error('Failed to add class:', error);
            mutate(endpoint);
        }
    };

    const updateClass = async (updatedClass) => {
        try {
            await axiosPublic.put(`/classes/${updatedClass._id}`, updatedClass);
            mutate(endpoint, classes?.map((c) => (c._id === updatedClass._id ? updatedClass : c)), false);
        } catch (error) {
            console.error('Failed to update class:', error);
            mutate(endpoint);
        }
    };

    const deleteClass = async (id) => {
        try {
            await axiosPublic.delete(`/classes/${id}`);
            mutate(endpoint, classes?.filter((c) => c._id !== id), false);
        } catch (error) {
            console.error('Failed to delete class:', error);
            mutate(endpoint);
        }
    };

    return {
        classes: classes || [],
        addClass,
        updateClass,
        deleteClass,
        isLoading,
        error
    };
}
