"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockStore } from "@/lib/mockStore";
import { PortfolioProject, User, EarnerProfile } from "@/types";
import {
  ExternalLink,
  Mail,
  MapPin,
  CheckCircle2,
  Briefcase,
  Star,
  Sparkles,
  ArrowRight
} from "lucide-react";

function PortfolioView() {
  const params = useParams();
  const username = params?.username as string;

  const [user, setUser] = useState<User | null>(null);
  const [earnerProfile, setEarnerProfile] = useState<EarnerProfile | null>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const users = mockStore.getUsers();
    // find user by email prefix or fallback to user-learner-1 or earner-1
    let target = users.find((u) => u.email.toLowerCase().includes(username?.toLowerCase() || ""));
    if (!target) target = users[0];

    setUser(target);
    const earner = mockStore.getEarnerProfile(target.id) || mockStore.getEarnerProfile("user-earner-1");
    setEarnerProfile(earner);
    const userProjects = mockStore.getPortfolioProjects(target.id);
    setProjects(userProjects.length > 0 ? userProjects : mockStore.getPortfolioProjects());
  }, [username]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#171B24]">
      {/* Top Banner Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            SB
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">SkillBridge Public Showcase</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Verified Case-Study Portfolio
          </span>
          <Link
            href="/register"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-2xs"
          >
            Hire on SkillBridge
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 text-2xl font-bold overflow-hidden shrink-0 shadow-sm">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{user.name}</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Earner
                </span>
              </div>

              <p className="text-sm font-semibold text-indigo-600 mt-1">
                {earnerProfile?.title || "Product Designer & UI/UX Specialist"}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{user.country}</span>
                </span>
                <span>•</span>
                <span>Availability: {earnerProfile?.availability || "Part-time (20h/wk)"}</span>
                <span>•</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {earnerProfile?.rating || "4.9"} ({earnerProfile?.reviewsCount || 7} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <a
              href={`mailto:${user.email}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Contact Directly</span>
            </a>
            <Link
              href="/earner/find-projects"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
            >
              <span>Invite to SME Project</span>
            </Link>
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">About</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {earnerProfile?.bio ||
                "Passionate about creating clean, information-dense user interfaces and enterprise SaaS experiences that solve commercial pain points."}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Core Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {(earnerProfile?.skills || [
                { name: "Figma", level: "Advanced" },
                { name: "UI/UX Design", level: "Advanced" },
                { name: "Design Systems", level: "Intermediate" },
                { name: "Responsive Web", level: "Advanced" }
              ]).map((s: any) => (
                <span
                  key={s.name}
                  className="bg-indigo-50 text-indigo-900 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-100"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Featured Case Studies</h2>
            <span className="text-xs text-slate-400">{projects.length} Published Entries</span>
          </div>

          <div className="space-y-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
                  <div className="lg:col-span-5 h-64 lg:h-auto rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.skillsUsed.map((s) => (
                          <span
                            key={s}
                            className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">{proj.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                            Problem Statement
                          </span>
                          <p className="text-slate-700 leading-snug">{proj.problemStatement}</p>
                        </div>

                        <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">
                            Key Outcomes
                          </span>
                          <p className="text-emerald-900 font-medium leading-snug">{proj.keyOutcomes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Completed: {proj.completionDate}
                      </span>

                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          <span>Explore Prototype</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading showcase...</div>}>
      <PortfolioView />
    </Suspense>
  );
}
