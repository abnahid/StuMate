
import { initialTransactions } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './use-local-storage';

export function useBudget() {
    const [transactions, setTransactions] = useLocalStorage('transactions', initialTransactions);

    const addTransaction = (newTransaction) => {
        setTransactions([...transactions, { ...newTransaction, id: uuidv4() }]);
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions(
            transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
        );
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    return { transactions, addTransaction, updateTransaction, deleteTransaction };
}
