type SearchFiltersProps = {
  searchTerm: string;
  cuisineFilter: string;
  priceFilter: string;
  statusFilter: string;
  uniqueCuisines: string[];
  showStatusFilter?: boolean;
  onSearchChange: (value: string) => void;
  onCuisineChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export default function SearchFilters({
  searchTerm,
  cuisineFilter,
  priceFilter,
  statusFilter,
  uniqueCuisines,
  showStatusFilter = true,
  onSearchChange,
  onCuisineChange,
  onPriceChange,
  onStatusChange,
}: SearchFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative lg:col-span-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search restaurants by name..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
          value={cuisineFilter}
          onChange={(e) => onCuisineChange(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {uniqueCuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
          value={priceFilter}
          onChange={(e) => onPriceChange(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="budget">$ Budget</option>
          <option value="medium">$$ Medium</option>
          <option value="expensive">$$$ Expensive</option>
        </select>
        {showStatusFilter ? (
          <select
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="visited">Visited</option>
            <option value="want_to_try">Want to Try</option>
          </select>
        ) : (
          <div className="hidden lg:block" />
        )}
      </div>
    </div>
  );
}
