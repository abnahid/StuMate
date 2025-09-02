
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { MOOD_CONFIG } from '../../../../lib/constants';
import { cn } from '../../../../lib/utils';

export function RecentJournalEntries({ journals }) {
    const recentJournals = useMemo(() => {
        return [...journals]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
    }, [journals]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
                <CardDescription>A quick look at your latest reflections.</CardDescription>
            </CardHeader>
            <CardContent>
                {recentJournals.length > 0 ? (
                    <div className="space-y-6">
                        {recentJournals.map((journal) => {
                            const moodConfig = MOOD_CONFIG[journal.mood] || MOOD_CONFIG.unknown;
                            const MoodIcon = moodConfig.icon;
                            return (
                                <div key={journal._id} className="flex items-start gap-4">
                                    <MoodIcon className={cn("h-6 w-6 mt-1", moodConfig.color)} />
                                    <div className="flex-1">
                                        <p className="font-semibold">{journal.subjectStudied}</p>
                                        <p className="text-sm text-muted-foreground">{journal.notes}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {format(new Date(journal.date), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                        <p>No journal entries yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
