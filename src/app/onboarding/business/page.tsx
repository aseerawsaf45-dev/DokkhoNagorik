"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Building2, ArrowRight } from "lucide-react";

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const { currentUser } = useApp();

  const [companyName, setCompanyName] = useState("Dhaka Digital Retail Ltd");
  const [industry, setIndustry] = useState("Retail & E-Commerce");
  const [size, setSize] = useState("10-50 Employees");
  const [website, setWebsite] = useState("https://example.com");
  const [description, setDescription] = useState("Fast-growing retail network looking for modern UI design and mobile application engineering talent.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/business");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Business Profile Setup</h1>
          <p className="text-xs text-slate-500 mt-1">Tell us about your organization and talent requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                <option value="Agro & Food Processing">Agro & Food Processing</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="1-10 Employees">1-10 Employees (Startup / SME)</option>
                <option value="10-50 Employees">10-50 Employees</option>
                <option value="50+ Employees">50+ Employees</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Save & Open Business Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
