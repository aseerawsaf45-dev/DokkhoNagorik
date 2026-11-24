"use client";

import React from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { Check, ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  const learnerFlow = [
    {
      title: "1. Baseline diagnostic & goals",
      desc: "Specify your current education level, fields of interest, and available weekly study hours. SkillBridge sets your baseline."
    },
    {
      title: "2. Phased roadmap syllabus",
      desc: "Receive an actionable curriculum: Foundations → Tool Mastery → Practical Skills → Portfolio → Earner Launch."
    },
    {
      title: "3. Practice projects with criteria",
      desc: "Complete real-world briefs designed by senior practitioners, matching commercial acceptance standards."
    },
    {
      title: "4. Portfolio case-study import",
      desc: "Convert practice deliverables directly into published case studies complete with problem framing, approach, and metrics."
    },
    {
      title: "5. Transition to Earner status",
      desc: "The system computes your Readiness Score. Activate your earner account in one click without creating a new login."
    }
  ];

  const businessFlow = [
    {
      title: "A. Define scope & BDT budget",
      desc: "Post project deliverables, deadlines, and milestone payments. Specify individual or multidisciplinary squad preference."
    },
    {
      title: "B. Review verified evidence",
      desc: "Inspect candidate applications evaluated by our explainable match score—filtering directly by completed case studies."
    },
    {
      title: "C. Milestone escrow release",
      desc: "Funds remain locked in escrow checkpoints. You review submissions, request revisions, and release payouts upon satisfaction."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC]">
      <PublicNavbar />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Header */}
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[#6b7487] block mb-1">Architecture</span>
            <h1 className="text-3xl font-semibold text-[#111827] tracking-tight">
              How SkillBridge works
            </h1>
            <p className="text-xs text-[#4b5565] mt-2 leading-relaxed">
              A closed-loop system connecting structured skill acquisition with verified SME commercial demand.
            </p>
          </div>

          {/* Learner Track */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <span className="text-xs font-semibold text-[#111827]">Learner trajectory</span>
              <span className="text-[11px] font-mono text-[#6b7487]">5 milestones</span>
            </div>

            <div className="space-y-4">
              {learnerFlow.map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-xs">
                  <span className="font-mono text-indigo-600 font-semibold shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Track */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <span className="text-xs font-semibold text-[#111827]">Business escrow flow</span>
              <span className="text-[11px] font-mono text-[#6b7487]">3 phases</span>
            </div>

            <div className="space-y-4">
              {businessFlow.map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-xs">
                  <span className="font-mono text-emerald-600 font-semibold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs">
            <span className="text-[#6b7487]">Ready to test the live prototype?</span>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#111827] hover:bg-slate-800 text-white font-medium rounded-lg shadow-2xs"
            >
              <span>Create account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
