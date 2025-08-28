
import useSWR, { mutate } from 'swr';
import useAxiosPublic from './useAxiosPublic';

const fetcher = (url, axios) => axios().get(url).then((res) => res.data);

// Hardcoded user for demonstration purposes. Replace with actual user context.
const userEmail = 'user@example.com';

export function useBudget() {
    const axiosPublic = useAxiosPublic();
    const endpoint = `/transactions/${userEmail}`;

    const { data: transactions, error, isLoading } = useSWR(endpoint, (url) => fetcher(url, axiosPublic), {
        fallbackData: [] // Start with empty and let SWR fetch real data
    });

    const addTransaction = async (newTransaction) => {
        try {
            const transactionWithEmail = { ...newTransaction, email: userEmail };
            await axiosPublic.post('/transactions', transactionWithEmail);
            mutate(endpoint);
        } catch (error) {
            console.error('Failed to add transaction:', error);
            mutate(endpoint);
        }
    };

    const updateTransaction = async (updatedTransaction) => {
        try {
            await axiosPublic.put(`/transactions/${updatedTransaction._id}`, updatedTransaction);
            mutate(endpoint);
        } catch (error) {
            console.error('Failed to update transaction:', error);
            mutate(endpoint);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axiosPublic.delete(`/transactions/${id}`);
            mutate(endpoint);
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            mutate(endpoint);
        }
    };

    return {
        transactions: transactions || [],
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isLoading,
        error
    };
}
