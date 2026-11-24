"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { ProjectApplication } from "@/types";
import { formatBDT, formatDate } from "@/lib/utils";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BusinessApplicationsPage() {
  const { currentUser, refreshData } = useApp();
  const [applications, setApplications] = useState<ProjectApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<ProjectApplication | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    const all = mockStore.getApplications();
    setApplications(all.filter((a) => a.businessId === currentUser.id || a.businessId === "user-business-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const handleUpdateStatus = (appId: string, status: ProjectApplication["status"]) => {
    mockStore.updateApplicationStatus(appId, status);
    refreshData();
    if (status === "Accepted") {
      confetti({ particleCount: 80, spread: 70 });
    }
    const all = mockStore.getApplications();
    setApplications(all.filter((a) => a.businessId === currentUser.id || a.businessId === "user-business-1"));
    setSelectedApp(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Candidate Evaluation
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          Review Applicant Proposals
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate candidates by verified case studies. Accepting a candidate automatically initializes escrow delivery milestones.
        </p>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700 text-sm">No applications pending review</h3>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">{app.earnerName}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {app.earnerTitle}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">Applied {formatDate(app.appliedDate)}</span>
                </div>

                <div className="text-xs text-indigo-600 font-semibold">
                  Applied for: {app.projectTitle}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 italic leading-relaxed">
                  "{app.coverMessage}"
                </div>

                {app.portfolioProjectId && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">Attached Evidence:</span>
                    <Link
                      href="/learner/portfolio"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      <span>View Verified Case Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Price & Status Controls */}
              <div className="shrink-0 flex flex-col items-start md:items-end justify-between space-y-4 min-w-[190px]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Proposed Price</span>
                  <span className="text-lg font-extrabold text-slate-900 block">
                    {formatBDT(app.proposedBudgetBDT)}
                  </span>
                  <span className="text-[11px] text-slate-400">Est: {app.estimatedCompletionTime}</span>
                </div>

                <div className="w-full space-y-2">
                  {app.status === "Submitted" || app.status === "Under Review" || app.status === "Shortlisted" ? (
                    <div className="flex flex-col gap-1.5 w-full">
                      <button
                        onClick={() => handleUpdateStatus(app.id, "Accepted")}
                        className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept & Hire</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, "Shortlisted")}
                        className="w-full py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-all"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, "Rejected")}
                        className="w-full py-1 px-3 text-slate-400 hover:text-rose-600 rounded text-xs transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider block text-center ${
                        app.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
