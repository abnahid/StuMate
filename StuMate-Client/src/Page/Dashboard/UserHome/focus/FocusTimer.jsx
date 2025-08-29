

import { isToday } from 'date-fns';
import { Award, Clock, Pause, Play, RotateCcw, Target } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { useFocus } from '../../../../hooks/useFocus';
import { StatCard } from '../dashboard/StatCard';

const SESSION_DURATIONS = {
    pomodoro: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

export function FocusTimer() {
    const { addFocusSession, sessions } = useFocus();
    const [sessionType, setSessionType] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(SESSION_DURATIONS.pomodoro);
    const [isActive, setIsActive] = useState(false);
    const [sessionStartTime, setSessionStartTime] = useState(null);

    const handleSessionChange = useCallback((type) => {
        setIsActive(false);
        setSessionType(type);
        setTimeLeft(SESSION_DURATIONS[type]);
        localStorage.setItem('focusTimerState', JSON.stringify({ type: type, active: false }));
    }, []);

    // Load state from localStorage on initial render
    useEffect(() => {
        try {
            const savedState = localStorage.getItem('focusTimerState');
            if (savedState) {
                const { type, startTime, active, lastSeen } = JSON.parse(savedState);

                if (active && startTime && lastSeen) {
                    const elapsed = Math.floor((Date.now() - lastSeen) / 1000);
                    const timeSinceStart = Math.floor((lastSeen - startTime) / 1000);
                    const remaining = SESSION_DURATIONS[type] - timeSinceStart - elapsed;

                    if (remaining > 0) {
                        setSessionType(type);
                        setTimeLeft(remaining);
                        setIsActive(true);
                        setSessionStartTime(new Date(startTime));
                    } else {
                        // Timer finished while user was away
                        addFocusSession.mutate({
                            startTime: new Date(startTime).toISOString(),
                            endTime: new Date(startTime + SESSION_DURATIONS[type] * 1000).toISOString(),
                            duration: Math.round(SESSION_DURATIONS[type] / 60),
                            type: type,
                        });
                        localStorage.removeItem('focusTimerState');
                        handleSessionChange('pomodoro'); // Reset to default
                    }
                } else {
                    handleSessionChange(type || 'pomodoro');
                }
            }
        } catch (error) {
            console.error("Could not parse focus timer state from localStorage", error);
            localStorage.removeItem('focusTimerState');
        }
    }, [addFocusSession, handleSessionChange]);


    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    // Save state on each tick
                    if (sessionStartTime) {
                        localStorage.setItem('focusTimerState', JSON.stringify({
                            type: sessionType,
                            startTime: sessionStartTime.getTime(),
                            active: true,
                            lastSeen: Date.now()
                        }));
                    }
                    return newTime;
                });
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            setIsActive(false);
            localStorage.removeItem('focusTimerState');

            // Play sound on completion
            new Audio('/audio/notification.mp3').play();

            if (sessionStartTime) {
                addFocusSession.mutate({
                    startTime: sessionStartTime.toISOString(),
                    endTime: new Date().toISOString(),
                    duration: Math.round(SESSION_DURATIONS[sessionType] / 60),
                    type: sessionType,
                });
            }
            if (Notification.permission === 'granted') {
                new Notification('Session Over!', {
                    body: `Your ${sessionType.replace('-', ' ')} session has ended.`,
                });
            }
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, sessionType, addFocusSession, sessionStartTime]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const toggleTimer = () => {
        if (!isActive) {
            const startTime = new Date();
            setSessionStartTime(startTime);
            setIsActive(true);
            localStorage.setItem('focusTimerState', JSON.stringify({
                type: sessionType,
                startTime: startTime.getTime(),
                active: true,
                lastSeen: Date.now()
            }));
        } else {
            setIsActive(false);
            localStorage.setItem('focusTimerState', JSON.stringify({
                type: sessionType,
                startTime: sessionStartTime?.getTime(),
                active: false,
                lastSeen: Date.now()
            }));
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(SESSION_DURATIONS[sessionType]);
        setSessionStartTime(null);
        localStorage.removeItem('focusTimerState');
    };

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
                    <Tabs value={sessionType} onValueChange={handleSessionChange} className="w-[400px]">
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
