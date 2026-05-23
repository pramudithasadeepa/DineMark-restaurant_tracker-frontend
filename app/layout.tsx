import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppToastContainer from '@/components/AppToastContainer';
import AuthProvider from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DineMark',
  description:
    'Every meal you love, dated and remembered. Track restaurants, save favorites, and rediscover your culinary adventures.',
  themeColor: '#FFF9F2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AppToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
