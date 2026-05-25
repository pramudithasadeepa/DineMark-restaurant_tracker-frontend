'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DineMarkLogo from '@/components/DineMarkLogo';

const tabs = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/want-to-try', label: 'Want to Try' },
  { href: '/visited', label: 'Visited' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const userName = user?.name ?? 'User';
  const userImage = user?.image;

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const isActive = (path: string) => pathname === path;

  if (pathname === '/' || pathname === '/login' || pathname === '/register') return null;

  const isDashboardArea = pathname === '/dashboard' || pathname === '/want-to-try' || pathname === '/visited' || pathname.startsWith('/restaurants');
  if (!isDashboardArea) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/50 bg-gradient-to-br from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC] shadow-sm">
        <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-4 sm:px-4">
          <div className="min-w-0 justify-self-start">
            <DineMarkLogo href="/dashboard" />
          </div>

          <nav className="flex shrink-0 items-center gap-10 whitespace-nowrap sm:gap-5">
            {tabs.map((tab) => (
              <Link key={tab.href} href={tab.href} className={`rounded-md px-2.5 py-1.5 text-xs font-bold transition sm:px-3.5 sm:text-sm ${isActive(tab.href) ? 'bg-white/70 text-[#F97316] shadow-sm' : 'text-black hover:bg-white/50 hover:text-orange-400'}`}>
                {tab.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 whitespace-nowrap sm:gap-3">
            {userImage ? (
              <Image src={userImage} alt={userName} width={32} height={32} className="h-8 w-8 rounded-full border border-orange-200 object-cover" unoptimized />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="max-w-[8rem] truncate text-xs text-black sm:max-w-[12rem] sm:text-sm">Welcome, {userName}!</span>
            <button onClick={handleLogout} className="btn-dinemark cursor-pointer gap-1 px-3 py-1.5 text-xs sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="h-16 shrink-0" />
    </>
  );
}