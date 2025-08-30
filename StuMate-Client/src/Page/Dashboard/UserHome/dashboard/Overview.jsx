
import { format, isThisWeek, isToday, parseISO } from 'date-fns';
import { BookMarked, BookOpenCheck, Calendar, ClipboardCheck, Timer, Wallet } from 'lucide-react';
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
import { MOOD_CONFIG } from '../../../../lib/constants';
import { cn } from '../../../../lib/utils';
import { StatCard } from './StatCard';

const priorityVariant = {
    low: 'secondary',
    medium: 'default',
    high: 'destructive'
}

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

    const upcomingTasks = tasks.filter(
        (t) => t.status !== 'done'
    ).sort((a, b) => (a.deadline && b.deadline) ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime() : 0)
        .slice(0, 5);

    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    const recentJournals = [...journals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

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


    if (!mounted) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Weekly Summary</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Classes This Week"
                    value={classesThisWeek.toString()}
                    icon={Calendar}
                    color="amber"
                />
                <StatCard
                    title="Money Spent"
                    value={`$${moneySpentThisWeek.toFixed(2)}`}
                    icon={Wallet}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Your most urgent tasks.</CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[160px] flex flex-col justify-center">
                        <div className="w-full min-w-[320px]">
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
                                            <TableCell className="py-3.5">
                                                <Badge variant={priorityVariant[task.priority]} >{task.priority}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {task.deadline
                                                    ? format(new Date(task.deadline), "MMM d, yyyy")
                                                    : 'No deadline'}
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground py-10">
                                                No upcoming tasks.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1">
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
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Journal Entries</CardTitle>
                        <CardDescription>Your latest reflections.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentJournals.length > 0 ? recentJournals.map(journal => {
                            const moodConfig = MOOD_CONFIG[journal.mood] || MOOD_CONFIG.unknown;
                            const MoodIcon = moodConfig.icon;
                            return (
                                <div key={journal._id} className="flex items-start gap-4">
                                    <MoodIcon className={cn("h-5 w-5 mt-1", moodConfig.color)} />
                                    <div className="flex-1">
                                        <p className="font-semibold">{journal.subjectStudied}</p>
                                        <p className="text-sm text-muted-foreground truncate">{journal.notes}</p>
                                        <p className="text-xs text-muted-foreground">{format(new Date(journal.date), 'MMM d, yyyy')}</p>
                                    </div>
                                </div>
                            )
                        }) : (
                            <p className="text-center text-muted-foreground">No recent journal entries.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


