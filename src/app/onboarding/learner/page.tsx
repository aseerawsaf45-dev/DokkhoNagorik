"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { mockStore } from "@/lib/mockStore";
import { LearnerProfile } from "@/types";
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function LearnerOnboardingPage() {
  const router = useRouter();
  const { currentUser, refreshData } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [ageRange, setAgeRange] = useState("21-25");
  const [educationLevel, setEducationLevel] = useState("Bachelor's Student");
  const [occupation, setOccupation] = useState("Undergraduate");
  const [interests, setInterests] = useState<string[]>(["UI/UX Design", "Programming"]);
  const [skills, setSkills] = useState<{ name: string; level: "Beginner" | "Intermediate" | "Advanced" }[]>([
    { name: "Figma", level: "Intermediate" },
    { name: "HTML & CSS", level: "Beginner" }
  ]);
  const [goals, setGoals] = useState<string[]>(["Become a freelancer", "Earn through part-time projects"]);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [learningFormat, setLearningFormat] = useState("Project-based & Hands-on");
  const [budgetPreference, setBudgetPreference] = useState<"free" | "flexible">("free");
  const [targetDomain, setTargetDomain] = useState("UI/UX Design");

  const availableInterests = [
    "Programming",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Business and Entrepreneurship",
    "Data Analytics",
    "Content Writing",
    "Video Editing",
    "Engineering and Technical Skills",
    "Finance",
    "Research"
  ];

  const availableGoals = [
    "Get a job",
    "Become a freelancer",
    "Start a business",
    "Earn through part-time projects",
    "Explore a new domain"
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const toggleGoal = (item: string) => {
    if (goals.includes(item)) {
      setGoals(goals.filter((g) => g !== item));
    } else {
      setGoals([...goals, item]);
    }
  };

  const handleFinish = () => {
    if (!currentUser) return;
    const profile: LearnerProfile = {
      userId: currentUser.id,
      ageRange,
      educationLevel,
      occupation,
      interests,
      skills,
      goals,
      hoursPerWeek,
      learningFormat,
      budgetPreference,
      targetDomain
    };
    mockStore.saveLearnerProfile(profile);
    refreshData();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      router.push("/learner");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Step {step} of 6</span>
            <span className="text-indigo-600 font-bold">
              {step === 1 && "Personal Info"}
              {step === 2 && "Core Interests"}
              {step === 3 && "Existing Skills"}
              {step === 4 && "Target Goals"}
              {step === 5 && "Study Preferences"}
              {step === 6 && "Confirmation & Roadmap Generation"}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Tell us about your background</h2>
            <p className="text-xs text-slate-500">This helps SkillBridge tailor roadmap pacing to your commitments.</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age Range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="Under 18">Under 18</option>
                <option value="18-20">18-20</option>
                <option value="21-25">21-25</option>
                <option value="26-30">26-30</option>
                <option value="31+">31+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Education Level</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="High School">High School / College</option>
                <option value="Bachelor's Student">Bachelor's Student (Current)</option>
                <option value="Fresh Graduate">Fresh Graduate</option>
                <option value="Master's / Postgraduate">Master's / Postgraduate</option>
                <option value="Self-Taught">Self-Taught Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Computer Science Student / Sales Executive"
                className="w-full p-2 text-xs border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Select fields you want to explore</h2>
            <p className="text-xs text-slate-500">Pick all domains that interest you. We will focus your primary roadmap.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableInterests.map((item) => {
                const selected = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      selected
                        ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Existing Skills */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What skills do you already have?</h2>
            <p className="text-xs text-slate-500">Rate your current proficiency so we don't repeat fundamentals.</p>

            <div className="space-y-2">
              {skills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 flex-1">{s.name}</span>
                  <select
                    value={s.level}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[idx].level = e.target.value as any;
                      setSkills(updated);
                    }}
                    className="p-1 border border-slate-200 rounded bg-white text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter skill name (e.g. Photoshop, React, Python):");
                  if (name) setSkills([...skills, { name, level: "Beginner" }]);
                }}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                + Add another skill
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Goals */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What is your primary goal?</h2>
            <p className="text-xs text-slate-500">Choose the outcomes you want to achieve with SkillBridge.</p>

            <div className="space-y-2">
              {availableGoals.map((g) => {
                const selected = goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`w-full p-3 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-all ${
                      selected
                        ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{g}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Preferences */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Learning Commitment</h2>
            <p className="text-xs text-slate-500">How would you like to pace your roadmap?</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hours available per week: <span className="text-indigo-600 font-bold">{hoursPerWeek} hrs</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5 hrs (Casual)</span>
                <span>20 hrs (Part-time)</span>
                <span>40 hrs (Intensive)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Target Domain</label>
              <select
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Programming">Programming & Web Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Budget Preference</label>
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="budgetPref"
                    checked={budgetPreference === "free"}
                    onChange={() => setBudgetPreference("free")}
                  />
                  <span>100% Free resources only</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="budgetPref"
                    checked={budgetPreference === "flexible"}
                    onChange={() => setBudgetPreference("flexible")}
                  />
                  <span>Flexible (Open to paid certifications/tools)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
              <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h2 className="text-xl font-bold text-indigo-950">Your Profile & Roadmap are Ready!</h2>
              <p className="text-xs text-indigo-700 mt-1">
                We generated your custom learning trajectory for <strong>{targetDomain}</strong> with 5 progressive phases.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Track:</span>
                <span className="font-semibold text-slate-900">{targetDomain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pace:</span>
                <span className="font-semibold text-slate-900">{hoursPerWeek} hours / week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Objective:</span>
                <span className="font-semibold text-slate-900">{goals[0] || "Become a freelancer"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Earner Readiness:</span>
                <span className="font-semibold text-emerald-600">Pending 1st Practice Project</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition-all"
            >
              <span>Launch Dashboard</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
