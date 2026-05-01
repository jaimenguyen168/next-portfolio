"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

type ValueDef = {
  id: string;
  label: string;
  title: string;
  body: string;
  images?: string[];
  accentColor: string;
  accentBg: string;
};

const VALUES: ValueDef[] = [
  {
    id: "ownership",
    label: "Ownership",
    title: "I own what I build",
    body: "If something ships with my name on it, I care about whether it actually works. Not just whether it compiles. I follow things through, fix what breaks, and don't hand off half-finished work.",
    accentColor: "#818cf8",
    accentBg: "rgba(99,102,241,0.15)",
  },
  {
    id: "curiosity",
    label: "Curiosity",
    title: "I learn by doing",
    body: "I'm not the person who reads the whole manual before starting. I build something, see what breaks, then go figure out why. That's how I picked up web dev, AI, and most of what I know.",
    accentColor: "#f59e0b",
    accentBg: "rgba(245,158,11,0.15)",
  },
  {
    id: "craft",
    label: "Craft",
    title: "Details matter",
    body: "The difference between something that feels good and something that just works is in the details. Spacing, transitions, error states, edge cases. I notice them and I care about getting them right.",
    accentColor: "#f472b6",
    accentBg: "rgba(244,114,182,0.15)",
  },
  {
    id: "empathy",
    label: "Empathy",
    title: "I build for people",
    body: "Every interface I build is used by a real person. I try to think about what they're trying to do, what might confuse them, and what would make their experience easier. It's not just UX, it's respect.",
    accentColor: "#34d399",
    accentBg: "rgba(52,211,153,0.15)",
  },
  {
    id: "growth",
    label: "Growth",
    title: "I'm never done learning",
    body: "I came from a completely different background, moved to a new country, and learned to code from scratch. That experience made me comfortable being the person in the room who doesn't know things yet.",
    accentColor: "#60a5fa",
    accentBg: "rgba(96,165,250,0.15)",
  },
  {
    id: "honesty",
    label: "Honesty",
    title: "I say what I think",
    body: "I'd rather tell someone the design doesn't make sense than build it anyway. I give real feedback, admit when I'm wrong, and don't pretend to know things I don't.",
    accentColor: "#a78bfa",
    accentBg: "rgba(167,139,250,0.15)",
  },
  {
    id: "impact",
    label: "Impact",
    title: "I want my work to matter",
    body: "I'm not interested in building things just to build them. I want the things I work on to actually help someone, solve a real problem, or make something that was hard become easy.",
    accentColor: "#fb923c",
    accentBg: "rgba(251,146,60,0.15)",
  },
  {
    id: "consistency",
    label: "Consistency",
    title: "Show up every day",
    body: "I'm not a burst worker. I'd rather make steady progress every day than sprint and crash. That's how I've built up my skills and how I approach projects.",
    accentColor: "#e879f9",
    accentBg: "rgba(232,121,249,0.15)",
  },
];

// The key to the side-angle look:
// radiusX is wide (fills horizontal space)
// radiusY is very small relative to radiusX — like 1:5 or 1:6 ratio
// This makes the ellipses look like they're tilted away from you
// Very flat ellipses — radiusY is ~15% of radiusX to look side-on like the solar system
const ORBIT_CONFIGS = [
  { radiusXPct: 0.07, radiusYPct: 0.012, speed: 0.00032 },
  { radiusXPct: 0.13, radiusYPct: 0.022, speed: 0.00026 },
  { radiusXPct: 0.19, radiusYPct: 0.032, speed: 0.00021 },
  { radiusXPct: 0.26, radiusYPct: 0.043, speed: 0.00017 },
  { radiusXPct: 0.33, radiusYPct: 0.055, speed: 0.00014 },
  { radiusXPct: 0.40, radiusYPct: 0.067, speed: 0.00012 },
  { radiusXPct: 0.47, radiusYPct: 0.079, speed: 0.00010 },
  { radiusXPct: 0.54, radiusYPct: 0.091, speed: 0.000085 },
];

const INITIAL_ANGLES = [0.3, 1.4, 2.6, 3.9, 0.9, 2.2, 3.5, 4.8];

