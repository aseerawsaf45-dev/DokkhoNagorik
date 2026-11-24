"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, PlusCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function PostProjectPage() {
  const router = useRouter();
  const { currentUser, refreshData } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState("Enterprise Customer Service Portal UI");
  const [category, setCategory] = useState("UI/UX Design");
  const [description, setDescription] = useState("We need a modern, responsive web application UI for our customer support agents to resolve tickets, view order histories, and initiate refunds.");
  const [requiredSkills, setRequiredSkills] = useState("Figma, UI/UX Design, Design Systems");
  const [experienceLevel, setExperienceLevel] = useState<"Entry" | "Intermediate" | "Expert">("Intermediate");
  const [collaborationType, setCollaborationType] = useState<"Individual" | "Team" | "Either">("Individual");
  const [budgetBDT, setBudgetBDT] = useState(30000);
  const [workType, setWorkType] = useState<"Remote" | "Hybrid" | "Onsite">("Remote");
  const [duration, setDuration] = useState("3 weeks");
  const [deadline, setDeadline] = useState("2026-12-25");
  const [deliverables, setDeliverables] = useState(
    "Interactive Figma prototype; Design token handover; Responsive desktop and tablet views"
  );
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(
    "Zero usability dead ends; WCAG AA contrast pass; Mobile responsive drawer navigation"
  );

  const handlePublish = () => {
    if (!currentUser) return;

    mockStore.addMarketplaceProject({
      businessId: currentUser.id,
      businessName: currentUser.name,
      businessIndustry: "Enterprise Software & SME",
      title,
      category,
      description,
      requiredSkills: requiredSkills.split(",").map((s) => s.trim()),
      experienceLevel,
      workType,
      collaborationType,
      budgetBDT,
      budgetType: "fixed",
      duration,
      deadline,
      deliverables: deliverables.split(";").map((d) => d.trim()),
      acceptanceCriteria: acceptanceCriteria.split(";").map((c) => c.trim())
    });

    refreshData();
    confetti({ particleCount: 80, spread: 60 });
    setTimeout(() => {
      router.push("/business/projects");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Step {step} of 6</span>
          <span className="text-indigo-600 font-bold">
            {step === 1 && "Basic Details"}
            {step === 2 && "Required Skills & Tier"}
            {step === 3 && "Budget & Escrow"}
            {step === 4 && "Timeline & Milestones"}
            {step === 5 && "Deliverables & Criteria"}
            {step === 6 && "Review & Publish"}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xs">
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Project Details</h2>
            <p className="text-slate-500">Define what you need built for your business.</p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Content Writing">Content Writing</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Skills & Collaboration</h2>
            <p className="text-slate-500">Specify requirements to enable smart talent matching.</p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Required Skills (comma-separated)
              </label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Experience Tier</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Entry">Entry (Fresh Graduates / Career Changers)</option>
                  <option value="Intermediate">Intermediate Practitioner</option>
                  <option value="Expert">Expert Senior Lead</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Team Preference</label>
                <select
                  value={collaborationType}
                  onChange={(e) => setCollaborationType(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Individual">Individual Earner</option>
                  <option value="Team">Multidisciplinary Squad</option>
                  <option value="Either">Either Individual or Squad</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Budget in BDT (৳)</h2>
            <p className="text-slate-500">
              Funds are placed into milestone escrow and released only upon your deliverable signoff.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Fixed Budget (BDT ৳)
              </label>
              <input
                type="number"
                value={budgetBDT}
                onChange={(e) => setBudgetBDT(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-base font-bold text-slate-900"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard SME benchmark for this scope: ৳25,000 - ৳45,000
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Work Arrangement</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as any)}
                className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Remote">100% Remote</option>
                <option value="Hybrid">Hybrid (Occasional office sync)</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Project Timeline</h2>
            <p className="text-slate-500">Provide estimated delivery deadlines.</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                  placeholder="e.g. 3 weeks"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-xl font-bold text-slate-900">Deliverables & Criteria</h2>
            <p className="text-slate-500">
              Clear acceptance criteria ensure zero misunderstandings with your earner.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Expected Outputs (separated by semicolon ;)
              </label>
              <textarea
                rows={3}
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Acceptance Criteria (separated by semicolon ;)
              </label>
              <textarea
                rows={3}
                value={acceptanceCriteria}
                onChange={(e) => setAcceptanceCriteria(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <Sparkles className="w-6 h-6 text-indigo-600 mb-1" />
              <h3 className="font-bold text-sm text-indigo-950">Review & Publish Project</h3>
              <p className="text-indigo-700 text-xs mt-0.5">
                Once published, this project appears live on the Earner Marketplace and triggers smart recommendations.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Title:</span>
                <span className="font-bold text-slate-900">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="text-slate-800">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Budget in Escrow:</span>
                <span className="font-extrabold text-indigo-600">৳{budgetBDT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration & Deadline:</span>
                <span className="text-slate-800">{duration} (Due {deadline})</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish to Marketplace</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
