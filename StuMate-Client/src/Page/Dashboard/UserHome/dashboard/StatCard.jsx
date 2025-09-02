/* eslint-disable no-unused-vars */
import { cn } from "../../../../lib/utils";
const colorVariants = {
  amber: {
    iconBg: 'bg-[#FEF3C6] dark:bg-[#CA8A04]',
    iconColor: 'text-[#CA8A04] dark:text-amber-300',
    textColor: 'text-[#CA8A04] dark:text-[#FEF3C6]',
  },

  red: {
    iconBg: 'bg-[#FFE2E4] dark:bg-[#DC2626]',
    iconColor: 'text-[#DC2626] dark:text-red-300',
    textColor: 'text-[#DC2626] dark:text-red-300',
  },

  green: {
    iconBg: 'bg-[#DCFDEA] dark:bg-[#16A34A]',
    iconColor: 'text-[#16A34A] dark:text-[#DCFDEA]',
    textColor: 'text-[#16A34A] dark:text-[#DCFDEA]',
  },

  blue: {
    iconBg: 'bg-[#DBEAFD] dark:bg-[#2563EB]',
    iconColor: 'text-[#2563EB] dark:text-[#DBEAFD]',
    textColor: 'text-[#2563EB] dark:text-blue-200',
  },

  purple: {
    iconBg: 'bg-[#F5E7FF] dark:bg-[#9333EA]',
    iconColor: 'text-[#9333EA] dark:text-[#F5E7FF]',
    textColor: 'text-[#9333EA] dark:text-[#F5E7FF]',
  },

  sky: {
    iconBg: 'bg-[#DFF1FD] dark:bg-[#0891B2]',
    iconColor: 'text-[#0891B2] dark:text-[#DFF1FD]',
    textColor: 'text-[#0891B2] dark:text-[#DFF1FD]',
  },


};

export function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const variants = colorVariants[color] || colorVariants.blue;

  return (
    <div className="rounded-[10px] p-4 flex items-center gap-4 bg-background">
      <div className={cn('p-3 rounded-[10px]', variants.iconBg)}>
        <Icon className={cn('h-8.5 w-8.5', variants.iconColor)} />
      </div>
      <div className={variants.textColor}>
        <p className="text-sm text-muted-foreground dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
