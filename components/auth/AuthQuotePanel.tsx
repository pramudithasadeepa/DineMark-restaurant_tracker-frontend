export default function AuthQuotePanel() {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#1a120b] p-10 md:p-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_#2a1f14_0%,_#1a120b_70%)]"
        aria-hidden
      />

      <div className="relative z-10">
        <span className="text-6xl font-serif leading-none text-[#F97316] md:text-7xl" aria-hidden>
          &ldquo;
        </span>
        <blockquote className="mt-4 max-w-md text-2xl font-medium leading-snug text-white md:text-3xl">
          Good food is the foundation of genuine happiness.
        </blockquote>
        <p className="mt-6 text-base font-medium text-[#F97316]">— Auguste Escoffier</p>
      </div>

      <div className="relative z-10 border-t border-white/10 pt-6">
        <p className="text-sm text-white/50">
          Every meal, every memory, every place — tracked with heart.
        </p>
      </div>
    </div>
  );
}
