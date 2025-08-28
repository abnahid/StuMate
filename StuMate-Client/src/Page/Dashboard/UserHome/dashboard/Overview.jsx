
import { format, isThisWeek, isToday, parseISO } from 'date-fns';
import { BookOpenCheck, Calendar, ClipboardCheck, Timer, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBudget } from '../../../../hooks/use-budget';
import { useExamPrep } from '../../../../hooks/use-exam-prep';
import { useFocus } from '../../../../hooks/use-focus';
import { usePlanner } from '../../../../hooks/use-planner';
import { useSchedule } from '../../../../hooks/use-schedule';
import { cn } from '../../../../lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { StatCard } from './stat-card';

const priorityVariant = {
    low: 'secondary',
    medium: 'default',
    high: 'destructive'
}

function StatCardLoading() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-7 w-1/3" />
                <Skeleton className="h-3 w-1/2 mt-1" />
            </CardContent>
        </Card>
    )
}

export function Overview() {
    const { classes } = useSchedule();
    const { transactions } = useBudget();
    const { tasks } = usePlanner();
    const { sessions: focusSessions } = useFocus();
    const { practiceSessions } = useExamPrep();

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

    const upcomingTasks = tasks.filter(
        (t) => t.status !== 'done'
    ).sort((a, b) => (a.deadline && b.deadline) ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime() : 0)
        .slice(0, 5);

    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    const tasksCompletedThisWeek = tasks.filter(
        (t) => t.status === 'done' && t.deadline && isThisWeek(parseISO(t.deadline), { weekStartsOn: 1 })
    ).length;

    const focusTimeToday = focusSessions
        .filter(s => s.type === 'pomodoro' && isToday(new Date(s.startTime)))
        .reduce((sum, s) => sum + s.duration, 0);

    const questionsPracticedThisWeek = practiceSessions
        .filter(s => s.date && isThisWeek(parseISO(s.date), { weekStartsOn: 1 }))
        .reduce((sum, s) => sum + s.numberOfQuestions, 0);


    if (!mounted) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Weekly Summary</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {[...Array(5)].map((_, i) => <StatCardLoading key={i} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Your most urgent tasks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>Your latest spending and income.</CardDescription>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard
                    title="Classes This Week"
                    value={classesThisWeek.toString()}
                    icon={Calendar}
                    description="Total classes scheduled."
                />
                <StatCard
                    title="Money Spent"
                    value={`$${moneySpentThisWeek.toFixed(2)}`}
                    icon={Wallet}
                    description="Expenses this week."
                />
                <StatCard
                    title="Tasks Completed"
                    value={tasksCompletedThisWeek.toString()}
                    icon={ClipboardCheck}
                    description="Tasks completed this week."
                />
                <StatCard
                    title="Focus Time Today"
                    value={`${focusTimeToday} min`}
                    icon={Timer}
                    description="Pomodoro sessions."
                />
                <StatCard
                    title="Practice Questions"
                    value={questionsPracticedThisWeek.toString()}
                    icon={BookOpenCheck}
                    description="Generated in Exam Prep."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Your most urgent tasks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Due Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {upcomingTasks.length > 0 ? upcomingTasks.map(task => (
                                    <TableRow key={task._id}>
                                        <TableCell className="font-medium">{task.title}</TableCell>
                                        <TableCell>
                                            <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                                        </TableCell>
                                        <TableCell>{task.deadline ? format(new Date(task.deadline), "MMM d, yyyy") : 'No deadline'}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">No upcoming tasks.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Your latest spending and income.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTransactions.length > 0 ? recentTransactions.map(t => (
                                    <TableRow key={t._id}>
                                        <TableCell>
                                            <div className="font-medium">{t.description}</div>
                                            <div className="text-sm text-muted-foreground">{t.category}</div>
                                        </TableCell>
                                        <TableCell className={cn("text-right font-semibold", t.type === 'income' ? 'text-green-500' : 'text-red-500')}>
                                            {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center text-muted-foreground">No recent transactions.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
