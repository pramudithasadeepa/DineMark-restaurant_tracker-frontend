import Image from 'next/image';
import Link from 'next/link';
import dinemarkLogo from '@/app/DineMark_logo.png';

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
      <span className="relative h-12 w-12 shrink-0">
        <Image
          src={dinemarkLogo}
          alt="DineMark logo"
          fill
          className="rounded-lg object-contain"
          sizes="36px"
          priority
        />
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
