"use client";

import React, { useEffect, useState } from "react";

interface PreRollLoaderProps {
  isReady: boolean;
  onDone: () => void;
}

export function PreRollLoader({ isReady, onDone }: PreRollLoaderProps) {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("Preparing interactive studio");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isReadyMounted, setIsReadyMounted] = useState(false);

  useEffect(() => {
    // Initial entrance spring-in
    const mountTimer = setTimeout(() => {
      setIsReadyMounted(true);
    }, 50);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();
    let val = 0;
    let finished = false;

    const safetyTimer = setTimeout(() => {
      if (!finished) {
        finished = true;
        setValue(100);
        setStatus("Entering orbit");
        setIsLeaving(true);
        setTimeout(() => {
          setIsHidden(true);
          onDone();
        }, 350);
      }
    }, 1200);

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!finished) {
        if (!isReady) {
          val += (92 - val) * 1.7 * dt;
        } else {
          val += (100 - val) * 6.0 * dt;
          if (val >= 99.4) val = 100;
        }

        setValue(val);
        const displayVal = Math.min(100, Math.max(0, Math.floor(val)));
        if (displayVal >= 100) {
          setStatus("Entering orbit");
        }

        if (val >= 99.9 && isReady && !finished) {
          finished = true;
          setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => {
              setIsHidden(true);
              onDone();
            }, 520);
          }, 140);
        }
      }

      if (!finished || !isHidden) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(safetyTimer);
      cancelAnimationFrame(animId);
    };
  }, [isReady]);

  if (isHidden) return null;

  const displayVal = Math.min(100, Math.max(0, Math.floor(value)));

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-[26px] bg-[radial-gradient(circle_at_50%_42%,#ffffff_0%,#eef2ff_45%,#dbe4ff_100%)] transition-opacity duration-550 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        isLeaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Status line */}
      <div
        className={`font-mono text-[10px] tracking-[0.28em] uppercase text-[#6b7bb5] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
          isReadyMounted ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-[18px] blur-[6px]"
        }`}
      >
        {status}
      </div>

      {/* 2. Progress bar */}
      <div
        className={`w-[clamp(180px,32vw,280px)] h-[2px] bg-[rgba(14,42,197,0.14)] rounded-[99px] relative overflow-visible transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[260ms] ${
          isReadyMounted ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-[18px] blur-[6px]"
        }`}
      >
        <div
          className="h-full rounded-[99px] bg-gradient-to-r from-[#5175ff] to-[#0e2ac5] shadow-[0_0_14px_rgba(47,105,255,0.55)] transition-[width] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${value}%` }}
        />
      </div>

      {/* 3. Counter */}
      <div
        className={`font-mono text-[11px] tracking-[0.1em] text-[#0e2ac5] font-bold tabular-nums transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[420ms] ${
          isReadyMounted ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-[18px] blur-[6px]"
        }`}
      >
        {displayVal.toString().padStart(3, "0")}%
      </div>
    </div>
  );
}
