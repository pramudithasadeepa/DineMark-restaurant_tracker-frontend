'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api, { updateRestaurant } from '@/lib/api';
import { Restaurant } from '@/types';

export default function EditRestaurant() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        setForm(res.data);
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
      await updateRestaurant(Number(id), form);
      router.push('/dashboard');
    } catch (error) {
      alert('Error updating restaurant');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Restaurant</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.name || ''}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.cuisine || ''}
                onChange={(e) => setForm({...form, cuisine: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.location || ''}
                onChange={(e) => setForm({...form, location: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.priceRange || 'medium'} 
                onChange={(e) => setForm({...form, priceRange: e.target.value})}
              >
                <option value="budget">$ Budget</option>
                <option value="medium">$$ Medium</option>
                <option value="expensive">$$$ Expensive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.status || 'want_to_try'} 
                onChange={(e) => setForm({...form, status: e.target.value as 'want_to_try' | 'visited'})}
              >
                <option value="want_to_try">⭐ Want to Try</option>
                <option value="visited">✅ Visited</option>
              </select>
            </div>

            {form.status === 'visited' && (
              <div className="border-t pt-4 mt-2 space-y-4">
                <h3 className="font-semibold text-gray-800">Visited Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={form.rating || ''} 
                    onChange={(e) => setForm({...form, rating: parseInt(e.target.value) || undefined})}
                  >
                    <option value="">Select Rating</option>
                    {[1,2,3,4,5].map(r => (
                      <option key={r} value={r}>{'⭐'.repeat(r)} {r}/5</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    value={form.review || ''} 
                    onChange={(e) => setForm({...form, review: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What I Ordered</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={form.whatIOrdered || ''} 
                    onChange={(e) => setForm({...form, whatIOrdered: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Dish</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={form.recommendedDish || ''} 
                    onChange={(e) => setForm({...form, recommendedDish: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Paid (LKR)</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    value={form.pricePaid || ''} 
                    onChange={(e) => setForm({...form, pricePaid: parseFloat(e.target.value) || undefined})}
                  />
                </div>
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
              >
                {saving ? 'Saving...' : 'Update Restaurant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}