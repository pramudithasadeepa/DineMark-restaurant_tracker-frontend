'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { appToast } from '@/lib/appToast';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import AuthLogo from '@/components/auth/AuthLogo';
import PasswordInput from '@/components/auth/PasswordInput';
import Link from 'next/link';

type AuthTab = 'login' | 'register';

function AuthPageContent({ initialTab = 'login' }: { initialTab?: AuthTab }) {
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user, loading: authLoading } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) router.push('/dashboard');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (searchParams.get('tab') === 'register') setTab('register');
    if (searchParams.get('registered') === 'true') {
      setTab('login');
      appToast.login.success('Account created! Sign in to continue.');
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      appToast.login.success('Logged in with Google!');
      router.push('/dashboard');
    } catch {
      appToast.login.error('Google sign in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      await loginWithEmail(loginEmail, loginPassword);
      appToast.login.success('Logged in successfully!');
      router.push('/dashboard');
    } catch {
      setLoginError('Invalid credentials');
      appToast.login.error('Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    setRegisterLoading(true);
    setRegisterError('');
    try {
      await registerWithEmail(form.email, form.password, form.name);
      appToast.login.success('Account created! Please sign in.');
      setTab('login');
    } catch {
      setRegisterError('Registration failed');
      appToast.login.error('Registration failed');
    } finally {
      setRegisterLoading(false);
    }
  };

  const googleButtonClass = "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60";

  return (
    <AuthSplitLayout>
      <div className={`flex min-h-0 flex-col px-6 md:px-18 lg:px-20 ${tab === 'register' ? 'justify-center py-6' : 'justify-center py-8'}`}>
        {tab === 'login' ? (
          <>
            <AuthLogo />
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to your food diary</p>

            {loginError && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{loginError}</div>}

            <div className="mt-8 space-y-5">
              <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className={googleButtonClass}>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {googleLoading ? "Signing in..." : "Continue with Google"}
              </button>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" className="auth-input" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-[#F97316] hover:text-[#EA580C]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput id="login-password" value={loginPassword} onChange={setLoginPassword} />
                </div>
                <button type="submit" disabled={loginLoading} className="btn-auth-primary mt-2">
                  {loginLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to DineMark? <button onClick={() => setTab('register')} className="font-semibold text-[#F97316]">Create an account</button>
            </p>
          </>
        ) : (
          <div className="mx-auto w-full max-w-[500px]">
            <AuthLogo className="mb-6" />
            <h1 className="text-2xl font-bold text-slate-900">Welcome to DineMark</h1>
            <p className="mt-1 text-sm text-slate-500">Create your free account</p>

            {registerError && <div className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{registerError}</div>}

            <div className="mt-6 space-y-4">
              <button type="button" onClick={handleGoogleSignIn} disabled={googleLoading} className={googleButtonClass}>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {googleLoading ? "Creating account..." : "Continue with Google"}
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                  <input type="text" className="auth-register-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" className="auth-register-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                  <PasswordInput id="register-password" inputClassName="auth-register-input" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Confirm password</label>
                  <PasswordInput id="confirmPassword" inputClassName="auth-register-input" value={form.confirmPassword} onChange={(v) => setForm({ ...form, confirmPassword: v })} />
                </div>
                <button type="submit" disabled={registerLoading} className="btn-auth-register mt-1">
                  {registerLoading ? "Creating account..." : "Create account"}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <button onClick={() => setTab('login')} className="font-semibold text-[#F97316]">Sign in</button>
            </p>
          </div>
        )}
      </div>
    </AuthSplitLayout>
  );
}

export default function AuthPage(props: { initialTab?: AuthTab }) {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" /></div>}>
      <AuthPageContent {...props} />
    </Suspense>
  );
}