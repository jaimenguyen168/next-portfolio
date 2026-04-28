"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard, { type Project } from "@/features/projects/components/project-card";

export type { Project };

type Props = {
  projects: Project[];
};

export default function ProjectsView({ projects }: Props) {
  return (
    <div className="min-h-screen px-4 md:px-16 py-12 md:py-24">
      <div className="max-w-5xl mx-auto w-full">

        {/* Header */}
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-white transition-colors mb-6 inline-block"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-blue mb-2 md:mb-4">All Projects</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Everything I&apos;ve built — web, mobile, and everything in between.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} variant="page" />
          ))}
        </div>
      </div>
    </div>
  );
}
