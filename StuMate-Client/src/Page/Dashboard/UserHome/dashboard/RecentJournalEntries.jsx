
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
                        {recentJournals.map((journal, index) => {
                            const moodConfig = MOOD_CONFIG[journal.mood] || MOOD_CONFIG.unknown;
                            const MoodIcon = moodConfig.icon;
                            return (
                                <div key={journal._id}>
                                    <div className="flex items-start gap-3">
                                        <div className={cn("size-6 p-1 rounded-full flex justify-center items-center", moodConfig.bg)}>
                                            <div className={cn("text-sm", moodConfig.color)}>{moodConfig.icon}</div>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <p className="font-medium text-base leading-snug">{journal.subjectStudied}</p>
                                            <p className="text-sm text-muted-foreground leading-tight">{journal.notes}</p>
                                            <p className="text-xs text-gray-400 leading-tight pt-1">
                                                {format(new Date(journal.date), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    {index < recentJournals.length - 1 && <div className="mt-4 border-b border-gray-200" />}
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
