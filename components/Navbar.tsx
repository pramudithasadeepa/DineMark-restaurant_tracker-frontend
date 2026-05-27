'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import DineMarkLogo from '@/components/DineMarkLogo';
import { useState, useEffect, useCallback } from 'react';

const tabs = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/want-to-try', label: 'Want to Try' },
  { href: '/visited', label: 'Visited' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userImage = user?.photoURL;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      setIsMobileMenuOpen(false);
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      router.replace('/login');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Logout failed:', error);
      window.location.href = '/login';
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (path: string) => pathname === path;

  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    return null;
  }

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
        <div className="grid h-16 w-full items-center px-3 sm:px-4
          grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
          gap-2 sm:gap-4">

          <div className="min-w-0 justify-self-start overflow-hidden">
            <DineMarkLogo href="/dashboard" />
          </div>

          <nav
            className="hidden md:flex shrink-0 items-center gap-10 whitespace-nowrap sm:gap-5"
            aria-label="Main navigation"
          >
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

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 whitespace-nowrap sm:gap-3">
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
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

              <span className="max-w-[8rem] truncate text-xs text-black sm:max-w-[12rem] sm:text-sm md:max-w-none">
                Welcome, {userName}!
              </span>

              <button
                onClick={handleLogout}
                className="btn-dinemark shrink-0 cursor-pointer gap-1 px-3 py-1.5 text-xs transition-all duration-200 hover:scale-105 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-[#F97316] hover:bg-white/60 transition-colors duration-200"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="h-16 shrink-0" aria-hidden="true" />

      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'
          }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        />

        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw]
            bg-gradient-to-b from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC]
            shadow-2xl border-l border-white/50
            flex flex-col
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100/60">
            <DineMarkLogo href="/dashboard" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center h-8 w-8 rounded-lg text-[#F97316] hover:bg-white/60 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 px-5 py-4 border-b border-orange-100/60 bg-white/30">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full border-2 border-orange-200 object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs text-orange-400 font-medium">Welcome back</p>
              <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4 flex-1" aria-label="Mobile navigation">
            {tabs.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={handleNavClick}
                  className={`flex items-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white shadow-md shadow-orange-200'
                      : 'text-gray-700 hover:bg-white/60 hover:text-[#F97316] hover:translate-x-1'
                    }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-5 border-t border-orange-100/60">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3
                bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white text-sm font-bold
                shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}