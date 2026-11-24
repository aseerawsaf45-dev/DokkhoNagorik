"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { PortfolioProject } from "@/types";
import {
  Briefcase,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  CheckCircle2,
  Globe,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PortfolioBuilderPage() {
  const { currentUser, refreshData } = useApp();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [approach, setApproach] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("Figma, UI/UX Design, Design Systems");
  const [toolsUsed, setToolsUsed] = useState("Figma, FigJam");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [keyOutcomes, setKeyOutcomes] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setProjects(mockStore.getPortfolioProjects(currentUser.id));
  }, [currentUser]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setProblemStatement("");
    setApproach("");
    setSkillsUsed("Figma, UI/UX Design, Design Systems");
    setToolsUsed("Figma");
    setImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80");
    setProjectUrl("https://skillbridge.app/preview/case-study");
    setGithubUrl("");
    setKeyOutcomes("Validated through usability sessions with 8 participants; achieved 92% task success rate.");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setTitle(p.title);
    setDescription(p.description);
    setProblemStatement(p.problemStatement);
    setApproach(p.approach);
    setSkillsUsed(p.skillsUsed.join(", "));
    setToolsUsed(p.toolsUsed.join(", "));
    setImageUrl(p.imageUrl);
    setProjectUrl(p.projectUrl || "");
    setGithubUrl(p.githubUrl || "");
    setKeyOutcomes(p.keyOutcomes);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const skillsArray = skillsUsed.split(",").map((s) => s.trim()).filter(Boolean);
    const toolsArray = toolsUsed.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingProject) {
      mockStore.updatePortfolioProject({
        ...editingProject,
        title,
        description,
        problemStatement,
        approach,
        skillsUsed: skillsArray,
        toolsUsed: toolsArray,
        imageUrl,
        projectUrl,
        githubUrl,
        keyOutcomes
      });
    } else {
      mockStore.addPortfolioProject({
        userId: currentUser.id,
        title,
        description,
        problemStatement,
        approach,
        skillsUsed: skillsArray,
        toolsUsed: toolsArray,
        imageUrl,
        projectUrl,
        githubUrl,
        completionDate: new Date().toISOString().split("T")[0],
        keyOutcomes,
        isPublished: true
      });
    }

    setProjects(mockStore.getPortfolioProjects(currentUser.id));
    setIsModalOpen(false);
    refreshData();
    confetti({ particleCount: 60, spread: 50 });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio project?")) {
      mockStore.deletePortfolioProject(id);
      if (currentUser) {
        setProjects(mockStore.getPortfolioProjects(currentUser.id));
      }
      refreshData();
    }
  };

  const publicPortfolioUrl = currentUser ? `/u/${currentUser.email.split("@")[0]}` : "/u/learner";

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Portfolio Showcase
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            My Verifiable Portfolio
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            SMEs evaluate your applications directly by these case studies. Keep outcomes, metrics, and problem statements prominent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={publicPortfolioUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>Preview Public Page</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Portfolio Items List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No Portfolio Projects Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Complete a practice project from your roadmap or click below to manually add a case study.
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 shadow-xs">
                    {proj.isPublished ? "Published" : "Draft"}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Problem Statement:
                      </span>
                      <p className="text-slate-700 text-xs mt-0.5 line-clamp-2">
                        {proj.problemStatement}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Key Outcomes:
                      </span>
                      <p className="text-emerald-700 text-xs font-medium mt-0.5">
                        {proj.keyOutcomes}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.skillsUsed.map((s) => (
                      <span
                        key={s}
                        className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {proj.projectUrl && (
                    <a
                      href={proj.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 rounded hover:bg-slate-200/60"
                    title="Edit Case Study"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-200/60"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Case Study Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 my-8">
            <h3 className="font-bold text-lg text-slate-900">
              {editingProject ? "Edit Portfolio Case Study" : "Create New Portfolio Case Study"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide specific problem framing and outcomes so SME recruiters can verify your competencies.
            </p>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LogiTrack: Freight Logistics Dispatcher UI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="High-level summary of what was built..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Problem Statement</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="What user pain point or business bottleneck existed?"
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approach & Methodology</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How did you research, wireframe, or test the solution?"
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Measurable Outcomes</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reduced task completion time from 4.2 mins to 1.8 mins; 100% WCAG contrast pass"
                  value={keyOutcomes}
                  onChange={(e) => setKeyOutcomes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Skills Used (comma-separated)</label>
                  <input
                    type="text"
                    value={skillsUsed}
                    onChange={(e) => setSkillsUsed(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tools Used (comma-separated)</label>
                  <input
                    type="text"
                    value={toolsUsed}
                    onChange={(e) => setToolsUsed(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project / Prototype URL</label>
                  <input
                    type="url"
                    placeholder="https://figma.com/... or https://demo.app"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  {editingProject ? "Update Case Study" : "Publish to Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
