import {
    differenceInDays,
    formatDistanceToNowStrict,
    isFuture,
    isToday,
    parseISO,
} from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Calendar, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { useSchedule } from '../../../hooks/useSchedule';

export function NotificationBell() {
    const { classes } = useSchedule();
    const [isOpen, setIsOpen] = useState(false);

    const upcomingEvents = useMemo(() => {
        const now = new Date();
        return classes
            .map((event) => {
                const eventDate = parseISO(event.date);
                if (!isFuture(eventDate) && !isToday(eventDate)) {
                    return null;
                }

                const daysUntil = differenceInDays(eventDate, now);
                if (daysUntil > 7) {
                    return null;
                }

                const countdown = formatDistanceToNowStrict(eventDate, { addSuffix: true });

                let urgency = 'low';
                if (daysUntil <= 1) urgency = 'high';
                else if (daysUntil <= 3) urgency = 'medium';

                return { ...event, countdown, urgency };
            })
            .filter(Boolean)
            .sort((a, b) => parseISO(a.date) - parseISO(b.date));
    }, [classes]);

    const notificationCount = upcomingEvents.length;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative bg-sidebar rounded-full">
                    <Bell className="h-5 w-5" />
                    <AnimatePresence>
                        {notificationCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute -top-1 -right-1 h-5 w-5"
                            >
                                <Badge
                                    variant="destructive"
                                    className="w-full h-full justify-center rounded-full p-0"
                                    as={motion.div}
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                >
                                    {notificationCount}
                                </Badge>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <AnimatePresence>
                {isOpen && (
                    <DropdownMenuContent
                        asChild
                        forceMount
                        className="w-80"
                        align="end"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            <DropdownMenuLabel>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Upcoming Events</span>
                                    <Link to="/dashboard/schedule" className="text-xs text-primary hover:underline">
                                        View All
                                    </Link>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ScrollArea className="h-[300px]">
                                {notificationCount > 0 ? (
                                    upcomingEvents.map((event) => (
                                        <DropdownMenuItem key={event._id} className="flex flex-col items-start gap-1 p-2">
                                            <div className="flex w-full justify-between items-center">
                                                <p className="font-semibold">{event.name}</p>
                                                <Badge variant={
                                                    event.urgency === 'high' ? 'destructive' : event.urgency === 'medium' ? 'secondary' : 'outline'
                                                } className="capitalize">{event.subject}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-foreground w-full">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDistanceToNowStrict(parseISO(event.date), { addSuffix: true })}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span className=''>{event.time}</span>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <div className="text-center text-sm text-muted-foreground p-8">
                                        <p>No upcoming events in the next 7 days.</p>
                                    </div>
                                )}
                            </ScrollArea>
                        </motion.div>
                    </DropdownMenuContent>
                )}
            </AnimatePresence>
        </DropdownMenu>
    );
}
