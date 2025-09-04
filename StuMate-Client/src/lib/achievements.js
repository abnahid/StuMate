
const achievementsConfig = {
    profile: {
        icon: 'profile',
        tiers: [
            {
                id: 'profile_1', title: 'Profile Pro', description: 'Complete all profile fields.', tier: 'platinum', check: (data) =>
                    data.profile &&
                    data.profile.name &&
                    data.profile.university &&
                    data.profile.department &&
                    data.profile.grade
            },
        ]
    },
    budget: {
        icon: 'budget',
        tiers: [
            { id: 'budget_1', title: 'Coin Collector', description: 'Log your first transaction.', tier: 'bronze', check: (data) => data.transactions.length >= 1 },
            { id: 'budget_2', title: 'Budget Beginner', description: 'Log 10 transactions.', tier: 'silver', check: (data) => data.transactions.length >= 10 },
            { id: 'budget_3', title: 'Financial Analyst', description: 'Log 25 transactions.', tier: 'gold', check: (data) => data.transactions.length >= 25 },
            { id: 'budget_4', title: 'Expense Explorer', description: 'Log 50 transactions.', tier: 'platinum', check: (data) => data.transactions.length >= 50 },
        ]
    },
    planner: {
        icon: 'planner',
        tiers: [
            { id: 'planner_1', title: 'First Steps', description: 'Create your first task.', tier: 'bronze', check: (data) => data.tasks.length >= 1 },
            { id: 'planner_2', title: 'Task Juggler', description: 'Create 10 tasks.', tier: 'silver', check: (data) => data.tasks.length >= 10 },
            { id: 'planner_3', title: 'Getting it Done', description: 'Complete 20 tasks.', tier: 'gold', check: (data) => data.tasks.filter(t => t.status === 'done').length >= 20 },
            { id: 'planner_4', title: 'Productivity Pro', description: 'Complete 50 tasks.', tier: 'platinum', check: (data) => data.tasks.filter(t => t.status === 'done').length >= 50 },
        ]
    },
    focus: {
        icon: 'focus',
        tiers: [
            { id: 'focus_1', title: 'Ready, Set, Focus!', description: 'Complete one Pomodoro.', tier: 'bronze', check: (data) => data.focusSessions.length >= 1 },
            { id: 'focus_2', title: 'Deep Work', description: 'Complete 10 Pomodoros.', tier: 'silver', check: (data) => data.focusSessions.length >= 10 },
            { id: 'focus_3', title: 'Focus Champion', description: 'Complete 25 Pomodoros.', tier: 'gold', check: (data) => data.focusSessions.length >= 25 },
            { id: 'focus_4', title: 'Zen Master', description: 'Accumulate 5 hours of focus time.', tier: 'platinum', check: (data) => data.focusSessions.reduce((sum, s) => sum + s.duration, 0) >= 300 },
        ]
    },
    exam: {
        icon: 'exam',
        tiers: [
            { id: 'exam_1', title: 'Quiz Rookie', description: 'Take your first quiz.', tier: 'bronze', check: (data) => data.practiceSessions.length >= 1 },
            { id: 'exam_2', title: 'Knowledge Builder', description: 'Take 10 quizzes.', tier: 'silver', check: (data) => data.practiceSessions.length >= 10 },
            { id: 'exam_3', title: 'Perfect Score', description: 'Get a 100% on a quiz.', tier: 'gold', check: (data) => data.practiceSessions.some(s => s.score === s.numberOfQuestions) },
            { id: 'exam_4', title: 'Scholar Supreme', description: 'Answer 100 questions correctly.', tier: 'platinum', check: (data) => data.practiceSessions.reduce((sum, s) => sum + s.score, 0) >= 100 },
        ]
    },
    journal: {
        icon: 'journal',
        tiers: [
            { id: 'journal_1', title: 'Dear Diary', description: 'Write one journal entry.', tier: 'bronze', check: (data) => data.journals.length >= 1 },
            { id: 'journal_2', title: 'Reflective Thinker', description: 'Write 7 journal entries.', tier: 'silver', check: (data) => data.journals.length >= 7 },
            { id: 'journal_3', title: 'Weekly Journaler', description: 'Write 15 journal entries.', tier: 'gold', check: (data) => data.journals.length >= 15 },
        ]
    },
    consistency: {
        icon: 'consistency',
        tiers: [
            {
                id: 'consistency_1', title: 'Productive Day', description: 'Use 3 different features in one day.', tier: 'silver', check: (data) => {
                    const today = new Date().toISOString().slice(0, 10);
                    const featuresUsed = new Set();
                    if (data.transactions.some(t => t.date.startsWith(today))) featuresUsed.add('budget');
                    if (data.tasks.some(t => t.deadline?.startsWith(today))) featuresUsed.add('planner');
                    if (data.focusSessions.some(s => s.startTime.startsWith(today))) featuresUsed.add('focus');
                    if (data.practiceSessions.some(s => s.date.startsWith(today))) featuresUsed.add('exam');
                    if (data.journals.some(j => j.date.startsWith(today))) featuresUsed.add('journal');
                    return featuresUsed.size >= 3;
                }
            },
            {
                id: 'consistency_2', title: 'Productive Week', description: 'Use the app 5 days in a week.', tier: 'gold', check: (data) => {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    const allDates = [
                        ...data.transactions.map(t => t.date),
                        ...data.tasks.map(t => t.deadline),
                        ...data.focusSessions.map(s => s.startTime),
                        ...data.practiceSessions.map(s => s.date),
                        ...data.journals.map(j => j.date),
                    ].filter(Boolean);
                    const uniqueDays = new Set(allDates.map(d => new Date(d).toISOString().slice(0, 10)));
                    return uniqueDays.size >= 5;
                }
            },
        ]
    }
};

export function getAchievements(data) {
    if (!data || !data.profile) return null;

    return Object.values(achievementsConfig).flatMap(config => {
        let highestUnlockedTier = null;
        let level = 0;
        for (let i = config.tiers.length - 1; i >= 0; i--) {
            if (config.tiers[i].check(data)) {
                highestUnlockedTier = config.tiers[i];
                level = i + 1;
                break;
            }
        }

        if (highestUnlockedTier) {
            const nextTier = config.tiers[level];
            // Handle single-tier achievements like Profile
            const description = config.tiers.length === 1
                ? highestUnlockedTier.description
                : (nextTier ? `Next: ${nextTier.description}` : highestUnlockedTier.description);

            return [{
                ...highestUnlockedTier,
                icon: config.icon,
                isUnlocked: true,
                level: level,
                description: description,
            }];
        } else {
            const firstTier = config.tiers[0];
            return [{
                ...firstTier,
                icon: config.icon,
                isUnlocked: false,
                level: 0,
                description: firstTier.description,
            }];
        }
    });
}
