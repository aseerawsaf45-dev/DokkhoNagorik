"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { ProjectApplication } from "@/types";
import { formatBDT, formatDate } from "@/lib/utils";
import { FileCheck2, Clock, CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";

export default function MyApplicationsPage() {
  const { currentUser } = useApp();
  const [applications, setApplications] = useState<ProjectApplication[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const all = mockStore.getApplications();
    setApplications(all.filter((a) => a.earnerId === currentUser.id || a.earnerId === "user-earner-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Proposal Management
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          My Applications & Proposals
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track real-time status of your proposals submitted to SME businesses.
        </p>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-700 text-sm">No applications submitted yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Browse the project marketplace and submit your first project proposal.
            </p>
            <Link
              href="/earner/find-projects"
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
            >
              Find Projects
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Client: <strong>{app.businessName}</strong>
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">
                    Applied: {formatDate(app.appliedDate)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{app.projectTitle}</h3>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                  "{app.coverMessage}"
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Proposed Budget: <strong className="text-slate-900">{formatBDT(app.proposedBudgetBDT)}</strong></span>
                  <span>•</span>
                  <span>Est Delivery: <strong className="text-slate-900">{app.estimatedCompletionTime}</strong></span>
                </div>
              </div>

              {/* Status Badge & Actions */}
              <div className="shrink-0 flex flex-col items-start md:items-end justify-between space-y-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    app.status === "Accepted"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : app.status === "Shortlisted"
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : app.status === "Under Review"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {app.status}
                </span>

                {app.status === "Accepted" && (
                  <Link
                    href="/earner/active-projects"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                  >
                    <span>Open Active Contract</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
