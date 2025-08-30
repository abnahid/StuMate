/* eslint-disable no-unused-vars */
import { cn } from "../../../../lib/utils";
const colorVariants = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    iconBg: 'bg-blue-200 dark:bg-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-300',
    textColor: 'text-blue-900 dark:text-blue-200',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    iconBg: 'bg-green-200 dark:bg-green-800',
    iconColor: 'text-green-600 dark:text-green-300',
    textColor: 'text-green-900 dark:text-green-200',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    iconBg: 'bg-purple-200 dark:bg-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-300',
    textColor: 'text-purple-900 dark:text-purple-200',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-600/50',
    iconBg: 'bg-red-200 dark:bg-red-700',
    iconColor: 'text-red-600 dark:text-red-400',
    textColor: 'text-red-900 dark:text-red-300',
  },
  sky: {
    bg: 'bg-sky-100 dark:bg-sky-900/50',
    iconBg: 'bg-sky-200 dark:bg-sky-800',
    iconColor: 'text-sky-600 dark:text-sky-300',
    textColor: 'text-sky-900 dark:text-sky-200',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/50',
    iconBg: 'bg-amber-200 dark:bg-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-300',
    textColor: 'text-amber-900 dark:text-amber-200',
  },
};

export function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const variants = colorVariants[color] || colorVariants.blue;

  return (
    <div className={cn('rounded-xl p-4 flex items-center gap-4', variants.bg)}>
      <div className={cn('p-3 rounded-lg', variants.iconBg)}>
        <Icon className={cn('h-6 w-6', variants.iconColor)} />
      </div>
      <div className={variants.textColor}>
        <p className="text-sm text-muted-foreground dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
