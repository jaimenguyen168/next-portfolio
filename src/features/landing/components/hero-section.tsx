"use client";

import Link from "next/link";
import FloatingDots from "./floating-dots";
import ScrollIndicator from "./scroll-indicator";
import { SiNextdotjs, SiReact, SiExpo, SiSwift } from "react-icons/si";
import { motion } from "framer-motion";

const techIcons = [
  { icon: SiNextdotjs, color: "#ffffff", label: "Next.js" },
  { icon: SiReact,     color: "#818cf8", label: "React Native" },
  { icon: SiExpo,      color: "#f59e0b", label: "Expo" },
  { icon: SiSwift,     color: "#f05138", label: "SwiftUI" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
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
        {/* Icons — zoom out, all at once */}
        <div className="flex items-center gap-3 md:gap-6 mb-6 md:mb-10">
          {techIcons.map(({ icon: Icon, color, label }, i) => (
            <motion.div
              key={label}
              className="size-12 md:size-16 rounded-xl flex items-center justify-center card"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <Icon size={26} color={color} className="md:hidden" />
              <Icon size={36} color={color} className="hidden md:block" />
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
            className="px-7 py-3 rounded-lg font-semibold text-white text-sm bg-purple-gradient hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
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
