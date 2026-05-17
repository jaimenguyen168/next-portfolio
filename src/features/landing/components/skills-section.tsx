"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SKILL_META } from "@/sanity/constants/skillMeta";
import { SKILL_CATEGORIES } from "@/sanity/constants/skillCategories";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Frontend & Web": "I build production-grade web applications using React, Next.js App Router, TypeScript, and Tailwind CSS. I work with server components, server actions, and modern state management. I have experience with animation libraries like Framer Motion and GSAP, and I'm comfortable with full-stack patterns using tRPC and REST APIs.",
  "Mobile": "I develop cross-platform mobile apps with React Native and Expo targeting iOS and Android, as well as native iOS apps with SwiftUI. I handle everything from UI to push notifications, deep linking, and App Store deployment.",
  "Backend & Database": "I work with Node.js, serverless runtimes, PostgreSQL, MongoDB, and ORMs like Drizzle and Prisma. I've built APIs with Hono and Express, and integrated real-time databases like Convex and Firebase.",
  "Auth & Tools": "I integrate authentication with Clerk, BetterAuth, and Auth0. I'm experienced with DevOps tooling including Docker, GitHub Actions, Vercel, and CI/CD pipelines. I use AI APIs from OpenAI, Anthropic, and OpenRouter in production applications.",
};

type Props = {
  activeSkills: string[];
};

export default function SkillsSection({ activeSkills }: Props) {
  const activeSet = new Set(activeSkills);

  const categories = SKILL_CATEGORIES.map((cat) => ({
    title: cat.title,
    accentClass: cat.accentClass,
    skills: cat.skills
      .filter((value) => activeSet.has(value))
      .map((value) => ({ ...SKILL_META[value], value }))
      .filter((s) => s.icon),
  })).filter((cat) => cat.skills.length > 0);

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

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="card p-3 md:p-7 cursor-default transition-colors duration-300 hover:bg-white/[0.07] hover:border-white/20"
              initial={{ opacity: 0, scale: 1.15 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className={`h-0.5 w-6 md:w-8 rounded-full ${cat.accentClass}`} />
                <h3 className="font-semibold text-white text-sm md:text-lg">{cat.title}</h3>
              </div>

              {CATEGORY_DESCRIPTIONS[cat.title] && (
                <p className="sr-only">{CATEGORY_DESCRIPTIONS[cat.title]}</p>
              )}

              <TooltipProvider delayDuration={300}>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {cat.skills.map(({ icon: Icon, label, color, value, description }) => (
                    <Tooltip key={label}>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "rgba(255,255,255,0.1)",
                            borderColor: "rgba(255,255,255,0.25)",
                          }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <Link
                            href={`/projects?skill=${encodeURIComponent(value)}`}
                            className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2 py-1 md:px-3 md:py-1.5 cursor-pointer"
                            aria-label={`View projects using ${label}`}
                          >
                            <Icon size={14} color={color} className="md:hidden" />
                            <Icon size={16} color={color} className="hidden md:block" />
                            <span className="text-xs text-slate-300 whitespace-nowrap">{label}</span>
                            {description && <span className="sr-only">{description}</span>}
                          </Link>
                        </motion.div>
                      </TooltipTrigger>
                      {description && (
                        <TooltipContent side="top" className="max-w-56 text-center text-xs">
                          {description}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
