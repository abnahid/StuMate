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
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Budget Tracker</h2>
                <Button onClick={handleAdd} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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

            {/* Content Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-5">
                {/* Transaction Table */}
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>A list of your recent income and expenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-[12px] border overflow-x-auto">
                            <Table className="min-w-[480px]">
                                <TableHeader>
                                    <TableRow className="bg-muted/80 hover:bg-muted/80">
                                        <TableHead className="rounded-tl-[12px] p-2 sm:p-3 text-xs sm:text-sm">Description</TableHead>
                                        <TableHead className="p-2 sm:p-3 text-xs sm:text-sm">Category</TableHead>
                                        <TableHead className="p-2 sm:p-3 text-xs sm:text-sm">Date</TableHead>
                                        <TableHead className="text-right p-2 sm:p-3 text-xs sm:text-sm">Amount</TableHead>
                                        <TableHead className="w-[80px] text-right p-2 sm:p-3 rounded-tr-[12px] text-xs sm:text-sm">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentTransactions.length > 0 ? currentTransactions.map((t) => (
                                        <TableRow key={t._id}>
                                            <TableCell className="font-normal p-2 sm:p-3 text-xs sm:text-[14px]">{t.description}</TableCell>
                                            <TableCell className="p-2 sm:p-3 text-xs sm:text-sm">{t.category}</TableCell>
                                            <TableCell className="p-2 sm:p-3 text-xs sm:text-sm">{format(new Date(t.date), 'MMM d, yyyy')}</TableCell>
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
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-xs sm:text-sm">
                                                No transactions yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 sm:pt-4 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-full sm:w-auto"
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="w-full sm:w-auto"
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Expense Chart */}
                <Card className="md:col-span-2 mt-4 md:mt-0">
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