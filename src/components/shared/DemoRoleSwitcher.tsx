"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { RefreshCw, ChevronDown, Check, SlidersHorizontal, Shield, User } from "lucide-react";

export function DemoRoleSwitcher() {
  const { currentUser, switchRole, resetDemoData } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  const roles: { role: "learner" | "earner" | "business" | "admin"; label: string; desc: string; email: string }[] = [
    {
      role: "learner",
      label: "Learner Persona",
      desc: "Tanvir Ahmed (UI/UX Student)",
      email: "learner@dokkhonagorik.demo"
    },
    {
      role: "earner",
      label: "Earner Persona",
      desc: "Sabbir Hossain (Product Designer)",
      email: "earner@dokkhonagorik.demo"
    },
    {
      role: "business",
      label: "Business SME Persona",
      desc: "Apex Capital / Pathao Express",
      email: "business@dokkhonagorik.demo"
    },
    {
      role: "admin",
      label: "Platform Admin",
      desc: "Moderation & System Controls",
      email: "admin@dokkhonagorik.demo"
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-80 bg-white rounded-xl shadow-xl border border-[rgba(15,23,42,0.12)] p-3 mb-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(15,23,42,0.06)]">
              <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
                Persona switcher
              </span>
              <button
                onClick={resetDemoData}
                title="Reset all demo data to fresh state"
                className="text-xs text-[#64748B] hover:text-[#DC2626] flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-[#F3F4F6]"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Data
              </button>
            </div>

            <p className="text-xs text-[#475569] mb-2 leading-relaxed">
              Toggle personas instantly to test both <strong>Learner-to-Earner</strong> and <strong>SME Milestone</strong> workflows:
            </p>

            <div className="space-y-1.5">
              {roles.map((item) => {
                const isActive = currentUser.role === item.role;
                return (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setIsOpen(false);
                      if (item.role === "learner") window.location.href = "/learner";
                      else if (item.role === "earner") window.location.href = "/earner";
                      else if (item.role === "business") window.location.href = "/business";
                      else if (item.role === "admin") window.location.href = "/admin";
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-blue-50/80 border border-blue-200 text-[#0F172A] font-semibold"
                        : "hover:bg-[#FAF9F6] text-[#475569] border border-transparent"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{item.label}</span>
                        {isActive && (
                          <span className="bg-[#2563EB] text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">{item.desc}</div>
                    </div>
                    {isActive && <Check className="w-4 h-4 text-[#2563EB] shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-[rgba(15,23,42,0.06)] text-[11px] text-[#64748B] text-center font-mono">
              Demo credentials: <code className="bg-[#F3F4F6] px-1 py-0.5 rounded text-[#0F172A]">demo1234</code>
            </div>
          </div>
        )}

        {/* Docked Trigger Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-full shadow-sm border border-slate-700 text-xs font-medium transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          <span className="capitalize">{currentUser.role} mode</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}
