

import { useMemo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

const COLORS = [
    '#488AF7',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
];

export function ExpensesChart({ transactions }) {
    const expenseData = useMemo(() => {
        const expenseByCategory = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});

        return Object.entries(expenseByCategory).map(([name, value]) => ({
            name,
            value,
        }));
    }, [transactions]);

    if (expenseData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Expenses by Category</CardTitle>
                    <CardDescription>Your spending breakdown.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[300px] w-full items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                        <p>No expense data to display.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <p className='font-semibold text-[17px] mb-[19px]'>Expenses by Categoryk</p>
            <Card className="h-auto py-[19px]">
                <CardHeader className="sr-only">
                    <CardTitle>Expenses by Category</CardTitle>
                    <CardDescription>Your spending breakdown.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#e9efff',
                                        border: '1px solid oklch(0.922 0 0)',
                                        borderRadius: '0.625rem',
                                    }}
                                    formatter={(value) => `$${value.toFixed(2)}`}
                                />
                                <Pie
                                    data={expenseData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend wrapperStyle={{ fontSize: "12px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
