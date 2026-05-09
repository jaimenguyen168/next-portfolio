"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Star,
  Rocket,
  Trophy,
  X,
} from "lucide-react";
import TimelineCard from "../components/timeline-card";
import TimelineConnector from "../components/timeline-connector";

export type Milestone = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  category: string;
  excerpt: string;
  body?: unknown[];
  logo?: { url: string } | null;
  image?: { url: string; alt?: string } | null;
  tags?: string[];
  location?: string;
  highlighted?: boolean;
};

const CATEGORY_META: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  work: { label: "Work", color: "#818cf8", icon: Briefcase },
  education: { label: "Education", color: "#a78bfa", icon: GraduationCap },
  personal: { label: "Personal", color: "#34d399", icon: Star },
  project: { label: "Project", color: "#60a5fa", icon: Rocket },
  achievement: { label: "Achievement", color: "#f472b6", icon: Trophy },
};

type Props = { milestones: Milestone[] };

export default function TimelineView({ milestones }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    const seen = new Set<string>();
    for (const m of milestones) {
      if (CATEGORY_META[m.category]) seen.add(m.category);
    }
    return [...seen];
  }, [milestones]);

  const filtered = useMemo(() => {
    if (!activeCategory) return milestones;
    return milestones.filter((m) => m.category === activeCategory);
  }, [milestones, activeCategory]);

  if (!milestones.length) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-muted-foreground text-sm">
          No milestones yet — add some in Sanity Studio.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden px-4 md:px-16 py-18 ">
      <section className="text-center mb-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-accent-light/70 mb-3 px-3 py-1 rounded-full border border-accent-light/20 bg-accent-light/5">
            Timeline
          </span>
          <h1 className="text-3xl md:text-6xl font-bold gradient-text-blue mb-4">
            My Milestones
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A living record of where I&apos;ve been, career moves, personal
            growth, projects shipped, and moments that changed the direction.
          </p>
        </motion.div>
      </section>

      <motion.div
        className="flex justify-center px-4 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 cursor-pointer ${
              !activeCategory
                ? "bg-accent/30 border-accent-light/50 text-accent-light"
                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
            }`}
          >
            All
          </button>

          {availableCategories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent/30 border-accent-light/50 text-accent-light"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={12} color={isActive ? meta.color : undefined} />
                {meta.label}
                {isActive && <X size={11} className="ml-0.5 opacity-70" />}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <section className="relative max-w-6xl mx-auto pb-32">
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(129,140,248,0.25) 5%, rgba(129,140,248,0.25) 95%, transparent)",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "all"}
            className="flex flex-col gap-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length > 0 ? (
              filtered.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <TimelineEntry
                    key={milestone._id}
                    milestone={milestone}
                    index={index}
                    isLeft={isLeft}
                  />
                );
              })
            ) : (
              <motion.p
                className="text-center text-sm text-muted-foreground py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No milestones in this category yet.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="w-3 h-3 rounded-full border-2 border-accent-light/40"
            style={{ background: "rgba(129,140,248,0.2)" }}
          />
          <span className="text-[10px] text-muted-foreground/50 font-medium tracking-wider uppercase whitespace-nowrap">
            More to come
          </span>
        </motion.div>
      </section>
    </main>
  );
}

function TimelineEntry({
  milestone,
  index,
  isLeft,
}: {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative py-6">
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden md:flex">
        <TimelineConnector
          milestone={milestone}
          inView={inView}
          index={index}
        />
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:gap-8">
        <div className="flex justify-end pr-12">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="w-full max-w-sm"
            >
              <TimelineCard milestone={milestone} />
            </motion.div>
          )}
        </div>

        <div className="flex justify-start pl-12">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="w-full max-w-sm"
            >
              <TimelineCard milestone={milestone} />
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="md:hidden flex flex-col items-center w-full gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      >
        <TimelineCard milestone={milestone} />
        <div
          className="w-px h-6"
          style={{ background: "rgba(129,140,248,0.25)" }}
        />
      </motion.div>
    </div>
  );
}
