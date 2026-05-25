'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password'];
      const isPublicRoute = publicRoutes.includes(pathname);

      if (!user && !isPublicRoute) {
        router.replace('/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return <>{children}</>;
}