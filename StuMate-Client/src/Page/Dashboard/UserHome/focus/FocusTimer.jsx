


import { isToday } from 'date-fns';
import { Award, Clock, Pause, Play, RotateCcw, Target, Volume2 } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { useFocusContext } from '../../../../context/FocusProvider';
import { useFocus } from '../../../../hooks/useFocus';
import { StatCard } from '../dashboard/StatCard';

const SESSION_DURATIONS = {
    pomodoro: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

export function FocusTimer() {
    const { sessions } = useFocus();
    const {
        sessionType,
        timeLeft,
        isActive,
        handleSessionChange,
        toggleTimer,
        resetTimer,
        playNotificationSound
    } = useFocusContext();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (SESSION_DURATIONS[sessionType] - timeLeft) / SESSION_DURATIONS[sessionType] * 100;

    const focusStats = useMemo(() => {
        const todaySessions = sessions.filter(s => s.startTime && isToday(new Date(s.startTime)));
        const totalFocusTime = todaySessions.filter(s => s.type === 'pomodoro').reduce((sum, s) => sum + s.duration, 0);
        const sessionsCompleted = todaySessions.filter(s => s.type === 'pomodoro').length;
        const longestStreak = sessions.reduce((max, s, i, arr) => {
            if (s.type === 'pomodoro') {
                let currentStreak = 1;
                // This is a simplified streak calculation, a more robust one would analyze dates
                for (let j = i - 1; j >= 0; j--) {
                    if (arr[j].type === 'pomodoro') currentStreak++;
                    else break;
                }
                return Math.max(max, currentStreak);
            }
            return max;
        }, 0);

        return { totalFocusTime, sessionsCompleted, longestStreak };
    }, [sessions]);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Focus Mode</CardTitle>
                    <CardDescription>Use the Pomodoro Technique to boost your productivity.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-8 p-8">
                    <Tabs
                        value={sessionType}
                        onValueChange={handleSessionChange}
                        className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
                            <TabsTrigger value="short-break">Short Break</TabsTrigger>
                            <TabsTrigger value="long-break">Long Break</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="relative h-64 w-64">
                        <Progress value={progress} className="absolute h-full w-full rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-bold text-foreground">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={toggleTimer} size="lg" className="w-32">
                            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                            {isActive ? 'Pause' : 'Start'}
                        </Button>
                        <Button onClick={resetTimer} variant="outline" size="icon">
                            <RotateCcw />
                        </Button>
                        <Button onClick={playNotificationSound} variant="outline" size="icon">
                            <Volume2 />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Focus Analytics</CardTitle>
                        <CardDescription>Your focus stats for today.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <StatCard
                            title="Total Focus Time"
                            value={`${focusStats.totalFocusTime} min`}
                            icon={Clock}
                            description="Pomodoro sessions today."
                        />
                        <StatCard
                            title="Sessions Completed"
                            value={focusStats.sessionsCompleted.toString()}
                            icon={Target}
                            description="Number of Pomodoros."
                        />
                        <StatCard
                            title="Longest Streak"
                            value={focusStats.longestStreak.toString()}
                            icon={Award}
                            description="Consecutive Pomodoros."
                        />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
