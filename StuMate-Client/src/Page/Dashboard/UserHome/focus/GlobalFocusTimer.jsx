
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, Timer, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { useFocusContext } from '../../../../context/FocusProvider';

export function GlobalFocusTimer() {
    const { isActive, timeLeft, toggleTimer, resetTimer, sessionType } = useFocusContext();
    const location = useLocation();

    const pathname = location.pathname;

    const isVisible = isActive && pathname !== '/dashboard/focus';




    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const sessionTypeLabel = sessionType.replace('-', ' ');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <Card className="w-64 shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Timer className="h-5 w-5 text-primary" />
                                <span className="capitalize">{sessionTypeLabel}</span>
                            </CardTitle>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={resetTimer}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <Link to="/dashboard/focus">
                                    <p className="text-4xl font-bold font-mono tracking-tighter">
                                        {formatTime(timeLeft)}
                                    </p>
                                </Link>
                                <Button size="icon" onClick={toggleTimer} className="h-12 w-12 rounded-full">
                                    {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
