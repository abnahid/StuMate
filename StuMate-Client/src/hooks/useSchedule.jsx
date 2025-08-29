
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const fetchClasses = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/classes/${email}`);
    return response.data;
};

const addClassFn = async (axiosPublic, newClass, email) => {
    const classWithEmail = { ...newClass, email };
    const response = await axiosPublic.post('/classes', classWithEmail);
    return response.data;
};

const updateClassFn = async (axiosPublic, updatedClass) => {
    const response = await axiosPublic.put(`/classes/${updatedClass._id}`, updatedClass);
    return response.data;
};

const deleteClassFn = async (axiosPublic, classId) => {
    const response = await axiosPublic.delete(`/classes/${classId}`);
    return response.data;
};


export function useSchedule() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['classes', user?.email];

    const { data: classes, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchClasses(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email,
    });

    const addClass = useMutation({
        mutationFn: (newClass) => addClassFn(axiosPublic, newClass, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        },
    });

    const updateClass = useMutation({
        mutationFn: (updatedClass) => updateClassFn(axiosPublic, updatedClass),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        },
    });

    const deleteClass = useMutation({
        mutationFn: (classId) => deleteClassFn(axiosPublic, classId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        },
    });

    return {
        classes: classes || [],
        addClass,
        updateClass,
        deleteClass,
        isLoading,
        error
    };
}
