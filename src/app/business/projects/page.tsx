"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { MarketplaceProject, ActiveProject } from "@/types";
import { formatBDT } from "@/lib/utils";
import { FolderGit2, Plus, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function ManageProjectsPage() {
  const { currentUser, refreshData } = useApp();
  const [projects, setProjects] = useState<MarketplaceProject[]>([]);
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const allProj = mockStore.getMarketplaceProjects();
    setProjects(allProj.filter((p) => p.businessId === currentUser.id || p.businessId === "user-business-1"));
    const allAct = mockStore.getActiveProjects();
    setActiveProjects(allAct.filter((p) => p.businessId === currentUser.id || p.businessId === "user-business-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const handleApproveMilestone = (activeProjId: string, milestoneId: string) => {
    mockStore.approveMilestone(activeProjId, milestoneId);
    refreshData();
    confetti({ particleCount: 70, spread: 60 });
    const allAct = mockStore.getActiveProjects();
    setActiveProjects(allAct.filter((p) => p.businessId === currentUser.id || p.businessId === "user-business-1"));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Project Operations
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Manage Projects & Milestones
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review live deliverables submitted by hired earners and approve milestone payments.
          </p>
        </div>

        <Link
          href="/business/post-project"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Another Project</span>
        </Link>
      </div>

      {/* Active Contract Milestones Approval Workflow */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">Active Delivery Workflows</h2>

        {activeProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-bold text-indigo-600">
                  Hired Earner: {proj.earnerName} ({proj.role})
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{proj.projectTitle}</h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Total Escrow</span>
                <span className="text-lg font-extrabold text-slate-900">
                  {formatBDT(proj.totalBudgetBDT)}
                </span>
              </div>
            </div>

            {/* Milestones list */}
            <div className="space-y-3">
              {proj.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    m.status === "approved"
                      ? "bg-emerald-50/40 border-emerald-200"
                      : m.status === "submitted"
                      ? "bg-amber-50/50 border-amber-300 ring-1 ring-amber-100"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">
                        Milestone {idx + 1}: {m.title}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          m.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "submitted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{m.description}</p>

                    {m.deliverableUrl && (
                      <div className="pt-1 flex items-center gap-3">
                        <a
                          href={m.deliverableUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                        >
                          <span>Inspect Submitted Prototype</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    {m.submissionNotes && (
                      <p className="text-[11px] text-slate-600 italic">
                        Earner Note: "{m.submissionNotes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    <span className="font-bold text-sm text-slate-900">{formatBDT(m.amountBDT)}</span>

                    {m.status === "submitted" && (
                      <button
                        onClick={() => handleApproveMilestone(proj.id, m.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Release Payment</span>
                      </button>
                    )}

                    {m.status === "approved" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Escrow Released</span>
                      </span>
                    )}

                    {m.status === "pending" && (
                      <span className="text-xs text-slate-400 font-medium">Awaiting Submission</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Posted Marketplace Projects */}
      <div className="space-y-4 pt-6">
        <h2 className="text-base font-bold text-slate-900">All Published Listings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {p.category}
                </span>
                <span className="text-xs text-slate-400">Posted {p.postedDate}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{formatBDT(p.budgetBDT)}</span>
                <Link
                  href="/business/applications"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {p.applicantCount} proposals submitted →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
