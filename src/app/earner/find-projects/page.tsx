"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { MarketplaceProject, EarnerProfile } from "@/types";
import { formatBDT } from "@/lib/utils";
import { calculateMatchScore } from "@/lib/matchingEngine";
import {
  Search,
  Filter,
  DollarSign,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Layers,
  ChevronDown
} from "lucide-react";
import confetti from "canvas-confetti";

export default function FindProjectsPage() {
  const { currentUser, refreshData } = useApp();
  const [projects, setProjects] = useState<MarketplaceProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Application Modal
  const [activeApplyProject, setActiveApplyProject] = useState<MarketplaceProject | null>(null);
  const [coverMessage, setCoverMessage] = useState("");
  const [proposedBudget, setProposedBudget] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState("2 weeks");
  const [selectedPortfolioId, setSelectedPortfolioId] = useState("");
  const [earnerPortfolios, setEarnerPortfolios] = useState<any[]>([]);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    setProjects(mockStore.getMarketplaceProjects());
    if (currentUser) {
      setEarnerPortfolios(mockStore.getPortfolioProjects(currentUser.id));
    }
  }, [currentUser]);

  const categories = [
    "All",
    "UI/UX Design",
    "Web Development",
    "Programming",
    "Data Analytics",
    "Graphic Design",
    "Content Writing"
  ];

  const handleOpenApply = (p: MarketplaceProject) => {
    setActiveApplyProject(p);
    setProposedBudget(p.budgetBDT);
    setEstimatedDuration(p.duration);
    setCoverMessage(
      `I have solid practical experience in ${p.requiredSkills.slice(0, 2).join(" & ")}. My portfolio case study directly demonstrates my methodology and I can deliver all required milestones on schedule.`
    );
    if (earnerPortfolios.length > 0) {
      setSelectedPortfolioId(earnerPortfolios[0].id);
    }
    setApplySuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyProject || !currentUser) return;

    mockStore.submitApplication({
      projectId: activeApplyProject.id,
      projectTitle: activeApplyProject.title,
      businessId: activeApplyProject.businessId,
      businessName: activeApplyProject.businessName,
      earnerId: currentUser.id,
      earnerName: currentUser.name,
      earnerTitle: "Product Designer & UI/UX Specialist",
      coverMessage,
      proposedBudgetBDT: proposedBudget,
      estimatedCompletionTime: estimatedDuration,
      portfolioProjectId: selectedPortfolioId,
      relevantSkills: activeApplyProject.requiredSkills
    });

    setApplySuccess(true);
    refreshData();
    confetti({ particleCount: 70, spread: 60 });
    setTimeout(() => {
      setActiveApplyProject(null);
    }, 1500);
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "All" || p.experienceLevel === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            SME Marketplace
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Find SME Projects
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified contracts posted by startups and local businesses. Budgets are denominated in BDT (৳) and held in escrow.
          </p>
        </div>

        <Link
          href="/earner/recommended"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold shrink-0 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>View Matched For You</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by keyword, company, or skill (e.g. Figma, Next.js, SQL)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedCategory === c
                    ? "bg-indigo-600 text-white font-semibold shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Experience Level:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="p-1 border border-slate-200 rounded bg-white text-xs text-slate-700"
            >
              <option value="All">All Tiers</option>
              <option value="Entry">Entry (Fresh Graduates)</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Listings */}
      <div className="space-y-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                  {proj.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {proj.businessName} ({proj.businessIndustry})
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">Posted {proj.postedDate}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{proj.description}</p>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="bg-slate-50 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Deliverables summary */}
              <div className="text-[11px] text-slate-500 space-y-1 pt-1">
                <span className="font-semibold text-slate-700">Key Deliverables:</span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {proj.deliverables.slice(0, 2).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price & Action Column */}
            <div className="shrink-0 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-4 min-w-[200px]">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Budget (Escrow)
                </span>
                <span className="text-xl font-extrabold text-slate-900 block">
                  {formatBDT(proj.budgetBDT)}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Duration: {proj.duration} • {proj.workType}
                </span>
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={() => handleOpenApply(proj)}
                  className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 text-center block">
                  {proj.applicantCount} proposals submitted
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Submission Modal */}
      {activeApplyProject && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 my-8">
            {applySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Proposal Submitted Successfully!</h3>
                <p className="text-xs text-slate-500">
                  {activeApplyProject.businessName} has been notified and will review your portfolio.
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    Submit Proposal
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    {activeApplyProject.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Client: {activeApplyProject.businessName} • Escrow: {formatBDT(activeApplyProject.budgetBDT)}
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Cover Note / Pitch
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={coverMessage}
                      onChange={(e) => setCoverMessage(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg"
                      placeholder="Explain how your past work maps to this project's requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Proposed Price (BDT ৳)
                      </label>
                      <input
                        type="number"
                        required
                        value={proposedBudget}
                        onChange={(e) => setProposedBudget(Number(e.target.value))}
                        className="w-full p-2 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Estimated Delivery Time
                      </label>
                      <input
                        type="text"
                        required
                        value={estimatedDuration}
                        onChange={(e) => setEstimatedDuration(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-lg"
                        placeholder="e.g. 2 weeks"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Attach Verified Portfolio Project
                    </label>
                    <select
                      value={selectedPortfolioId}
                      onChange={(e) => setSelectedPortfolioId(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                    >
                      {earnerPortfolios.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                      <option value="none">Include standard profile link</option>
                    </select>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Attaching a relevant case study increases shortlist rates by 3.2x.
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveApplyProject(null)}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
