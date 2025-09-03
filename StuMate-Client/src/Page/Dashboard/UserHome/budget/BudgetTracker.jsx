
import { format } from 'date-fns';
import { ArrowDownCircle, ArrowUpCircle, ChevronLeft, ChevronRight, DollarSign, Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '../../../../components/ui/alert-dialog';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../components/ui/table';
import { useBudget } from '../../../../hooks/useBudget';
import { cn } from '../../../../lib/utils';
import { StatCard } from '../dashboard/StatCard';
import { BudgetChart } from './BudgetChart';
import { TransactionForm } from './TransactionForm';

export function BudgetTracker() {
    const { transactions, deleteTransaction } = useBudget();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleAdd = () => {
        setSelectedTransaction(null);
        setIsFormOpen(true);
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setIsFormOpen(true);
    };

    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Budget Tracker</h2>
                <Button onClick={handleAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Total Income"
                    value={`$${totalIncome.toFixed(2)}`}
                    icon={ArrowUpCircle}
                    color="green"
                />
                <StatCard
                    title="Total Expenses"
                    value={`$${totalExpenses.toFixed(2)}`}
                    icon={ArrowDownCircle}
                    color="red"
                />
                <StatCard
                    title="Balance"
                    value={`$${balance.toFixed(2)}`}
                    icon={DollarSign}
                    color="blue"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-5">
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>A list of your recent income and expenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-[16px] border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/80 hover:bg-muted/80">
                                        <TableHead className="rounded-tl-[16px] p-3">Description</TableHead>
                                        <TableHead className="p-3">Category</TableHead>
                                        <TableHead className="p-3">Date</TableHead>
                                        <TableHead className="text-right p-3">Amount</TableHead>
                                        <TableHead className="w-[80px] text-right p-3 rounded-tr-[16px] ">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentTransactions.length > 0 ? currentTransactions.map((t) => (
                                        <TableRow key={t._id}>
                                            <TableCell className="font-normal p-3 text-[14px]">{t.description}</TableCell>
                                            <TableCell className="p-3">{t.category}</TableCell>
                                            <TableCell className="p-3">{format(new Date(t.date), 'MMM d, yyyy')}</TableCell>
                                            <TableCell
                                                className={cn(
                                                    'text-right font-semibold',
                                                    t.type === 'income' ? 'text-green-500' : 'text-red-500'
                                                )}
                                            >
                                                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEdit(t)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete this transaction.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <div className="flex justify-end space-x-2">
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteTransaction.mutate(t._id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </div>

                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                No transactions yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                        <CardDescription>A chart showing your expenses by category.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BudgetChart transactions={transactions} />
                    </CardContent>
                </Card>
            </div>

            <TransactionForm
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                transaction={selectedTransaction}
            />
        </div>
    );
}
