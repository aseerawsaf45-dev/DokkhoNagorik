"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { formatBDT } from "@/lib/utils";
import {
  DollarSign,
  Briefcase,
  Search,
  Star,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function EarnerOverviewPage() {
  const { currentUser } = useApp();
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    setProfile(mockStore.getEarnerProfile(currentUser.id) || mockStore.getEarnerProfile("user-earner-1"));
    const allApps = mockStore.getApplications();
    setApplications(allApps.filter((a) => a.earnerId === currentUser.id || a.earnerId === "user-earner-1"));
    const allActive = mockStore.getActiveProjects();
    setActiveProjects(allActive.filter((p) => p.earnerId === currentUser.id || p.earnerId === "user-earner-1"));
    const allTxs = mockStore.getTransactions();
    setTransactions(allTxs.filter((t) => t.userId === currentUser.id || t.userId === "user-earner-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const totalEarnedBDT = transactions
    .filter((t) => t.type === "earning" && t.status === "completed")
    .reduce((acc, t) => acc + t.amountBDT, 0);

  const pendingBDT = transactions
    .filter((t) => t.type === "earning" && t.status === "pending")
    .reduce((acc, t) => acc + t.amountBDT, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-700 block mb-1">
            Status: Verified earner // Readiness {profile?.readinessScore || 92}%
          </span>
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">
            Earner workspace
          </h1>
          <p className="text-xs text-[#6b7487] mt-1">
            {profile?.title || "Product Designer & UI/UX Specialist"} • {currentUser.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/earner/find-projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#111827] hover:bg-slate-800 text-white font-semibold text-xs shadow-2xs transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find SME projects</span>
          </Link>
        </div>
      </div>

      {/* unslop Stat Bar (numbers and tabular figures, quiet cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Cleared earnings</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">
            {formatBDT(totalEarnedBDT || 10000)}
          </div>
          <span className="text-[11px] text-emerald-700 block mt-1">
            Verified milestone payouts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Pending in escrow</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">
            {formatBDT(pendingBDT || 15000)}
          </div>
          <span className="text-[11px] text-[#6b7487] block mt-1">
            Held in client checkpoints
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Active contracts</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">
            {activeProjects.length} active
          </div>
          <span className="text-[11px] text-indigo-700 block mt-1">
            Pathao Express Dispatch Console
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Client rating</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">
            {profile?.rating || 4.9} <span className="text-xs text-[#6b7487] font-normal">/ 5.0</span>
          </div>
          <span className="text-[11px] text-[#6b7487] block mt-1">
            Across {profile?.reviewsCount || 7} deliverables
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Contract Milestones */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <div>
                <h3 className="font-semibold text-sm text-[#111827]">Active contract deliverables</h3>
                <p className="text-xs text-[#6b7487] mt-0.5">Pathao Express / Smart Logistics</p>
              </div>
              <Link
                href="/earner/active-projects"
                className="text-xs text-indigo-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activeProjects.length > 0 && (
              <div className="space-y-2">
                {activeProjects[0].milestones.map((m: any) => (
                  <div
                    key={m.id}
                    className="p-3 bg-slate-50 border border-[rgba(17,24,39,0.05)] rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-[#111827]">{m.title}</span>
                      <span className="text-[11px] text-[#6b7487] block">Due: {m.deadline}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#111827] tabular-nums block">
                        {formatBDT(m.amountBDT)}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-mono ${
                          m.status === "approved"
                            ? "text-emerald-700 font-semibold"
                            : m.status === "submitted"
                            ? "text-amber-700 font-semibold"
                            : "text-[#6b7487]"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Applications */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <h3 className="font-semibold text-sm text-[#111827]">Submitted proposals</h3>
              <Link
                href="/earner/applications"
                className="text-xs text-indigo-700 font-semibold hover:underline"
              >
                All proposals ({applications.length})
              </Link>
            </div>

            <div className="space-y-2">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-lg border border-[rgba(17,24,39,0.07)] flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-medium text-[#111827]">{app.projectTitle}</h4>
                    <span className="text-[11px] text-[#6b7487]">
                      {app.businessName} • {formatBDT(app.proposedBudgetBDT)}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      app.status === "Accepted"
                        ? "bg-emerald-50 text-emerald-800"
                        : app.status === "Shortlisted"
                        ? "bg-indigo-50 text-indigo-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#111827] text-white space-y-3 shadow-md">
            <span className="text-[10px] font-mono text-indigo-300">Smart match</span>
            <h4 className="font-semibold text-sm text-white">96% compatibility: Logistics Console</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Matched against your Figma Design Systems verification and published case study.
            </p>
            <Link
              href="/earner/recommended"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs"
            >
              <span>View recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
