'use client';

import Link from 'next/link';
import DineMarkLogo from '@/components/DineMarkLogo';

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F2]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
        <DineMarkLogo href="/" />

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-800 transition hover:text-[#FF4D20]"
          >
            Sign in
          </Link>
          <Link href="/register" className="btn-dinemark px-5 py-2.5 text-sm">
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}
