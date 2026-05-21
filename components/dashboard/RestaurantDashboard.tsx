'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRestaurants, deleteRestaurant } from '@/lib/api';
import { Restaurant } from '@/types';
import StatCards from '@/components/dashboard/StatCards';
import SearchFilters from '@/components/dashboard/SearchFilters';
import RestaurantCard from '@/components/dashboard/RestaurantCard';

export type StatusFilterMode = 'all' | 'want_to_try' | 'visited';

type RestaurantDashboardProps = {
  statusFilter: StatusFilterMode;
  sectionTitle: string;
  emptyMessage: string;
  showStatCards?: boolean;
};

export default function RestaurantDashboard({
  statusFilter,
  sectionTitle,
  emptyMessage,
  showStatCards = false,
}: RestaurantDashboardProps) {
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [statusFilterLocal, setStatusFilterLocal] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchRestaurants();
  }, [router]);

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setAllRestaurants(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const rated = allRestaurants.filter((r) => r.rating);
    const averageRating =
      rated.length > 0
        ? rated.reduce((acc, r) => acc + (r.rating || 0), 0) / rated.length
        : 0;
    return {
      total: allRestaurants.length,
      visitedCount: allRestaurants.filter((r) => r.status === 'visited').length,
      wantToTryCount: allRestaurants.filter((r) => r.status === 'want_to_try').length,
      averageRating,
    };
  }, [allRestaurants]);

  const uniqueCuisines = useMemo(
    () => [...new Set(allRestaurants.map((r) => r.cuisine))],
    [allRestaurants]
  );

  const restaurants = useMemo(() => {
    let filtered = [...allRestaurants];

    if (statusFilter === 'want_to_try') {
      filtered = filtered.filter((r) => r.status === 'want_to_try');
    } else if (statusFilter === 'visited') {
      filtered = filtered.filter((r) => r.status === 'visited');
    }

    if (searchTerm) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (cuisineFilter) {
      filtered = filtered.filter((r) => r.cuisine === cuisineFilter);
    }
    if (priceFilter) {
      filtered = filtered.filter((r) => r.priceRange === priceFilter);
    }
    if (statusFilter === 'all' && statusFilterLocal) {
      filtered = filtered.filter((r) => r.status === statusFilterLocal);
    }

    return filtered;
  }, [
    allRestaurants,
    statusFilter,
    searchTerm,
    cuisineFilter,
    priceFilter,
    statusFilterLocal,
  ]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      await deleteRestaurant(id);
      fetchRestaurants();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
          <p className="mt-2 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FFF9F2]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {showStatCards && <StatCards stats={stats} />}

        <div className={showStatCards ? 'mt-6' : undefined}>
          <SearchFilters
            searchTerm={searchTerm}
            cuisineFilter={cuisineFilter}
            priceFilter={priceFilter}
            statusFilter={statusFilterLocal}
            uniqueCuisines={uniqueCuisines}
            showStatusFilter={statusFilter === 'all'}
            onSearchChange={setSearchTerm}
            onCuisineChange={setCuisineFilter}
            onPriceChange={setPriceFilter}
            onStatusChange={setStatusFilterLocal}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{sectionTitle}</h2>
          <Link
            href="/restaurants/add"
            className="btn-dinemark gap-2 px-5 py-2.5 text-sm"
          >
            <span className="text-lg leading-none">+</span>
            Add restaurant
          </Link>
        </div>

        {restaurants.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm">
            <p className="text-slate-500">{emptyMessage}</p>
            <Link
              href="/restaurants/add"
              className="mt-4 inline-block text-sm font-semibold text-[#F97316] hover:underline"
            >
              Add your first restaurant →
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
