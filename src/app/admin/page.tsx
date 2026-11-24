"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { formatBDT } from "@/lib/utils";
import {
  ShieldCheck,
  Users,
  FolderGit2,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Search
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AdminDashboardPage() {
  const { currentUser, resetDemoData, refreshData } = useApp();
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "projects">("overview");

  useEffect(() => {
    setUsers(mockStore.getUsers());
    setProjects(mockStore.getMarketplaceProjects());
  }, []);

  const totalLearners = users.filter((u) => u.role === "learner").length;
  const totalEarners = users.filter((u) => u.hasEarnerProfile || u.role === "earner").length;
  const totalBusinesses = users.filter((u) => u.role === "business").length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#171B24]">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              SB
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight">DokkhoNagorik Admin</span>
          </Link>
          <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Superuser Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Seed</span>
          </button>
          <Link
            href="/learner"
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            Switch to Learner
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500">Total Registered</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{users.length} Users</div>
            <p className="text-[11px] text-slate-400 mt-1">Across 3 ecosystem roles</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500">Learners & Earners</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {totalLearners} / {totalEarners}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {Math.round((totalEarners / (totalLearners + totalEarners)) * 100)}% transition rate
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500">Active SME Projects</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{projects.length} Listings</div>
            <p className="text-[11px] text-slate-400 mt-1">Total escrow: ৳365,000</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-medium text-slate-500">Platform Health</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">100% Operational</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero pending moderation disputes</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "overview"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            System Health & Moderation
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "users"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "projects"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Project Moderation ({projects.length})
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Moderation Queues
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span>Reported Project Listings</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    0 Pending
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span>Business Verification Requests</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    All Verified
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span>Milestone Escrow Disputes</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    0 Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                Demo Seed Architecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The prototype uses deterministic localStorage persistence initialized with 3 Learners, 3 Earners, 3 Businesses, 12 SME projects, and full milestone escrow flows.
              </p>
              <button
                onClick={resetDemoData}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-all"
              >
                Trigger Fresh Seed Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="capitalize font-semibold text-indigo-600">{u.role}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{u.country}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Budget (BDT)</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{p.title}</td>
                      <td className="py-3 px-4 text-slate-500">{p.businessName}</td>
                      <td className="py-3 px-4 text-slate-500">{p.category}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-900">{formatBDT(p.budgetBDT)}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
