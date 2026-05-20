import Link from 'next/link';

export default function AuthLogo() {
  return (
    <Link href="/" className="mb-8 inline-flex items-center gap-2">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-500">
        🍽️
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-800">
        Dine<span className="text-[#EF4444]">Mark</span>
      </span>
    </Link>
  );
}
