
import { BookOpenCheck, BrainCircuit, Check, ClipboardCheck, Edit, Lock, PiggyBank, Target, User } from 'lucide-react';
import { Card, CardDescription, CardTitle } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";

const iconMap = {
    profile: User,
    budget: PiggyBank,
    planner: ClipboardCheck,
    focus: BrainCircuit,
    exam: BookOpenCheck,
    journal: Edit,
    consistency: Target,
    default: Target
}

const colorMap = {
    bronze: 'from-amber-700 to-amber-500',
    silver: 'from-slate-500 to-slate-300',
    gold: 'from-yellow-500 to-yellow-300',
    platinum: 'from-indigo-500 to-purple-400',
    default: 'from-gray-500 to-gray-400',
}

export function BadgeCard({ badge }) {
    const { title, level, description, isUnlocked, tier, icon } = badge;
    const IconComponent = iconMap[icon] || iconMap.default;
    const tierColor = colorMap[tier] || colorMap.default;

    return (
        <Card className={cn(
            "flex flex-col items-center justify-center text-center p-4 transition-all duration-300",
            isUnlocked ? 'border-primary/50 bg-background' : 'bg-muted/50 border-dashed'
        )}>
            <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all",
                isUnlocked ? `bg-gradient-to-br ${tierColor} text-white shadow-lg` : 'bg-muted text-muted-foreground'
            )}>
                <IconComponent className="w-8 h-8" />
            </div>
            <CardTitle className="text-base font-bold">{title}</CardTitle>
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                {isUnlocked ? `${tier} ${level > 0 ? `- Level ${level}` : ''}`.trim() : 'Locked'}
            </CardDescription>

            <div className="mt-2 text-center text-xs text-muted-foreground flex-grow">
                {description}
            </div>

            <div className={cn(
                "mt-3 text-xs font-semibold flex items-center gap-1",
                isUnlocked ? 'text-green-500' : 'text-muted-foreground'
            )}>
                {isUnlocked ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{isUnlocked ? 'Unlocked' : 'Locked'}</span>
            </div>
        </Card>
    );
}
