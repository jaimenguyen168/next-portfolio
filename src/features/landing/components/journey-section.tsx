"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { MapPin, GraduationCap, Trophy, Lightbulb, Code2, Rocket, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type JourneyEvent = {
  year: string;
  icon: React.ElementType;
  accentColor: string;
  accentBg: string;
  title: string;
  subtitle: string;
  body: string;
  image?: string;
};

const EVENTS: JourneyEvent[] = [
  {
    year: "2021",
    icon: MapPin,
    accentColor: "#818cf8",
    accentBg: "rgba(99,102,241,0.15)",
    title: "Starting over at 27",
    subtitle: "New country, new chapter",
    body: "My family moved to the US when I was 27. New country, new language, everything starting over. I enrolled at Howard Community College in Maryland just hoping to get a solid education, graduate, and find a job. Coding was not the plan but it ended up being the thing I cared most about.",
    image: "/jaime.png",
  },
  {
    year: "2023",
    icon: GraduationCap,
    accentColor: "#a78bfa",
    accentBg: "rgba(167,139,250,0.15)",
    title: "Temple University & First Hackathon",
    subtitle: "BS Computer Science · OwlHacks",
    body: "I transferred to Temple University to finish my Computer Science degree. First semester in, I joined OwlHacks, my very first hackathon. We shipped an app but the UI was a mess and I really did not know what I was doing. That stuck with me and I knew I had to get a lot better.",
    image: "/jaime.png",
  },
  {
    year: "2024",
    icon: Lightbulb,
    accentColor: "#34d399",
    accentBg: "rgba(52,211,153,0.15)",
    title: "Mobile Dev Certificate",
    subtitle: "Temple University · UI/UX turning point",
    body: "In my senior year at Temple University I got a certificate in mobile development. It was the first time I thought seriously about how an app looks and feels, not just whether it works. That changed how I approach building everything.",
    // image: "/journey/mobile-cert.jpg",
  },
  {
    year: "Spring 2025",
    icon: Code2,
    accentColor: "#60a5fa",
    accentBg: "rgba(96,165,250,0.15)",
    title: "Building Clover",
    subtitle: "Capstone Project · Temple University",
    body: "For my Capstone Project at Temple University, my team built Clover. It is a full stack VS Code extension that injects syntax errors into student code to study how students trust AI feedback. It was the hardest thing I had built at that point and it got me hired at the HCI Lab.",
    // image: "/journey/clover.jpg",
  },
  {
    year: "2025",
    icon: Rocket,
    accentColor: "#f472b6",
    accentBg: "rgba(244,114,182,0.15)",
    title: "HCI Lab & Real Builds",
    subtitle: "Research assistant · Temple University",
    body: "Clover got me hired as a research assistant at Temple's HCI Lab. I kept building from there, contributing to projects like PersuAI and the HCI Lab website while working on my own personal projects at the same time. Everything I taught myself was finally going somewhere.",
    // image: "/journey/hci-lab.jpg",
  },
  {
    year: "Spring 2026",
    icon: GraduationCap,
    accentColor: "#34d399",
    accentBg: "rgba(52,211,153,0.15)",
    title: "Adjunct TA",
    subtitle: "Mentoring the next class",
    body: "In Spring 2026 I became an adjunct TA at Temple University, helping students work through their Capstone Projects. I share what I learned going through it myself and everything I picked up building on my own. Someday I want to do this full time as a mentor or consultant.",
    // image: "/journey/ta.jpg",
  },
];

const TOTAL_STOPS = EVENTS.length + 1; // events + future CTA
const AUTO_INTERVAL = 7000;

