import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '../../../../components/ui/chart';

import { useMemo } from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart
} from 'recharts';

export function BudgetChart({ transactions }) {
    const expenseData = useMemo(() => {
        const expenseByCategory = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});

        return Object.entries(expenseByCategory).map(([name, value]) => ({
            subject: name,
            value: value,
        }));
    }, [transactions]);

    if (expenseData.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                <p>No expense data to display.</p>
            </div>
        );
    }

    const chartConfig = {
        value: {
            label: 'Amount',
        },
    };

    return (
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expenseData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <Radar
                    name="Expenses"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ChartContainer>
    );

}

