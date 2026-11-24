"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileEdit,
  MapPin,
  Lock
} from "lucide-react";

export default function MyRoadmapPage() {
  const { currentUser, refreshData } = useApp();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    "phase-1": false,
    "phase-2": false,
    "phase-3": true,
    "phase-4": true,
    "phase-5": true
  });
  const [activeNotesTaskId, setActiveNotesTaskId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setRoadmap(mockStore.getRoadmap(currentUser.id));
  }, [currentUser]);

  if (!currentUser || !roadmap) return null;

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const handleTaskToggle = (phaseId: string, taskId: string, currentStatus: boolean) => {
    mockStore.updateRoadmapTask(currentUser.id, phaseId, taskId, !currentStatus);
    setRoadmap(mockStore.getRoadmap(currentUser.id));
    refreshData();
  };

  const handleSaveNotes = (phaseId: string, taskId: string) => {
    mockStore.updateRoadmapTask(currentUser.id, phaseId, taskId, true, noteDraft);
    setRoadmap(mockStore.getRoadmap(currentUser.id));
    setActiveNotesTaskId(null);
    setNoteDraft("");
    refreshData();
  };

  const togglePause = () => {
    mockStore.togglePauseRoadmap(currentUser.id);
    setRoadmap(mockStore.getRoadmap(currentUser.id));
    refreshData();
  };

  const totalTasks = roadmap.phases.reduce((acc: number, p: any) => acc + p.tasks.length, 0);
  const completedTasks = roadmap.phases.reduce(
    (acc: number, p: any) => acc + p.tasks.filter((t: any) => t.completed).length,
    0
  );
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Domain: {roadmap.domain}
            </span>
            {roadmap.isPaused ? (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Paused
              </span>
            ) : (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Active Tracking
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{roadmap.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{roadmap.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePause}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
              roadmap.isPaused
                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {roadmap.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{roadmap.isPaused ? "Resume Roadmap" : "Pause Tracking"}</span>
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-semibold text-slate-700">Roadmap Completion</span>
          <span className="font-bold text-indigo-600 text-sm">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-slate-400">
          <span>{completedTasks} of {totalTasks} milestones completed</span>
          <span>Target pace: 15 hrs / week</span>
        </div>
      </div>

      {/* Phase List */}
      <div className="space-y-4">
        {roadmap.phases.map((phase: any) => {
          const isExpanded = expandedPhases[phase.id];
          const phaseTasksDone = phase.tasks.filter((t: any) => t.completed).length;
          const isPhaseComplete = phaseTasksDone === phase.tasks.length;
          const isLocked = phase.status === "locked";

          return (
            <div
              key={phase.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isPhaseComplete
                  ? "border-emerald-200 shadow-2xs"
                  : isLocked
                  ? "border-slate-200 opacity-80"
                  : "border-indigo-200 shadow-xs ring-1 ring-indigo-50"
              }`}
            >
              {/* Phase Header */}
              <div
                onClick={() => togglePhase(phase.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isPhaseComplete
                        ? "bg-emerald-100 text-emerald-800"
                        : isLocked
                        ? "bg-slate-100 text-slate-400"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {isPhaseComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : (
                      phase.phaseNumber
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{phase.title}</h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                          isPhaseComplete
                            ? "bg-emerald-50 text-emerald-700"
                            : isLocked
                            ? "bg-slate-100 text-slate-500"
                            : "bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {isPhaseComplete ? "Completed" : isLocked ? "Locked" : "In Progress"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">
                    {phaseTasksDone}/{phase.tasks.length} tasks
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Tasks Expansion */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3">
                  {phase.tasks.map((task: any) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all ${
                        task.completed
                          ? "bg-slate-50/60 border-slate-200 text-slate-500"
                          : "bg-white border-slate-200 text-slate-800 shadow-2xs hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleTaskToggle(phase.id, task.id, task.completed)}
                            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                              task.completed
                                ? "bg-emerald-600 text-white"
                                : "border border-slate-300 hover:border-indigo-600"
                            }`}
                          >
                            {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <h4
                              className={`text-xs font-bold leading-snug ${
                                task.completed ? "line-through text-slate-400" : "text-slate-900"
                              }`}
                            >
                              {task.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {task.description}
                            </p>

                            {/* Recommended external resource if attached */}
                            {task.resourceUrls && task.resourceUrls.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {task.resourceUrls.map((res: any, idx: number) => (
                                  <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded"
                                  >
                                    <span>Resource: {res.title}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Saved personal notes */}
                            {task.notes && (
                              <div className="mt-2 p-2 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900">
                                <strong>My Notes:</strong> {task.notes}
                              </div>
                            )}

                            {/* Note Editor Modal / Inline */}
                            {activeNotesTaskId === task.id ? (
                              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                <label className="block text-[11px] font-semibold text-slate-700">
                                  Add Personal Learning Notes / Project Link:
                                </label>
                                <textarea
                                  rows={2}
                                  value={noteDraft}
                                  onChange={(e) => setNoteDraft(e.target.value)}
                                  placeholder="e.g. Completed with 4.8 contrast ratio; figma component link..."
                                  className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveNotes(phase.id, task.id)}
                                    className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-semibold"
                                  >
                                    Save Note
                                  </button>
                                  <button
                                    onClick={() => setActiveNotesTaskId(null)}
                                    className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setActiveNotesTaskId(task.id);
                                  setNoteDraft(task.notes || "");
                                }}
                                className="mt-2 text-[11px] font-semibold text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                              >
                                <FileEdit className="w-3 h-3" />
                                <span>{task.notes ? "Edit Notes" : "+ Add Note"}</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{task.duration}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
