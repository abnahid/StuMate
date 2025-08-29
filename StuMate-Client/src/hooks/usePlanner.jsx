
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const fetchTasks = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/tasks/${email}`);
    return response.data;
}

const addTaskFn = async (axiosPublic, newTask, email) => {
    const taskWithEmail = { ...newTask, email };
    const response = await axiosPublic.post('/tasks', taskWithEmail);
    return response.data;
}

const updateTaskFn = async (axiosPublic, updatedTask) => {
    const taskId = updatedTask._id;
    const response = await axiosPublic.put(`/tasks/${taskId}`, updatedTask);
    return response.data;
}

const deleteTaskFn = async (axiosPublic, taskId) => {
    const response = await axiosPublic.delete(`/tasks/${taskId}`);
    return response.data;
}


export function usePlanner() {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['tasks', user?.email];

    const { data: tasks, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchTasks(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email
    });

    const addTask = useMutation({
        mutationFn: (newTask) => addTaskFn(axiosPublic, newTask, user.email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    const updateTask = useMutation({
        mutationFn: (updatedTask) => updateTaskFn(axiosPublic, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    const deleteTask = useMutation({
        mutationFn: (taskId) => deleteTaskFn(axiosPublic, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    return {
        tasks: tasks || [],
        addTask,
        updateTask,
        deleteTask,
        isLoading,
        error
    };
}
