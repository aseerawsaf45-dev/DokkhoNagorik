"use client";

import React from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { Check, ArrowRight } from "lucide-react";

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC]">
      <PublicNavbar />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[#6b7487] block mb-1">Partnership</span>
            <h1 className="text-3xl font-semibold text-[#111827] tracking-tight">
              Flexible project delivery for growing businesses
            </h1>
            <p className="text-xs text-[#4b5565] mt-2">
              Connect with skilled talent evaluated by verified practice case studies and protected by milestone escrow in BDT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-2">
              <span className="font-semibold text-xs text-[#111827] block">Verifiable case studies</span>
              <p className="text-xs text-[#4b5565] leading-relaxed">
                Review interactive prototypes and GitHub code rather than embellished resumes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-2">
              <span className="font-semibold text-xs text-[#111827] block">Milestone escrow in BDT</span>
              <p className="text-xs text-[#4b5565] leading-relaxed">
                Lock project funds into escrow checkpoints and release them only upon deliverable approval.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-2">
              <span className="font-semibold text-xs text-[#111827] block">Individual or squad</span>
              <p className="text-xs text-[#4b5565] leading-relaxed">
                Hire a solo specialist for short sprints or a multidisciplinary team (design, dev, content) for full builds.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111827] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Post a project in minutes</h2>
              <p className="text-xs text-slate-300 mt-1">
                Define your deliverables, set your BDT budget, and review matched applicant proposals.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/business/post-project"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs"
              >
                Post a project
              </Link>
              <Link
                href="/business"
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-lg"
              >
                Open demo
              </Link>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
