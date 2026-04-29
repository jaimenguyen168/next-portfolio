"use client";

import Link from "next/link";
import FloatingDots from "./floating-dots";
import ScrollIndicator from "./scroll-indicator";
import { SiNextdotjs, SiReact, SiExpo, SiSwift, SiClerk, SiOpenai, SiTailwindcss, SiGithub, SiVite, SiTrpc, SiTypescript } from "react-icons/si";
import { Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TechIcon = { icon: React.ElementType; color: string; label: string };

const FIXED_ICONS: TechIcon[] = [
  { icon: SiNextdotjs, color: "#ffffff",  label: "Next.js" },
  { icon: SiReact,     color: "#818cf8",  label: "React Native" },
  { icon: SiExpo,      color: "#f59e0b",  label: "Expo" },
  { icon: SiSwift,     color: "#f05138",  label: "SwiftUI" },
];

const POOL_ICONS: TechIcon[] = [
  { icon: SiClerk,       color: "#6c47ff", label: "Clerk" },
  { icon: SiOpenai,      color: "#ffffff", label: "OpenAI" },
  { icon: SiTailwindcss, color: "#38bdf8", label: "Tailwind" },
  { icon: SiGithub,      color: "#ffffff", label: "GitHub" },
  { icon: Zap,           color: "#f59e0b", label: "Inngest" },
  { icon: SiVite,        color: "#a78bfa", label: "Vite" },
  { icon: SiTrpc,        color: "#398ccb", label: "tRPC" },
  { icon: SiTypescript,  color: "#3178c6", label: "TypeScript" },
];

function SlotIcon({ entry }: { entry: TechIcon }) {
  const Icon = entry.icon;
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={entry.label}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%",    opacity: 1 }}
        exit={{    y: "100%",  opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Icon size={26} color={entry.color} className="md:hidden" />
        <Icon size={36} color={entry.color} className="hidden md:block" />
      </motion.div>
    </AnimatePresence>
  );
}

const ALL_ICONS: TechIcon[] = [...FIXED_ICONS, ...POOL_ICONS];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useSlotMachine(initialIcons: TechIcon[]) {
  // Store everything in one ref so mutations are always in sync
  const stateRef = useRef({
    icons: [...initialIcons],
    available: ALL_ICONS.filter((i) => !initialIcons.some((s) => s.label === i.label)),
    slotQueue: [] as number[],
  });

  const [icons, setIcons] = useState<TechIcon[]>(initialIcons);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;

      // Refill slot queue when empty
      if (s.slotQueue.length === 0) {
        s.slotQueue = shuffle([0, 1, 2, 3]);
      }
      const slotIdx = s.slotQueue.pop()!;

      // Pick random incoming — guaranteed not currently shown
      const pickIdx = Math.floor(Math.random() * s.available.length);
      const incoming = s.available[pickIdx];
      const outgoing = s.icons[slotIdx];

      // Swap in the ref synchronously
      s.available.splice(pickIdx, 1);
      s.available.push(outgoing);
      s.icons[slotIdx] = incoming;

      // Trigger re-render with a fresh array copy
      setIcons([...s.icons]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return icons;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const icons = useSlotMachine(FIXED_ICONS);

  return (
    <section
      id="hero"
      className="section-full dot-bg relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <FloatingDots />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0 } } }}
      >
        {/* Icons — slot machine */}
        <div role="list" aria-label="Technologies" className="flex items-center gap-3 md:gap-6 mb-6 md:mb-10">
          {icons.map((entry, i) => (
            <motion.div
              key={i}
              role="listitem"
              aria-label={entry.label}
              className="size-12 md:size-16 rounded-xl flex items-center justify-center card relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <SlotIcon entry={entry} />
            </motion.div>
          ))}
        </div>

        {/* Everything below slides up simultaneously */}
        <motion.h1
          className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight gradient-text"
          variants={fadeUp}
        >
          Frontend & Mobile Developer
        </motion.h1>

        <motion.p
          className="text-base md:text-xl font-medium mb-2 md:mb-3 text-slate-200"
          variants={fadeUp}
        >
          Building web apps & mobile experiences
        </motion.p>

        <motion.p
          className="text-sm md:text-base mb-8 md:mb-12 max-w-lg text-muted-foreground"
          variants={fadeUp}
        >
          Crafting polished, production-ready apps with Next.js, React Native, Expo, and SwiftUI
        </motion.p>

        <motion.div className="flex items-center gap-4" variants={fadeUp}>
          <Link
            href="#projects"
            aria-label="View my projects"
            className="px-7 py-3 rounded-lg font-semibold text-white text-sm bg-purple-gradient hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            aria-label="Get in touch with me"
            className="px-7 py-3 rounded-lg font-semibold text-sm border border-white/20 text-slate-300 hover:border-white/40 transition-colors"
          >
            Get In Touch
          </Link>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
