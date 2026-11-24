"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { PracticeProject } from "@/types";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  UploadCloud,
  FileCheck2,
  Plus
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PracticeProjectsPage() {
  const router = useRouter();
  const { currentUser, refreshData } = useApp();
  const [projects, setProjects] = useState<PracticeProject[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<PracticeProject | null>(null);
  const [notes, setNotes] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");

  useEffect(() => {
    setProjects(mockStore.getPracticeProjects());
  }, []);

  const handleStartProject = (p: PracticeProject) => {
    mockStore.updatePracticeProjectStatus(p.id, "in_progress");
    setProjects(mockStore.getPracticeProjects());
    refreshData();
  };

  const handleOpenSubmit = (p: PracticeProject) => {
    setActiveModalProject(p);
    setNotes(p.submissionNotes || "");
    setSubmissionUrl(p.submissionUrl || "");
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalProject) return;

    mockStore.updatePracticeProjectStatus(
      activeModalProject.id,
      "completed",
      notes,
      submissionUrl
    );
    setProjects(mockStore.getPracticeProjects());
    setActiveModalProject(null);
    refreshData();
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleImportToPortfolio = (p: PracticeProject) => {
    if (!currentUser) return;
    mockStore.addPortfolioProject({
      userId: currentUser.id,
      title: p.title,
      description: p.description,
      problemStatement: `Client challenge in ${p.domain}: Delivering high-standard deliverables meeting commercial criteria.`,
      approach: p.deliverables.join("; "),
      skillsUsed: p.requiredSkills,
      toolsUsed: ["Figma", "Design Tokens", "Auto Layout"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      projectUrl: p.submissionUrl || "https://figma.com/sample-file",
      completionDate: new Date().toISOString().split("T")[0],
      keyOutcomes: "Validated against standard WCAG AA criteria and user testing guidelines.",
      isPublished: true
    });
    // mark project
    mockStore.updatePracticeProjectStatus(p.id, "completed", p.submissionNotes, p.submissionUrl);
    setProjects(mockStore.getPracticeProjects());
    refreshData();
    confetti({ particleCount: 80, spread: 70 });
    router.push("/learner/portfolio");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Project-Based Practice
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Practice Project Library
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Tackle client-realistic briefs with clear evaluation criteria. Complete projects to import them directly into your verifiable portfolio.
          </p>
        </div>

        <Link
          href="/learner/portfolio"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-all shrink-0"
        >
          <span>View My Portfolio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const isDone = proj.status === "completed";
          const isInProgress = proj.status === "in_progress";

          return (
            <div
              key={proj.id}
              className={`bg-white rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                isDone
                  ? "border-emerald-200 shadow-2xs"
                  : isInProgress
                  ? "border-amber-300 shadow-xs ring-1 ring-amber-100"
                  : "border-slate-200 shadow-2xs hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {proj.domain} • {proj.difficulty}
                  </span>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isDone
                        ? "bg-emerald-50 text-emerald-700"
                        : isInProgress
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isDone ? "Completed" : isInProgress ? "In Progress" : "Available"}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>

                {/* Deliverables checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Expected Deliverables
                  </span>
                  <ul className="space-y-1">
                    {proj.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.requiredSkills.map((s) => (
                    <span
                      key={s}
                      className="bg-slate-50 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est: {proj.estimatedTime}</span>
                </span>

                <div className="flex items-center gap-2">
                  {!isInProgress && !isDone && (
                    <button
                      onClick={() => handleStartProject(proj)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                    >
                      Start Project
                    </button>
                  )}

                  {isInProgress && (
                    <button
                      onClick={() => handleOpenSubmit(proj)}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                    >
                      Submit Work
                    </button>
                  )}

                  {isDone && (
                    <button
                      onClick={() => handleImportToPortfolio(proj)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Import to Portfolio</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-lg text-slate-900">
              Submit Deliverable: {activeModalProject.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide your prototype or code link and brief documentation of your approach.
            </p>

            <form onSubmit={handleSubmitDeliverable} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Deliverable URL (Figma, GitHub, Vercel demo, or Drive link)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://figma.com/file/... or https://github.com/..."
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Submission Notes / Approach Summary
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain your design decisions, contrast checks, or component architecture..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Submit & Mark Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
