import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Check,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DashboardStats } from '@/types';
import StarRating from '@/components/StarRating';

type StatCardsProps = {
  stats: DashboardStats;
};

type StatCardConfig = {
  title: string;
  value: string | number;
  sub: ReactNode;
  subClass: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  href?: string;
};

export default function StatCards({ stats }: StatCardsProps) {
  const visitedPercent =
    stats.total > 0 ? Math.round((stats.visitedCount / stats.total) * 100) : 0;

  const cards: StatCardConfig[] = [
    {
      title: 'Total Restaurants',
      value: stats.total,
      sub: stats.total > 0 ? 'Your collection' : 'Add your first spot',
      subClass: 'text-green-600',
      icon: BarChart3,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Visited',
      value: stats.visitedCount,
      sub: `${visitedPercent}% of total`,
      subClass: 'text-slate-500',
      icon: Check,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      href: '/visited',
    },
    {
      title: 'Want to Try',
      value: stats.wantToTryCount,
      sub: `${stats.wantToTryCount} remaining`,
      subClass: 'text-slate-500',
      icon: Star,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      href: '/want-to-try',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—',
      sub:
        stats.averageRating > 0 ? (
          <StarRating rating={stats.averageRating} size="sm" />
        ) : (
          'No ratings yet'
        ),
      subClass: 'text-amber-500',
      icon: Star,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600 fill-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const content = (
          <>
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
              <p className={`mt-1 text-xs ${card.subClass}`}>{card.sub}</p>
            </div>
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
            >
              <Icon className={`h-6 w-6 ${card.iconColor}`} strokeWidth={2} aria-hidden />
            </div>
          </>
        );

        const className = `flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm${
          card.href ? ' transition hover:border-slate-200 hover:shadow-md' : ''
        }`;

        if (card.href) {
          return (
            <Link key={card.title} href={card.href} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <div key={card.title} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
