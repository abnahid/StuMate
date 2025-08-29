
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const fetchTransactions = async (axiosPublic, email) => {
    const response = await axiosPublic.get(`/transactions/${email}`);
    return response.data;
}

const addTransactionFn = async (axiosPublic, newTransaction, email) => {
    const transactionWithEmail = { ...newTransaction, email };
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
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const endpoint = ['transactions', user?.email];

    const { data: transactions, error, isLoading } = useQuery({
        queryKey: endpoint,
        queryFn: () => fetchTransactions(axiosPublic, user.email),
        initialData: [],
        enabled: !!user?.email
    });

    const addTransaction = useMutation({
        mutationFn: (newTransaction) => addTransactionFn(axiosPublic, newTransaction, user.email),
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
