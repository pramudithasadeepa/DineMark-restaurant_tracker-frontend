"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DineMarkLogo from "@/components/DineMarkLogo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isAppPage =
    pathname === "/dashboard" ||
    pathname === "/want-to-try" ||
    pathname === "/visited" ||
    pathname.startsWith("/restaurants");

  const logoHref = isAppPage ? "/dashboard" : "/";

  return (
    <footer className="mt-auto bg-[#0F172A] text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <DineMarkLogo href={logoHref} variant="dark" />
          <p className="text-center text-xs text-slate-500">
            © 2026 DineMark. Every meal, remembered.
          </p>
        </div>
      </div>
    </footer>
  );
}
