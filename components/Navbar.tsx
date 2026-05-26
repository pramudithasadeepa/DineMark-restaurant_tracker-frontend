'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import DineMarkLogo from '@/components/DineMarkLogo';

const tabs = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/want-to-try', label: 'Want to Try' },
  { href: '/visited', label: 'Visited' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Get user from Firebase directly (no context dependency)
  const user = auth.currentUser;
  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userImage = user?.photoURL;

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Clear all storage to remove any cached data
      localStorage.clear();
      sessionStorage.clear();

      // Use replace instead of push to prevent back button issue
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback if router.replace fails
      window.location.href = '/login';
    }
  };

  const isActive = (path: string) => pathname === path;

  // Don't show navbar on landing, login, register pages
  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    return null;
  }

  // Show navbar only on dashboard area
  const isDashboardArea =
    pathname === '/dashboard' ||
    pathname === '/want-to-try' ||
    pathname === '/visited' ||
    pathname.startsWith('/restaurants');

  if (!isDashboardArea) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/50 bg-gradient-to-br from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC] shadow-sm">
        <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-4 sm:px-4">
          {/* Left side - Logo */}
          <div className="min-w-0 justify-self-start overflow-hidden">
            <DineMarkLogo href="/dashboard" />
          </div>

          {/* Center - Navigation Tabs */}
          <nav className="flex shrink-0 items-center gap-10 whitespace-nowrap sm:gap-5" aria-label="Main navigation">
            {tabs.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-bold transition-all duration-200 sm:px-3.5 sm:text-sm ${active
                    ? 'bg-white/70 text-[#F97316] shadow-sm'
                    : 'text-black hover:bg-white/50 hover:-translate-y-0.5 hover:text-orange-400'
                    }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side - User Info + Logout */}
          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 whitespace-nowrap sm:gap-3">
            {/* User Avatar */}
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full border border-orange-200 object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Welcome Message */}
            <span className="max-w-[8rem] truncate text-xs text-black sm:max-w-[12rem] sm:text-sm md:max-w-none">
              Welcome, {userName}!
            </span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn-dinemark shrink-0 cursor-pointer gap-1 px-3 py-1.5 text-xs transition-all duration-200 hover:scale-105 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
}