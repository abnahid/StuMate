
import {
    eachDayOfInterval,
    endOfWeek,
    format,
    isSameDay,
    isToday,
    parseISO,
    startOfWeek,
} from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '../../../../components/ui/alert-dialog';
import { Button } from '../../../../components/ui/button';
import { ScrollArea, ScrollBar } from '../../../../components/ui/scroll-area';
import { useSchedule } from '../../../../hooks/useSchedule';
import { SUBJECT_COLORS } from '../../../../lib/constants';
import { cn } from '../../../../lib/utils';


const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function WeekView({ currentDate, onEditEvent }) {
    const { classes, deleteClass } = useSchedule();

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const getEventsForDay = (day) => {
        return classes
            .filter((event) => event.date && isSameDay(parseISO(event.date), day))
            .sort((a, b) => a.time.localeCompare(b.time));
    };

    const calculatePosition = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return ((hour * 60 + minute) / (24 * 60)) * 100;
    };

    const calculateHeight = () => {
        // Assuming a 50-minute event duration for display purposes
        return (50 / (24 * 60)) * 100;
    }

    return (
        <ScrollArea className="h-[75vh] w-full">
            <div className="relative grid grid-cols-[auto_1fr]">
                {/* Time column */}
                <div className="row-span-full">
                    <div className="h-16"></div>
                    {HOURS.map((hour) => (
                        <div key={hour} className="h-16 text-right pr-2">
                            <span className="text-xs text-muted-foreground relative -top-2">
                                {format(new Date(0, 0, 0, hour), 'h a')}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="col-start-2 grid grid-cols-1">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 sticky top-0 bg-background z-10">
                        {daysInWeek.map((day) => (
                            <div key={day.toString()} className="border-l p-2 text-center h-16 flex flex-col justify-center">
                                <p className="text-sm font-medium">{format(day, 'E')}</p>
                                <p className={cn("text-xl font-bold", isToday(day) && "text-primary")}>{format(day, 'd')}</p>
                            </div>
                        ))}
                    </div>

                    {/* Background grid lines and Events */}
                    <div className="grid grid-cols-7 relative">
                        {daysInWeek.map((day, dayIndex) => {
                            const dayEvents = getEventsForDay(day);
                            return (
                                <div key={day.toString()} className={cn("relative border-l", dayIndex === 0 && "border-l-0")} style={{ gridColumn: dayIndex + 1 }}>
                                    {/* Background hourly slots */}
                                    {HOURS.map((hour) => (
                                        <div key={hour} className="h-16 border-t"></div>
                                    ))}

                                    {/* Events for this day */}
                                    {dayEvents.map(event => (
                                        <div
                                            key={event._id}
                                            className={cn(
                                                'group absolute w-[98%] left-[1%] rounded-md p-2 text-xs leading-tight border-l-4 cursor-pointer',
                                                SUBJECT_COLORS[event.subject] || SUBJECT_COLORS.default
                                            )}
                                            style={{
                                                top: `${calculatePosition(event.time)}%`,
                                                height: `${calculateHeight()}%`
                                            }}
                                        >
                                            <p className="font-semibold truncate">{event.name}</p>
                                            <p className="text-muted-foreground">{event.time}</p>
                                            <div className="absolute top-1.5 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={(e) => { e.stopPropagation(); onEditEvent(event); }}>
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="icon" className="h-5 w-5">
                                                            <Trash2 className="h-3 w-3 text-destructive" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete this event.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => deleteClass.mutate(event._id)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
}
