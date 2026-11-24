"use client";

import React, { useRef, useEffect } from "react";

export function GlyphsVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const chars = "·:1740$%=+";
    const cell = 12;
    const cols = Math.floor(canvas.width / cell);
    const rows = Math.floor(canvas.height / cell);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Calculate subtle wave/ripple from center
          const dx = x - cols / 2;
          const dy = y - rows / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(dist * 0.35 - step * 0.04);
          
          if (wave > -0.2) {
            const charIdx = Math.floor(Math.abs(wave) * chars.length) % chars.length;
            const char = chars[charIdx];
            const alpha = Math.min(0.7, Math.max(0.08, (wave + 0.3) * 0.5));
            ctx.fillStyle = `rgba(67, 56, 202, ${alpha})`;
            ctx.fillText(char, x * cell + cell / 2, y * cell + cell / 2);
          }
        }
      }
      step++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={480}
        height={340}
        className="absolute inset-0 w-full h-full opacity-80"
      />
      
      {/* Front Content Card that sits calmly on top */}
      <div className="relative z-10 m-6 p-5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 max-w-sm text-left shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono text-slate-300">verified-escrow // active</span>
          </div>
          <span className="text-[11px] font-mono text-indigo-400">৳35,000</span>
        </div>

        <div className="mt-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Project Scope</div>
          <div className="text-xs font-semibold text-white mt-0.5">
            Fleet Dispatcher UI & Route Tracking System
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Delivered milestone 1 with 100% WCAG contrast pass. Ready for milestone 2 escrow release.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Milestone 1/3</span>
          <span className="text-emerald-400 font-medium">Approved & Paid</span>
        </div>
      </div>
    </div>
  );
}
