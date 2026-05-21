'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Banknote,
  ChefHat,
  MapPin,
  Pencil,
  CircleDollarSign,
  Trash2,
  Check,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import { Restaurant } from '@/types';
import StarRating from '@/components/StarRating';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

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

function StatusBadge({ status }: { status: Restaurant['status'] }) {
  if (status === 'visited') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        Visited
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3 py-1 text-xs font-medium text-white">
      <Star className="h-3.5 w-3.5 fill-white" aria-hidden />
      Want to Try
    </span>
  );
}

function CardImage({ restaurant }: { restaurant: Restaurant }) {
  if (restaurant.imageUrl) {
    return (
      <div className="relative h-40 w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-t-2xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="flex h-40 w-full items-center justify-center rounded-t-2xl bg-gradient-to-br from-[#FFE8D6] to-[#FFF0E6]">
      <UtensilsCrossed className="h-14 w-14 text-[#F97316]/60" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

export default function RestaurantCard({ restaurant, onDelete }: RestaurantCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(restaurant.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 ease-out hover:scale-[1.03] hover:shadow-lg">
        <CardImage restaurant={restaurant} />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">{restaurant.name}</h2>
            <StatusBadge status={restaurant.status} />
          </div>

          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              {restaurant.cuisine}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              {restaurant.location}
            </li>
            <li className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <PriceRangeDisplay range={restaurant.priceRange} />
            </li>
            {restaurant.rating != null && restaurant.rating > 0 && (
              <li className="flex items-center gap-2">
                <StarRating rating={restaurant.rating} showValue />
              </li>
            )}
            {restaurant.recommendedDish && (
              <li className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                {restaurant.recommendedDish}
              </li>
            )}
            {restaurant.pricePaid != null && restaurant.pricePaid > 0 && (
              <li className="flex items-center gap-2 font-medium text-green-600">
                <Banknote className="h-4 w-4 shrink-0" aria-hidden />
                Rs. {restaurant.pricePaid.toLocaleString()}
              </li>
            )}
          </ul>

          <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-500 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              <Pencil className="h-4 w-4" aria-hidden />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete
            </button>
          </div>
        </div>
      </article>

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
