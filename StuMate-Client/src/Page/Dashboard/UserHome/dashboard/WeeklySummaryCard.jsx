import { differenceInCalendarDays, startOfDay, subDays } from 'date-fns';
import { Flame, Target } from 'lucide-react';
import { useMemo } from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { ChartContainer } from '../../../../components/ui/chart';

const WEEKLY_STUDY_GOAL_HOURS = 3;

function calculateStreaks(allDates) {
    if (allDates.length === 0) return { current: 0, longest: 0 };

    const uniqueDays = [...new Set(allDates.map(d => startOfDay(new Date(d)).getTime()))].sort((a, b) => a - b);

    if (uniqueDays.length === 0) return { current: 0, longest: 0 };

    let longestStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < uniqueDays.length; i++) {
        if (i === 0) {
            currentStreak = 1;
        } else {
            const diff = differenceInCalendarDays(new Date(uniqueDays[i]), new Date(uniqueDays[i - 1]));
            if (diff === 1) {
                currentStreak++;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        }
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    const today = startOfDay(new Date());
    const lastDay = startOfDay(new Date(uniqueDays[uniqueDays.length - 1]));
    const diffFromToday = differenceInCalendarDays(today, lastDay);

    if (diffFromToday > 1) {
        currentStreak = 0;
    }

    return { current: currentStreak, longest: longestStreak };
}

export function WeeklySummaryCard({ focusSessions, tasks, transactions, practiceSessions, journals }) {
    const weeklyStudyMinutes = useMemo(() => {
        const oneWeekAgo = subDays(new Date(), 7);
        return focusSessions
            .filter(s => new Date(s.startTime) >= oneWeekAgo && s.type === 'pomodoro')
            .reduce((sum, s) => sum + s.duration, 0);
    }, [focusSessions]);

    const allActivityDates = useMemo(() => {
        return [
            ...focusSessions.map(s => s.startTime),
            ...tasks.map(t => t.deadline),
            ...transactions.map(t => t.date),
            ...practiceSessions.map(s => s.date),
            ...journals.map(j => j.date),
        ].filter(Boolean);
    }, [focusSessions, tasks, transactions, practiceSessions, journals]);

    const streaks = useMemo(() => calculateStreaks(allActivityDates), [allActivityDates]);

    const studyGoalMinutes = WEEKLY_STUDY_GOAL_HOURS * 60;
    const studyPercentage = Math.min(100, Math.round((weeklyStudyMinutes / studyGoalMinutes) * 100));

    // ✅ Fixed chartData — now includes "full"
    const chartData = [
        { full: 100, minutes: studyPercentage },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Weekly Summary</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Keep up the streak!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ChartContainer config={{}} className="mx-auto aspect-square max-h-[130px]">
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={50}
                        outerRadius={80}
                    >

                        <RadialBar
                            dataKey="full"
                            fill="#3B82F6"
                            cornerRadius={10}
                            stackId="a"
                        />

                        <RadialBar
                            dataKey="minutes"
                            fill="#E5E7EB"
                            cornerRadius={10}
                            stackId="a"
                        />

                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-semibold"
                                                >
                                                    {studyPercentage}%
                                                </tspan>

                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            <span className="font-medium">Study Goal</span>
                        </div>
                        <span className="text-muted-foreground font-medium">
                            {(weeklyStudyMinutes / 60).toFixed(1)} / {WEEKLY_STUDY_GOAL_HOURS} hrs
                        </span>
                    </div>

                    <div className="bg-BgDashboard p-4 rounded-lg flex items-center flex-col text-center">
                        <div className="flex items-center gap-2">
                            <Flame className="h-6 w-6 text-orange-500" />
                            <p className="text-[25.5px] font-bold">{streaks.current}</p>
                            <p className="text-[13.6px]text-muted-foreground">days</p>
                        </div>
                        <div className='flex items-center gap-6 mt-2'>
                            <p className="text-xs text-muted-foreground">Current Streak</p>
                            <div className='flex items-center'>

                                <p className="text-xs text-muted-foreground">Longest: {streaks.longest}  days</p>
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
