"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FloatingDots from "./floating-dots";
import { BeyondRocket, type RocketState } from "./beyond-rocket";
import { BeyondPlanetCard } from "./beyond-planet-card";
import { BeyondRecallButton } from "./beyond-recall-button";
import { LeoConstellation } from "./beyond-leo-constellation";
import { BeyondLeoCard } from "./beyond-leo-card";
import {
  ACCENT_COLORS,
  ACCENT_BG,
  type ValueDef,
  type PlanetMark,
} from "../constants/beyondDefaults";

const TILT = 28;

const ORBITS = [
  { rxPct: 0.07, ryPct: 0.035, speed: 0.00012, initialAngle: 0.0 },
  { rxPct: 0.12, ryPct: 0.06, speed: 0.00018, initialAngle: 0.8 },
  { rxPct: 0.17, ryPct: 0.085, speed: 0.00014, initialAngle: 1.6 },
  { rxPct: 0.22, ryPct: 0.11, speed: 0.00012, initialAngle: 2.4 },
  { rxPct: 0.27, ryPct: 0.135, speed: 0.0001, initialAngle: 3.2 },
  { rxPct: 0.32, ryPct: 0.16, speed: 0.00008, initialAngle: 4.0 },
  { rxPct: 0.37, ryPct: 0.185, speed: 0.000066, initialAngle: 4.8 },
  { rxPct: 0.42, ryPct: 0.21, speed: 0.000054, initialAngle: 5.6 },
  { rxPct: 0.47, ryPct: 0.235, speed: 0.000044, initialAngle: 6.4 },
];

const PLANET_SIZES = [8, 14, 15, 10, 26, 19, 17, 16, 7];

const ROCKET_W = 50;
const ROCKET_H = 50;

type BeyondItem = {
  _id: string;
  order: number;
  label: string;
  title: string;
  body: string;
  images?: Array<{ asset?: { url: string }; hotspot?: unknown }>;
  imageTags?: string[];
  marks?: PlanetMark[];
};

type Props = {
  beyondItems?: BeyondItem[];
};

