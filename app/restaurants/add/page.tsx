'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addRestaurant } from '@/lib/api';
import RestaurantForm, {
  type RestaurantFormData,
} from '@/components/restaurants/RestaurantForm';

const initialForm: RestaurantFormData = {
  name: '',
  cuisine: '',
  location: '',
  priceRange: '',
  status: 'want_to_try',
  rating: undefined,
  review: '',
  whatIOrdered: '',
  recommendedDish: '',
  pricePaid: undefined,
};

export default function AddRestaurant() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RestaurantFormData>(initialForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addRestaurant({
        ...form,
        priceRange: form.priceRange || 'medium',
      });
      router.push('/dashboard');
    } catch {
      alert('Error adding restaurant');
      setLoading(false);
    }
  };

  return (
    <RestaurantForm
      title="Add New Restaurant"
      submitLabel="Save Restaurant"
      form={form}
      setForm={setForm}
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
    />
  );
}
