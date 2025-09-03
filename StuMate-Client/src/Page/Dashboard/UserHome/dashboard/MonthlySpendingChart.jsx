

import { getWeekOfMonth, startOfMonth } from 'date-fns';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
        <div>
            <p className='font-semibold text-[17px] mb-[19px]'>Monthly Spending</p>
            <Card className="h-auto p-4 ">
                <CardHeader className="sr-only">
                    <CardTitle>Monthly Spending</CardTitle>
                    <CardDescription>Your spending breakdown by week.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[335px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                barGap={8}
                                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'auto']} width={30} />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{
                                        backgroundColor: '#FFE2E4',
                                        border: '1px solid oklch(0.922 0 0)',
                                        borderRadius: '0.625rem',
                                    }}
                                    labelStyle={{ color: 'oklch(0.145 0 0)' }}
                                    itemStyle={{ color: '#3b82f6' }}
                                    formatter={(value) => [`$${value.toFixed(2)}`, 'Spending']}
                                />
                                <Bar dataKey="spending" fill="#fecaca" radius={[16, 16, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>


        </div>
    );
}
