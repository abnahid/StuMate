
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    parseISO,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
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
import { useSchedule } from '../../../../hooks/useSchedule';
import { SUBJECT_COLORS } from '../../../../lib/constants';
import { cn } from '../../../../lib/utils';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CalendarGrid({ currentDate, onEditEvent }) {
    const { classes, deleteClass } = useSchedule();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const daysInMonth = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const getEventsForDay = (day) => {
        return classes
            .filter((event) => event.date && isSameDay(parseISO(event.date), day))
            .sort((a, b) => a.time.localeCompare(b.time));
    };

    return (
        <div className="grid grid-cols-7  p-4">
            {WEEK_DAYS.map((day) => (
                <div key={day} className="border-r border-b p-2 text-center font-bold text-sm text-muted-foreground">
                    {day}
                </div>
            ))}
            {daysInMonth.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                return (
                    <div
                        key={index}
                        className={cn(
                            'border-r border-b min-h-[120px] p-1.5 flex flex-col',
                            isSameMonth(day, currentDate)
                                ? 'bg-card'
                                : 'bg-muted/50'
                        )}
                    >
                        <span
                            className={cn(
                                'font-medium mb-1.5 h-6 w-6 flex items-center justify-center rounded-full',
                                isToday(day) && 'bg-primary text-primary-foreground',
                                !isSameMonth(day, currentDate) && 'text-muted-foreground'
                            )}
                        >
                            {format(day, 'd')}
                        </span>
                        <div className="flex-grow space-y-1 overflow-y-auto">
                            {dayEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className={cn(
                                        'group relative rounded-md p-1.5 text-xs leading-tight border-l-4 bg-sidebar',
                                        SUBJECT_COLORS[event.subject] || SUBJECT_COLORS.default
                                    )}
                                >
                                    <p className="font-semibold truncate">{event.name}</p>
                                    <p className="text-muted-foreground">{event.time}</p>
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => onEditEvent(event)}>
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
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
                );
            })}
        </div>
    );
}
