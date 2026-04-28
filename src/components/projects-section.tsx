"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, ImageIcon } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SKILL_META } from "@/sanity/constants/skillMeta";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
  skills: { name: string }[];
  githubUrl?: string;
  demoUrl?: string;
};

type Props = {
  projects: Project[];
};

const MAX_VISIBLE_BADGES = 3;

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
          {projects.map((project, i) => {
            const imageUrl = project.image
              ? urlFor(project.image).width(800).height(500).fit("crop").url()
              : null;

            const tags = (project.skills ?? [])
              .map((s) => SKILL_META[s.name])
              .filter(Boolean);

            const visibleTags = tags.slice(0, MAX_VISIBLE_BADGES);
            const extraCount = tags.length - MAX_VISIBLE_BADGES;

            return (
              <motion.div
                key={project._id}
                className="card overflow-hidden flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                {/* Image */}
                <div className="overflow-hidden h-28 md:h-48 flex-shrink-0">
                  <motion.div
                    className="w-full h-full relative"
                    whileHover={{ scale: 1.1, transition: { duration: 0.4, ease: "easeOut" } }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-card-subtle opacity-60">
                        <ImageIcon size={22} />
                        <span className="text-white text-xs hidden md:block">Project Image</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3 flex-1">
                  <h3 className="font-semibold text-white text-xs md:text-base leading-tight">{project.title}</h3>

                  {/* Description: max 2 lines */}
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Skill badges: max 1 line, max 3 visible + overflow count */}
                  {tags.length > 0 && (
                    <div className="flex items-center gap-1.5 md:gap-2 overflow-hidden">
                      {visibleTags.map(({ icon: Icon, label, color }) => (
                        <div
                          key={label}
                          className="flex items-center gap-1 md:gap-1.5 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 md:px-3 md:py-1 flex-shrink-0"
                        >
                          <Icon size={12} color={color} />
                          <span className="text-xs text-slate-300 hidden md:inline whitespace-nowrap">{label}</span>
                        </div>
                      ))}
                      {extraCount > 0 && (
                        <span className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 md:px-2.5 md:py-1 flex-shrink-0 whitespace-nowrap">
                          +{extraCount}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2 mt-1">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium border border-white/15 text-slate-200 bg-transparent hover:bg-white/5 transition-colors"
                      >
                        <Code2 size={14} /> <span className="hidden md:inline">Code</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium border border-white/10 text-slate-500 bg-transparent cursor-not-allowed"
                      >
                        <Code2 size={14} /> <span className="hidden md:inline">Code</span>
                      </button>
                    )}

                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={14} /> <span className="hidden md:inline">Demo</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium text-white/40 bg-purple-gradient opacity-40 cursor-not-allowed"
                      >
                        <ExternalLink size={14} /> <span className="hidden md:inline">Demo</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
