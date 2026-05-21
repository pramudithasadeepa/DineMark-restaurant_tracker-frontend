"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import DineMarkLogo from "@/components/DineMarkLogo";

const tabs = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/want-to-try", label: "Want to Try" },
  { href: "/visited", label: "Visited" },
];

export default function Navbar() {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isDashboardArea =
    pathname === "/dashboard" ||
    pathname === "/want-to-try" ||
    pathname === "/visited" ||
    pathname.startsWith("/restaurants");

  if (!isDashboardArea) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/50 bg-gradient-to-br from-[#FFE8D6] via-[#FFF5EE] to-[#FFE4EC] shadow-sm">
        <div className="grid h-16 w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:gap-4 sm:px-4">
          {/* Left: logo */}
          <div className="min-w-0 justify-self-start overflow-hidden">
            <DineMarkLogo href="/dashboard" />
          </div>

          {/* Center: navigation */}
          <nav
            className="flex shrink-0 items-center gap-10 whitespace-nowrap sm:gap-2"
            aria-label="Main"
          >
            {tabs.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition sm:px-3.5 sm:text-sm ${
                    active
                      ? "bg-white/70 text-[#F97316] shadow-sm"
                      : "text-black hover:bg-white/50 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: user + logout */}
          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 whitespace-nowrap sm:gap-3">
            <span className="max-w-[8rem] truncate text-xs text-black sm:max-w-[12rem] sm:text-sm md:max-w-none">
              Welcome, {userName || "User"}!
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-dinemark shrink-0 gap-1 px-3 py-1.5 text-xs sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span aria-hidden>→</span>
              Logout
            </button>
          </div>
        </div>
      </header>
      {/* Spacer so fixed header does not cover page content */}
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
}
