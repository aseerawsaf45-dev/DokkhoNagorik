"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { Transaction } from "@/types";
import { formatBDT, formatDate } from "@/lib/utils";
import { DollarSign, ArrowDownLeft, Clock, CheckCircle2, ShieldCheck } from "lucide-react";

export default function EarningsPage() {
  const { currentUser } = useApp();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const all = mockStore.getTransactions();
    setTransactions(all.filter((t) => t.userId === currentUser.id || t.userId === "user-earner-1"));
  }, [currentUser]);

  if (!currentUser) return null;

  const totalEarned = transactions
    .filter((t) => t.type === "earning" && t.status === "completed")
    .reduce((acc, t) => acc + t.amountBDT, 0);

  const pendingEscrow = transactions
    .filter((t) => t.type === "earning" && t.status === "pending")
    .reduce((acc, t) => acc + t.amountBDT, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Simulated Financial Ledger
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          Earnings & Escrow (BDT)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track project-wise payouts, milestone releases, and funds currently locked in client escrow.
          <em className="block text-slate-400 mt-1">
            *Demo simulation: No actual financial currency is transferred during prototype testing.
          </em>
        </p>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Cleared Earnings (BDT)</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{formatBDT(totalEarned || 10000)}</div>
          <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Transferred from approved client deliverables
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Active Escrow Balance</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{formatBDT(pendingEscrow || 15000)}</div>
          <p className="text-xs text-slate-400 mt-2">
            Locked by clients awaiting milestone deliverable approval
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Transaction History</h3>
          <span className="text-xs text-slate-400">{transactions.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-semibold">
              <tr>
                <th className="py-3 px-4">Transaction / Project</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{t.projectTitle}</span>
                    <span className="text-[11px] text-slate-400">Milestone Payment</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{t.reference}</td>
                  <td className="py-3.5 px-4 text-slate-500">{formatDate(t.date)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        t.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                    +{formatBDT(t.amountBDT)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
