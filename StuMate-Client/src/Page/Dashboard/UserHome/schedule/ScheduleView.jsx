
import { add, endOfWeek, format, startOfWeek, sub } from 'date-fns';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { CalendarGrid } from './CalendarGrid';
import { DayView } from './DayView';
import { ScheduleForm } from './ScheduleForm';
import { WeekView } from './WeekView';

export function ScheduleView() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');

    const handleAdd = () => {
        setSelectedClass(null);
        setIsFormOpen(true);
    };

    const handleEdit = (classItem) => {
        setSelectedClass(classItem);
        setIsFormOpen(true);
    };

    const handlePrev = () => {
        if (view === 'month') {
            setCurrentDate(sub(currentDate, { months: 1 }));
        } else if (view === 'week') {
            setCurrentDate(sub(currentDate, { weeks: 1 }));
        } else {
            setCurrentDate(sub(currentDate, { days: 1 }));
        }
    };

    const handleNext = () => {
        if (view === 'month') {
            setCurrentDate(add(currentDate, { months: 1 }));
        } else if (view === 'week') {
            setCurrentDate(add(currentDate, { weeks: 1 }));
        } else {
            setCurrentDate(add(currentDate, { days: 1 }));
        }
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const renderTitle = () => {
        if (view === 'month') {
            return format(currentDate, 'MMMM yyyy');
        }
        if (view === 'week') {
            const start = startOfWeek(currentDate, { weekStartsOn: 1 });
            const end = endOfWeek(currentDate, { weekStartsOn: 1 });
            if (start.getMonth() === end.getMonth()) {
                return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
            }
            return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
        }
        return format(currentDate, 'MMMM d, yyyy');
    }


    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                    </Button>
                    <h2 className="text-2xl font-bold tracking-tight">{renderTitle()}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-1 rounded-md border p-1">
                        <Button onClick={() => setView('day')} variant={view === 'day' ? 'secondary' : 'ghost'} size="sm">Day</Button>
                        <Button onClick={() => setView('week')} variant={view === 'week' ? 'secondary' : 'ghost'} size="sm">Week</Button>
                        <Button onClick={() => setView('month')} variant={view === 'month' ? 'secondary' : 'ghost'} size="sm">Month</Button>
                    </div>
                    <div className="flex items-center gap-1 rounded-md border p-1">
                        <Button onClick={handlePrev} variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleNext} variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button onClick={handleToday} variant="outline">Today</Button>
                </div>
            </div>

            <div className="md:hidden mb-4">
                <div className="flex items-center gap-1 rounded-md border p-1 w-full">
                    <Button onClick={() => setView('day')} variant={view === 'day' ? 'secondary' : 'ghost'} className="flex-1">Day</Button>
                    <Button onClick={() => setView('week')} variant={view === 'week' ? 'secondary' : 'ghost'} className="flex-1">Week</Button>
                    <Button onClick={() => setView('month')} variant={view === 'month' ? 'secondary' : 'ghost'} className="flex-1">Month</Button>
                </div>
            </div>

            <Card className="overflow-hidden py-0">
                {view === 'month' && <CalendarGrid currentDate={currentDate} onEditEvent={handleEdit} />}
                {view === 'week' && <WeekView currentDate={currentDate} onEditEvent={handleEdit} />}
                {view === 'day' && <DayView currentDate={currentDate} onEditEvent={handleEdit} />}
            </Card>

            <ScheduleForm
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                classItem={selectedClass}
            />
        </div>
    );
}
