"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { MarketplaceProject, EarnerProfile } from "@/types";
import { formatBDT } from "@/lib/utils";
import { calculateMatchScore } from "@/lib/matchingEngine";
import { Sparkles, CheckCircle2, ArrowRight, DollarSign, Clock, ShieldCheck, AlertCircle } from "lucide-react";

export default function RecommendedProjectsPage() {
  const { currentUser } = useApp();
  const [profile, setProfile] = useState<EarnerProfile | null>(null);
  const [scoredProjects, setScoredProjects] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const ep = mockStore.getEarnerProfile(currentUser.id) || mockStore.getEarnerProfile("user-earner-1");
    setProfile(ep);
    const projects = mockStore.getMarketplaceProjects();
    const portfolio = mockStore.getPortfolioProjects(currentUser.id);

    if (ep) {
      const scored = projects.map((p) => {
        const match = calculateMatchScore(ep, p, portfolio);
        return { project: p, ...match };
      });
      // sort descending by overallScore
      scored.sort((a, b) => b.overallScore - a.overallScore);
      setScoredProjects(scored);
    }
  }, [currentUser]);

  if (!currentUser || !profile) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Rule-Based Matching Engine
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Recommended SME Projects
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          SkillBridge scores SME projects against your verified skill levels, portfolio case studies, availability, and target budget.
          <em className="block text-slate-400 mt-1">
            *All scores are transparent estimates computed deterministically to guide your applications.
          </em>
        </p>
      </div>

      {/* Explanatory Formula Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
            Matching Formula Weights:
          </span>
          <div className="flex flex-wrap gap-3 text-slate-300">
            <span>Skill Match: <strong>40%</strong></span>
            <span>•</span>
            <span>Portfolio Relevance: <strong>25%</strong></span>
            <span>•</span>
            <span>Experience Tier: <strong>15%</strong></span>
            <span>•</span>
            <span>Availability: <strong>10%</strong></span>
            <span>•</span>
            <span>Budget Fit: <strong>10%</strong></span>
          </div>
        </div>
        <span className="text-[11px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 font-semibold">
          Explainable AI Match
        </span>
      </div>

      {/* Scored Recommendations List */}
      <div className="space-y-4">
        {scoredProjects.map(({ project, overallScore, breakdown, reasons }, idx) => (
          <div
            key={project.id}
            className={`bg-white rounded-2xl p-6 border transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-6 ${
              overallScore >= 90
                ? "border-emerald-300 shadow-xs ring-1 ring-emerald-100"
                : "border-slate-200 shadow-2xs"
            }`}
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {project.businessName}
                </span>
                {overallScore >= 90 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                    High Compatibility Match
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{project.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{project.description}</p>

              {/* Explainable Reasons */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Why this project matches your profile:
                </span>
                <ul className="space-y-1 text-slate-700">
                  {reasons.map((r: string, rIdx: number) => (
                    <li key={rIdx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-score Badges */}
              <div className="flex flex-wrap gap-2 text-[10px] pt-1">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                  Skills: {breakdown.skillMatch}%
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                  Portfolio: {breakdown.portfolioRelevance}%
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                  Experience: {breakdown.experienceMatch}%
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                  Availability: {breakdown.availabilityMatch}%
                </span>
              </div>
            </div>

            {/* Score Pill & CTA */}
            <div className="shrink-0 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-4 min-w-[190px]">
              <div className="text-left lg:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-white font-extrabold text-lg shadow-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{overallScore}% Match</span>
                </div>
                <div className="mt-2 text-xs font-bold text-slate-900 block">
                  {formatBDT(project.budgetBDT)}
                </div>
                <span className="text-[11px] text-slate-400 block">{project.duration}</span>
              </div>

              <Link
                href="/earner/find-projects"
                className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>View & Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
