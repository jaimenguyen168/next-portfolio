"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import ProjectCard, { type Project } from "@/features/projects/components/project-card";
import { SKILL_META } from "@/sanity/constants/skillMeta";

export type { Project };

type Props = {
  projects: Project[];
  initialSkills: string[];
};

export default function ProjectsView({ projects, initialSkills }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSkills, setActiveSkills] = useState<Set<string>>(new Set(initialSkills));

  // Sync URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    activeSkills.forEach((s) => params.append("skill", s));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [activeSkills, pathname, router]);

  function toggleSkill(value: string) {
    setActiveSkills((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function clearAll() {
    setActiveSkills(new Set());
  }

  // All unique skills across projects, in the order they first appear
  const allSkills = useMemo(() => {
    const seen = new Set<string>();
    const result: { value: string; label: string; color: string; icon: React.ComponentType<{ size?: number; color?: string }> }[] = [];
    for (const project of projects) {
      for (const s of project.skills ?? []) {
        if (!seen.has(s.name) && SKILL_META[s.name]) {
          seen.add(s.name);
          result.push({ value: s.name, ...SKILL_META[s.name] });
        }
      }
    }
    return result;
  }, [projects]);

  // Projects must match ALL active skills (AND logic)
  const filtered = useMemo(() => {
    if (activeSkills.size === 0) return projects;
    return projects.filter((p) =>
      [...activeSkills].every((skill) =>
        p.skills?.some((s) => s.name === skill)
      )
    );
  }, [projects, activeSkills]);

  const hasFilters = activeSkills.size > 0;

  return (
    <div className="min-h-screen px-4 md:px-16 py-18">
      <div className="max-w-5xl mx-auto w-full">

        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-blue mb-2 md:mb-4">All Projects</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Everything I&apos;ve built — web, mobile, and everything in between.
          </p>
        </motion.div>

        {/* Filter bar */}
        {allSkills.length > 0 && (
          <motion.div
            className="mb-6 md:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-2">
              {/* All pill */}
              <button
                onClick={clearAll}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  !hasFilters
                    ? "bg-accent/30 border-accent-light/50 text-accent-light"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                All
              </button>

              {allSkills.map(({ value, label, color, icon: Icon }) => {
                const isActive = activeSkills.has(value);
                return (
                  <motion.button
                    key={value}
                    onClick={() => toggleSkill(value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-accent/30 border-accent-light/50 text-accent-light"
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`${isActive ? "Remove" : "Add"} filter: ${label}`}
                  >
                    <Icon size={12} color={isActive ? color : undefined} />
                    {label}
                    {isActive && <X size={11} className="ml-0.5 opacity-70" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Status line */}
            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 flex items-center gap-2 flex-wrap"
                >
                  <p className="text-xs text-muted-foreground">
                    Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""} matching{" "}
                    {[...activeSkills].map((s, i) => (
                      <span key={s}>
                        {i > 0 && <span className="text-muted-foreground"> + </span>}
                        <span className="text-accent-light font-medium">{SKILL_META[s]?.label ?? s}</span>
                      </span>
                    ))}
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={[...activeSkills].sort().join(",")}
            className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} variant="page" />
              ))
            ) : (
              <motion.div
                className="col-span-2 py-20 text-center text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No projects found for this combination of skills.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
