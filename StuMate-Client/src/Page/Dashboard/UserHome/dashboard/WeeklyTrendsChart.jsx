

import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useMemo } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

export function WeeklyTrendsChart({ tasks, focusSessions, practiceSessions }) {
    const data = useMemo(() => {
        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date(),
        });

        return last7Days.map(day => {
            const formattedDay = format(day, 'E'); // Mon, Tue, etc.

            const tasksCompleted = tasks.filter(t =>
                t.status === 'done' && isSameDay(new Date(t.deadline), day)
            ).length;

            const focusMinutes = focusSessions
                .filter(s => s.type === 'pomodoro' && isSameDay(new Date(s.startTime), day))
                .reduce((sum, s) => sum + s.duration, 0);

            const questionsPracticed = practiceSessions
                .filter(s => isSameDay(new Date(s.date), day))
                .reduce((sum, s) => sum + s.numberOfQuestions, 0);

            return {
                name: formattedDay,
                tasks: tasksCompleted,
                focus: focusMinutes,
                questions: questionsPracticed,
            };
        });
    }, [tasks, focusSessions, practiceSessions]);

    return (
        <div>
            <p className='font-semibold text-[17px] mb-[19px]'>Weekly Trends</p>
            <Card className="py-4">
                <CardHeader className="sr-only">
                    <CardTitle>Weekly Trends</CardTitle>
                    <CardDescription>Your activity over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pt-4">
                    <div className="h-[290px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: -10,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 'auto']} width={50} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#e9efff',
                                        border: '1px solid oklch(0.922 0 0)',
                                        borderRadius: '0.625rem',
                                    }}
                                />
                                <Legend wrapperStyle={{ fontSize: "12px" }} />
                                <Line type="monotone" dataKey="tasks" stroke="#10B981" strokeWidth={2} />
                                <Line type="monotone" dataKey="focus" stroke="#8B5CF6" strokeWidth={2} />
                                <Line type="monotone" dataKey="questions" stroke="#3B82F6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
