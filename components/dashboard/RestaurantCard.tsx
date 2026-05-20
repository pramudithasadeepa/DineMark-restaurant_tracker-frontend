import Link from 'next/link';
import { Restaurant } from '@/types';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onDelete: (id: number) => void;
};

function PriceRangeDisplay({ range }: { range: string }) {
  if (range === 'budget') {
    return (
      <span className="text-green-600">
        <span className="font-semibold">$</span>{' '}
        <span className="text-slate-600">Budget</span>
      </span>
    );
  }
  if (range === 'medium') {
    return (
      <span className="text-blue-600">
        <span className="font-semibold">$$</span>{' '}
        <span className="text-slate-600">Medium</span>
      </span>
    );
  }
  return (
    <span className="text-purple-600">
      <span className="font-semibold">$$$</span>{' '}
      <span className="text-slate-600">Expensive</span>
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm text-slate-600">{rating}/5</span>
    </span>
  );
}

function StatusBadge({ status }: { status: Restaurant['status'] }) {
  if (status === 'visited') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
        <span aria-hidden>✓</span> Visited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3 py-1 text-xs font-medium text-white">
      <span aria-hidden>★</span> Want to Try
    </span>
  );
}

export default function RestaurantCard({ restaurant, onDelete }: RestaurantCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">{restaurant.name}</h2>
          <StatusBadge status={restaurant.status} />
        </div>

        <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <span className="text-slate-400" aria-hidden>
              👨‍🍳
            </span>
            {restaurant.cuisine}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-slate-400" aria-hidden>
              📍
            </span>
            {restaurant.location}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-slate-400" aria-hidden>
              💲
            </span>
            <PriceRangeDisplay range={restaurant.priceRange} />
          </li>
          {restaurant.rating != null && restaurant.rating > 0 && (
            <li className="flex items-center gap-2">
              <StarRating rating={restaurant.rating} />
            </li>
          )}
          {restaurant.recommendedDish && (
            <li className="flex items-center gap-2">
              <span className="text-slate-400" aria-hidden>
                🍽️
              </span>
              {restaurant.recommendedDish}
            </li>
          )}
          {restaurant.pricePaid != null && restaurant.pricePaid > 0 && (
            <li className="flex items-center gap-2 font-medium text-green-600">
              <span aria-hidden>💵</span>
              Rs. {restaurant.pricePaid.toLocaleString()}
            </li>
          )}
        </ul>

        <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-500 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <span aria-hidden>✏️</span> Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(restaurant.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <span aria-hidden>🗑️</span> Delete
          </button>
        </div>
      </div>
    </article>
  );
}
