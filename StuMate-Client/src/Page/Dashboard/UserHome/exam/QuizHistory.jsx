
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';
import { Skeleton } from '../../../../components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { useExamPrep } from '../../../../hooks/useExamPrep';

export function QuizHistory() {
    const { practiceSessions, isLoading } = useExamPrep();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    const sortedSessions = [...practiceSessions].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <CardTitle>Quiz History</CardTitle>
                        <CardDescription>A record of all your practice quizzes.</CardDescription>
                    </div>
                    <Button asChild variant="outline">
                        <Link to="/dashboard/exam-prep">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Quiz Generator
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Topic</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead className="w-[200px]">Percentage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedSessions.length > 0 ? (
                            sortedSessions.map((session) => {
                                const percentage = (session.score / session.numberOfQuestions) * 100;
                                return (
                                    <TableRow key={session._id}>
                                        <TableCell className="font-medium">{session.topic}</TableCell>
                                        <TableCell>{format(new Date(session.date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell className="capitalize">{session.difficulty}</TableCell>
                                        <TableCell>{session.score} / {session.numberOfQuestions}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={percentage} className="h-2" />
                                                <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    You haven't taken any quizzes yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
