"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

interface PublicNavbarProps {
  onOpenControls?: () => void;
}

export function PublicNavbar({ onOpenControls }: PublicNavbarProps) {
  const pathname = usePathname();
  const { currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Explore Skills", href: "/explore-skills" },
    { label: "For Businesses", href: "/for-businesses" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-30 pointer-events-none transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/"
            className="font-display font-black text-xl md:text-2xl tracking-[0.06em] text-[#0a0a0a] no-underline hover:opacity-85 transition-opacity flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5]" />
            <span>SkillBridge</span>
          </Link>
          <span className="hidden lg:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 border-l border-neutral-300 pl-3">
            Skill-to-Income
          </span>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 pointer-events-auto bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-neutral-200/80 shadow-xs">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-raleway text-[13px] font-semibold transition-colors no-underline ${
                  isActive ? "text-[#0e2ac5]" : "text-neutral-700 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 md:gap-3 pointer-events-auto">
          {/* Studio Controls Button */}
          {onOpenControls && (
            <button
              onClick={onOpenControls}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/60 bg-white/50 backdrop-blur-xl shadow-xs hover:bg-white flex items-center justify-center text-[#1a1a1a] cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Open Studio Controls"
              title="Studio Physics Controls"
            >
              <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
            </button>
          )}

          {/* User Workspace or Auth Links */}
          {currentUser ? (
            <Link
              href={
                currentUser.role === "learner"
                  ? "/learner"
                  : currentUser.role === "earner"
                  ? "/earner"
                  : currentUser.role === "business"
                  ? "/business"
                  : "/admin"
              }
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="capitalize">{currentUser.role} Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-neutral-700 hover:text-black px-3 py-2 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-[#0e2ac5] hover:bg-[#0a1ea0] text-white text-xs font-semibold shadow-[0_8px_20px_-4px_rgba(14,42,197,0.4)] transition-all"
              >
                <span>Get started</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800 bg-white/70 backdrop-blur-md border border-neutral-200 rounded-full transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 pointer-events-auto shadow-xl">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-neutral-900 py-1.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl border border-neutral-200 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-xs font-semibold text-white bg-[#0e2ac5] hover:bg-[#0a1ea0] rounded-xl shadow-xs transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
