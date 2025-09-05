

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import notificationSound from '../assets/audio/notification.mp3';
import { useFocus } from '../hooks/useFocus';

const SESSION_DURATIONS = {
    pomodoro: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
};

const FocusContext = createContext(null);

export function useFocusContext() {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error('useFocusContext must be used within a FocusProvider');
    }
    return context;
}

export function FocusProvider({ children }) {
    const { addFocusSession } = useFocus();
    const [sessionType, setSessionType] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(SESSION_DURATIONS.pomodoro);
    const [isActive, setIsActive] = useState(false);
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const audioRef = useRef(null);

    const handleSessionChange = useCallback((type) => {
        setIsActive(false);
        setSessionType(type);
        setTimeLeft(SESSION_DURATIONS[type]);
        localStorage.removeItem('focusTimerState');
    }, []);

    const playNotificationSound = useCallback(() => {
        audioRef.current?.play().catch(e => console.error("Error playing sound:", e));
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
                        addFocusSession.mutate({
                            startTime: new Date(startTime).toISOString(),
                            endTime: new Date(startTime + SESSION_DURATIONS[type] * 1000).toISOString(),
                            duration: Math.round(SESSION_DURATIONS[type] / 60),
                            type: type,
                        });
                        localStorage.removeItem('focusTimerState');
                        handleSessionChange('pomodoro');
                    }
                }
            }
        } catch (error) {
            console.error("Could not parse focus timer state from localStorage", error);
            localStorage.removeItem('focusTimerState');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
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
        } else if (isActive && timeLeft <= 0) {
            setIsActive(false);
            localStorage.removeItem('focusTimerState');

            // audioRef.current?.play().catch(e => console.error("Error playing sound:", e));
            playNotificationSound();

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
    }, [isActive, timeLeft, sessionType, addFocusSession, sessionStartTime, playNotificationSound]);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
        audioRef.current = new Audio(notificationSound);
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
            // Unlock audio for autoplay
            const playPromise = audioRef.current?.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioRef.current?.pause();
                    audioRef.current.currentTime = 0;
                }).catch(error => {
                    console.log("Audio unlock failed, will try again on next interaction.");
                });
            }
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

    const value = {
        sessionType,
        timeLeft,
        isActive,
        handleSessionChange,
        toggleTimer,
        resetTimer,
        playNotificationSound,
    };

    return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
}