export default function BeyondSection({ beyondItems }: Props) {
  const VALUES: ValueDef[] = (beyondItems ?? []).map((item, i) => ({
    id: item._id,
    label: item.label,
    title: item.title,
    body: item.body,
    images: item.images
      ?.map((img) => img.asset?.url)
      .filter(Boolean) as string[],
    accentColor: ACCENT_COLORS[i % ACCENT_COLORS.length],
    accentBg: ACCENT_BG[i % ACCENT_BG.length],
    marks: (item.marks ?? []) as PlanetMark[],
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 500 });
  const anglesRef = useRef(ORBITS.map((o) => o.initialAngle));
  const animRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [angles, setAngles] = useState(ORBITS.map((o) => o.initialAngle));
  const [active, setActive] = useState<{
    value: ValueDef;
    x: number;
    y: number;
  } | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [showLeoCard, setShowLeoCard] = useState(false);
  const [isLeoFlight, setIsLeoFlight] = useState(false);
  const [rocketState, setRocketState] = useState<RocketState>("offscreen");
  const [rocketPos, setRocketPos] = useState({ x: 20, y: 0 });
  const [recallPath, setRecallPath] = useState<{ x: number[]; y: number[] }>({
    x: [0],
    y: [0],
  });
  const [solarExpanded, setSolarExpanded] = useState(false);
  const hasAnimatedIn = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let enterTimer: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(enterTimer);
        if (entry.isIntersecting) {
          setActive(null);
          setShowCard(false);
          setRocketPos({ x: 20, y: size.h - 74 });
          setRocketState("offscreen");
          enterTimer = setTimeout(() => setRocketState("entering"), 80);
          if (!hasAnimatedIn.current) {
            hasAnimatedIn.current = true;
            setSolarExpanded(true);
          }
        } else {
          setActive(null);
          setShowCard(false);
          setRocketPos({ x: 20, y: size.h - 74 });
          setRocketState("offscreen");
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(enterTimer);
    };
  }, [size.h]);

  useEffect(() => {
    function tick(now: number) {
      const dt = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;
      anglesRef.current = anglesRef.current.map(
        (a, i) => a + ORBITS[i].speed * dt,
      );
      setAngles([...anglesRef.current]);
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;
  const rad = (TILT * Math.PI) / 180;
  const orbitScale = size.w < 768 ? 0.9 : 1;

  const handleRecall = () => {
    if (rocketState !== "landed") return;
    const homeX = 0;
    const homeY = 0;
    const startX = rocketPos.x - 20;
    const startY = rocketPos.y - (size.h - 74);
    const N = 12;
    const xs: number[] = [];
    const ys: number[] = [];
    const midX = (startX + homeX) / 2;
    const midY = (startY + homeY) / 2;
    const dx = homeX - startX;
    const dy = homeY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / (dist || 1);
    const perpY = dx / (dist || 1);
    const bulge = dist * 0.55;
    const ctrl = { x: midX + perpX * bulge, y: midY + perpY * bulge };
    for (let k = 0; k <= N; k++) {
      const t = k / N;
      xs.push(
        (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrl.x + t * t * homeX,
      );
      ys.push(
        (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrl.y + t * t * homeY,
      );
    }
    setRecallPath({ x: xs, y: ys });
    setActive(null);
    setShowCard(false);
    setShowLeoCard(false);
    setRocketState("recalling");
  };

  const handleRocketAnimationComplete = () => {
    if (rocketState === "entering") {
      setRocketState("home");
    }
    if (rocketState === "flying") {
      setRocketState("landed");
      if (isLeoFlight) {
        setShowLeoCard(true);
      } else {
        setShowCard(true);
      }
    }
    if (rocketState === "recalling") {
      setRocketPos({ x: 20, y: size.h - 74 });
      setRocketState("home");
      setIsLeoFlight(false);
    }
  };

  const handleLeoClick = (cx: number, cy: number) => {
    setActive(null);
    setShowCard(false);
    setShowLeoCard(false);
    setIsLeoFlight(true);
    setRocketState("flying");
    setRocketPos({ x: cx - ROCKET_W / 2, y: cy - ROCKET_H / 2 });
  };

  const sunR = Math.round(32 * (orbitScale - 0.2));
  const sunFontSize = Math.round(9 * orbitScale);

  return (
    <section
      ref={sectionRef}
      id="beyond"
      className="section-full dot-bg flex items-center justify-center relative"
    >
      <FloatingDots />

      <div className="absolute top-36 left-0 right-0 flex flex-col items-center z-10 pointer-events-none">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text tracking-tight">
          Beyond the Code
        </h2>
        <p className="text-xs text-slate-500 mt-1 tracking-widest uppercase">
          Fly to a planet & explore
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl"
        style={{ height: "100vh" }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          width={size.w}
          height={size.h}
        >
          <defs>
            {VALUES.map((v, i) => (
              <radialGradient
                key={i}
                id={`planetGrad${i}`}
                cx="35%"
                cy="35%"
                r="65%"
              >
                <stop offset="0%" stopColor={v.accentColor} stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor={v.accentColor}
                  stopOpacity="0.6"
                />
              </radialGradient>
            ))}
            <radialGradient id="sunGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff7a0" />
              <stop offset="40%" stopColor="#ffe066" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <filter
              id="planetGlow"
              x="-150%"
              y="-150%"
              width="400%"
              height="400%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="sunGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="14" result="blur1" />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur2"
              />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="leoGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Solar system — expands from center on first scroll into view */}
          <motion.g
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: solarExpanded ? 1 : 0,
              opacity: solarExpanded ? 1 : 0,
            }}
            transition={{ duration: 1.4, ease: [0.34, 1.2, 0.64, 1] }}
          >
            {/* Orbit rings — Pluto (last) has no ring */}
            {ORBITS.slice(0, VALUES.length).map((o, i) => {
              if (i === VALUES.length - 1) return null;
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx={o.rxPct * size.w * orbitScale}
                  ry={o.ryPct * size.h * orbitScale}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  filter="url(#ringGlow)"
                  transform={`rotate(${TILT}, ${cx}, ${cy})`}
                />
              );
            })}

            {/* Sun */}
            <motion.circle
              key={sunR}
              cx={cx}
              cy={cy}
              r={sunR}
              fill="url(#sunGrad)"
              filter="url(#sunGlow)"
              initial={{ r: sunR }}
              animate={{ r: [sunR, sunR + 2, sunR] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <text
              x={cx}
              y={cy + Math.round(3 * orbitScale)}
              textAnchor="middle"
              fontSize={sunFontSize}
              fontWeight="800"
              fill="#b45309"
              style={{ pointerEvents: "none", letterSpacing: "0.08em" }}
            >
              WHOAMI
            </text>

            {/* Planets */}
            {ORBITS.slice(0, VALUES.length).map((o, i) => {
              const rx = o.rxPct * size.w * orbitScale;
              const ry = o.ryPct * size.h * orbitScale;
              const a = angles[i];
              const ex = Math.cos(a) * rx;
              const ey = Math.sin(a) * ry;
              const bx = cx + ex * Math.cos(rad) - ey * Math.sin(rad);
              const by = cy + ex * Math.sin(rad) + ey * Math.cos(rad);
              const value = VALUES[i];
              const isSaturn = i === 5;
              const pr = PLANET_SIZES[i];
              const srx = pr * 2.2;
              const sry = pr * 0.6;
              const ringBack = `M ${bx + srx} ${by} A ${srx} ${sry} 0 0 0 ${bx - srx} ${by}`;
              const ringFront = `M ${bx - srx} ${by} A ${srx} ${sry} 0 0 0 ${bx + srx} ${by}`;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    setActive({ value, x: bx, y: by });
                    setShowCard(false);
                    setShowLeoCard(false);
                    setIsLeoFlight(false);
                    setRocketState("flying");
                    setRocketPos({
                      x: bx - ROCKET_W / 2,
                      y: by - ROCKET_H / 2,
                    });
                  }}
                >
                  {isSaturn && (
                    <path
                      d={ringBack}
                      fill="none"
                      stroke={value.accentColor}
                      strokeWidth="2.5"
                      strokeOpacity={0.49}
                      transform={`rotate(-20, ${bx}, ${by})`}
                    />
                  )}
                  <circle
                    cx={bx}
                    cy={by}
                    r={pr}
                    fill={`url(#planetGrad${i})`}
                    filter="url(#planetGlow)"
                  />
                  {isSaturn && (
                    <path
                      d={ringFront}
                      fill="none"
                      stroke={value.accentColor}
                      strokeWidth="2.5"
                      strokeOpacity={0.7}
                      transform={`rotate(-20, ${bx}, ${by})`}
                    />
                  )}
                  <text
                    x={bx}
                    y={by + pr + 14}
                    textAnchor="middle"
                    fontSize="12"
                    fill={value.accentColor}
                    fontWeight="500"
                    style={{ pointerEvents: "none" }}
                  >
                    {value.label}
                  </text>
                  {value.marks.length > 0 &&
                    (() => {
                      const badgeY = by - pr - 8;
                      return (
                        <g style={{ pointerEvents: "none" }}>
                          <text
                            x={bx}
                            y={badgeY + 6}
                            textAnchor="middle"
                            fontSize="10"
                            fill={value.accentColor}
                            fontWeight="700"
                            style={{ pointerEvents: "none" }}
                          >
                            {`🚩 ${value.marks.length}`}
                          </text>
                        </g>
                      );
                    })()}
                </g>
              );
            })}
          </motion.g>

          <BeyondRocket
            rocketState={rocketState}
            rocketPos={rocketPos}
            recallPath={recallPath}
            sizeW={size.w}
            sizeH={size.h}
            onAnimationComplete={handleRocketAnimationComplete}
          />

          <LeoConstellation
            svgWidth={size.w}
            svgHeight={size.h}
            onClick={handleLeoClick}
          />
        </svg>
      </div>

      <BeyondRecallButton
        visible={rocketState === "landed"}
        onRecall={handleRecall}
      />

      <BeyondLeoCard
        visible={showLeoCard}
        onClose={() => {
          setShowLeoCard(false);
          setRocketState("landed");
        }}
      />

      <BeyondPlanetCard
        active={active}
        showCard={showCard}
        size={size}
        onClose={() => {
          setActive(null);
          setShowCard(false);
          setRocketState("landed");
        }}
        onDismiss={() => {
          setActive(null);
          setShowCard(false);
          setRocketState("landed");
        }}
      />

      <div className="sr-only" aria-hidden="false">
        <h3>Beyond the Code — Who I am outside of work</h3>
        {VALUES.map((v) => (
          <div key={v.id}>
            <h4>{v.title}</h4>
            <p>{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
