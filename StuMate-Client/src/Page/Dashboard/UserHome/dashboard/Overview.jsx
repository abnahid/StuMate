
import { IconCurrencyDollar } from '@tabler/icons-react';
import { format, isThisWeek, isToday, parseISO } from 'date-fns';
import { BookMarked, BookOpenCheck, Calendar, ClipboardCheck, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Skeleton } from '../../../../components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { useBudget } from '../../../../hooks/useBudget';
import { useExamPrep } from '../../../../hooks/useExamPrep';
import { useFocus } from '../../../../hooks/useFocus';
import { useJournal } from '../../../../hooks/useJournal';
import { usePlanner } from '../../../../hooks/usePlanner';
import { useSchedule } from '../../../../hooks/useSchedule';
import { cn } from '../../../../lib/utils';
import { ExpensesChart } from './ExpensesChart';
import { MonthlySpendingChart } from './MonthlySpendingChart';
import { MotivationalCard } from './MotivationalCard';
import { RecentJournalEntries } from './RecentJournalEntries';
import { StatCard } from './StatCard';
import { StudyHoursChart } from './StudyHoursChart';
import { WeeklySummaryCard } from './WeeklySummaryCard';
import { WeeklyTrendsChart } from './WeeklyTrendsChart';


const priorityVariant = {
    low: 'bg-gray-200 text-gray-500',
    medium: 'bg-[#dff1fd] text-cyan-600',
    high: 'bg-[#ffe2e4] text-red-600',
};

function StatCardLoading() {
    return (
        <div className="p-4 bg-card rounded-lg flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-16" />
            </div>
        </div>
    )
}

export function Overview() {
    const { classes } = useSchedule();
    const { transactions } = useBudget();
    const { tasks } = usePlanner();
    const { sessions: focusSessions } = useFocus();
    const { practiceSessions } = useExamPrep();
    const { journals } = useJournal();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const classesThisWeek = classes.filter(c => c.date && isThisWeek(parseISO(c.date), { weekStartsOn: 1 })).length;

    const moneySpentThisWeek = transactions
        .filter(
            (t) =>
                t.date && isThisWeek(parseISO(t.date), { weekStartsOn: 1 }) && t.type === 'expense'
        )
        .reduce((sum, t) => sum + t.amount, 0);



    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    // const recentJournals = [...journals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

    const journalEntriesThisWeek = journals.filter(
        (j) => j.date && isThisWeek(parseISO(j.date), { weekStartsOn: 1 })
    ).length;

    const tasksCompletedThisWeek = tasks.filter(
        (t) => t.status === 'done' && t.deadline && isThisWeek(parseISO(t.deadline), { weekStartsOn: 1 })
    ).length;

    const focusTimeToday = focusSessions
        .filter(s => s.type === 'pomodoro' && isToday(new Date(s.startTime)))
        .reduce((sum, s) => sum + s.duration, 0);

    const questionsPracticedThisWeek = practiceSessions
        .filter(s => s.date && isThisWeek(parseISO(s.date), { weekStartsOn: 1 }))
        .reduce((sum, s) => sum + s.numberOfQuestions, 0);

    const upcomingTasks = tasks
        .filter(t => t.status !== 'done')
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);

    if (!mounted) {
        return (
            <div className="space-y-6 mt-5">
                <h2 className="text-xl font-semibold tracking-tight">Weekly Summary</h2>
                <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(6)].map((_, i) => <StatCardLoading key={i} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Your most urgent tasks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Your latest spending and income.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Journal Entries</CardTitle>
                            <CardDescription>Your latest reflections.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Weekly Summary</h2>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
                <div className="lg:col-span-9">
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            title="Classes This Week"
                            value={classesThisWeek.toString()}
                            icon={Calendar}
                            color="amber"
                        />
                        <StatCard
                            title="Money Spent"
                            value={`$${moneySpentThisWeek.toFixed(2)}`}
                            icon={IconCurrencyDollar}
                            color="red"
                        />
                        <StatCard
                            title="Tasks Completed"
                            value={tasksCompletedThisWeek.toString()}
                            icon={ClipboardCheck}
                            color="green"
                        />
                        <StatCard
                            title="Focus Time Today"
                            value={`${focusTimeToday} min`}
                            icon={Timer}
                            color="blue"
                        />
                        <StatCard
                            title="Practice Questions"
                            value={questionsPracticedThisWeek.toString()}
                            icon={BookOpenCheck}
                            color="purple"
                        />
                        <StatCard
                            title="Journal Entries"
                            value={journalEntriesThisWeek.toString()}
                            icon={BookMarked}
                            color="sky"
                        />
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <MotivationalCard />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-3">
                    <WeeklySummaryCard
                        focusSessions={focusSessions}
                        tasks={tasks}
                        transactions={transactions}
                        practiceSessions={practiceSessions}
                        journals={journals}
                    />
                </div>
                <div className="lg:col-span-9">
                    <StudyHoursChart sessions={focusSessions} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-4">
                    <CardHeader className="px-0 gap-0">
                        <CardTitle className="text-xl font-semibold leading-relaxed">Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="rounded-[16px] border">
                            <Table className="rounded-t-[16px]">
                                <TableHeader >
                                    <TableRow className="bg-[#ECF3FF] hover:bg-[#ECF3FF]/80 ">
                                        <TableHead className="rounded-tl-[16px] p-3">Task</TableHead>
                                        <TableHead className="p-3">Priority</TableHead>
                                        <TableHead className="rounded-tr-[16px] p-3">Due Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcomingTasks.length > 0 ? upcomingTasks.map(task => (
                                        <TableRow key={task._id}>
                                            <TableCell className="font-normal p-3 text-[14px]">{task.title}</TableCell>
                                            <TableCell className="p-3 ">
                                                <Badge className={cn("px-4 py-1.5 text-[14px]", priorityVariant[task.priority])}>
                                                    {task.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-3 text-[14px]">
                                                {task.deadline ? format(new Date(task.deadline), 'MMM d, yyyy') : 'N/A'}
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">No upcoming tasks.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="p-4">
                    <CardHeader className="px-0 gap-0">
                        <CardTitle className="text-xl font-semibold leading-relaxed">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="rounded-[16px] border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-[#ECF3FF] hover:bg-[#ECF3FF]/80">
                                        <TableHead className="rounded-tl-[16px] p-3">Description</TableHead>
                                        <TableHead className="text-right rounded-tr-[16px] p-3">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.length > 0 ? recentTransactions.map(t => (
                                        <TableRow key={t._id}>
                                            <TableCell className="p-3">
                                                <div className="font-medium">{t.description}</div>
                                                <div className="text-[10px] text-muted-foreground">{t.category}</div>
                                            </TableCell>
                                            <TableCell className={cn("text-right text-[14px] font-semibold p-3", t.type === 'income' ? 'text-green-500' : 'text-red-500')}>
                                                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center h-24 text-muted-foreground">No recent transactions.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeeklyTrendsChart
                    tasks={tasks}
                    focusSessions={focusSessions}
                    practiceSessions={practiceSessions}
                />
                <ExpensesChart transactions={transactions} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentJournalEntries journals={journals} />
                <MonthlySpendingChart transactions={transactions} />
            </div>
        </div>
    );
}


