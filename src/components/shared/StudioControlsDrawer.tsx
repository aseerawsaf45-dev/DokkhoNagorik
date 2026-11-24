"use client";

import React from "react";
import { SlidersHorizontal, X, Sparkles, RotateCcw } from "lucide-react";

export interface PaletteTheme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  ballColor: string;
  bgGradient: string;
}

export const PALETTE_THEMES: PaletteTheme[] = [
  {
    id: "roseGold",
    name: "Royal Blue & Pearl",
    description: "Hyper-distinct cobalt spheres floating in soft white-slate gradients.",
    primaryColor: "#2F69FF",
    ballColor: "#2F69FF",
    bgGradient: "radial-gradient(circle at center, #ffffff 0%, #ecefff 35%, #c2d1ff 100%)",
  },
  {
    id: "pinkBlush",
    name: "Rose Blush & Crème",
    description: "Sweet candy pinks and juicy strawberry accents in a pearl studio.",
    primaryColor: "#FFA6B3",
    ballColor: "#FFC5C2",
    bgGradient: "radial-gradient(circle at center, #ffffff 0%, #fff2f2 35%, #ffd4d7 100%)",
  },
  {
    id: "voltLime",
    name: "Volt Lime & Slate",
    description: "Electric neon volt-lime against a clean white-slate horizon.",
    primaryColor: "#E1FC03",
    ballColor: "#E1FC03",
    bgGradient: "radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)",
  },
  {
    id: "arcticBlue",
    name: "Arctic Sky & Crystal",
    description: "Cool arctic crystal blues with a translucent glass sheen.",
    primaryColor: "#96E5FF",
    ballColor: "#96E5FF",
    bgGradient: "radial-gradient(circle at center, #ffffff 0%, #f0f9ff 35%, #c2ebff 100%)",
  },
];

interface StudioControlsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedThemeId: string;
  onSelectTheme: (theme: PaletteTheme) => void;
  onResetDefaults: () => void;
}

export function StudioControlsDrawer({
  isOpen,
  onClose,
  selectedThemeId,
  onSelectTheme,
  onResetDefaults,
}: StudioControlsDrawerProps) {
  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-neutral-950/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-full sm:w-[420px] bg-white/95 backdrop-blur-xl border-l border-neutral-100 p-8 flex flex-col justify-between overflow-y-auto shadow-[-10px_0_40px_rgba(0,0,0,0.06)] transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Studio Controls"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-neutral-950" />
              <span className="font-display font-black text-sm tracking-[0.2em] uppercase text-neutral-950">
                Studio Controls
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors"
              aria-label="Close Controls"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Note */}
          <div className="font-mono text-xs italic text-neutral-400 leading-relaxed mt-4">
            Set the hero sphere palette. As you scroll, the scene morphs to volt-lime, then rose-pink as the heart assembles.
          </div>

          {/* Section Title */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-700 mt-7 mb-3.5">
            <Sparkles className="w-3 h-3 text-[#0E2AC5]" />
            <span>Hero Palette Shaders</span>
          </div>

          {/* Palette Cards */}
          <div className="flex flex-col gap-2.5">
            {PALETTE_THEMES.map((theme) => {
              const isSelected = theme.id === selectedThemeId;
              return (
                <div
                  key={theme.id}
                  onClick={() => onSelectTheme(theme)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isSelected
                      ? "bg-neutral-950 text-white border-neutral-950 scale-[1.02] shadow-lg"
                      : "bg-white/80 hover:bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-raleway text-[13px] font-bold">{theme.name}</span>
                    <div
                      className={`w-3 h-3 rounded-full border ${
                        isSelected ? "border-white/30" : "border-black/10"
                      }`}
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                  </div>
                  <div
                    className={`text-[11px] leading-relaxed ${
                      isSelected ? "text-white/65" : "text-neutral-500"
                    }`}
                  >
                    {theme.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-neutral-100 flex flex-col gap-2">
          <div className="font-mono text-[9px] tracking-[0.15em] text-neutral-400 uppercase">
            RENDER ENGINE / THREE.JS WEBGL
          </div>
          <div className="font-mono text-[9px] tracking-[0.15em] text-neutral-400 uppercase">
            DYNAMICS SOLVER / 3D COLLISION VERLET
          </div>
          <button
            onClick={onResetDefaults}
            className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 hover:border-neutral-400 font-mono text-[11px] text-neutral-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </aside>
    </>
  );
}
