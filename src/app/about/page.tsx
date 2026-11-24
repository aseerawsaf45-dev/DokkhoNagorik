import React from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { Sparkles, Award, Target, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <PublicNavbar />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">
              Our Mission
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#171B24] tracking-tight">
              About SkillBridge
            </h1>
            <p className="mt-3 text-sm text-[#737B88]">
              "Learn with direction. Prove your skills. Earn with confidence."
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xs space-y-6 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">Why SkillBridge Exists</h3>
            <p>
              Millions of aspiring students and career changers invest thousands of hours watching online video tutorials, yet struggle to secure meaningful, paid opportunities. At the same time, local small and medium enterprises (SMEs) are desperate for competent digital talent but get burned by unreliable freelancers or over-priced agencies.
            </p>
            <p>
              SkillBridge solves this disconnect by transforming passive learning into an actionable <strong>skill-to-income pipeline</strong>. Rather than issuing generic certificates, we guide learners through practical, client-realistic projects, generate verifiable case-study portfolios, and connect them with local businesses through transparent, milestone-backed contracts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Target className="w-5 h-5 text-indigo-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-xs">Skill Direction</h4>
                <p className="text-[11px] text-slate-500 mt-1">Structured roadmaps targeting real market demand.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Award className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-xs">Portfolio Proof</h4>
                <p className="text-[11px] text-slate-500 mt-1">Tangible case studies and interactive deliverables.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Users className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-xs">SME Trust</h4>
                <p className="text-[11px] text-slate-500 mt-1">Escrow security and explainable talent matching.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
