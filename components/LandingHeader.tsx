'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import DineMarkLogo from '@/components/DineMarkLogo';

export default function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FFF9F2]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
          <DineMarkLogo href="/" />


          <div className="hidden md:flex items-center gap-4 md:gap-6">
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

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg text-[#F97316] hover:bg-orange-50 transition-colors duration-200"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>


      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'
          }`}
        aria-hidden={!isOpen}
      >

        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={close}
        />


        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw]
            bg-gradient-to-b from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC]
            shadow-2xl border-l border-white/50
            flex flex-col
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >

          <div className="flex items-center justify-between px-5 py-5 border-b border-orange-100/60">
            <DineMarkLogo href="/" />
            <button
              onClick={close}
              className="flex items-center justify-center h-8 w-8 rounded-lg text-[#F97316] hover:bg-white/60 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>


          <nav className="flex flex-col gap-2 px-4 py-6 flex-1" aria-label="Mobile navigation">
            <Link
              href="/login"
              onClick={close}
              className="btn-dinemark px-5 py-2.5 text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={close}
              className="btn-dinemark px-5 py-2.5 text-sm mt-3"
            >
              Create account
            </Link>
          </nav>

        </aside>
      </div>
    </>
  );
}