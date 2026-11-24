"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { Settings, Save } from "lucide-react";
import confetti from "canvas-confetti";

export default function BusinessSettingsPage() {
  const { currentUser, refreshData } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    mockStore.setCurrentUser({ ...currentUser, name, email });
    refreshData();
    setSaved(true);
    confetti({ particleCount: 40, spread: 40 });
    setTimeout(() => setSaved(false), 3000);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Business Profile Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure company name, contact person, and billing email.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        {saved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
            Company information updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Billing / Contact Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
