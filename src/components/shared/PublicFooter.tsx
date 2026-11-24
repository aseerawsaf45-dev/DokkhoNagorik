"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Zap,
  Globe,
  Mail,
} from "lucide-react";

export function PublicFooter() {
  return (
    <footer
      id="contact"
      className="site-footer bg-[#080a12]/90 backdrop-blur-3xl text-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.35)] overflow-hidden relative z-10"
    >
      {/* Ambient Radial Glow Blooms */}
      <div className="absolute -top-36 -right-24 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,rgba(14,42,197,0.32)_0%,transparent_68%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-24 w-[32rem] h-[32rem] rounded-full bg-[radial-gradient(circle,rgba(81,117,255,0.2)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      {/* Marquee Ticker */}
      <div className="marquee-wrapper border-b border-white/10 py-5 overflow-hidden whitespace-nowrap flex bg-white/[0.02]">
        <div className="marquee-track inline-flex items-center animate-marquee">
          <div className="marquee-item font-raleway font-semibold text-[clamp(24px,4.5vw,48px)] text-white/90 px-8 inline-flex items-center gap-8 tracking-tight">
            <span>Learn with direction</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Prove your skills</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Earn with confidence</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Milestone Escrow</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>T+0 Payout Settlement</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
          </div>
          <div className="marquee-item font-raleway font-semibold text-[clamp(24px,4.5vw,48px)] text-white/90 px-8 inline-flex items-center gap-8 tracking-tight">
            <span>Learn with direction</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Prove your skills</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Earn with confidence</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>Milestone Escrow</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
            <span>T+0 Payout Settlement</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e2ac5] inline-block shadow-[0_0_10px_#0e2ac5]" />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-body px-6 md:px-12 pt-16 md:pt-20 pb-12 relative z-[2] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: Brand & Trust Guarantee */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="font-display font-black text-2xl md:text-3xl tracking-[0.06em] text-white no-underline flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="w-3 h-3 rounded-full bg-[#0e2ac5] shadow-[0_0_12px_#0e2ac5]" />
              <span>SkillBridge</span>
            </Link>

            <p className="font-raleway text-sm md:text-base text-neutral-300 max-w-md leading-relaxed mt-4">
              A skill-to-income ecosystem connecting ambitious learners and verified earners with
              pre-funded commercial SME projects in Bangladesh.
            </p>

            {/* Escrow Trust Pill */}
            <div className="mt-6 flex flex-col gap-2.5 w-full max-w-md">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-xs text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-medium">
                  ৳12.4M+ Escrow Protected • Instant Bank &amp; bKash Settlement
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Smart Match Engine: Active &amp; Accepting Submissions</span>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="mailto:support@skillbridge.io"
                className="inline-flex items-center gap-2 font-mono text-xs text-blue-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0e2ac5]" />
                <span>support@skillbridge.io</span>
              </a>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* Right Columns: 4 Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: For Learners */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold mb-4">
                Learner Track
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0 text-xs">
                <li>
                  <Link
                    href="/learner/assessment"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Skill Diagnostics
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learner/roadmap"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    5-Phase Roadmaps
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learner/practice"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Practice Briefs
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learner/portfolio"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Portfolio Builder
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learner/become-earner"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Become an Earner
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: For Earners */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold mb-4">
                Earner Track
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0 text-xs">
                <li>
                  <Link
                    href="/projects"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Find SME Projects
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earner/earnings"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Earnings Vault
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earner/teams"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Team Collaboration
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earner/reviews"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Verified Reviews
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: For Businesses */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold mb-4">
                For Businesses
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0 text-xs">
                <li>
                  <Link
                    href="/business/post-project"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Post an SME Brief
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/business/browse-earners"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Browse Earners
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/business/payments"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Escrow Milestones
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-businesses"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Business Solutions
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Platform & Legal */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold mb-4">
                Platform
              </div>
              <ul className="space-y-2.5 list-none p-0 m-0 text-xs">
                <li>
                  <Link
                    href="/how-it-works"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    How It Works
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore-skills"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Explore Skills
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    About SkillBridge
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="group font-raleway text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Admin Console
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#0e2ac5]" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Payment Badges */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-neutral-400">
            <span className="font-display font-bold text-white tracking-wide">
              SkillBridge
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="font-mono text-[11px]">
              © 2026 SkillBridge. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="font-mono text-[11px] text-emerald-400">
              NBR Tax &amp; Escrow Compliant
            </span>
          </div>

          {/* Payment & Security Logos */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
              BEFTN / NPSB
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-emerald-300">
              256-Bit SSL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