// Planet sizes — vary them so it looks more natural
const PLANET_SIZES = [28, 22, 32, 20, 26, 24, 30, 18];

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anglesRef = useRef<number[]>([...INITIAL_ANGLES]);
  const animRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [containerSize, setContainerSize] = useState({ w: 900, h: 500 });
  const [positions, setPositions] = useState<{ x: number; y: number; behind: boolean }[]>(
    VALUES.map(() => ({ x: 0, y: 0, behind: false }))
  );
  const [active, setActive] = useState<ValueDef | null>(null);

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      setContainerSize({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    function tick(now: number) {
      const dt = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;

      const newPositions = VALUES.map((_, i) => {
        const orbit = ORBIT_CONFIGS[i];
        anglesRef.current[i] += orbit.speed * dt;
        const angle = anglesRef.current[i];
        const rx = orbit.radiusXPct * containerSize.w;
        const ry = orbit.radiusYPct * containerSize.h;
        return {
          x: Math.cos(angle) * rx,
          y: Math.sin(angle) * ry,
          behind: Math.sin(angle) < 0,
        };
      });

      setPositions(newPositions);
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [containerSize]);

  // Sort render order: behind ones first, front ones last
  const sortedIndices = [...VALUES.keys()].sort((a, b) =>
    (positions[a].behind ? 0 : 1) - (positions[b].behind ? 0 : 1)
  );

  return (
    <section id="values" className="section-full relative overflow-hidden flex flex-col items-center justify-center">

      {/* Solar system — full section, max-w-6xl */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex items-center justify-center min-h-0 px-2">
        <div ref={containerRef} className="relative w-full h-full">

          {/* Orbit rings — visible ellipses with the side-angle look */}
          {ORBIT_CONFIGS.map((orbit, i) => {
            const rx = orbit.radiusXPct * containerSize.w;
            const ry = orbit.radiusYPct * containerSize.h;
            return (
              <div
                key={i}
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: rx * 2,
                  height: ry * 2,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid rgba(129,140,248,0.18)",
                  boxShadow: "0 0 6px rgba(129,140,248,0.06)",
                }}
              />
            );
          })}

          {/* Center sun */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center pointer-events-none"
            style={{
              width: 68,
              height: 68,
              background: "radial-gradient(circle, rgba(255,220,80,0.9) 0%, rgba(245,158,11,0.6) 40%, rgba(245,100,0,0.2) 70%, transparent 100%)",
              boxShadow: "0 0 30px rgba(255,200,50,0.6), 0 0 70px rgba(245,158,11,0.3), 0 0 120px rgba(245,100,0,0.15)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[8px] font-bold text-amber-900 text-center leading-tight">
              Core<br />Values
            </span>
          </motion.div>

          {/* Planets — always visible, depth via opacity/scale only */}
          {sortedIndices.map((i) => {
            const value = VALUES[i];
            const pos = positions[i];
            const planetSize = PLANET_SIZES[i];
            const behind = pos.behind;
            // Smooth depth: 0.5 behind, 1.0 front
            const depthOpacity = behind ? 0.5 : 1;
            const depthScale = behind ? 0.82 : 1;

            return (
              <motion.button
                key={value.id}
                className="absolute rounded-full cursor-pointer flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                  x: pos.x,
                  y: pos.y,
                  translateX: "-50%",
                  translateY: "-50%",
                  width: planetSize,
                  height: planetSize,
                  zIndex: behind ? 2 : 20,
                  opacity: depthOpacity,
                  scale: depthScale,
                  background: `radial-gradient(circle at 35% 35%, ${value.accentColor}ff, ${value.accentColor}99, ${value.accentColor}44)`,
                  boxShadow: behind
                    ? `0 0 6px ${value.accentColor}30`
                    : `0 0 10px ${value.accentColor}70, 0 0 22px ${value.accentColor}30`,
                  border: `1px solid ${value.accentColor}80`,
                }}
                whileHover={{ scale: depthScale * 1.25 }}
                onMouseEnter={() => setActive(value)}
                onClick={() => setActive(value)}
              >
                {/* Label always visible below planet */}
                <span
                  className="absolute top-full mt-1.5 whitespace-nowrap text-[10px] font-medium pointer-events-none"
                  style={{
                    color: value.accentColor,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: behind ? 0.5 : 1,
                  }}
                >
                  {value.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              className="absolute inset-0 z-20 bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              key={active.id}
              className="absolute z-30 w-[90vw] max-w-md"
              style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div
                className="card p-5 md:p-6 flex flex-col gap-3 relative"
                style={{ borderColor: `${active.accentColor}35`, background: "rgba(11,18,48,0.98)" }}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                  onClick={() => setActive(null)}
                >
                  <X size={13} />
                </button>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full border self-start"
                  style={{ color: active.accentColor, borderColor: `${active.accentColor}40`, background: active.accentBg }}
                >
                  {active.label}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug pr-6">{active.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{active.body}</p>
                {active.images && active.images.length > 0 && (
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {active.images.map((src, idx) => (
                      <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <Image src={src} alt="" width={96} height={96} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
