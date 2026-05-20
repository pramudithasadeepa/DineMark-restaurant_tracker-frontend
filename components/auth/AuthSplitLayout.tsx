import AuthQuotePanel from '@/components/auth/AuthQuotePanel';

type AuthSplitLayoutProps = {
  children: React.ReactNode;
};

/** Full-viewport 50/50 split — layout only; panel content/styles unchanged. */
export default function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden h-full w-1/2 shrink-0 md:block">
        <AuthQuotePanel />
      </div>
      <div className="flex h-full w-full shrink-0 flex-col overflow-y-auto bg-white md:w-1/2 md:overflow-hidden">
        {children}
      </div>
    </div>
  );
}
