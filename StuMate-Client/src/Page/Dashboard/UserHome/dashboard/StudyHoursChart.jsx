
import { eachDayOfInterval, format, isSameDay, startOfWeek } from 'date-fns';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';


export function StudyHoursChart({ sessions }) {
    const data = useMemo(() => {
        const weekStart = startOfWeek(new Date(), { weekStartsOn: 6 }); // Monday
        const weekDays = eachDayOfInterval({ start: weekStart, end: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000) });

        const dailyData = weekDays.map(day => ({
            name: format(day, 'E'), // Mon, Tue, etc.
            hours: 0,
        }));

        sessions.forEach(session => {
            const sessionDate = new Date(session.startTime);
            const matchingDay = dailyData.find(d => isSameDay(new Date(weekDays[dailyData.indexOf(d)]), sessionDate));
            if (matchingDay && session.type === 'pomodoro') {
                matchingDay.hours += session.duration / 60; // Convert minutes to hours
            }
        });

        return dailyData;
    }, [sessions]);

    return (
        <div>
            <p className='font-semibold text-[17px] mb-[19px]'>Study Hours This Week</p>
            <Card className="h-full p-4">
                <CardHeader className="sr-only">
                    <CardTitle>Study Hours This Week</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pt-4">
                    <div className="aspect-auto h-[318px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart

                                data={data}
                                barGap={100}
                                baseValue={2}
                                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}

                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}
                                />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'auto']} width={24} />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{
                                        backgroundColor: '#e9efff',
                                        border: '1px solid oklch(0.922 0 0)',
                                        borderRadius: '0.625rem',
                                    }}
                                    labelStyle={{ color: 'oklch(0.145 0 0)' }}
                                    itemStyle={{ color: '#3b82f6' }}
                                    formatter={(value) => [`${value.toFixed(1)} hrs`, 'Study Time']}
                                />
                                <Bar dataKey="hours" fill="#4F46E5" radius={[16, 16, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
