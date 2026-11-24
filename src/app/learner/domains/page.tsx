"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight, Check, Sparkles, TrendingUp, Layers } from "lucide-react";

export default function DomainExpansionPage() {
  const [addedDomains, setAddedDomains] = useState<string[]>([]);

  const expansions = [
    {
      domain: "Frontend Development (Next.js & Tailwind)",
      whyRelevant: "As a UI/UX Designer, knowing modern frontend architecture allows you to ship design systems and production-grade prototypes.",
      transferableSkills: ["Figma tokens", "Design Systems", "Component states", "Responsive Layout"],
      newSkillsRequired: ["React / Next.js", "TypeScript", "Tailwind CSS", "Git & GitHub"],
      careerOpportunities: "Design Engineer, UI Engineer, Product Developer",
      avgSalaryBDT: "৳50,000 - ৳120,000 / mo"
    },
    {
      domain: "Product Design Strategy & Research",
      whyRelevant: "Elevates visual UI craft into strategic business metrics, retention optimization, and user interview synthesis.",
      transferableSkills: ["User flows", "Wireframing", "Usability testing"],
      newSkillsRequired: ["A/B Testing", "Cohort Analytics", "SaaS Funnel Optimization", "Jobs to be Done"],
      careerOpportunities: "Lead Product Designer, Growth Product Manager",
      avgSalaryBDT: "৳60,000 - ৳150,000 / mo"
    },
    {
      domain: "Design Systems & Token Architecture",
      whyRelevant: "High demand among enterprise teams to maintain multi-brand visual consistency across mobile and desktop apps.",
      transferableSkills: ["Auto Layout", "Component Variants", "Color Contrast"],
      newSkillsRequired: ["Design Tokens (Style Dictionary)", "Accessibility Auditing", "Component Documentation"],
      careerOpportunities: "Design Systems Architect, Design Ops Lead",
      avgSalaryBDT: "৳70,000 - ৳140,000 / mo"
    }
  ];

  const handleAddDomain = (domainName: string) => {
    if (!addedDomains.includes(domainName)) {
      setAddedDomains([...addedDomains, domainName]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Career Expansion
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          Recommended Related Domains
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          DokkhoNagorik analyzes your active mastery in <strong>UI/UX Design</strong> and highlights high-leverage adjacent domains that multiply your earning power.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {expansions.map((item, idx) => {
          const isAdded = addedDomains.includes(item.domain);
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{item.domain}</h3>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                      Target Roles: {item.careerOpportunities}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                    {item.avgSalaryBDT}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-4 leading-relaxed">{item.whyRelevant}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Skills That Transfer
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.transferableSkills.map((s) => (
                        <span key={s} className="bg-white text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-2">
                      New Skills Required
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.newSkillsRequired.map((s) => (
                        <span key={s} className="bg-white text-indigo-900 text-[11px] px-2 py-0.5 rounded border border-indigo-200 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Adds 3 new milestone phases to your roadmap.
                </span>
                <button
                  onClick={() => handleAddDomain(item.domain)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isAdded
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Roadmap</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-3.5 h-3.5" />
                      <span>Add Track to Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
