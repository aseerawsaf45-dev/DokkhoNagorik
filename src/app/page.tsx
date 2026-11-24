"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/shared/PublicNavbar";
import { PublicFooter } from "@/components/shared/PublicFooter";
import { GravityField } from "@/components/shared/GravityField";
import { PreRollLoader } from "@/components/shared/PreRollLoader";
import {
  StudioControlsDrawer,
  PALETTE_THEMES,
  PaletteTheme,
} from "@/components/shared/StudioControlsDrawer";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Briefcase,
  Layers,
  Map,
  FileCheck2,
  Lock,
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  Code2,
  ExternalLink,
  Clock,
  Coins,
  ChevronDown,
  HelpCircle,
  Laptop,
  CheckCircle,
  Eye,
  Sliders,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";

export default function LandingPage() {
  // Three.js & Scroll physics state
  const [control, setControl] = useState({ progress: 0, started: false });
  const [isReady, setIsReady] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<PaletteTheme>(PALETTE_THEMES[0]);
  const [bgStage, setBgStage] = useState<number>(0);
  const mousePosRef = useRef<{ x: number; y: number; isDown: boolean }>({
    x: 99,
    y: 99,
    isDown: false,
  });

  // SkillBridge SaaS interactive state
  const [cockpitTab, setCockpitTab] = useState<"escrow" | "roadmap" | "matching">("escrow");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [calcDomain, setCalcDomain] = useState<string>("uiux");
  const [calcHours, setCalcHours] = useState<number>(20);
  const [payoutReleased, setPayoutReleased] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({
    "task-1": true,
    "task-2": true,
    "task-3": true,
    "task-4": false,
  });

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleReleasePayout = () => {
    setPayoutReleased(true);
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  // Pointer tracking for sphere repulsion
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onMouseDown = () => {
      mousePosRef.current.isDown = true;
    };
    const onMouseUp = () => {
      mousePosRef.current.isDown = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Smooth Lenis-style scroll with lerp factor 0.09
  useEffect(() => {
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId = 0;

    const onWheel = (e: WheelEvent) => {
      // Allow modal / drawer scrolling
      const target = e.target as HTMLElement;
      if (target && target.closest("[data-prevent-smooth-scroll]")) {
        return;
      }
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + e.deltaY));
    };

    const onScroll = () => {
      // Sync on touch or native scrollbar drag
      if (Math.abs(window.scrollY - currentScroll) > 120) {
        targetScroll = window.scrollY;
        currentScroll = window.scrollY;
      }
    };

    const loop = () => {
      currentScroll += (targetScroll - currentScroll) * 0.09;
      window.scrollTo(0, currentScroll);

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const normalized = Math.max(0, Math.min(1, currentScroll / maxScroll));
      const progress = normalized * 3.0;
      setControl((prev) => ({ ...prev, progress }));

      const stage = progress > 1.8 ? 2 : progress > 0.8 ? 1 : 0;
      setBgStage(stage);

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Intersection observer for .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedCategory, cockpitTab]);

  // SkillBridge dynamic calculations
  const domainRates: Record<string, { name: string; rate: number }> = {
    uiux: { name: "UI/UX & Product Design", rate: 850 },
    frontend: { name: "Frontend Engineering (React/Next)", rate: 1050 },
    backend: { name: "Backend & Cloud Services", rate: 1250 },
    ai: { name: "AI & Fullstack Engineering", rate: 1450 },
  };

  const calculatedMonthly = Math.round(calcHours * 4.33 * domainRates[calcDomain].rate);

  const categories = ["All", "UI/UX Design", "Frontend", "Backend", "Mobile", "Data & AI"];

  const projects = [
    {
      id: "REC-2026-084",
      client: "Pathao Express",
      title: "Courier Fleet Dispatch & Tracking Dashboard",
      category: "UI/UX Design",
      budget: "৳38,000",
      status: "Escrow Verified",
      timeframe: "2-3 weeks",
      deliverable: "Figma Design System & High-fidelity Prototype",
      skills: ["Figma", "Design Systems", "Logistics UX"],
      verified: true,
      description:
        "Redesign real-time dispatch map, courier telemetry, and SLA status indicators for enterprise logistics operations.",
    },
    {
      id: "REC-2026-091",
      client: "Chaldal Fresh",
      title: "Dark Store Grocery Warehouse Inventory Manager",
      category: "Frontend",
      budget: "৳45,000",
      status: "Escrow Verified",
      timeframe: "3-4 weeks",
      deliverable: "Next.js + Tailwind React Dashboard",
      skills: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
      verified: true,
      description:
        "High-density barcode scanner integration, batch pick routing, and expiry audit controls for rapid grocery delivery hubs.",
    },
    {
      id: "REC-2026-098",
      client: "Sheba.xyz",
      title: "Home Service Provider Matching & Scheduling Engine",
      category: "Backend",
      budget: "৳52,000",
      status: "Escrow Verified",
      timeframe: "4 weeks",
      deliverable: "Node.js / PostgreSQL REST & Realtime API",
      skills: ["Node.js", "PostgreSQL", "Redis", "WebSockets"],
      verified: true,
      description:
        "Sub-second provider geolocation matching, automated calendar rebalancing, and escrow hold webhooks.",
    },
    {
      id: "REC-2026-104",
      client: "ShopUp B2B",
      title: "Merchant Wholesale Order & Credit Financing App",
      category: "Mobile",
      budget: "৳60,000",
      status: "Escrow Verified",
      timeframe: "4-5 weeks",
      deliverable: "React Native Android / iOS Build",
      skills: ["React Native", "TypeScript", "Offline Sync", "Zod"],
      verified: true,
      description:
        "Offline-first retail order capture, micro-credit eligibility calculation, and digital signature authorization.",
    },
    {
      id: "REC-2026-112",
      client: "10 Minute School",
      title: "Interactive Quiz & Video Player Component Library",
      category: "Frontend",
      budget: "৳32,000",
      status: "Escrow Verified",
      timeframe: "2 weeks",
      deliverable: "Accessible React Component Kit",
      skills: ["Next.js", "Radix UI", "WCAG 2.1", "HLS.js"],
      verified: true,
      description:
        "Lightweight, low-bandwidth video player with inline pop-quizzes and auto-saving progress bookmarks.",
    },
    {
      id: "REC-2026-118",
      client: "Maya Health",
      title: "AI Symptom Triage & Teleconsultation Queue",
      category: "Data & AI",
      budget: "৳55,000",
      status: "Escrow Verified",
      timeframe: "3 weeks",
      deliverable: "Python FastAPI & ML Inference Pipeline",
      skills: ["Python", "FastAPI", "NLP", "Docker"],
      verified: true,
      description:
        "Bangla language symptom extraction, urgency score routing, and doctor schedule dispatch system.",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const steps = [
    {
      num: "01",
      title: "Discover Your Path",
      tag: "Skill Assessment",
      desc: "Benchmark your existing skills with practical diagnostic challenges benchmarked directly against real SME project requirements.",
    },
    {
      num: "02",
      title: "Follow Structured Roadmaps",
      tag: "5-Phase Syllabi",
      desc: "Work through foundations, modern frameworks, and production milestones curated by senior engineers and designers.",
    },
    {
      num: "03",
      title: "Build Production Case Studies",
      tag: "Portfolio Proof",
      desc: "Complete real commercial briefs evaluated against verifiable rubrics before applying to client jobs.",
    },
    {
      num: "04",
      title: "Earn with Milestone Escrow",
      tag: "Guaranteed Payouts",
      desc: "Match with SME projects funded in Bangladeshi Taka before work begins, with instant bank or bKash release on completion.",
    },
  ];

  const faqs = [
    {
      q: "How does SkillBridge guarantee I get paid for my project work?",
      a: "Every project posted by a client requires full upfront funding into our verified escrow vault. Funds are locked before you write a single line of code or design a single frame. When a milestone is approved, the funds release automatically (T+0) to your bank account or bKash wallet.",
    },
    {
      q: "Is the Skill Assessment mandatory to apply for SME projects?",
      a: "Yes. To protect both client project timelines and your reputation, projects require a passing score on the domain diagnostic task. This eliminates speculative bidding and ensures our 98.4% first-time acceptance rate.",
    },
    {
      q: "Which payout methods are supported in Bangladesh?",
      a: "We support direct BEFTN / NPSB bank transfers to all major scheduled banks in Bangladesh (City Bank, BRAC Bank, Eastern Bank, Dutch-Bangla Bank, etc.) as well as direct instant disbursement to bKash and Nagad personal accounts without platform withdrawal fees.",
    },
    {
      q: "Can businesses hire entire multi-disciplinary squads?",
      a: "Yes. SkillBridge SME Project Lead packages assemble matched cohorts of 1 UI/UX designer, 1 frontend engineer, and 1 backend developer managed under unified milestone contracts.",
    },
    {
      q: "How is SkillBridge different from traditional freelancing platforms?",
      a: "Traditional freelance platforms make you bid blindly against thousands of unvetted proposals with zero price floor. SkillBridge pairs structured diagnostic learning roadmaps with pre-budgeted, verified SME opportunities where client funds are already sitting in escrow.",
    },
  ];

  // Dynamic Background Gradient based on scroll stage
  const bgGradient =
    bgStage === 0
      ? selectedTheme.bgGradient
      : bgStage === 1
      ? "radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)"
      : "radial-gradient(circle at center, #ffffff 0%, #fff0f1 35%, #ffd4d7 100%)";

  return (
    <div className="relative min-h-screen text-[#1a1a1a] selection:bg-[#0e2ac5]/15 selection:text-[#0e2ac5]">
      {/* Fixed Dynamic Radial Gradient Layer */}
      <div
        id="bg-gradient"
        className="bg-gradient-layer"
        style={{ background: bgGradient }}
      />

      {/* Fixed WebGL Three.js Gravity Canvas */}
      <GravityField
        control={control}
        ballColor={selectedTheme.ballColor}
        onReady={() => setIsReady(true)}
        mousePosRef={mousePosRef}
      />

      {/* Pre-roll Calibration Loader */}
      <PreRollLoader
        isReady={isReady}
        onDone={() => setControl((c) => ({ ...c, started: true }))}
      />

      {/* Studio Controls Drawer */}
      <StudioControlsDrawer
        isOpen={controlsOpen}
        onClose={() => setControlsOpen(false)}
        selectedThemeId={selectedTheme.id}
        onSelectTheme={(theme) => setSelectedTheme(theme)}
        onResetDefaults={() => setSelectedTheme(PALETTE_THEMES[0])}
      />

      {/* Public Navbar with Controls Trigger */}
      <PublicNavbar onOpenControls={() => setControlsOpen(true)} />

      {/* Main 4 Scroll-Driven Sections */}
      <main className="relative z-10">
        {/* ========================================================================= */}
        {/* SECTION 01: HERO (Stage 0: Float) */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="min-h-[100svh] flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-20 max-w-[1280px] mx-auto relative pointer-events-auto text-center"
        >
          <div className="flex flex-col items-center max-w-4xl mx-auto w-full relative z-20 bg-white/70 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/80 shadow-[0_20px_50px_-15px_rgba(14,42,197,0.08)]">
            {/* Display Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[0.96] text-[#0a0a0a] mb-6 text-center">
              Turn Skills <br />
              Into Income. <br />
              <span className="text-[#0e2ac5]">Verifiable Proof.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-raleway text-lg sm:text-xl text-neutral-800 max-w-2xl mx-auto leading-relaxed mb-10 text-center font-medium">
              SkillBridge connects ambitious learners, vetted earners, and forward-thinking SMEs.
              Structured roadmaps, production-grade portfolios, and guaranteed milestone escrow in Bangladeshi Taka.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0e2ac5] text-white font-raleway font-semibold text-base shadow-[0_12px_28px_-6px_rgba(14,42,197,0.45)] hover:bg-[#0a1ea0] hover:shadow-[0_16px_36px_-6px_rgba(14,42,197,0.55)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Start Learning & Earning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/90 backdrop-blur-md text-[#1a1a1a] font-raleway font-medium text-base border border-neutral-300/80 hover:bg-white hover:border-neutral-400 shadow-sm transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 text-neutral-600" />
                <span>Browse SME Projects</span>
              </Link>

              <button
                onClick={() => setControlsOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-4 rounded-full bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-white transition-all"
                title="Open 3D Studio Physics Controls"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 sm:gap-14 pt-8 border-t border-neutral-200/80 w-full max-w-xl mx-auto">
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#0a0a0a] tabular-nums">
                  1,280+
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-medium mt-1">
                  Active Earners
                </div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#0e2ac5] tabular-nums">
                  98.4%
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-medium mt-1">
                  SME Acceptance
                </div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#0a0a0a] tabular-nums">
                  ৳0
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-medium mt-1">
                  Unpaid Invoices
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator Pill */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] text-neutral-400 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-neutral-200/60 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0e2ac5] animate-bounce" />
            <span>Scroll down to explore</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02: PHYSICS / DROP (Stage 1: Lime Tint & Bouncing Spheres) */}
        {/* ========================================================================= */}
        <section
          id="physics"
          className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 py-24 max-w-[1600px] mx-auto pointer-events-auto"
        >
          {/* Section Header */}
          <div className="max-w-3xl mb-12 reveal">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#0a0a0a] mb-4">
              When structure lets go.
            </h2>
            <p className="font-raleway text-lg text-neutral-700 leading-relaxed">
              Real commercial projects funded in escrow before development kicks off. No free pitch
              work, no delayed client payouts, and zero speculative bidding.
            </p>
          </div>

          {/* 3 Top Glass Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card reveal">
              <div className="rounded-[1.35rem] p-6 bg-white/80 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    01 // Guaranteed Vault
                  </div>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-[#0a0a0a] tabular-nums mb-2">
                    ৳12,450,000
                  </div>
                  <p className="font-raleway text-sm text-neutral-600">
                    Disbursed through verified milestone escrow with T+0 instant bank settlement.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200/60 font-mono text-[11px] text-[#0e2ac5] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Payout Fulfillment
                </div>
              </div>
            </div>

            <div className="glass-card reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="rounded-[1.35rem] p-6 bg-white/80 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    02 // Standardized Rubrics
                  </div>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-[#0a0a0a] tabular-nums mb-2">
                    98.4%
                  </div>
                  <p className="font-raleway text-sm text-neutral-600">
                    SME project acceptance rate on first milestone submission due to pre-vetted briefs.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200/60 font-mono text-[11px] text-[#0e2ac5] font-semibold flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5" /> Production Quality Code
                </div>
              </div>
            </div>

            <div className="glass-card reveal" style={{ transitionDelay: "0.3s" }}>
              <div className="rounded-[1.35rem] p-6 bg-white/80 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    03 // Rapid Matching
                  </div>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-[#0a0a0a] tabular-nums mb-2">
                    &lt; 18 Mins
                  </div>
                  <p className="font-raleway text-sm text-neutral-600">
                    Average time to match an SME project brief with a certified top-tier earner.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200/60 font-mono text-[11px] text-[#0e2ac5] font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Direct Qualification Matching
                </div>
              </div>
            </div>
          </div>

          {/* SME Project Marketplace Preview */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 reveal">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0a0a0a]">
                  Active SME Project Opportunities
                </h3>
                <p className="font-raleway text-sm text-neutral-600">
                  Pre-funded milestone escrow contracts currently accepting verified applications.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/70 backdrop-blur-md border border-neutral-200/80">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-raleway font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-[#0a0a0a] text-white shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="glass-card reveal"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="rounded-[1.35rem] p-6 bg-white/85 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                          {proj.id}
                        </span>
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Escrow Locked
                        </span>
                      </div>

                      {/* Client & Title */}
                      <div className="font-mono text-xs uppercase font-semibold text-[#0e2ac5] mb-1">
                        {proj.client}
                      </div>
                      <h4 className="font-display font-bold text-lg text-[#0a0a0a] leading-snug mb-2">
                        {proj.title}
                      </h4>
                      <p className="font-raleway text-xs text-neutral-600 leading-relaxed mb-4">
                        {proj.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.skills.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[10px] text-neutral-600 bg-neutral-100/90 px-2 py-0.5 rounded-md border border-neutral-200/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Metadata & Action */}
                    <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[10px] text-neutral-400 uppercase">Budget</div>
                        <div className="font-display font-bold text-xl text-[#0a0a0a] tabular-nums">
                          {proj.budget}
                        </div>
                      </div>

                      <Link
                        href={`/projects/${proj.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-[#0e2ac5] text-white font-raleway font-semibold text-xs transition-colors shadow-sm"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6 reveal">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-raleway font-semibold text-sm text-[#0e2ac5] hover:text-[#0a1ea0] group"
              >
                <span>View all 48 available verified projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03: FORM / SHAPE (Stage 2: Pink Tint & Heart Silhouette) */}
        {/* ========================================================================= */}
        <section
          id="form"
          className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 py-24 max-w-[1600px] mx-auto pointer-events-auto"
        >
          {/* Section Header */}
          <div className="max-w-3xl mb-12 reveal">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#0a0a0a] mb-4">
              Chaos, then form.
            </h2>
            <p className="font-raleway text-lg text-neutral-700 leading-relaxed">
              The spheres assemble into a cohesive heart silhouette as your raw skills transform
              through four deliberate phases: discover, structure, prove, and monetize.
            </p>
          </div>

          {/* 4-Step Pathway Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="glass-card reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="rounded-[1.35rem] p-6 bg-white/85 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-[#0e2ac5]/80 tabular-nums">
                        {step.num}
                      </span>
                      <span className="font-mono text-[10px] uppercase font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#0a0a0a] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-raleway text-xs text-neutral-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-200/60">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      Stage {idx + 1} of 4
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Earnings Simulator */}
          <div className="glass-card max-w-4xl mx-auto w-full reveal">
            <div className="rounded-[1.35rem] p-8 md:p-10 bg-white/90 backdrop-blur-2xl border border-white/80 top-hairline">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0e2ac5] font-semibold">
                      Income Simulator
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0a0a0a] mt-1">
                      Calculate Your Earning Potential
                    </h3>
                    <p className="font-raleway text-xs text-neutral-600 mt-1">
                      Based on current active SME project milestone budgets in Bangladesh.
                    </p>
                  </div>

                  {/* Domain Selector */}
                  <div>
                    <label className="block font-mono text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                      Select Practice Domain
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(domainRates).map(([key, item]) => (
                        <button
                          key={key}
                          onClick={() => setCalcDomain(key)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            calcDomain === key
                              ? "bg-[#0e2ac5]/10 border-[#0e2ac5] text-[#0e2ac5]"
                              : "bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <div className="font-raleway font-semibold text-xs leading-tight">
                            {item.name}
                          </div>
                          <div className="font-mono text-[10px] text-neutral-400 mt-0.5">
                            ৳{item.rate}/hr benchmark
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weekly Hours Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                        Weekly Commitment
                      </label>
                      <span className="font-display font-bold text-sm text-[#0a0a0a] tabular-nums">
                        {calcHours} Hours / Week
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      step={5}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full accent-[#0e2ac5] cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-neutral-400 mt-1">
                      <span>5 hrs (Part-time)</span>
                      <span>20 hrs (Recommended)</span>
                      <span>40 hrs (Full-time)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Calculated Output Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-[#0e2ac5] p-6 rounded-2xl text-white flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-blue-200">
                      Estimated Monthly Income
                    </span>
                    <div className="font-display font-black text-3xl sm:text-4xl text-white tabular-nums mt-2 mb-2">
                      ৳{calculatedMonthly.toLocaleString("en-US")}
                    </div>
                    <p className="font-raleway text-xs text-blue-100/80 leading-relaxed">
                      Across 2-3 verified SME milestones per month, deposited directly to your bank account or bKash.
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/15 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Escrow Milestone Guarantee</span>
                    </div>
                    <Link
                      href="/register?role=earner"
                      className="w-full py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-raleway font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span>Claim Your First Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04: RELEASE / WEIGHTLESS (Stage 3: Clear Flight & Horizon) */}
        {/* ========================================================================= */}
        <section
          id="release"
          className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 py-24 max-w-[1600px] mx-auto pointer-events-auto"
        >
          {/* Section Header */}
          <div className="max-w-3xl mb-12 reveal">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#0a0a0a] mb-4">
              And then, weightless.
            </h2>
            <p className="font-raleway text-lg text-neutral-700 leading-relaxed">
              Spheres rush past the camera into clear space. Career velocity unlocked for both
              ambitious builders and fast-moving enterprises.
            </p>
          </div>

          {/* Dual Pathways Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Pathway 1: Learners & Earners */}
            <div className="glass-card reveal">
              <div className="rounded-[1.35rem] p-8 bg-white/85 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0e2ac5]/10 flex items-center justify-center text-[#0e2ac5] mb-6">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#0e2ac5] font-semibold">
                    Pathway A
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#0a0a0a] mt-1 mb-3">
                    For Learners & Emerging Earners
                  </h3>
                  <p className="font-raleway text-sm text-neutral-600 leading-relaxed mb-6">
                    Stop collecting certificates that employers ignore. Build authentic case studies,
                    pass verifiable diagnostic benchmarks, and get automatically matched to paying SME gigs.
                  </p>

                  <ul className="space-y-2.5 font-raleway text-xs text-neutral-700 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Free comprehensive 5-phase structured roadmaps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Production portfolio verified by senior engineers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Guaranteed payout protection with bKash/Bank release</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/register?role=learner"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0e2ac5] text-white font-raleway font-semibold text-xs shadow-md hover:bg-[#0a1ea0] transition-colors"
                >
                  <span>Begin Diagnostic Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pathway 2: Businesses & Startups */}
            <div className="glass-card reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="rounded-[1.35rem] p-8 bg-white/85 backdrop-blur-xl border border-white/80 top-hairline h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-6">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                    Pathway B
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#0a0a0a] mt-1 mb-3">
                    For Startups & Growing Businesses
                  </h3>
                  <p className="font-raleway text-sm text-neutral-600 leading-relaxed mb-6">
                    Eliminate hiring risks. Post your commercial brief, lock milestone funds in
                    escrow, and work with talent whose skills have already been evaluated against production rubrics.
                  </p>

                  <ul className="space-y-2.5 font-raleway text-xs text-neutral-700 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Milestone escrow vault: pay only for accepted code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Vetted talent matched in under 18 minutes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Automated NBR-compliant VAT invoice generation</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/business/post-project"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 text-white font-raleway font-semibold text-xs shadow-md hover:bg-black transition-colors"
                >
                  <span>Post an SME Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="max-w-3xl mx-auto w-full mb-20 reveal">
            <div className="text-center mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0e2ac5] font-semibold">
                Clear Answers
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0a0a0a] mt-1">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/80 bg-white/80 backdrop-blur-md overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-raleway font-semibold text-sm text-[#0a0a0a]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                        openFaq === idx ? "rotate-180 text-[#0e2ac5]" : ""
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 font-raleway text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Partner Ecosystem Strip */}
          <div className="text-center reveal mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              Trusted by tech leaders & high-growth teams across Bangladesh
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-6 opacity-75 grayscale hover:grayscale-0 transition-all">
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                PATHAO
              </span>
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                CHALDAL
              </span>
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                SHEBA.XYZ
              </span>
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                SHOPUP
              </span>
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                10 MINUTE SCHOOL
              </span>
              <span className="font-display font-black text-xl tracking-wider text-neutral-800">
                MAYA HEALTH
              </span>
            </div>
          </div>

          {/* Grand CTA Banner */}
          <div className="glass-card reveal">
            <div className="rounded-[1.35rem] p-8 md:p-14 bg-gradient-to-br from-neutral-900 via-[#0a1ea0] to-[#0e2ac5] text-white text-center relative overflow-hidden top-hairline">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-blue-200 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                  Ready to Monetize Your Skills?
                </span>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                  Your skill roadmap starts now. Guaranteed escrow awaits.
                </h3>

                <p className="font-raleway text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Join 1,280+ active developers, designers, and builders in Bangladesh turning verified
                  milestones into sustainable freelance and contract income.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0e2ac5] font-raleway font-bold text-sm shadow-xl hover:bg-neutral-100 hover:scale-105 transition-all"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-raleway font-semibold text-sm border border-white/20 transition-all"
                  >
                    <span>How It Works</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Public Footer with 26s Marquee Ticker */}
      <PublicFooter />
    </div>
  );
}
