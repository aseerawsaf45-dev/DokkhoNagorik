"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useApp();
  const [email, setEmail] = useState("learner@skillbridge.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockStore.loginAs(email);
    if (user) {
      setCurrentUser(user);
      if (user.role === "learner") router.push("/learner");
      else if (user.role === "earner") router.push("/earner");
      else if (user.role === "business") router.push("/business");
      else router.push("/admin");
    } else {
      setError("User not found in demo database. Use one of the demo accounts below.");
    }
  };

  const setDemoAccount = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("demo1234");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base mx-auto mb-3 shadow-sm">
              SB
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sign In to SkillBridge</h1>
            <p className="text-xs text-slate-500 mt-1">Select a demo role or sign in with your credentials</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Logins */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 text-center">
              1-Click Instant Demo Accounts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDemoAccount("learner@skillbridge.demo")}
                className={`p-2 rounded-lg border text-left transition-all ${
                  email === "learner@skillbridge.demo"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-900"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-semibold text-[11px]">Learner Account</div>
                <div className="text-[10px] text-slate-500">Tanvir Ahmed</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("earner@skillbridge.demo")}
                className={`p-2 rounded-lg border text-left transition-all ${
                  email === "earner@skillbridge.demo"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-900"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-semibold text-[11px]">Earner Account</div>
                <div className="text-[10px] text-slate-500">Sabbir Hossain</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("business@skillbridge.demo")}
                className={`p-2 rounded-lg border text-left transition-all ${
                  email === "business@skillbridge.demo"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-900"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-semibold text-[11px]">Business SME</div>
                <div className="text-[10px] text-slate-500">Pathao Logistics</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoAccount("admin@skillbridge.demo")}
                className={`p-2 rounded-lg border text-left transition-all ${
                  email === "admin@skillbridge.demo"
                    ? "bg-indigo-50 border-indigo-300 text-indigo-900"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-semibold text-[11px]">Admin Persona</div>
                <div className="text-[10px] text-slate-500">Moderator</div>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
              Create account & start onboarding
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
