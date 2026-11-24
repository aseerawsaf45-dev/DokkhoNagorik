"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { ArrowRight, User, Mail, Lock, Globe, Sparkles, Briefcase, GraduationCap, Building2 } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as "learner" | "earner" | "business") || "learner";

  const { setCurrentUser } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [role, setRole] = useState<"learner" | "earner" | "business">(defaultRole);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = mockStore.registerUser(name, email, country, role);
    setCurrentUser(newUser);

    // Redirect to role onboarding flow
    if (role === "learner") {
      router.push("/onboarding/learner");
    } else if (role === "earner") {
      router.push("/onboarding/earner");
    } else {
      router.push("/onboarding/business");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Account Type Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">I want to join as a:</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole("learner")}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              role === "learner"
                ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500"
                : "border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${role === "learner" ? "text-indigo-600" : "text-slate-400"}`} />
            <span className="text-xs">Learner</span>
            <span className="text-[10px] text-slate-400 block font-normal leading-tight">Build skills</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("earner")}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              role === "earner"
                ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500"
                : "border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            <Briefcase className={`w-5 h-5 ${role === "earner" ? "text-indigo-600" : "text-slate-400"}`} />
            <span className="text-xs">Earner</span>
            <span className="text-[10px] text-slate-400 block font-normal leading-tight">Find projects</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("business")}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              role === "business"
                ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500"
                : "border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            <Building2 className={`w-5 h-5 ${role === "business" ? "text-indigo-600" : "text-slate-400"}`} />
            <span className="text-xs">Business</span>
            <span className="text-[10px] text-slate-400 block font-normal leading-tight">Hire talent</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="e.g. Asif Mahmud"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Bangladesh">Bangladesh</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
      >
        <span>Continue to Onboarding</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your SkillBridge Account</h1>
            <p className="text-xs text-slate-500 mt-1">Select your pathway and start your personalized journey</p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading form...</div>}>
            <RegisterForm />
          </Suspense>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
              Log in to demo account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
