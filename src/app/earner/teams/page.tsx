"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { Team, TeamMember } from "@/types";
import { Users, Plus, ShieldCheck, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function TeamCollaborationPage() {
  const { currentUser, refreshData } = useApp();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Team Form
  const [teamName, setTeamName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("UI/UX Design, Next.js, Content Writing");

  useEffect(() => {
    setTeams(mockStore.getTeams());
  }, []);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    mockStore.createTeam({
      creatorId: currentUser.id,
      name: teamName,
      tagline,
      description,
      skills: skills.split(",").map((s) => s.trim()),
      members: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          role: "Team Leader",
          joinedDate: new Date().toISOString().split("T")[0]
        }
      ]
    });

    setTeams(mockStore.getTeams());
    setIsCreateOpen(false);
    refreshData();
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleAddMember = (teamId: string) => {
    const name = prompt("Enter team member name (e.g. Nafisa Rahman):");
    if (!name) return;
    const roleInput = prompt("Enter role (Developer / Designer / Content Specialist / Project Manager):");
    const role = (roleInput as any) || "Developer";

    mockStore.addTeamMember(teamId, {
      userId: `user-member-${Date.now()}`,
      name,
      role,
      joinedDate: new Date().toISOString().split("T")[0]
    });
    setTeams(mockStore.getTeams());
    refreshData();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Squad Delivery
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Team Collaboration
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Form collaborative squads with complementary specialists (designers, developers, and copywriters) to bid on higher-tier SME contracts.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Form New Squad</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  Verified Team Squad
                </span>
                <span className="text-xs text-slate-400">
                  {team.projectsCompleted} projects delivered
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mt-2">{team.name}</h3>
              <p className="text-xs text-indigo-600 font-medium">{team.tagline}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{team.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Roster ({team.members.length} Members)
                  </span>
                  <button
                    onClick={() => handleAddMember(team.id)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    + Invite Member
                  </button>
                </div>

                <div className="space-y-2">
                  {team.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-800">{m.name}</span>
                        <span className="text-[10px] text-slate-400 block">Joined {m.joinedDate}</span>
                      </div>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-700">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Shared Squad Portfolio Active</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligible for Team Projects</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Team Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-lg text-slate-900">Form New Squad</h3>
            <p className="text-xs text-slate-500 mt-1">
              Collaborate on high-budget SME projects that require multidisciplinary skills.
            </p>

            <form onSubmit={handleCreateTeam} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Squad Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Studio"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-speed Next.js and UI design squad"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Create Team Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
