"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FloatingDots from "./floating-dots";

const TILT = 30;

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

const ORBITS = [
  { rxPct: 0.08, ryPct: 0.04, speed: 0.00012, initialAngle: 0.0 },
  { rxPct: 0.14, ryPct: 0.07, speed: 0.00018, initialAngle: 0.8 },
  { rxPct: 0.20, ryPct: 0.10, speed: 0.00014, initialAngle: 1.6 },
  { rxPct: 0.26, ryPct: 0.13, speed: 0.00012, initialAngle: 2.4 },
  { rxPct: 0.32, ryPct: 0.16, speed: 0.00010, initialAngle: 3.2 },
  { rxPct: 0.38, ryPct: 0.19, speed: 0.00008, initialAngle: 4.0 },
  { rxPct: 0.44, ryPct: 0.22, speed: 0.000066, initialAngle: 4.8 },
  { rxPct: 0.50, ryPct: 0.25, speed: 0.000054, initialAngle: 5.6 },
];

const PLANET_SIZES = [9.7, 10.9, 12.1, 9.7, 13.3, 10.9, 12.1, 9.7];

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 500 });
  const anglesRef = useRef(ORBITS.map((o) => o.initialAngle));
  const animRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [angles, setAngles] = useState(ORBITS.map((o) => o.initialAngle));
  const [active, setActive] = useState<{ value: ValueDef; x: number; y: number } | null>(null);
  // "offscreen" = before scroll-in, "home" = bouncing at start, "flying" = animating to planet, "landed" = still at planet
  const [rocketState, setRocketState] = useState<"offscreen" | "home" | "flying" | "landed">("offscreen");
  const [rocketPos, setRocketPos] = useState({ x: 20, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const ROCKET_W = 50;
  const ROCKET_H = 50;

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const h = containerRef.current.offsetHeight;
      const w = containerRef.current.offsetWidth;
      setSize({ w, h });
      setRocketPos({ x: 20, y: h - 74 });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Trigger rocket entry every time section scrolls into view, reset when leaving
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let enterTimer: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(enterTimer);
        if (entry.isIntersecting) {
          // Reset to offscreen, then fly in after a frame
          setActive(null);
          setRocketPos({ x: 20, y: size.h - 74 });
          setRocketState("offscreen");
          enterTimer = setTimeout(() => setRocketState("home"), 80);
        } else {
          // Scrolled away — reset everything silently
          setActive(null);
          setRocketPos({ x: 20, y: size.h - 74 });
          setRocketState("offscreen");
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(enterTimer); };
  }, [size.h]);

  useEffect(() => {
    function tick(now: number) {
      const dt = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;
      anglesRef.current = anglesRef.current.map((a, i) => a + ORBITS[i].speed * dt);
      setAngles([...anglesRef.current]);
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;
  const rad = (TILT * Math.PI) / 180;
  const orbitScale = size.w < 768 ? 0.9 : 1;

  return (
    <section ref={sectionRef} id="values" className="section-full dot-bg flex items-center justify-center relative">
      <FloatingDots />

      <div ref={containerRef} className="relative w-full max-w-6xl h-full">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          width={size.w}
          height={size.h}
        >
          <defs>
            {VALUES.map((v, i) => (
              <radialGradient key={i} id={`planetGrad${i}`} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={v.accentColor} stopOpacity="1" />
                <stop offset="100%" stopColor={v.accentColor} stopOpacity="0.6" />
              </radialGradient>
            ))}
            <radialGradient id="sunGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff7a0" />
              <stop offset="40%" stopColor="#ffe066" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            {/* Neon glow for planets — stronger blur */}
            <filter id="planetGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Big corona glow for sun */}
            <filter id="sunGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="14" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Neon glow for orbit rings */}
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Orbit rings — neon tinted */}
          {ORBITS.map((o, i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={o.rxPct * size.w * orbitScale}
              ry={o.ryPct * size.h * orbitScale}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeOpacity="1"
              strokeWidth="1"
              filter="url(#ringGlow)"
              transform={`rotate(${TILT}, ${cx}, ${cy})`}
            />
          ))}

          {/* Sun */}
          {(() => {
            const sunR = Math.round(32 * (orbitScale - 0.2));
            const fontSize = Math.round(9 * orbitScale);
            return (
              <>
                <motion.circle
                  key={sunR}
                  cx={cx} cy={cy} r={sunR}
                  fill="url(#sunGrad)"
                  filter="url(#sunGlow)"
                  animate={{ r: [sunR, sunR + 2, sunR] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <text
                  x={cx} y={cy - Math.round(4 * orbitScale)}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight="800"
                  fill="#b45309"
                  style={{ pointerEvents: "none", letterSpacing: "0.08em" }}
                >CORE</text>
                <text
                  x={cx} y={cy + Math.round(7 * orbitScale)}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight="800"
                  fill="#b45309"
                  style={{ pointerEvents: "none", letterSpacing: "0.08em" }}
                >VALUES</text>
              </>
            );
          })()}

          {/* Rocket + bubble bouncing together */}
          <motion.g
            animate={(() => {
              if (rocketState === "offscreen") return { x: -200, y: 0 };
              if (rocketState === "flying") return { x: rocketPos.x - 20, y: rocketPos.y - (size.h - 74) };
              const baseX = rocketState === "home" ? 0 : rocketPos.x - 20;
              const baseY = rocketState === "home" ? 0 : rocketPos.y - (size.h - 74);
              return { x: baseX, y: [baseY, baseY - 10, baseY] };
            })()}
            transition={(() => {
              if (rocketState === "offscreen") return { duration: 0 };
              if (rocketState === "home" && rocketPos.x === 20) return { x: { duration: 0.7, ease: "easeOut" }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
              if (rocketState === "flying") return { duration: 0.8, ease: "easeInOut" };
              return { duration: 2, repeat: Infinity, ease: "easeInOut" };
            })()}
          >
            {/* Rocket */}
            <motion.image
              href="/rocket.svg"
              x={20}
              y={size.h - 110}
              animate={{
                width: rocketState === "home" ? 80 : 36,
                height: rocketState === "home" ? 80 : 36,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.9))" }}
            />
            {/* Speech bubble above rocket — same gap as rocket height */}
            {rocketState === "home" && <foreignObject x={8} y={size.h - 164} width={150} height={82}>
              <div
                style={{
                  background: "rgba(20,16,50,0.92)",
                  border: "1px solid rgba(167,139,250,0.4)",
                  boxShadow: "0 0 12px rgba(167,139,250,0.2)",
                  borderRadius: 10,
                  padding: "6px 10px",
                  fontSize: 11,
                  color: "white",
                  lineHeight: 1.4,
                  position: "relative",
                }}
              >
                Let&apos;s travel to each planet to explore! 🚀
                <div style={{
                  position: "absolute",
                  bottom: -7,
                  left: 22,
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "7px solid rgba(20,16,50,0.92)",
                }} />
              </div>
            </foreignObject>}
          </motion.g>

          {/* Planets */}
          {ORBITS.map((o, i) => {
            const rx = o.rxPct * size.w * orbitScale;
            const ry = o.ryPct * size.h * orbitScale;
            const a = angles[i];
            const ex = Math.cos(a) * rx;
            const ey = Math.sin(a) * ry;
            const bx = cx + ex * Math.cos(rad) - ey * Math.sin(rad);
            const by = cy + ex * Math.sin(rad) + ey * Math.cos(rad);
            const behind = false;
            const value = VALUES[i];

            const isSaturn = i === 4;
            const pr = PLANET_SIZES[i];
            // Saturn ring arc paths: flat ellipse tilted -20deg around planet center
            // rx=2.2x planet, ry=0.55x planet. Back = top arc (y < by), Front = bottom arc (y > by)
            const srx = pr * 2.2;
            const sry = pr * 0.6;
            // Back arc: from right (bx+srx, by) counterclockwise over top to left (bx-srx, by)
            const ringBack  = `M ${bx + srx} ${by} A ${srx} ${sry} 0 0 0 ${bx - srx} ${by}`;
            // Front arc: from left (bx-srx, by) counterclockwise under to right (bx+srx, by)
            const ringFront = `M ${bx - srx} ${by} A ${srx} ${sry} 0 0 0 ${bx + srx} ${by}`;
            const ringOpacity = behind ? 0.2 : 0.7;

            const handlePlanetClick = () => {
              setActive({ value, x: bx, y: by });
              setRocketState("flying");
              setRocketPos({ x: bx - ROCKET_W / 2, y: by - ROCKET_H / 2 });
            };

            return (
              <g key={i} style={{ cursor: "pointer" }} onClick={handlePlanetClick}>
                {/* Saturn ring — back half */}
                {isSaturn && (
                  <path
                    d={ringBack}
                    fill="none"
                    stroke={value.accentColor}
                    strokeWidth="2.5"
                    strokeOpacity={ringOpacity * 0.7}
                    transform={`rotate(-20, ${bx}, ${by})`}
                  />
                )}

                {/* Planet */}
                <circle
                  cx={bx}
                  cy={by}
                  r={pr}
                  fill={`url(#planetGrad${i})`}
                  filter="url(#planetGlow)"
                  opacity={behind ? 0.4 : 1}
                />

                {/* Saturn ring — front half */}
                {isSaturn && (
                  <path
                    d={ringFront}
                    fill="none"
                    stroke={value.accentColor}
                    strokeWidth="2.5"
                    strokeOpacity={ringOpacity}
                    transform={`rotate(-20, ${bx}, ${by})`}
                  />
                )}

                <text
                  x={bx}
                  y={by + pr + 14}
                  textAnchor="middle"
                  fontSize="12"
                  fill={value.accentColor}
                  opacity={behind ? 0.4 : 1}
                  fontWeight="500"
                  style={{ pointerEvents: "none" }}
                >
                  {value.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>



      {/* Popover anchored to planet */}
      <AnimatePresence>
        {active && (() => {
          const POPOVER_W = 380;
          const POPOVER_H = 340;
          const PAD = 16;
          const isMobile = size.w < 640;

          // Mobile: center on screen
          const popLeft = isMobile ? size.w / 2 - Math.min(POPOVER_W, size.w - PAD * 2) / 2 : (() => {
            const toRight = active.x + POPOVER_W + PAD + 20 < size.w;
            return toRight ? active.x + PAD + 12 : active.x - POPOVER_W - PAD - 12;
          })();
          const popTop = isMobile
            ? size.h / 2 - POPOVER_H / 2
            : Math.min(Math.max(active.y - POPOVER_H / 2, PAD), size.h - POPOVER_H - PAD);
          const popWidth = isMobile ? Math.min(POPOVER_W, size.w - PAD * 2) : POPOVER_W;
          const toRight = !isMobile && active.x + POPOVER_W + PAD + 20 < size.w;

          return (
            <>
              <div className="absolute inset-0 z-20" onClick={() => { setActive(null); setRocketState("landed"); }} />
              <motion.div
                key={active.value.id}
                className="absolute z-30"
                style={{ left: popLeft, top: popTop, width: popWidth }}
                initial={{ opacity: 0, scale: 0.88, x: isMobile ? 0 : toRight ? -8 : 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div
                  className="rounded-xl overflow-hidden flex flex-col relative"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: `${active.value.accentColor}40`,
                    background: "rgba(8,12,36,0.97)",
                    boxShadow: `0 0 30px ${active.value.accentColor}28`,
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    className="w-full h-32 flex items-center justify-center relative overflow-hidden"
                    style={{ background: active.value.accentBg }}
                  >
                    {/* Decorative grid lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                      {[...Array(6)].map((_, i) => (
                        <line key={`v${i}`} x1={`${(i + 1) * 16.6}%`} y1="0" x2={`${(i + 1) * 16.6}%`} y2="100%" stroke={active.value.accentColor} strokeWidth="0.5" />
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={`${(i + 1) * 25}%`} x2="100%" y2={`${(i + 1) * 25}%`} stroke={active.value.accentColor} strokeWidth="0.5" />
                      ))}
                    </svg>
                    {/* Planet icon in center */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: `${active.value.accentColor}30`, border: `2px solid ${active.value.accentColor}60`, boxShadow: `0 0 20px ${active.value.accentColor}40` }}
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill={active.value.accentColor} opacity="0.9" />
                        <circle cx="10" cy="11" r="4" fill="white" opacity="0.15" />
                      </svg>
                    </div>
                    <span
                      className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: active.value.accentColor }}
                    >
                      {active.value.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <button
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                      onClick={() => { setActive(null); setRocketState("landed"); }}
                    >
                      <X size={11} />
                    </button>
                    <h3 className="text-base font-bold text-white leading-snug">{active.value.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{active.value.body}</p>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
