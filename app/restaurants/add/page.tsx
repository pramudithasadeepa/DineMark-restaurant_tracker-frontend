'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addRestaurant } from '@/lib/api';
import { AddRestaurantForm } from '@/types';

export default function AddRestaurant() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AddRestaurantForm>({
    name: '',
    cuisine: '',
    location: '',
    priceRange: 'medium',
    status: 'want_to_try',
    rating: undefined,
    review: '',
    whatIOrdered: '',
    recommendedDish: '',
    pricePaid: undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addRestaurant(form);
      router.push('/dashboard');
    } catch (error) {
      alert('Error adding restaurant');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Restaurant</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name *</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine *</label>
              <input
                type="text"
                placeholder="e.g., Italian, Chinese, Japanese, Sri Lankan"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.cuisine}
                onChange={(e) => setForm({...form, cuisine: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                placeholder="e.g., Colombo, Galle, Kandy"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.priceRange} 
                onChange={(e) => setForm({...form, priceRange: e.target.value})}
              >
                <option value="budget">$ Budget (Under 1000 LKR)</option>
                <option value="medium">$$ Medium (1000-3000 LKR)</option>
                <option value="expensive">$$$ Expensive (3000+ LKR)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={form.status} 
                onChange={(e) => setForm({...form, status: e.target.value as 'want_to_try' | 'visited'})}
              >
                <option value="want_to_try">⭐ Want to Try</option>
                <option value="visited">✅ Visited</option>
              </select>
            </div>

            {/* Visited Details - Only show if status is visited */}
            {form.status === 'visited' && (
              <div className="border-t pt-4 mt-2 space-y-4">
                <h3 className="font-semibold text-gray-800">Visited Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    placeholder="Share your experience..."
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                    value={form.review} 
                    onChange={(e) => setForm({...form, review: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What I Ordered</label>
                  <input
                    type="text"
                    placeholder="e.g., Pizza, Sushi, Curry"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.whatIOrdered} 
                    onChange={(e) => setForm({...form, whatIOrdered: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Dish</label>
                  <input
                    type="text"
                    placeholder="What dish would you recommend?"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={form.recommendedDish} 
                    onChange={(e) => setForm({...form, recommendedDish: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Paid (LKR)</label>
                  <input
                    type="number"
                    placeholder="e.g., 2500"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                disabled={loading}
                className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
              >
                {loading ? 'Saving...' : 'Save Restaurant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}