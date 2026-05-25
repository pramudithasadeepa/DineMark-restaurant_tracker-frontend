'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import Link from 'next/link';
import { appToast } from '@/lib/appToast';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import AuthLogo from '@/components/auth/AuthLogo';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validCode, setValidCode] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode || mode !== 'resetPassword') {
        setVerifying(false);
        return;
      }

      try {
        await verifyPasswordResetCode(auth, oobCode);
        setValidCode(true);
      } catch (error) {
        console.error('Invalid or expired action code', error);
        appToast.login.error('The password reset link is invalid or has expired.');
      } finally {
        setVerifying(false);
      }
    };

    verifyCode();
  }, [oobCode, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;

    if (password.length < 6) {
      appToast.login.error('Password should be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      appToast.login.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      appToast.login.success('Password has been reset successfully!');
      router.push('/login');
    } catch (error: any) {
      console.error(error);
      appToast.login.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <AuthSplitLayout>
        <div className="flex min-h-0 flex-col items-center justify-center px-6 py-8 md:px-18 lg:px-20 h-full">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
        </div>
      </AuthSplitLayout>
    );
  }

  if (!validCode) {
    return (
      <AuthSplitLayout>
        <div className="flex min-h-0 flex-col justify-center px-6 py-8 md:px-18 lg:px-20">
          <div className="mx-auto w-full max-w-[600px]">
            <AuthLogo className="mb-4" />
            <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-slate-900">Invalid Link</h1>
              <p className="text-sm text-slate-600">
                This password reset link is invalid or has already been used. Please request a new one.
              </p>
            </div>
            <Link
              href="/forgot-password"
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Request new link
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
          <AuthLogo className="mb-4" />

          <h1 className="text-2xl font-bold text-slate-900">Create new password</h1>
          <p className="mt-1 mb-8 text-sm text-slate-500">
            Your new password must be different from previous used passwords.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                New password
              </label>
              <PasswordInput
                id="new-password"
                value={password}
                onChange={setPassword}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Confirm new password
              </label>
              <PasswordInput
                id="confirm-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </div>
    </AuthSplitLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthSplitLayout>
        <div className="flex min-h-0 flex-col items-center justify-center px-6 py-8 md:px-18 lg:px-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
        </div>
      </AuthSplitLayout>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
