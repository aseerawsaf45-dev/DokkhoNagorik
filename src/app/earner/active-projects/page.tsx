"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { ActiveProject, ProjectMilestone } from "@/types";
import { formatBDT } from "@/lib/utils";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  UploadCloud,
  ExternalLink,
  AlertCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ActiveProjectsPage() {
  const { currentUser, refreshData } = useApp();
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([]);
  const [submitModalMs, setSubmitModalMs] = useState<{ activeProjId: string; ms: ProjectMilestone } | null>(null);
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const all = mockStore.getActiveProjects();
    setActiveProjects(all.filter((p) => p.earnerId === currentUser.id || p.earnerId === "user-earner-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const handleSubmitMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitModalMs) return;

    mockStore.submitMilestone(
      submitModalMs.activeProjId,
      submitModalMs.ms.id,
      deliverableUrl,
      submissionNotes
    );
    setSubmitModalMs(null);
    setDeliverableUrl("");
    setSubmissionNotes("");
    refreshData();
    confetti({ particleCount: 70, spread: 60 });
    // refresh
    const all = mockStore.getActiveProjects();
    setActiveProjects(all.filter((p) => p.earnerId === currentUser.id || p.earnerId === "user-earner-1"));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Contract Delivery
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          Active Projects & Milestones
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Submit deliverables for client verification. Approved milestones automatically release simulated escrow funds to your earnings wallet.
        </p>
      </div>

      <div className="space-y-6">
        {activeProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-600">
                  Client: {proj.businessName}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{proj.projectTitle}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Assigned Role: {proj.role}</span>
                  <span>•</span>
                  <span>Deadline: {proj.deadline}</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Total Contract Escrow</span>
                <span className="text-xl font-extrabold text-slate-900 block">
                  {formatBDT(proj.totalBudgetBDT)}
                </span>
              </div>
            </div>

            {/* Client Feedback Banner if present */}
            {proj.clientFeedback && (
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Client Feedback:</strong> {proj.clientFeedback}
              </div>
            )}

            {/* Milestones Flow */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Milestone Breakdown & Deliverables
              </h3>

              <div className="space-y-3">
                {proj.milestones.map((ms, idx) => (
                  <div
                    key={ms.id}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                      ms.status === "approved"
                        ? "bg-emerald-50/40 border-emerald-200"
                        : ms.status === "submitted"
                        ? "bg-amber-50/40 border-amber-200"
                        : "bg-white border-slate-200 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          ms.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : ms.status === "submitted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{ms.title}</h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                              ms.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : ms.status === "submitted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {ms.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{ms.description}</p>

                        {ms.deliverableUrl && (
                          <a
                            href={ms.deliverableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline mt-1.5"
                          >
                            <span>View Submitted Deliverable Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                      <div className="text-left md:text-right">
                        <span className="font-extrabold text-sm text-slate-900 block">
                          {formatBDT(ms.amountBDT)}
                        </span>
                        <span className="text-[10px] text-slate-400">Due {ms.deadline}</span>
                      </div>

                      {ms.status === "pending" && (
                        <button
                          onClick={() => {
                            setSubmitModalMs({ activeProjId: proj.id, ms });
                            setDeliverableUrl("https://figma.com/file/sample-deliverable");
                            setSubmissionNotes("Completed all wireframes and responsive grid tests.");
                          }}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                        >
                          Submit Work
                        </button>
                      )}

                      {ms.status === "submitted" && (
                        <span className="text-xs text-amber-700 font-medium">Under SME Review</span>
                      )}

                      {ms.status === "approved" && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Paid</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Submission Modal */}
      {submitModalMs && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-lg text-slate-900">
              Submit Milestone: {submitModalMs.ms.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Escrow release: <strong>{formatBDT(submitModalMs.ms.amountBDT)}</strong>
            </p>

            <form onSubmit={handleSubmitMilestone} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Deliverable Link (Figma, GitHub, Live URL)
                </label>
                <input
                  type="url"
                  required
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Submission Notes for Client
                </label>
                <textarea
                  rows={3}
                  required
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalMs(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Submit Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
