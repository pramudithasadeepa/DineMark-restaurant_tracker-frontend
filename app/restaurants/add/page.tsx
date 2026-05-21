'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
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
  imageUrl: '',
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
        imageUrl: form.imageUrl || undefined,
      });
      toast.success('Restaurant added successfully!');
      router.push('/dashboard');
    } catch {
      toast.error('Failed to add restaurant. Please try again.');
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
