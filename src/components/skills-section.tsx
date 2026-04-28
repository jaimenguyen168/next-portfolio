"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiVite,
  SiExpo, SiSwift,
  SiNodedotjs, SiPrisma, SiMongodb, SiSupabase, SiFirebase, SiPostgresql,
  SiClerk, SiGit, SiGithub, SiVercel, SiStripe, SiOpenai, SiAnthropic,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend & Web",
    accentClass: "bg-accent-light",
    skills: [
      { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
      { icon: SiReact,     label: "React",      color: "#61dafb" },
      { icon: SiTypescript,label: "TypeScript",  color: "#3178c6" },
      { icon: SiJavascript,label: "JavaScript",  color: "#f7df1e" },
      { icon: SiTailwindcss,label: "Tailwind",   color: "#38bdf8" },
      { icon: SiVite,       label: "Vite",       color: "#646cff" },
    ],
  },
  {
    title: "Mobile",
    accentClass: "bg-amber-400",
    skills: [
      { icon: SiReact, label: "React Native", color: "#61dafb" },
      { icon: SiExpo,  label: "Expo",         color: "#f59e0b" },
      { icon: SiSwift, label: "SwiftUI",       color: "#f05138" },
    ],
  },
  {
    title: "Backend & Database",
    accentClass: "bg-emerald-400",
    skills: [
      { icon: SiNodedotjs,  label: "Node.js",    color: "#68a063" },
      { icon: SiPrisma,     label: "Prisma",      color: "#ffffff" },
      { icon: SiMongodb,    label: "MongoDB",     color: "#4db33d" },
      { icon: SiSupabase,   label: "Supabase",    color: "#3ecf8e" },
      { icon: SiFirebase,   label: "Firebase",    color: "#ffca28" },
      { icon: SiPostgresql, label: "PostgreSQL",  color: "#336791" },
    ],
  },
  {
    title: "Auth & Tools",
    accentClass: "bg-rose-400",
    skills: [
      { icon: SiClerk,   label: "Clerk",   color: "#6c47ff" },
      { icon: SiGit,     label: "Git",     color: "#f05032" },
      { icon: SiGithub,  label: "GitHub",  color: "#ffffff" },
      { icon: SiVercel,  label: "Vercel",  color: "#ffffff" },
      { icon: SiStripe,    label: "Stripe",    color: "#635bff" },
      { icon: SiOpenai,    label: "OpenAI",    color: "#ffffff" },
      { icon: SiAnthropic, label: "Anthropic", color: "#d97757" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">

        {/* Heading drops down */}
        <motion.div
          className="text-center mb-6 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 gradient-text-blue">Technical Skills</h2>
          <p className="text-xs md:text-base text-muted-foreground">
            My toolkit for building modern web and mobile applications
          </p>
        </motion.div>

        {/* Cards zoom out */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="card p-3 md:p-7"
              initial={{ opacity: 0, scale: 1.15 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className={`h-0.5 w-6 md:w-8 rounded-full ${cat.accentClass}`} />
                <h3 className="font-semibold text-white text-sm md:text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {cat.skills.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2 py-1 md:px-3 md:py-1.5"
                  >
                    <Icon size={14} color={color} className="md:hidden" />
                    <Icon size={16} color={color} className="hidden md:block" />
                    <span className="text-xs text-slate-300 whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
