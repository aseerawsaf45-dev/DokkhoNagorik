"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { formatBDT } from "@/lib/utils";
import {
  FolderGit2,
  PlusCircle,
  FileCheck2,
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function BusinessOverviewPage() {
  const { currentUser } = useApp();
  const [projects, setProjects] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const allProj = mockStore.getMarketplaceProjects();
    setProjects(allProj.filter((p) => p.businessId === currentUser.id || p.businessId === "user-business-1"));
    const allApps = mockStore.getApplications();
    setApplications(allApps.filter((a) => a.businessId === currentUser.id || a.businessId === "user-business-1"));
    const allAct = mockStore.getActiveProjects();
    setActiveProjects(allAct.filter((p) => p.businessId === currentUser.id || p.businessId === "user-business-1"));
    const allTxs = mockStore.getTransactions();
    setTransactions(allTxs.filter((t) => t.userId === currentUser.id || t.userId === "user-business-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const totalSpentBDT = transactions
    .filter((t) => t.type === "spending" && t.status === "completed")
    .reduce((acc, t) => acc + t.amountBDT, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            SME Demand Operations
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your project posts, review applicant portfolios, and release milestone escrow payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/business/post-project"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Projects Posted</span>
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{projects.length} Total</div>
          <p className="text-[11px] text-slate-400 mt-2">Active in public marketplace</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Pending Applications</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{applications.length} Received</div>
          <p className="text-[11px] text-amber-600 font-semibold mt-2">
            Candidates awaiting review
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Active Contracts</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{activeProjects.length} In Progress</div>
          <p className="text-[11px] text-slate-400 mt-2">Delivery milestones tracking</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Escrow Released</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{formatBDT(totalSpentBDT || 10000)}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-2">
            Milestones approved
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Candidate Applications to Review */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Applicant Proposals</h3>
                <p className="text-xs text-slate-500">Review earner case studies and approve candidates</p>
              </div>
              <Link
                href="/business/applications"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View All ({applications.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{app.earnerName}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {app.earnerTitle}
                      </span>
                    </div>
                    <span className="text-xs text-indigo-600 font-medium block mt-0.5">
                      Applied for: {app.projectTitle}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                      "{app.coverMessage}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-xs text-slate-900 block">
                      {formatBDT(app.proposedBudgetBDT)}
                    </span>
                    <Link
                      href="/business/applications"
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Contract Milestones */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Active Milestone Deliverables</h3>
                <p className="text-xs text-slate-500">Inspect submitted work and release escrow</p>
              </div>
              <Link
                href="/business/projects"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>Manage Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {activeProjects.length > 0 ? (
              <div className="space-y-3">
                {activeProjects[0].milestones.map((m: any) => (
                  <div
                    key={m.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{m.title}</span>
                      <span className="text-slate-400 block text-[10px]">
                        Earner: {activeProjects[0].earnerName} • Due: {m.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">{formatBDT(m.amountBDT)}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          m.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : m.status === "submitted"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Talent Directory */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 block mb-1">
              Hire Faster
            </span>
            <h4 className="font-bold text-base text-white">Need a Specialized Earner?</h4>
            <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
              Search verified designers and developers with published case-study proof.
            </p>

            <Link
              href="/business/browse-earners"
              className="mt-4 w-full py-2 px-3 rounded-lg bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Browse Earners Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
