'use client';

import { useEffect, useRef, useState } from 'react';

type GoogleSignInButtonProps = {
  onSuccess: (credential: string) => void;
  onError?: (message: string) => void;
  className?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
            },
          ) => void;
        };
      };
    };
  }
}

const GSI_SCRIPT_ID = 'google-gsi-client';

function loadGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existing = document.getElementById(GSI_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Sign-In')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = GSI_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Sign-In'));
    document.body.appendChild(script);
  });
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
  className = '',
}: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!clientId || !containerRef.current) {
      if (!clientId) {
        onErrorRef.current?.(
          'Google Sign-In is not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID.',
        );
      }
      return;
    }

    let cancelled = false;

    const renderButton = () => {
      if (cancelled || !containerRef.current || !window.google?.accounts?.id) {
        return;
      }

      const width = Math.min(
        Math.max(containerRef.current.offsetWidth || 320, 200),
        400,
      );

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onSuccessRef.current(response.credential);
          } else {
            onErrorRef.current?.('Google sign-in did not return a credential');
          }
        },
      });

      containerRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(containerRef.current, {
        theme: 'outline',
        size: 'large',
        width,
        text: 'continue_with',
        shape: 'rectangular',
      });
      setReady(true);
    };

    loadGsiScript()
      .then(() => {
        if (!cancelled) {
          renderButton();
        }
      })
      .catch((err) => {
        onErrorRef.current?.(
          err instanceof Error ? err.message : 'Failed to load Google Sign-In',
        );
      });

    const resizeObserver = new ResizeObserver(() => {
      if (window.google?.accounts?.id) {
        renderButton();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, [clientId]);

  if (!clientId) {
    return (
      <button
        type="button"
        disabled
        className={`flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-400 ${className}`}
      >
        Google Sign-In unavailable
      </button>
    );
  }

  return (
    <div
      className={`flex min-h-[44px] w-full items-center justify-center overflow-hidden ${className} ${ready ? '' : 'opacity-60'}`}
      ref={containerRef}
      aria-label="Continue with Google"
    />
  );
}
