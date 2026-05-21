'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import api, { updateRestaurant } from '@/lib/api';
import RestaurantForm, {
  type RestaurantFormData,
} from '@/components/restaurants/RestaurantForm';

export default function EditRestaurant() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<RestaurantFormData>({
    name: '',
    cuisine: '',
    location: '',
    priceRange: '',
    status: 'want_to_try',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        const data = res.data;
        setForm({
          name: data.name ?? '',
          cuisine: data.cuisine ?? '',
          location: data.location ?? '',
          priceRange: data.priceRange ?? '',
          status: data.status ?? 'want_to_try',
          imageUrl: data.imageUrl ?? '',
          rating: data.rating,
          review: data.review ?? '',
          whatIOrdered: data.whatIOrdered ?? '',
          recommendedDish: data.recommendedDish ?? '',
          pricePaid: data.pricePaid,
        });
      } catch (error) {
        console.error(error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateRestaurant(Number(id), {
        ...form,
        priceRange: form.priceRange || 'medium',
        imageUrl: form.imageUrl || undefined,
      });
      toast.success('Restaurant updated successfully!');
      router.push('/dashboard');
    } catch {
      toast.error('Failed to update restaurant. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
          <p className="mt-2 text-slate-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  return (
    <RestaurantForm
      title="Edit Restaurant"
      submitLabel="Save Restaurant"
      form={form}
      setForm={setForm}
      loading={saving}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
    />
  );
}
