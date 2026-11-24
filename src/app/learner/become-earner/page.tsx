"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { EarnerProfile } from "@/types";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BecomeAnEarnerPage() {
  const router = useRouter();
  const { currentUser, refreshData } = useApp();

  const [portfolioCount, setPortfolioCount] = useState(0);
  const [readinessScore, setReadinessScore] = useState(88);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const ports = mockStore.getPortfolioProjects(currentUser.id);
    setPortfolioCount(ports.length);
    const earner = mockStore.getEarnerProfile(currentUser.id);
    if (earner) {
      setReadinessScore(earner.readinessScore || 88);
      setActivated(true);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const checks = [
    {
      title: "Basic Profile Information",
      desc: "Contact information, educational background, and target country configured.",
      passed: true
    },
    {
      title: "Selected Professional Skills",
      desc: "At least 2 verified skills specified with proficiency level.",
      passed: true
    },
    {
      title: "Verifiable Portfolio Evidence",
      desc: "At least 1 published practice case study showing problem statement and outcomes.",
      passed: portfolioCount > 0,
      extra: `${portfolioCount} case studies published`
    },
    {
      title: "Commercial Rate & Scope Defined",
      desc: "Hourly rate in BDT and project type preferences specified.",
      passed: true
    }
  ];

  const handleActivateEarner = () => {
    const earnerProfile: EarnerProfile = {
      userId: currentUser.id,
      title: "UI/UX & Product Design Specialist",
      bio: "Skilled designer transitioning from comprehensive practice challenges into commercial SME project delivery.",
      skills: [
        { name: "Figma", level: "Advanced" },
        { name: "UI/UX Design", level: "Intermediate" },
        { name: "Design Systems", level: "Intermediate" },
        { name: "Responsive Web", level: "Intermediate" }
      ],
      hourlyRateBDT: 1000,
      expectedProjectBudgetBDT: 25000,
      availability: "Part-time (20h/wk)",
      preferredProjectTypes: ["SaaS Dashboards", "Landing Pages", "Mobile UI"],
      workPreference: "Both",
      readinessScore: 90,
      readinessFeedback: [
        "Verified 1 published case study in portfolio",
        "Completed UI/UX Foundational Roadmap Phase 1 & 2",
        "Passed practical touch-target diagnostic assessment"
      ],
      rating: 5.0,
      reviewsCount: 1
    };

    mockStore.saveEarnerProfile(earnerProfile);
    setActivated(true);
    refreshData();
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      // switch role to earner
      const updatedUser = { ...currentUser, role: "earner" as const, hasEarnerProfile: true };
      mockStore.setCurrentUser(updatedUser);
      router.push("/earner/find-projects");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          The Skill-to-Income Gateway
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Become an Earner
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          SkillBridge does not make you maintain two separate accounts. Your practice roadmap and portfolio directly qualify you to receive verified SME projects.
        </p>
      </div>

      {/* Readiness Score Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block mb-1">
              Automated Readiness Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{readinessScore}%</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Job & Project Ready
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-lg leading-relaxed">
              Based on your completed practice case study, responsive design tokens, and accessibility diagnostic score.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleActivateEarner}
              disabled={activated}
              className={`px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                activated
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-white text-indigo-950 hover:bg-indigo-50 active:scale-95"
              }`}
            >
              {activated ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Earner Profile Active</span>
                </>
              ) : (
                <>
                  <span>Activate Earner Profile Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-base text-slate-900">Readiness Verification Criteria</h3>

        <div className="space-y-3">
          {checks.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${
                item.passed ? "bg-white border-slate-200" : "bg-amber-50/50 border-amber-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    item.passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  {item.extra && (
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700">
                      ✓ {item.extra}
                    </span>
                  )}
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                  item.passed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.passed ? "Verified" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
