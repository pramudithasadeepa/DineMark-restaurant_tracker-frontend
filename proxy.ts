import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Edge-safe route protection. Do not import auth.ts here (Prisma/pg/bcrypt).
 */
export async function proxy(request: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  const token = secret
    ? await getToken({
        req: request,
        secret,
        salt: 'authjs.session-token',
        secureCookie: process.env.NODE_ENV === 'production',
      })
    : null;

  const isLoggedIn = !!token;
  const path = request.nextUrl.pathname;

  if (path.startsWith('/login') || path.startsWith('/register')) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  const isProtected =
    path.startsWith('/dashboard') ||
    path.startsWith('/restaurants') ||
    path.startsWith('/want-to-try') ||
    path.startsWith('/visited');

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/restaurants/:path*',
    '/want-to-try/:path*',
    '/visited/:path*',
    '/login',
    '/register',
  ],
};
