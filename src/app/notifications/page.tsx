"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { formatDate } from "@/lib/utils";
import { Bell, CheckCheck, Clock, ArrowRight, ExternalLink } from "lucide-react";

export default function NotificationsPage() {
  const { currentUser, notifications, markNotificationsRead } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <PublicNavbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notification Center</h1>
            <p className="text-xs text-slate-500 mt-1">Updates on your roadmap milestones, project applications, and milestone escrow payouts.</p>
          </div>

          <button
            onClick={markNotificationsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
          >
            <CheckCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mark all read</span>
          </button>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">No notifications at the moment.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl border flex items-start justify-between gap-4 transition-all ${
                  n.read ? "bg-white border-slate-200" : "bg-indigo-50/40 border-indigo-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      n.read ? "bg-slate-300" : "bg-indigo-600"
                    }`}
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    className="shrink-0 p-1.5 text-indigo-600 hover:bg-indigo-100/50 rounded-lg"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
