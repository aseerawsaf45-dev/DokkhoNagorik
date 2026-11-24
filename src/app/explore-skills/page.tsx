"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { Search, ArrowRight } from "lucide-react";

export default function ExploreSkillsPage() {
  const domains = [
    {
      name: "UI/UX & Product Design",
      skills: ["Figma", "User research", "Wireframing", "Design systems", "Prototyping", "WCAG accessibility"],
      desc: "Create intuitive, conversion-focused user interfaces and scalable design systems for SaaS and mobile apps.",
      projectDemand: "35+ active listings",
      avgBudget: "৳20,000 - ৳50,000"
    },
    {
      name: "Web & Frontend Engineering",
      skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "State management", "Performance"],
      desc: "Build high-speed, responsive web applications and headless storefronts with modern JavaScript frameworks.",
      projectDemand: "50+ active listings",
      avgBudget: "৳25,000 - ৳75,000"
    },
    {
      name: "Data Analytics & Business Intelligence",
      skills: ["SQL", "Python & Pandas", "Data visualization", "Spreadsheet modeling", "Power BI / Tableau"],
      desc: "Transform messy transaction logs and operational data into clear strategic growth insights and dashboards.",
      projectDemand: "18+ active listings",
      avgBudget: "৳18,000 - ৳45,000"
    },
    {
      name: "Digital Marketing & Growth",
      skills: ["SEO strategy", "Social media ads", "Conversion rate optimization", "Copywriting", "Email automation"],
      desc: "Help local brands and D2C startups generate qualified leads, lower CAC, and increase organic traffic.",
      projectDemand: "28+ active listings",
      avgBudget: "৳15,000 - ৳35,000"
    },
    {
      name: "Graphic & Brand Design",
      skills: ["Brand identity", "Social media creatives", "Packaging design", "Vector illustration", "Adobe / Figma"],
      desc: "Design recognizable visual identities, promotional campaign assets, and retail packaging stickers.",
      projectDemand: "30+ active listings",
      avgBudget: "৳12,000 - ৳30,000"
    },
    {
      name: "Video Editing & Motion Graphics",
      skills: ["Product walkthroughs", "Shorts / Reels", "After Effects", "Color grading", "Audio sync"],
      desc: "Create engaging short-form marketing videos and explainer animations for tech startups and online retailers.",
      projectDemand: "15+ active listings",
      avgBudget: "৳15,000 - ৳40,000"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = domains.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC]">
      <PublicNavbar />
      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono text-[#6b7487] block mb-1">Directory</span>
            <h1 className="text-3xl font-semibold text-[#111827] tracking-tight">
              Explore in-demand skills
            </h1>
            <p className="text-xs text-[#4b5565] mt-2">
              Discover skills with real commercial demand across regional SMEs and startups.
            </p>

            <div className="mt-4 relative max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search domain or skill (e.g. Figma, Next.js, SEO)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[rgba(17,24,39,0.12)] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dom, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[rgba(17,24,39,0.07)] shadow-2xs flex flex-col justify-between hover:border-[rgba(17,24,39,0.15)] transition-all"
              >
                <div>
                  <h3 className="font-semibold text-sm text-[#111827]">{dom.name}</h3>
                  <p className="text-xs text-[#4b5565] mt-2 leading-relaxed">{dom.desc}</p>

                  <div className="mt-4 pt-3 border-t border-[rgba(17,24,39,0.07)]">
                    <span className="text-[10px] font-mono text-[#6b7487] block mb-1.5 uppercase">
                      Competencies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dom.skills.map((s) => (
                        <span key={s} className="bg-slate-50 text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[rgba(17,24,39,0.07)] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6b7487]">
                    <span>SME demand:</span>
                    <span className="font-semibold text-[#111827]">{dom.projectDemand}</span>
                  </div>
                  <div className="flex justify-between text-[#6b7487]">
                    <span>Budget range:</span>
                    <span className="font-semibold text-[#111827]">{dom.avgBudget}</span>
                  </div>
                  <Link
                    href={`/register?domain=${encodeURIComponent(dom.name)}`}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 rounded bg-[rgba(67,56,202,0.06)] hover:bg-[rgba(67,56,202,0.12)] text-[#4338ca] font-medium text-xs transition-colors"
                  >
                    <span>Start roadmap</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
