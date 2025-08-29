
import {
    format,
    isSameDay,
    isToday,
    parseISO,
} from 'date-fns';
import { Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog';
import { Button } from '../../../../components/ui/button';
import { ScrollArea, ScrollBar } from '../../../../components/ui/scroll-area';
import { useSchedule } from '../../../../hooks/useSchedule';
import { SUBJECT_COLORS } from '../../../../lib/constants';
import { cn } from '../../../../lib/utils';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayView({ currentDate, onEditEvent }) {
    const { classes, deleteClass } = useSchedule();

    const dayEvents = classes
        .filter((event) => event.date && isSameDay(parseISO(event.date), currentDate))
        .sort((a, b) => a.time.localeCompare(b.time));

    const calculatePosition = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return ((hour * 60 + minute) / (24 * 60)) * 100;
    };

    const calculateHeight = () => {
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
                <div className="col-start-2 grid grid-cols-1 relative">
                    {/* Day header */}
                    <div className="col-span-1 grid grid-cols-1 sticky top-0 bg-background z-10">
                        <div className="border-l p-2 text-center h-16 flex flex-col justify-center">
                            <p className="text-sm font-medium">{format(currentDate, 'EEEE')}</p>
                            <p className={cn("text-xl font-bold", isToday(currentDate) && "text-primary")}>{format(currentDate, 'd')}</p>
                        </div>
                    </div>

                    {/* Background grid lines */}
                    <div className="col-span-1 row-start-1 -z-0 mt-16">
                        {HOURS.map((hour) => (
                            <div key={hour} className="h-16 border-t border-l"></div>
                        ))}
                    </div>

                    {/* Events */}
                    <div className="relative col-span-1 row-start-1 z-0 p-1 mt-16">
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
                                onClick={() => onEditEvent(event)}
                            >
                                <p className="font-semibold truncate">{event.name}</p>
                                <p className="text-muted-foreground">{event.time}</p>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
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
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteClass.mutate(event._id)}>
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
}
