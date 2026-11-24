"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { EarnerProfile } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function EarnerOnboardingPage() {
  const router = useRouter();
  const { currentUser, refreshData } = useApp();

  const [title, setTitle] = useState("Junior UI/UX & Web Designer");
  const [bio, setBio] = useState("Dedicated product designer focused on building accessible, intuitive digital experiences for local businesses.");
  const [hourlyRate, setHourlyRate] = useState(1000);
  const [expectedBudget, setExpectedBudget] = useState(20000);
  const [availability, setAvailability] = useState<"Full-time" | "Part-time (20h/wk)" | "Weekends & Evenings">("Part-time (20h/wk)");
  const [workPreference, setWorkPreference] = useState<"Individual" | "Team" | "Both">("Both");

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const profile: EarnerProfile = {
      userId: currentUser.id,
      title,
      bio,
      skills: [
        { name: "Figma", level: "Advanced" },
        { name: "UI/UX Design", level: "Intermediate" },
        { name: "Responsive Web", level: "Intermediate" }
      ],
      hourlyRateBDT: hourlyRate,
      expectedProjectBudgetBDT: expectedBudget,
      availability,
      preferredProjectTypes: ["SaaS Dashboards", "Landing Pages"],
      workPreference,
      readinessScore: 85,
      readinessFeedback: [
        "Earner profile activated",
        "Completed onboarding and rate preferences",
        "Eligible for entry & intermediate SME contracts"
      ],
      rating: 5.0,
      reviewsCount: 1
    };

    mockStore.saveEarnerProfile(profile);
    refreshData();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      router.push("/earner");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Earner Profile Setup</h1>
          <p className="text-xs text-slate-500 mt-1">Configure your commercial rate, availability, and specialty</p>
        </div>

        <form onSubmit={handleFinish} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Professional Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
              placeholder="e.g. Full-Stack Web Developer"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Professional Bio / Elevator Pitch</label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
              placeholder="Explain how you deliver value to business projects..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Rate / Hour (BDT ৳)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Project Budget (BDT ৳)</label>
              <input
                type="number"
                value={expectedBudget}
                onChange={(e) => setExpectedBudget(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Part-time (20h/wk)">Part-time (20h/wk)</option>
                <option value="Full-time">Full-time (40h/wk)</option>
                <option value="Weekends & Evenings">Weekends & Evenings</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Work Preference</label>
              <select
                value={workPreference}
                onChange={(e) => setWorkPreference(e.target.value as any)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Both">Both Individual & Team</option>
                <option value="Individual">Individual Only</option>
                <option value="Team">Team-Based Only</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Profile & Open Earner Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
