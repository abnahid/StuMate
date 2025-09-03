
import {
    format,
    isSameDay,
    isToday,
    parseISO,
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
        <div className="grid grid-cols-[auto_1fr] h-[75vh]">
            {/* Day Header - Fixed */}
            <div className="row-start-1 col-start-2 border-l p-2 text-center h-16 flex flex-col justify-center sticky top-0 bg-background z-20">
                <p className="text-sm font-medium">{format(currentDate, 'EEEE')}</p>
                <p className={cn("text-xl font-bold", isToday(currentDate) && "text-primary")}>{format(currentDate, 'd')}</p>
            </div>

            {/* Empty corner */}
            <div className="row-start-1 col-start-1 h-16 sticky top-0 bg-background z-20"></div>

            {/* Scrollable content */}
            <div className="row-start-2 col-span-2 overflow-hidden">
                <ScrollArea className="h-full w-full">
                    <div className="relative grid grid-cols-[auto_1fr]">
                        {/* Time column */}
                        <div className="row-span-full">
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
                            {/* Background grid lines */}
                            <div className="col-span-1 row-start-1 -z-0">
                                {HOURS.map((hour) => (
                                    <div key={hour} className="h-16 border-t border-l"></div>
                                ))}
                            </div>

                            {/* Events */}
                            <div className="relative col-span-1 row-start-1 z-0 p-1">
                                {dayEvents.map(event => (
                                    <div
                                        key={event._id}
                                        className={cn(
                                            "group absolute right-80 -translate-x-1/2  rounded-md p-2 text-xs leading-tight border-l-4 cursor-pointer",
                                            SUBJECT_COLORS[event.subject] || SUBJECT_COLORS.default
                                        )}
                                        style={{
                                            top: `${calculatePosition(event.time)}%`,
                                            height: `${calculateHeight()}%`
                                        }}
                                    >
                                        <p className="font-semibold truncate">{event.name}</p>
                                        <p className="text-muted-foreground">{event.time}</p>
                                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
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
                                                    <div className="flex justify-end space-x-2">
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
                        </div>
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
        </div>
    );
}