export default function JourneySection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [dotRange, setDotRange] = useState({ first: 0, last: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null); // still needed for the road body layout
  const dotsRowRef = useRef<HTMLDivElement>(null);

  // Measure the actual pixel center of the first and last dots in the row,
  // relative to the track container. Works regardless of max-width or padding.
  useEffect(() => {
    function measure() {
      if (!trackRef.current || !dotsRowRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const dots = dotsRowRef.current.querySelectorAll<HTMLElement>("[data-dot]");
      if (dots.length < 2) return;
      const first = dots[0].getBoundingClientRect();
      const last  = dots[dots.length - 1].getBoundingClientRect();
      setDotRange({
        first: first.left + first.width / 2 - trackRect.left,
        last:  last.left  + last.width  / 2 - trackRect.left,
      });
    }
    // Small delay so the DOM has painted before measuring
    const id = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(id); window.removeEventListener("resize", measure); };
  }, []);

  // Interpolate between the measured first and last dot centers
  function getDotLeft(idx: number): number {
    if (dotRange.last === 0) return 0;
    return dotRange.first + (idx / (TOTAL_STOPS - 1)) * (dotRange.last - dotRange.first);
  }

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActive(idx);
  }, []);

  const next = useCallback(() => goTo((active + 1) % TOTAL_STOPS, 1), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + TOTAL_STOPS) % TOTAL_STOPS, -1), [active, goTo]);

  useEffect(() => {
    if (hovered) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovered, next]);

  const isFuture = active === EVENTS.length;
  const event = isFuture ? null : EVENTS[active];
  const rocketPct = (active / (TOTAL_STOPS - 1)) * 100;

  return (
    <section id="journey" className="section-full flex flex-col items-center justify-center px-4 md:px-16 py-8 md:py-20" style={{ overflow: "hidden", overflowX: "clip" }}>

      {/* Heading */}
      <motion.div
        className="text-center mb-5 md:mb-8 shrink-0"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-3 gradient-text-blue">My Journey</h2>
        <p className="text-xs md:text-base text-muted-foreground">
          From a fresh start at 27 to building real products — my unfiltered path.
        </p>
      </motion.div>

      <div className="w-full max-w-3xl px-4 md:px-8 mx-auto flex flex-col items-center gap-5 md:gap-6">

        {/* Fixed-size card wrapper — prevents height jumps */}
        <div
          className="relative w-full md:h-90"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            {!isFuture && event ? (
              <motion.div
                key={active}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="md:absolute md:inset-0 card p-4 md:p-5 flex flex-col"
              >
                <div className="flex flex-col md:flex-row gap-3 flex-1 min-h-0">
                  {/* Text side */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                        style={{ background: event.accentBg }}
                      >
                        <event.icon size={16} style={{ color: event.accentColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mb-1"
                          style={{ color: event.accentColor, borderColor: `${event.accentColor}40`, background: event.accentBg }}
                        >
                          {event.year}
                        </span>
                        <h3 className="font-semibold text-white text-sm md:text-base leading-snug">{event.title}</h3>
                        <p className="text-[10px] mt-0.5" style={{ color: event.accentColor + "bb" }}>{event.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-400 flex-1 overflow-hidden line-clamp-4">{event.body}</p>
                  </div>

                  {/* Image side — full width on mobile (below text), fixed width column on md+ */}
                  {event.image && (
                    <div className="w-full h-64 md:w-90 md:h-full shrink-0 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {!hovered && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="mt-1.5 text-[9px] text-white/20 text-right shrink-0">
                      Hover to pause
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="future"
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="md:absolute md:inset-0 card p-4 md:p-5 flex flex-col items-center justify-center text-center gap-3"
                style={{ borderColor: "rgba(129,140,248,0.25)", background: "rgba(99,102,241,0.06)" }}
              >
                <motion.div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center bg-icon-purple border border-white/10"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={18} className="text-accent-light" />
                </motion.div>
                <div>
                  <p className="text-[11px] font-semibold text-accent-light tracking-widest uppercase mb-1">What&apos;s next</p>
                  <h3 className="font-bold text-white text-base md:text-lg leading-snug mb-1.5">
                    The next chapter is with you
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                    This is just getting started. Looking for harder problems, bigger challenges, and work that actually pushes me.
                  </p>
                </div>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-gradient hover:opacity-90 transition-opacity"
                >
                  Let&apos;s talk <ArrowRight size={12} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Road */}
        {/* overflow-visible so the arrow tip can poke past the right edge of the card */}
        <div className="w-full flex flex-col items-center gap-3 overflow-visible">

          {/* Road track — with arrow tip extending beyond the card */}
          <div ref={trackRef} className="relative w-full flex items-center overflow-visible" style={{ height: 48 }}>

            {/* Road body — extends 32px past the card right edge before the arrow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-16 rounded-l-full bg-white/4 border border-white/[0.07] right-0 md:-right-8"
              style={{ height: 36, borderRight: "none" }}
            />

            {/* Arrow tip — flush on mobile, 32px beyond on md+ */}
            <div className="absolute top-1/2 -translate-y-1/2 left-full md:left-auto md:-right-18 w-6 md:w-10 h-16 md:h-16 bg-white/4"
                 style={{
                   clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                   background: "rgba(255,255,255,0.07)", // border color
                 }}
            />

            {/* Static dashes */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 overflow-hidden flex items-center gap-3 pointer-events-none" style={{ right: 32 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-5 h-0.5 rounded-full bg-white/8 shrink-0" />
              ))}
            </div>

            {/* Progress fill */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 rounded-l-full pointer-events-none"
              style={{
                height: 36,
                background: "linear-gradient(90deg, rgba(99,102,241,0.25), rgba(244,114,182,0.2))",
              }}
              animate={{ width: dotRange.last > 0 ? getDotLeft(active) : `${rocketPct * 0.92}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Rocket — centered over each dot using computed position */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-10"
              animate={{ left: dotRange.last > 0 ? getDotLeft(active) - 16 : `${4 + rocketPct * 0.8}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full bg-[#0b1230] border border-accent-light/30 flex items-center justify-center"
                style={{ boxShadow: "0 0 14px rgba(129,140,248,0.45)" }}
              >
                {/* Rocket rotated to point right */}
                <Rocket size={14} className="text-accent-light" style={{ transform: "rotate(45deg)" }} />
              </motion.div>
            </motion.div>

            {/* Milestone dots + labels */}
            <div
              ref={dotsRowRef}
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none"
              style={{ left: "4%", right: "7%" }}
            >
              {/* Event dots */}
              {EVENTS.map((e, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <button
                    key={e.year}
                    data-dot
                    onClick={() => goTo(i, i > active ? 1 : -1)}
                    className="relative flex flex-col items-center cursor-pointer pointer-events-auto p-4 -m-4"
                    aria-label={`Jump to ${e.title}`}
                  >
                    {/* Year above the road — moved further up */}
                    <span
                      className="absolute whitespace-nowrap font-semibold transition-all duration-300"
                      style={{
                        bottom: "calc(50% + 20px)",
                        fontSize: "11px",
                        color: isActive ? e.accentColor : "rgba(255,255,255,0.25)",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        transformOrigin: "center bottom",
                      }}
                    >
                      {e.year}
                    </span>

                    {/* "Start here" badge — always visible, bobs up/down */}
                    {i === 0 && (
                      <motion.div
                        className="absolute flex flex-col items-center pointer-events-none"
                        style={{ top: "calc(100% + 10px)" }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {/* Upward triangle arrow */}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderBottom: `6px solid ${e.accentColor}`,
                            marginBottom: 3,
                          }}
                        />
                        {/* Badge */}
                        <span
                          className="whitespace-nowrap font-semibold px-2.5 py-1 rounded-full border text-[11px]"
                          style={{
                            color: e.accentColor,
                            borderColor: `${e.accentColor}50`,
                            background: e.accentBg,
                          }}
                        >
                          start here
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border"
                      style={{
                        background: isActive ? e.accentColor : isPast ? `${e.accentColor}50` : "rgba(255,255,255,0.1)",
                        borderColor: isActive ? e.accentColor : isPast ? `${e.accentColor}30` : "rgba(255,255,255,0.12)",
                        boxShadow: isActive ? `0 0 8px ${e.accentColor}80` : "none",
                      }}
                      animate={isActive ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                      transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                    />
                  </button>
                );
              })}


              <button
                data-dot
                onClick={() => goTo(EVENTS.length, 1)}
                className="relative flex flex-col items-center cursor-pointer pointer-events-auto p-4 -m-4"
                aria-label="What's next"
              >
                <span
                  className="absolute whitespace-nowrap font-bold transition-all duration-300"
                  style={{
                    bottom: "calc(50% + 20px)",
                    fontSize: "13px",
                    color: isFuture ? "#818cf8" : "rgba(255,255,255,0.35)",
                    transform: isFuture ? "scale(1.15)" : "scale(1)",
                    transformOrigin: "center bottom",
                  }}
                >
                  Onward
                </span>
                <motion.div
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border"
                  style={{
                    background: isFuture ? "#818cf8" : "rgba(255,255,255,0.1)",
                    borderColor: isFuture ? "#818cf8" : "rgba(255,255,255,0.12)",
                    boxShadow: isFuture ? "0 0 10px rgba(129,140,248,0.8)" : "none",
                  }}
                  animate={isFuture ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: isFuture ? Infinity : 0 }}
                />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-1">
            <motion.button
              onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={13} />
            </motion.button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STOPS }).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className="rounded-full cursor-pointer"
                  animate={{
                    width: i === active ? 18 : 5,
                    background: i === active
                      ? (i === EVENTS.length ? "#818cf8" : EVENTS[i].accentColor)
                      : "rgba(255,255,255,0.18)",
                  }}
                  style={{ height: 5 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Go to stop ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
