export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
        <p className="mt-2 text-slate-600">Loading...</p>
      </div>
    </div>
  );
}


