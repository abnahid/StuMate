
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/ui/button';
import { Calendar } from '../../../../components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../../../components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../components/ui/popover';
import { useSchedule } from '../../../../hooks/useSchedule';
import { classSchema } from '../../../../lib/schemas';
import { cn } from '../../../../lib/utils';

export function ScheduleForm({
    isOpen,
    setIsOpen,
    classItem,
}) {
    const { addClass, updateClass } = useSchedule();
    const form = useForm({
        resolver: zodResolver(classSchema),
        defaultValues: {
            name: '',
            date: new Date().toISOString(),
            time: '',
            subject: '',
        },
    });

    useEffect(() => {
        if (classItem) {
            form.reset({
                ...classItem,
                date: new Date(classItem.date).toISOString(),
            });
        } else {
            form.reset({
                name: '',
                date: new Date().toISOString(),
                time: '',
                subject: '',
            });
        }
    }, [classItem, form]);

    function onSubmit(values) {
        if (classItem) {
            updateClass({ ...values, _id: classItem._id });
        } else {
            addClass(values);
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {classItem ? 'Edit Event' : 'Add New Event'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Intro to Psychology" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject / Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Science, Meeting" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(date) => field.onChange(date?.toISOString())}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{classItem ? 'Save Changes' : 'Add Event'}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
