import { BookOpenCheck, BrainCircuit, Check, ClipboardCheck, Edit, Lock, PiggyBank, Target, User } from 'lucide-react';
import bronzeBadge from '../../../../assets/bages/bronze.svg';
import defaultBadge from '../../../../assets/bages/Default.svg';
import goldBadge from '../../../../assets/bages/gold.svg';
import platinumBadge from '../../../../assets/bages/Platinum.svg';
import silverBadge from '../../../../assets/bages/Silver.svg';
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
    default: Target,
};

const badgeBgMap = {
    bronze: bronzeBadge,
    silver: silverBadge,
    gold: goldBadge,
    platinum: platinumBadge,
    default: defaultBadge,
};


const badgeAnimationMap = {
    bronze: "animate-wiggle",
    silver: "animate-rotateSmooth",
    gold: "animate-shimmer",
    platinum: "animate-bounceSubtle",
    default: "",
};

export function BadgeCard({ badge }) {
    const { title, level, description, isUnlocked, tier, icon } = badge;
    const IconComponent = iconMap[icon] || iconMap.default;
    const badgeBg = badgeBgMap[tier] || badgeBgMap.default;
    const badgeAnimation = badgeAnimationMap[tier] || badgeAnimationMap.default;

    return (
        <Card
            className={cn(
                "flex flex-col items-center justify-center text-center p-6 rounded-2xl transition-all duration-300 shadow-sm gap-3",
                isUnlocked
                    ? "border border-border bg-card hover:shadow-lg"
                    : "border border-dashed border-border/50 bg-muted"
            )}
        >
            <div className={cn("relative w-24 h-24 mb-2", badgeAnimation)}>
                <img
                    src={badgeBg}
                    alt={`${tier} badge`}
                    className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-9 h-9 text-primary-foreground" />
                </div>
            </div>

            <CardTitle className="text-lg font-semibold text-foreground">
                {title}
            </CardTitle>

            <CardDescription className="text-sm font-medium uppercase tracking-wider mt-1 text-muted-foreground">
                {isUnlocked
                    ? `${tier} ${level > 0 ? `- Level ${level}` : ""}`.trim()
                    : "Locked"}
            </CardDescription>

            <div className="mt-3 text-sm text-muted-foreground flex-grow">
                {description}
            </div>

            {/* Status */}
            <div
                className={cn(
                    "mt-4 text-sm font-medium flex items-center gap-1",
                    isUnlocked ? "text-primary" : "text-muted-foreground"
                )}
            >
                {isUnlocked ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{isUnlocked ? "Unlocked" : "Locked"}</span>
            </div>
        </Card>

    );
}
