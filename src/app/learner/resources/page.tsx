"use client";

import React, { useState, useEffect } from "react";
import { mockStore } from "@/lib/mockStore";
import { LearningResource } from "@/types";
import {
  Search,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Filter,
  Clock,
  Sparkles
} from "lucide-react";

export default function LearningResourcesPage() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  useEffect(() => {
    setResources(mockStore.getResources());
  }, []);

  const handleToggleBookmark = (id: string) => {
    mockStore.toggleBookmarkResource(id);
    setResources(mockStore.getResources());
  };

  const handleToggleComplete = (id: string) => {
    mockStore.toggleCompleteResource(id);
    setResources(mockStore.getResources());
  };

  const categories = [
    "All",
    "Articles",
    "YouTube tutorials",
    "Documentation",
    "Free courses",
    "Practice websites",
    "Books",
    "Tools"
  ];

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "All" || r.difficulty === selectedDifficulty;
    const matchesBookmark = !onlyBookmarked || r.bookmarked;
    return matchesSearch && matchesCat && matchesDiff && matchesBookmark;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Curated Library
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Learning Resources
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Searchable, vetted guides, courses, documentation, and tools mapped to your roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
              onlyBookmarked
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
            <span>Saved Bookmarks</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, skill (e.g. Figma, Next.js, SEO), or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Category Pills */}
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

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="p-1 border border-slate-200 rounded bg-white text-xs text-slate-700"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-700 text-sm">No resources match your filters</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the category filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                item.completed
                  ? "border-emerald-200 bg-emerald-50/20"
                  : "border-slate-200 hover:border-indigo-300 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleBookmark(item.id)}
                      className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                      title={item.bookmarked ? "Remove Bookmark" : "Bookmark Resource"}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          item.bookmarked ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleToggleComplete(item.id)}
                      className={`p-1 transition-colors ${
                        item.completed ? "text-emerald-600" : "text-slate-300 hover:text-emerald-600"
                      }`}
                      title={item.completed ? "Mark Incomplete" : "Mark Completed"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2"
                >
                  {item.title}
                </a>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                    {item.skill}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                    {item.difficulty}
                  </span>
                  {item.isPaid ? (
                    <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                      Paid Resource
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-semibold">
                      100% Free
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.estimatedTime}</span>
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
