import Link from 'next/link';

type DineMarkLogoProps = {
  href?: string;
  variant?: 'light' | 'dark';
  className?: string;
};

export default function DineMarkLogo({
  href = '/',
  variant = 'light',
  className = '',
}: DineMarkLogoProps) {
  const dineColor = variant === 'light' ? 'text-slate-900' : 'text-white';
  const markColor = 'text-[#EF4444]';

  const logo = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0E6] text-base">
        🍽️
      </span>
      <span className={`text-xl font-bold tracking-tight ${dineColor}`}>
        Dine<span className={markColor}>Mark</span>
      </span>
    </span>
  );

  if (href) {
    return <Link href={href}>{logo}</Link>;
  }

  return logo;
}
