"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { mockStore } from "@/lib/mockStore";
import { EarnerProfile, User } from "@/types";
import { formatBDT } from "@/lib/utils";
import { Search, Star, Briefcase, ExternalLink, Mail, CheckCircle2, MapPin } from "lucide-react";

export default function BrowseEarnersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Record<string, EarnerProfile>>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allUsers = mockStore.getUsers();
    const earners = allUsers.filter((u) => u.hasEarnerProfile || u.role === "earner");
    setUsers(earners);
    const profileMap: Record<string, EarnerProfile> = {};
    earners.forEach((u) => {
      const p = mockStore.getEarnerProfile(u.id) || mockStore.getEarnerProfile("user-earner-1");
      if (p) profileMap[u.id] = p;
    });
    setProfiles(profileMap);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Verified Talent Directory
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          Browse Verified Earners
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review candidates with published case study evidence and readiness scores.
        </p>

        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by skill, title, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((u) => {
          const p = profiles[u.id] || profiles["user-earner-1"];
          if (!p) return null;

          return (
            <div
              key={u.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden shrink-0">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        u.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{u.name}</h3>
                      <p className="text-xs text-indigo-600 font-medium">{p.title}</p>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {u.country}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{p.rating} ({p.reviewsCount})</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">{p.bio}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.skills.slice(0, 4).map((s) => (
                    <span
                      key={s.name}
                      className="bg-slate-50 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200 font-medium"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Availability:</span>
                  <span className="font-semibold text-slate-800">{p.availability}</span>
                </div>

                <Link
                  href={`/u/${u.email.split("@")[0]}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                >
                  <span>View Public Portfolio</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
