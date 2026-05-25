'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import Link from 'next/link';
import { appToast } from '@/lib/appToast';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import AuthLogo from '@/components/auth/AuthLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);

      setSubmitted(true);
      appToast.login.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Failed to send reset email';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      }
      appToast.login.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthSplitLayout>
        <div className="flex min-h-0 flex-col justify-center px-6 py-8 md:px-18 lg:px-20">
          <div className="mx-auto w-full max-w-[500px]">
            <AuthLogo className="mb-6" />
            <div className="mb-8 rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-slate-900">Check your email</h1>
              <h2 className="mb-2 text-xl font-bold text-slate-900">inbox or spam</h2>
              <p className="text-sm text-slate-600">
                We sent a password reset link to <strong className="text-slate-900">{email}</strong>
              </p>
            </div>
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Back to login
            </Link>
          </div>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout>
      <div className="flex min-h-0 flex-col justify-center px-6 py-8 md:px-18 lg:px-20">
        <div className="mx-auto w-full max-w-[600px]">
          <Link href="/login" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#F97316] hover:text-[#EA580C]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>

          <AuthLogo className="mb-4" />

          <h1 className="text-2xl font-bold text-slate-900">Forgot password?</h1>
          <p className="mt-1 mb-8 text-sm text-slate-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>
      </div>
    </AuthSplitLayout>
  );
}