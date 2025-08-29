
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
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
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { usePlanner } from '../../../../hooks/usePlanner.jsx';

const priorityVariant = {
    low: 'secondary',
    medium: 'default',
    high: 'destructive',
};

export function TaskCard({ task, index, onEdit }) {
    const { deleteTask } = usePlanner();

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                >
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="font-semibold">{task.title}</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{task.subject}</Badge>
                                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                            </div>
                            {task.deadline && (
                                <p className="text-xs text-muted-foreground">
                                    Due: {format(new Date(task.deadline), 'MMM d, yyyy')}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={onEdit}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this task.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteTask.mutate(task._id)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </Card>
            )}
        </Draggable>
    );
}
