"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FloatingDots from "./floating-dots";
import { ACCENT_COLORS, ACCENT_BG, type ValueDef } from "../constants/beyondDefaults";

function ImageCarousel({ images, accentColor }: { images: string[]; accentColor: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dots indicator */}
      <div className="absolute bottom-2 right-3 flex gap-1 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i === current ? accentColor : "rgba(255,255,255,0.35)",
              boxShadow: i === current ? `0 0 6px ${accentColor}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const TILT = 30;

type BeyondItem = {
  _id: string;
  order: number;
  label: string;
  title: string;
  body: string;
  images?: Array<{ asset?: { url: string }; hotspot?: unknown }>;
  imageTags?: string[];
};

type Props = {
  beyondItems?: BeyondItem[];
};

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

export default function BeyondSection({ beyondItems }: Props) {
  const VALUES: ValueDef[] = (beyondItems ?? []).map((item, i) => ({
    id: item._id,
    label: item.label,
    title: item.title,
    body: item.body,
    images: item.images?.map(img => img.asset?.url).filter(Boolean) as string[],
    accentColor: ACCENT_COLORS[i % ACCENT_COLORS.length],
    accentBg: ACCENT_BG[i % ACCENT_BG.length],
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 500 });
  const anglesRef = useRef(ORBITS.map((o) => o.initialAngle));
  const animRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [angles, setAngles] = useState(ORBITS.map((o) => o.initialAngle));
  const [active, setActive] = useState<{ value: ValueDef; x: number; y: number } | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [rocketState, setRocketState] = useState<"offscreen" | "home" | "flying" | "landed" | "recalling">("offscreen");
  const [rocketPos, setRocketPos] = useState({ x: 20, y: 0 });
  const [recallPath, setRecallPath] = useState<{ x: number[]; y: number[] }>({ x: [0], y: [0] });
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
          enterTimer = setTimeout(() => setRocketState("home"), 80);
        } else {
          setActive(null);
          setShowCard(false);
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

  const homeX = 0;
  const homeY = 0;

  const handleRecall = () => {
    if (rocketState !== "landed") return;
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
    const perpY =  dx / (dist || 1);
    const bulge = dist * 0.55;
    const ctrl = { x: midX + perpX * bulge, y: midY + perpY * bulge };

    for (let k = 0; k <= N; k++) {
      const t = k / N;
      const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrl.x + t * t * homeX;
      const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrl.y + t * t * homeY;
      xs.push(bx);
      ys.push(by);
    }
    setRecallPath({ x: xs, y: ys });
    setActive(null);
    setShowCard(false);
    setRocketState("recalling");
  };

  return (
    <section ref={sectionRef} id="beyond" className="section-full dot-bg flex items-center justify-center relative">
      <FloatingDots />

      {/* Section title */}
      <div className="absolute top-36 left-0 right-0 flex flex-col items-center z-10 pointer-events-none">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text tracking-tight">Beyond the Code</h2>
        <p className="text-xs text-slate-500 mt-1 tracking-widest uppercase">Fly to a planet & explore</p>
      </div>

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
            <filter id="planetGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sunGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="14" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Orbit rings */}
          {ORBITS.slice(0, VALUES.length).map((o, i) => (
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
                  x={cx} y={cy + Math.round(3 * orbitScale)}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontWeight="800"
                  fill="#b45309"
                  style={{ pointerEvents: "none", letterSpacing: "0.08em" }}
                >WHOAMI</text>
              </>
            );
          })()}

          {/* Rocket + bubble bouncing together */}
          <motion.g
            animate={(() => {
              if (rocketState === "offscreen") return { x: -200, y: 0 };
              if (rocketState === "flying") return { x: rocketPos.x - 20, y: rocketPos.y - (size.h - 74) };
              if (rocketState === "recalling") return { x: recallPath.x, y: recallPath.y };
              const baseX = rocketState === "home" ? 0 : rocketPos.x - 20;
              const baseY = rocketState === "home" ? 0 : rocketPos.y - (size.h - 74);
              return { x: baseX, y: [baseY, baseY - 10, baseY] };
            })()}
            transition={(() => {
              if (rocketState === "offscreen") return { duration: 0 };
              if (rocketState === "home" && rocketPos.x === 20) return { x: { duration: 0.7, ease: "easeOut" }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
              if (rocketState === "flying") return { duration: 0.8, ease: "easeInOut" };
              if (rocketState === "recalling") return { duration: 1.4, ease: "easeInOut" };
              return { duration: 2, repeat: Infinity, ease: "easeInOut" };
            })()}
            onAnimationComplete={() => {
              if (rocketState === "flying") {
                setRocketState("landed");
                setShowCard(true);
              }
              if (rocketState === "recalling") {
                setRocketPos({ x: 20, y: size.h - 74 });
                setRocketState("home");
              }
            }}
          >
            {/* Rocket */}
            <motion.image
              href="/rocket.svg"
              x={20}
              y={size.h - 110}
              animate={{
                width: (rocketState === "home" || rocketState === "recalling") ? 80 : 36,
                height: (rocketState === "home" || rocketState === "recalling") ? 80 : 36,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.9))" }}
            />
            {/* Speech bubble — kept as style because values are static but not in Tailwind core */}
            {rocketState === "home" && (
              <foreignObject x={8} y={size.h - 164} width={150} height={82}>
                <div className="relative rounded-[10px] px-2.5 py-1.5 text-[11px] text-white leading-[1.4]"
                     style={{
                       background: "rgba(20,16,50,0.92)",
                       border: "1px solid rgba(167,139,250,0.4)",
                       boxShadow: "0 0 12px rgba(167,139,250,0.2)",
                     }}
                >
                  Let&apos;s travel to each planet to explore! 🚀
                  {/* Tail — pure geometry, no Tailwind equivalent */}
                  <div className="absolute -bottom-[7px] left-[22px] w-0 h-0"
                       style={{
                         borderLeft: "6px solid transparent",
                         borderRight: "6px solid transparent",
                         borderTop: "7px solid rgba(20,16,50,0.92)",
                       }}
                  />
                </div>
              </foreignObject>
            )}
          </motion.g>

          {/* Planets */}
          {ORBITS.slice(0, VALUES.length).map((o, i) => {
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
            const srx = pr * 2.2;
            const sry = pr * 0.6;
            const ringBack  = `M ${bx + srx} ${by} A ${srx} ${sry} 0 0 0 ${bx - srx} ${by}`;
            const ringFront = `M ${bx - srx} ${by} A ${srx} ${sry} 0 0 0 ${bx + srx} ${by}`;
            const ringOpacity = behind ? 0.2 : 0.7;

            const handlePlanetClick = () => {
              setActive({ value, x: bx, y: by });
              setShowCard(false);
              setRocketState("flying");
              setRocketPos({ x: bx - ROCKET_W / 2, y: by - ROCKET_H / 2 });
            };

            return (
              <g key={i} className="cursor-pointer" onClick={handlePlanetClick}>
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

                <circle
                  cx={bx}
                  cy={by}
                  r={pr}
                  fill={`url(#planetGrad${i})`}
                  filter="url(#planetGlow)"
                  opacity={behind ? 0.4 : 1}
                />

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

      {/* Recall button */}
      <AnimatePresence>
        {rocketState === "landed" && (
          <motion.button
            key="recall-btn"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={handleRecall}
            className="absolute z-40 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer select-none bottom-8 left-1/2 -translate-x-1/2 text-[#c4b5fd]"
            style={{
              background: "rgba(20,16,50,0.92)",
              border: "1px solid rgba(167,139,250,0.45)",
              boxShadow: "0 0 18px rgba(167,139,250,0.25)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 8A5.5 5.5 0 1 1 8 2.5"
                stroke="#c4b5fd"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d="M8 2.5 L10.5 0.5 L10.5 4.5 Z" fill="#c4b5fd" />
            </svg>
            Recall
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popover anchored to planet */}
      <AnimatePresence>
        {active && showCard && (() => {
          const POPOVER_W = 380;
          const POPOVER_H = 400;
          const PAD = 16;
          const isMobile = size.w < 640;

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
              <div className="absolute inset-0 z-20" onClick={() => { setActive(null); setShowCard(false); setRocketState("landed"); }} />
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
                  {/* Image area */}
                  <div className="w-full h-54 relative overflow-hidden" style={{ height: 216, background: active.value.accentBg }}>
                    {active.value.images && active.value.images.length > 0 ? (
                      (() => {
                        const imgs = active.value.images!;
                        if (imgs.length === 1) {
                          return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={imgs[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          );
                        }
                        return <ImageCarousel images={imgs} accentColor={active.value.accentColor} />;
                      })()
                    ) : (
                      <>
                        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                          {[...Array(6)].map((_, i) => (
                            <line key={`v${i}`} x1={`${(i + 1) * 16.6}%`} y1="0" x2={`${(i + 1) * 16.6}%`} y2="100%" stroke={active.value.accentColor} strokeWidth="0.5" />
                          ))}
                          {[...Array(4)].map((_, i) => (
                            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 25}%`} x2="100%" y2={`${(i + 1) * 25}%`} stroke={active.value.accentColor} strokeWidth="0.5" />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{
                              background: `${active.value.accentColor}30`,
                              border: `2px solid ${active.value.accentColor}60`,
                              boxShadow: `0 0 20px ${active.value.accentColor}40`,
                            }}
                          >
                            <svg width="28" height="28" viewBox="0 0 28 28">
                              <circle cx="14" cy="14" r="12" fill={active.value.accentColor} opacity="0.9" />
                              <circle cx="10" cy="11" r="4" fill="white" opacity="0.15" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Bottom gradient for label legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(8,12,36,0.92) 0%, transparent 100%)" }}
                    />
                    <span
                      className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-widest z-20"
                      style={{ color: active.value.accentColor, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                    >
                      {active.value.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <button
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                      onClick={() => { setActive(null); setShowCard(false); setRocketState("landed"); }}
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