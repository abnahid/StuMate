import { Award } from 'lucide-react';
import { Skeleton } from '../../../../components/ui/skeleton';
import { useBudget } from '../../../../hooks/useBudget';
import { useExamPrep } from '../../../../hooks/useExamPrep';
import { useFocus } from '../../../../hooks/useFocus';
import { useJournal } from '../../../../hooks/useJournal';
import { usePlanner } from '../../../../hooks/usePlanner';
import { useProfile } from '../../../../hooks/useProfile';
import { getAchievements } from '../../../../lib/achievements';
import { BadgeCard } from './BadgeCard';

function AchievementSkeleton() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <Skeleton className="h-12 w-12 mx-auto" />
                <Skeleton className="h-8 w-64 mx-auto mt-4" />
                <Skeleton className="h-5 w-80 mx-auto mt-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="p-4 bg-card rounded-lg flex flex-col items-center justify-center space-y-3 h-36">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function AchievementPage() {
    const { transactions } = useBudget();
    const { tasks } = usePlanner();
    const { sessions: focusSessions } = useFocus();
    const { practiceSessions } = useExamPrep();
    const { journals } = useJournal();
    const { profile } = useProfile();

    const allData = {
        transactions,
        tasks,
        focusSessions,
        practiceSessions,
        journals,
        profile
    };

    const achievements = getAchievements(allData);

    if (!achievements) {
        return <AchievementSkeleton />
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <Award className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight">Your Achievements</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Unlock badges by using the app and staying productive.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {achievements.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                ))}
            </div>
        </div>
    );
}
