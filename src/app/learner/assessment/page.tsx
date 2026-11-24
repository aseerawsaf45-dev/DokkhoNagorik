"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function SkillAssessmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [practicalNotes, setPracticalNotes] = useState("");

  const questions = [
    {
      id: 1,
      q: "According to WCAG 2.1 AA standards, what is the minimum required color contrast ratio for normal body text against its background?",
      options: ["3.0:1", "4.5:1", "7.0:1", "10.0:1"],
      correct: 1,
      explanation: "WCAG 2.1 AA requires 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold)."
    },
    {
      id: 2,
      q: "When configuring a responsive card grid in Figma using Auto Layout 5.0, which property ensures child cards wrap automatically on narrower viewports?",
      options: [
        "Fixed Width with Constraints",
        "Auto Layout with Wrap enabled and Min/Max widths configured",
        "Absolute positioning with horizontal pin",
        "Layer opacity masking"
      ],
      correct: 1,
      explanation: "Auto Layout Wrap with Min/Max width constraints produces fluid, responsive wrapping behavior."
    },
    {
      id: 3,
      q: "Which Gestalt principle best describes grouping navigation items together inside a bordered container with a distinct background fill?",
      options: [
        "Law of Proximity",
        "Law of Common Region",
        "Law of Closure",
        "Law of Continuity"
      ],
      correct: 1,
      explanation: "The Law of Common Region states that elements located within the same closed boundary are perceived as belonging together."
    }
  ];

  const handleSelect = (qIdx: number, optIdx: number) => {
    setAnswers({ ...answers, [qIdx]: optIdx });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  const score = Object.entries(answers).filter(
    ([qIdx, optIdx]) => questions[Number(qIdx)].correct === optIdx
  ).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          Diagnostic Assessment
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
          UI/UX Foundational Skill Diagnostic
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Complete this diagnostic to benchmark your theoretical and practical knowledge.
          <em className="block text-slate-400 mt-1">
            Note: SkillBridge assessments provide diagnostic skill benchmarking, not accredited institutional certificates.
          </em>
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <span className="text-[11px] font-bold text-indigo-600">Question {idx + 1} of 3</span>
                <h3 className="font-bold text-sm text-slate-900">{q.q}</h3>

                <div className="space-y-2 pt-2">
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        answers[idx] === optIdx
                          ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-semibold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        checked={answers[idx] === optIdx}
                        onChange={() => handleSelect(idx, optIdx)}
                        className="text-indigo-600 accent-indigo-600"
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Practical Task Submission */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold text-indigo-600">Practical Component</span>
              <h3 className="font-bold text-sm text-slate-900">
                Self-Assessment: Explain your approach to testing mobile tap target sizes
              </h3>
              <p className="text-xs text-slate-500">
                Describe how you verify min 44x44px touch targets on mobile viewports.
              </p>
              <textarea
                rows={3}
                value={practicalNotes}
                onChange={(e) => setPracticalNotes(e.target.value)}
                placeholder="e.g. Setting min-height and padding on interactive icon buttons in Figma..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Submit Diagnostic & View Result</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Diagnostic Score: {score} / 3 ({Math.round((score / 3) * 100)}%)
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Assessed Skill Level: <strong className="text-emerald-700">Practitioner</strong>. You demonstrate solid familiarity with WCAG accessibility guidelines, Figma Auto Layout rules, and Gestalt layout hierarchy.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Retake Assessment
            </button>
            <Link
              href="/learner/become-earner"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-2xs"
            >
              Check Earner Transition
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
