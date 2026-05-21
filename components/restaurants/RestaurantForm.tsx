'use client';

import type { ReactNode } from 'react';
import {
  Bookmark,
  ChefHat,
  ChevronDown,
  MapPin,
  UtensilsCrossed,
  X,
} from 'lucide-react';

export type RestaurantFormData = {
  name: string;
  cuisine: string;
  location: string;
  priceRange: string;
  status: 'want_to_try' | 'visited';
  rating?: number;
  review?: string;
  whatIOrdered?: string;
  recommendedDish?: string;
  pricePaid?: number;
};

type RestaurantFormProps = {
  title: string;
  submitLabel: string;
  form: RestaurantFormData;
  setForm: React.Dispatch<React.SetStateAction<RestaurantFormData>>;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20';

const selectClass = `${inputClass} appearance-none cursor-pointer`;

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {children}
      {required && <span className="text-[#FF4D20]"> *</span>}
    </label>
  );
}

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      {children}
    </span>
  );
}

function InputWrap({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative mt-1.5">
      <FieldIcon>{icon}</FieldIcon>
      {children}
    </div>
  );
}

const fieldIconClass = 'h-4 w-4';

export default function RestaurantForm({
  title,
  submitLabel,
  form,
  setForm,
  loading,
  onSubmit,
  onCancel,
}: RestaurantFormProps) {
  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC] px-4 py-10 md:py-14">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#FF8A00]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#FF6B9D]/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-orange-900/10">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#FF8A00] via-[#FF6B35] to-[#FF3D3B] px-6 py-7 md:px-8 md:py-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm">
                <UtensilsCrossed className={`${fieldIconClass} text-white`} aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
                  DineMark
                </p>
                <h1 className="mt-1 font-serif text-2xl font-semibold text-white md:text-3xl">
                  {title}
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            {/* Form body */}
            <div className="space-y-5 p-6 md:p-8">
              <div>
                <Label required>Restaurant Name</Label>
                <InputWrap icon={<UtensilsCrossed className={fieldIconClass} aria-hidden />}>
                  <input
                    type="text"
                    className={`${inputClass} pl-10`}
                    placeholder="e.g., Ministry of Crab"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </InputWrap>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label required>Cuisine</Label>
                  <InputWrap icon={<ChefHat className={fieldIconClass} aria-hidden />}>
                    <input
                      type="text"
                      className={`${inputClass} pl-10`}
                      placeholder="e.g., Italian, Chinese"
                      value={form.cuisine}
                      onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
                      required
                    />
                  </InputWrap>
                </div>

                <div>
                  <Label required>Location</Label>
                  <InputWrap icon={<MapPin className={fieldIconClass} aria-hidden />}>
                    <input
                      type="text"
                      className={`${inputClass} pl-10`}
                      placeholder="e.g., Colombo"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      required
                    />
                  </InputWrap>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Price Range</Label>
                  <div className="relative mt-1.5">
                    <select
                      className={`${selectClass} pl-3 pr-10`}
                      value={form.priceRange}
                      onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="budget">$ Budget (Under 1000 LKR)</option>
                      <option value="medium">$$ Medium (1000–3000 LKR)</option>
                      <option value="expensive">$$$ Expensive (3000+ LKR)</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <ChevronDown className={fieldIconClass} aria-hidden />
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="relative mt-1.5">
                    <select
                      className={`${selectClass} pl-3 pr-10`}
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value as 'want_to_try' | 'visited',
                        })
                      }
                    >
                      <option value="want_to_try">Want to Try</option>
                      <option value="visited">Visited</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <ChevronDown className={fieldIconClass} aria-hidden />
                    </span>
                  </div>
                </div>
              </div>

              {form.status === 'visited' && (
                <div className="space-y-5 border-t border-slate-100 pt-6">
                  <h2 className="text-sm font-semibold text-slate-800">Visited details</h2>

                  <div>
                    <Label>Rating</Label>
                    <div className="relative mt-1.5">
                      <select
                        className={`${selectClass} pl-3 pr-10`}
                        value={form.rating ?? ''}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rating: e.target.value ? parseInt(e.target.value, 10) : undefined,
                          })
                        }
                      >
                        <option value="">Select...</option>
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} out of 5
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <ChevronDown className={fieldIconClass} aria-hidden />
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label>Review</Label>
                    <textarea
                      className={`${inputClass} mt-1.5 resize-none`}
                      rows={3}
                      placeholder="Share your experience..."
                      value={form.review ?? ''}
                      onChange={(e) => setForm({ ...form, review: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>What I Ordered</Label>
                      <input
                        type="text"
                        className={`${inputClass} mt-1.5`}
                        placeholder="e.g., Pizza, Sushi"
                        value={form.whatIOrdered ?? ''}
                        onChange={(e) => setForm({ ...form, whatIOrdered: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Recommended Dish</Label>
                      <input
                        type="text"
                        className={`${inputClass} mt-1.5`}
                        placeholder="What would you recommend?"
                        value={form.recommendedDish ?? ''}
                        onChange={(e) => setForm({ ...form, recommendedDish: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Price Paid (LKR)</Label>
                    <input
                      type="number"
                      className={`${inputClass} mt-1.5`}
                      placeholder="e.g., 2500"
                      value={form.pricePaid ?? ''}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          pricePaid: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:min-w-[120px]"
              >
                <X className={fieldIconClass} aria-hidden />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF8A00] to-[#FF3D3B] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-none sm:flex-none sm:min-w-[200px]"
              >
                <Bookmark className={fieldIconClass} aria-hidden />
                {loading ? 'Saving...' : submitLabel}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          DineMark · Your personal restaurant journal
        </p>
      </div>
    </div>
  );
}
