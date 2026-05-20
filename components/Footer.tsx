'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DineMarkLogo from '@/components/DineMarkLogo';

const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  if (pathname === '/') {
    return (
      <footer className="bg-[#0F172A] text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <DineMarkLogo href="/" variant="dark" />
            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-8 text-center text-xs text-slate-500">
            © 2026 DineMark. Every meal, remembered.
          </p>
        </div>
      </footer>
    );
  }

  const isAppPage =
    pathname === '/dashboard' ||
    pathname === '/want-to-try' ||
    pathname === '/visited' ||
    pathname.startsWith('/restaurants');

  if (isAppPage) {
    return (
      <footer className="mt-auto border-t border-slate-100 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
          <DineMarkLogo href="/dashboard" />
          <p className="mt-3 text-sm text-slate-500">© 2026 DineMark. Every meal, remembered.</p>
        </div>
      </footer>
    );
  }

  return null;
}
