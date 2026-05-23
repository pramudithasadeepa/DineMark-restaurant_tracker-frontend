import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      if (path.startsWith('/login') || path.startsWith('/register')) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }

      const isProtected =
        path.startsWith('/dashboard') ||
        path.startsWith('/restaurants') ||
        path.startsWith('/want-to-try') ||
        path.startsWith('/visited');

      if (isProtected) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
