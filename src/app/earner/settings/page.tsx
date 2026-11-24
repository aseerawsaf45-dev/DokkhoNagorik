"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { Settings, User, Save, DollarSign, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export default function EarnerSettingsPage() {
  const { currentUser, refreshData } = useApp();
  const [profile, setProfile] = useState<any>(null);
  const [hourlyRate, setHourlyRate] = useState(1200);
  const [budget, setBudget] = useState(25000);
  const [availability, setAvailability] = useState("Part-time (20h/wk)");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const ep = mockStore.getEarnerProfile(currentUser.id) || mockStore.getEarnerProfile("user-earner-1");
    if (ep) {
      setProfile(ep);
      setHourlyRate(ep.hourlyRateBDT || 1200);
      setBudget(ep.expectedProjectBudgetBDT || 25000);
      setAvailability(ep.availability || "Part-time (20h/wk)");
    }
  }, [currentUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !profile) return;
    const updated = {
      ...profile,
      hourlyRateBDT: hourlyRate,
      expectedProjectBudgetBDT: budget,
      availability
    };
    mockStore.saveEarnerProfile(updated);
    refreshData();
    setSaved(true);
    confetti({ particleCount: 40, spread: 40 });
    setTimeout(() => setSaved(false), 3000);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Earner Preferences</h1>
        <p className="text-xs text-slate-500 mt-1">Configure project budget expectations and weekly availability.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        {saved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
            Earner profile rates updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
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
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Weekly Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Part-time (20h/wk)">Part-time (20h/wk)</option>
              <option value="Full-time">Full-time (40h/wk)</option>
              <option value="Weekends & Evenings">Weekends & Evenings</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Earner Preferences</span>
          </button>
        </form>
      </div>
    </div>
  );
}
