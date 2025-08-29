
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

// Hardcoded user for demonstration purposes. Replace with actual user context.
const userEmail = 'user@example.com';

const fetchTransactions = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/transactions/${email}`);
    return response.data;
}

const addTransactionFn = async (axiosPublic, newTransaction) => {
    const transactionWithEmail = { ...newTransaction, email: userEmail };
    const response = await axiosPublic.post('/transactions', transactionWithEmail);
    return response.data;
}

const updateTransactionFn = async (axiosPublic, updatedTransaction) => {
    const response = await axiosPublic.put(`/transactions/${updatedTransaction._id}`, updatedTransaction);
    return response.data;
}

const deleteTransactionFn = async (axiosPublic, transactionId) => {
    const response = await axiosPublic.delete(`/transactions/${transactionId}`);
    return response.data;
}


export function useBudget() {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const endpoint = ['transactions', userEmail];

    const { data: transactions, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchTransactions(axiosPublic, userEmail),
        initialData: []
    });

    const addTransaction = useMutation({
        mutationFn: (newTransaction) => addTransactionFn(axiosPublic, newTransaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    const updateTransaction = useMutation({
        mutationFn: (updatedTransaction) => updateTransactionFn(axiosPublic, updatedTransaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    const deleteTransaction = useMutation({
        mutationFn: (transactionId) => deleteTransactionFn(axiosPublic, transactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: endpoint });
        }
    });

    return {
        transactions: transactions || [],
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isLoading,
        error
    };
}
