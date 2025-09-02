

import { getWeekOfMonth, startOfMonth } from 'date-fns';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

export function MonthlySpendingChart({ transactions }) {
    const data = useMemo(() => {
        const now = new Date();
        const monthStart = startOfMonth(now);

        const weeklySpending = Array.from({ length: 4 }, (_, i) => ({
            name: `Week ${i + 1}`,
            spending: 0,
        }));

        transactions.forEach(t => {
            if (t.type === 'expense') {
                const transactionDate = new Date(t.date);
                if (transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear()) {
                    const weekOfMonth = getWeekOfMonth(transactionDate, { weekStartsOn: 1 }) - getWeekOfMonth(monthStart, { weekStartsOn: 1 });
                    if (weekOfMonth >= 0 && weekOfMonth < 4) {
                        weeklySpending[weekOfMonth].spending += t.amount;
                    }
                }
            }
        });

        return weeklySpending;
    }, [transactions]);

    if (transactions.filter(t => t.type === 'expense').length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Spending</CardTitle>
                    <CardDescription>Your spending breakdown by week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[250px] w-full items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                        <p>No expense data for this month.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
                <CardDescription>Your spending breakdown by week.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 20,
                                left: -20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                    color: 'hsl(var(--foreground))'
                                }}
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                formatter={(value) => [`$${value.toFixed(2)}`, 'Spending']}
                            />
                            <Bar dataKey="spending" fill="#fecaca" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
