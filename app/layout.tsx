import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppToastContainer from '@/components/AppToastContainer';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthGuard from '@/components/auth/AuthGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DineMark',
  description: 'Every meal you love, dated and remembered.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`} suppressHydrationWarning>
        <AuthProvider>
          <AuthGuard>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AppToastContainer />
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}