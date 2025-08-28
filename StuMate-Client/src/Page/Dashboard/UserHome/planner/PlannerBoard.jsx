

import { usePlanner } from '@/hooks/use-planner';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';

const statusColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

export function PlannerBoard() {
    const { tasks, updateTask } = usePlanner();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAdd = () => {
        setSelectedTask(null);
        setIsFormOpen(true);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const task = tasks.find(t => t._id === draggableId);
        if (task) {
            updateTask({ ...task, status: destination.droppableId });
        }
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Study Planner</h2>
                    <Button onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {statusColumns.map((column) => (
                        <Droppable droppableId={column.id} key={column.id}>
                            {(provided, snapshot) => (
                                <Card
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col transition-colors ${snapshot.isDraggingOver ? 'bg-accent' : ''}`}
                                >
                                    <CardHeader>
                                        <CardTitle>{column.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-3">
                                        {tasks
                                            .filter((task) => task.status === column.id)
                                            .map((task, index) => (
                                                <TaskCard
                                                    key={task._id}
                                                    task={task}
                                                    index={index}
                                                    onEdit={() => {
                                                        setSelectedTask(task);
                                                        setIsFormOpen(true);
                                                    }}
                                                />
                                            ))}
                                        {provided.placeholder}
                                        {tasks.filter((task) => task.status === column.id).length === 0 && (
                                            <p className="text-sm text-muted-foreground p-4 text-center">No tasks in this stage.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </Droppable>
                    ))}
                </div>

                <TaskForm
                    isOpen={isFormOpen}
                    setIsOpen={setIsFormOpen}
                    task={selectedTask}
                />
            </div>
        </DragDropContext>
    );
}
