"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { formatBDT } from "@/lib/utils";
import {
  Map,
  BookOpen,
  FolderGit2,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight
} from "lucide-react";

export default function LearnerOverviewPage() {
  const { currentUser, refreshData } = useApp();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [resources, setResources] = useState<any[]>([]);
  const [practiceProjects, setPracticeProjects] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const rm = mockStore.getRoadmap(currentUser.id);
    setRoadmap(rm);
    const ports = mockStore.getPortfolioProjects(currentUser.id);
    setPortfolioCount(ports.length);
    setResources(mockStore.getResources());
    setPracticeProjects(mockStore.getPracticeProjects());
  }, [currentUser]);

  if (!currentUser) return null;

  const totalTasks =
    roadmap?.phases.reduce((acc: number, p: any) => acc + p.tasks.length, 0) || 1;
  const completedTasks =
    roadmap?.phases.reduce(
      (acc: number, p: any) => acc + p.tasks.filter((t: any) => t.completed).length,
      0
    ) || 0;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const completedPractice = practiceProjects.filter((p) => p.status === "completed").length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-700 block mb-1">
            Track: UI/UX & Product Design
          </span>
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">
            Learner console
          </h1>
          <p className="text-xs text-[#6b7487] mt-1">
            Learn with direction. Prove your skills. Earn with confidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/learner/become-earner"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check readiness score</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row: unslop rules (numbers, tabular figures, no decoration) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Roadmap progress</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">{progressPercent}%</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-[11px] text-[#6b7487] block mt-1">
            {completedTasks} of {totalTasks} milestones done
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Weekly target</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">11.5 / 15 hrs</div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: "76%" }} />
          </div>
          <span className="text-[11px] text-emerald-700 block mt-1">On schedule</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Practice completed</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">{completedPractice} projects</div>
          <span className="text-[11px] text-slate-500 block mt-2">
            1 in progress (Local artisan)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-1">
          <span className="text-xs text-[#6b7487]">Portfolio status</span>
          <div className="text-2xl font-semibold text-[#111827] tabular-nums">{portfolioCount} published</div>
          <span className="text-[11px] text-emerald-700 block mt-2 font-medium">
            ✓ Ready for Earner verification
          </span>
        </div>
      </div>

      {/* Main Grid: Active Phase + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Phase Card */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <div>
                <h3 className="font-semibold text-sm text-[#111827]">{roadmap?.title}</h3>
                <p className="text-xs text-[#6b7487] mt-0.5">{roadmap?.description}</p>
              </div>
              <Link
                href="/learner/roadmap"
                className="text-xs text-indigo-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Full roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Current In-Progress Phase */}
            {roadmap?.phases.map((phase: any) => {
              if (phase.status !== "in_progress") return null;
              return (
                <div key={phase.id} className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-700 font-medium">
                      In progress: {phase.title}
                    </span>
                    <span className="text-[#6b7487]">
                      {phase.tasks.filter((t: any) => t.completed).length} / {phase.tasks.length} tasks
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {phase.tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                          task.completed
                            ? "bg-slate-50/50 border-[rgba(17,24,39,0.05)] text-slate-400"
                            : "bg-white border-[rgba(17,24,39,0.07)] text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            onClick={() => {
                              mockStore.updateRoadmapTask(
                                currentUser.id,
                                phase.id,
                                task.id,
                                !task.completed
                              );
                              refreshData();
                            }}
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-white text-[10px] ${
                              task.completed
                                ? "bg-emerald-600"
                                : "border border-slate-300 hover:border-slate-500"
                            }`}
                          >
                            {task.completed && "✓"}
                          </button>
                          <span
                            className={`text-xs ${
                              task.completed ? "line-through text-slate-400" : "font-medium text-[#111827]"
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#6b7487] shrink-0">
                          {task.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Practice Project */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(17,24,39,0.07)]">
              <div>
                <h3 className="font-semibold text-sm text-[#111827]">Practice project in progress</h3>
                <p className="text-xs text-[#6b7487] mt-0.5">Commercial acceptance criteria challenge</p>
              </div>
              <Link
                href="/learner/practice"
                className="text-xs text-indigo-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Browse all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-[rgba(17,24,39,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  status // in-progress
                </span>
                <h4 className="font-semibold text-sm text-[#111827] mt-1">
                  Local Artisan E-Commerce Checkout Flow
                </h4>
                <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                  3-step mobile checkout flow for Bangladeshi handicrafts boutique with bKash and Nagad payment selectors.
                </p>
              </div>

              <Link
                href="/learner/practice"
                className="px-3.5 py-1.5 bg-[#111827] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap text-center shadow-2xs"
              >
                Continue project
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: Quiet unslop recommendations */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#111827] text-white space-y-3 shadow-md">
            <span className="text-[10px] font-mono text-indigo-300">Milestone reached</span>
            <h4 className="font-semibold text-sm text-white">Unlock Earner opportunities</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have 1 published portfolio case study. Activate your Earner profile to receive matched SME contracts.
            </p>
            <Link
              href="/learner/become-earner"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <span>Transition to earner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[rgba(17,24,39,0.07)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(17,24,39,0.07)]">
              <span className="text-xs font-semibold text-[#111827]">Curated guides</span>
              <Link href="/learner/resources" className="text-xs text-indigo-700 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {resources.slice(0, 4).map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs group"
                >
                  <span className="text-slate-800 group-hover:text-indigo-600 line-clamp-1">
                    {r.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#6b7487]">
                    {r.category} • {r.estimatedTime}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
