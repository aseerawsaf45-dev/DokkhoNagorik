"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Compass,
  Map,
  BookOpen,
  FolderGit2,
  Briefcase,
  Award,
  Target,
  Search,
  CheckCircle2,
  DollarSign,
  Star,
  Users,
  Settings,
  PlusCircle,
  FileCheck2,
  ShieldCheck,
  Bell,
  Menu,
  X,
  TrendingUp,
  LayoutDashboard,
  ArrowRight
} from "lucide-react";

interface SidebarProps {
  role: "learner" | "earner" | "business" | "admin";
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  highlight?: boolean;
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser, unreadCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const learnerNav: NavItem[] = [
    { label: "Overview", href: "/learner", icon: LayoutDashboard },
    { label: "Roadmap", href: "/learner/roadmap", icon: Map },
    { label: "Domains", href: "/learner/domains", icon: Compass },
    { label: "Resources", href: "/learner/resources", icon: BookOpen },
    { label: "Practice Projects", href: "/learner/practice", icon: FolderGit2 },
    { label: "Portfolio", href: "/learner/portfolio", icon: Briefcase },
    { label: "Skill Assessment", href: "/learner/assessment", icon: Award },
    {
      label: "Become an Earner",
      href: "/learner/become-earner",
      icon: TrendingUp,
      highlight: true
    },
    { label: "Settings", href: "/learner/settings", icon: Settings }
  ];

  const earnerNav: NavItem[] = [
    { label: "Overview", href: "/earner", icon: LayoutDashboard },
    { label: "Find Projects", href: "/earner/find-projects", icon: Search },
    { label: "Recommended", href: "/earner/recommended", icon: Target },
    { label: "Applications", href: "/earner/applications", icon: FileCheck2 },
    { label: "Active Contracts", href: "/earner/active-projects", icon: FolderGit2 },
    { label: "Portfolio", href: "/earner/portfolio", icon: Briefcase },
    { label: "Earnings (BDT)", href: "/earner/earnings", icon: DollarSign },
    { label: "Reviews", href: "/earner/reviews", icon: Star },
    { label: "Squads", href: "/earner/teams", icon: Users },
    { label: "Settings", href: "/earner/settings", icon: Settings }
  ];

  const businessNav: NavItem[] = [
    { label: "Overview", href: "/business", icon: LayoutDashboard },
    { label: "Post a Project", href: "/business/post-project", icon: PlusCircle, highlight: true },
    { label: "Manage Projects", href: "/business/projects", icon: FolderGit2 },
    { label: "Browse Earners", href: "/business/browse-earners", icon: Search },
    { label: "Applications", href: "/business/applications", icon: FileCheck2 },
    { label: "Escrow & Payments", href: "/business/payments", icon: DollarSign },
    { label: "Settings", href: "/business/settings", icon: Settings }
  ];

  const adminNav: NavItem[] = [
    { label: "Overview & Analytics", href: "/admin", icon: TrendingUp },
    { label: "User Directory", href: "/admin/users", icon: Users },
    { label: "Project Moderation", href: "/admin/projects", icon: FolderGit2 },
    { label: "Verification Queue", href: "/admin/disputes", icon: ShieldCheck }
  ];

  const navItems =
    role === "learner"
      ? learnerNav
      : role === "earner"
      ? earnerNav
      : role === "business"
      ? businessNav
      : adminNav;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 px-4 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-700 to-blue-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs">
            SB
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900">SkillBridge</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="p-2 text-slate-500 hover:text-slate-900 relative rounded-lg"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Pro Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs">
              SB
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 block leading-none">
                SkillBridge
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-1 capitalize font-medium">
                {role} console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : item.highlight
                    ? "text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 font-semibold border border-indigo-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-white" : item.highlight ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-indigo-600 text-white font-medium">
                    Key
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{currentUser?.name}</p>
              <p className="text-[10px] font-mono text-slate-400 truncate capitalize">{currentUser?.role}</p>
            </div>
            <Link
              href="/notifications"
              className="p-1.5 text-slate-400 hover:text-slate-700 relative rounded-md transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-1 ring-white" />
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
