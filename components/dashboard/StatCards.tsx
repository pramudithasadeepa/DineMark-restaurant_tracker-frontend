import { DashboardStats } from '@/types';

type StatCardsProps = {
  stats: DashboardStats;
};

export default function StatCards({ stats }: StatCardsProps) {
  const visitedPercent =
    stats.total > 0 ? Math.round((stats.visitedCount / stats.total) * 100) : 0;

  const cards = [
    {
      title: 'Total Restaurants',
      value: stats.total,
      sub: stats.total > 0 ? 'Your collection' : 'Add your first spot',
      subClass: 'text-green-600',
      icon: '📊',
      iconBg: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Visited',
      value: stats.visitedCount,
      sub: `${visitedPercent}% of total`,
      subClass: 'text-slate-500',
      icon: '✓',
      iconBg: 'bg-green-100 text-green-600',
    },
    {
      title: 'Want to Try',
      value: stats.wantToTryCount,
      sub: `${stats.wantToTryCount} remaining`,
      subClass: 'text-slate-500',
      icon: '☆',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—',
      sub: stats.averageRating > 0 ? '★★★★☆' : 'No ratings yet',
      subClass: 'text-amber-500',
      icon: '★',
      iconBg: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <div>
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className={`mt-1 text-xs ${card.subClass}`}>{card.sub}</p>
          </div>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${card.iconBg}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
