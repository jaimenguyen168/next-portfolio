"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard, { type Project } from "@/features/projects/components/project-card";

export type { Project };

type Props = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">

        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4 gradient-text-blue">Featured Projects</h2>
          <p className="text-xs md:text-base text-muted-foreground">
            A selection of projects showcasing my expertise in web and mobile development
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} variant="landing" />
          ))}
        </div>

        {/* See more */}
        <motion.div
          className="flex justify-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium border border-white/15 text-slate-200 hover:bg-white/5 transition-colors"
          >
            See all projects <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
