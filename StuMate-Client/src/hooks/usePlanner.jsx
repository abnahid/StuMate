
import useSWR, { mutate } from 'swr';
import useAxiosPublic from './useAxiosPublic';

const fetcher = (url, axios) => axios().get(url).then((res) => res.data);

// Hardcoded user for demonstration purposes. Replace with actual user context.
const userEmail = 'user@example.com';

export function usePlanner() {
    const axiosPublic = useAxiosPublic();
    const endpoint = `/tasks/${userEmail}`;

    const { data: tasks, error, isLoading } = useSWR(endpoint, (url) => fetcher(url, axiosPublic), {
        fallbackData: [] // Start with empty and let SWR fetch real data
    });

    const addTask = async (newTask) => {
        try {
            const taskWithEmail = { ...newTask, email: userEmail };
            const response = await axiosPublic.post('/tasks', taskWithEmail);
            const createdTask = response.data;
            // Re-fetch data after mutation
            mutate(endpoint);
            return createdTask;
        } catch (error) {
            console.error('Failed to add task:', error);
            // Re-fetch data to stay in sync with the server
            mutate(endpoint);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            // Use _id for MongoDB documents
            const taskId = updatedTask._id;
            // Send the whole task object for a PUT request
            await axiosPublic.put(`/tasks/${taskId}`, updatedTask);
            // Re-fetch data after mutation
            mutate(endpoint);
        } catch (error) {
            console.error('Failed to update task:', error);
            // Re-fetch data to stay in sync with the server
            mutate(endpoint);
        }
    };

    const deleteTask = async (id) => {
        try {
            // Use _id for MongoDB documents
            await axiosPublic.delete(`/tasks/${id}`);
            // Re-fetch data after mutation
            mutate(endpoint);
        } catch (error) {
            console.error('Failed to delete task:', error);
            // Re-fetch data to stay in sync with the server
            mutate(endpoint);
        }
    };

    return {
        tasks: tasks || [],
        addTask,
        updateTask,
        deleteTask,
        isLoading,
        error
    };
}
