'use client';

import Link from 'next/link';
import {
  Check,
  ChevronRight,
  ClipboardList,
  Map,
  Sparkles,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';

const features: {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
}[] = [
  {
    icon: ClipboardList,
    iconClass: 'text-[#FF4D20]',
    title: 'Log Every Meal',
    description:
      'Keep a record of every restaurant you visit — what you ate, when, and with whom.',
  },
  {
    icon: Star,
    iconClass: 'text-amber-500 fill-amber-500',
    title: 'Rate & Review',
    description:
      'Rate your experience, write reviews, and remember what dishes you loved most.',
  },
  {
    icon: Map,
    iconClass: 'text-[#E85D04]',
    title: 'Wishlist & Explore',
    description: 'Save restaurants you want to try and never forget a food spot again.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Sign up for free in under a minute',
  },
  {
    number: 2,
    title: 'Add Restaurants',
    description: "Log places you've visited or want to try",
  },
  {
    number: 3,
    title: 'Review & Remember',
    description: 'Add ratings, reviews, and track your favorites',
  },
];

const stats = [
  '500+ Restaurants Tracked',
  '1,000+ Happy Foodies',
  '50+ Cities Covered',
];

export default function WelcomePage() {
  return (
    <div className="bg-[#FFF9F2] text-slate-900">
      <LandingHeader />

      {/* Hero */}
      <section className="px-6 pb-20 pt-12 text-center md:px-8 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#FFE8D6] px-4 py-2 text-sm font-medium text-[#E85D04]">
            <Sparkles className="h-4 w-4" aria-hidden />
            Your Food Journey Starts Here
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Your Personal
            <br />
            <span className="text-[#FF4D20]">Restaurant Diary</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Every meal you love, dated and remembered. Track restaurants, save favorites, and
            rediscover your culinary adventures one bite at a time.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="btn-dinemark gap-1 px-8 py-4 text-base">
              Start your diary — it&apos;s free
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link href="/login" className="btn-dinemark-outline min-w-[140px]">
              Sign in
            </Link>
          </div>

          <ul className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            {stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="h-4 w-4 font-bold text-[#FF4D20]" strokeWidth={3} aria-hidden />
                {stat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Everything you need to track your food adventures
            </h2>
            <p className="mt-4 text-slate-600">
              Simple, beautiful, and made for food lovers like you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-md"
                >
                  <Icon className={`h-10 w-10 ${feature.iconClass}`} strokeWidth={1.75} aria-hidden />
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-[#FFFBF5] px-6 py-20 md:px-8 md:py-24"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, #FFFCF7 0%, #FFFBF5 70%)',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">How DineMark Works</h2>
            <p className="mt-4 text-slate-600">Three simple steps to start your food diary</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4D20] text-xl font-bold text-white shadow-lg shadow-orange-500/30">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#FF5F00] to-[#FF3B3B] px-6 py-20 text-center text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to start your food diary?</h2>
          <p className="mt-4 text-lg text-white/90">
            Join thousands of food lovers who track their culinary adventures with DineMark
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-lg bg-white px-10 py-4 text-base font-bold text-[#FF4D20] shadow-lg transition hover:bg-orange-50"
          >
            Get Started — It&apos;s Free
          </Link>
          <p className="mt-4 text-sm text-white/80">No credit card required • Free forever</p>
        </div>
      </section>
    </div>
  );
}
