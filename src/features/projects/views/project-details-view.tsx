"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Star, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SKILL_META } from "@/sanity/constants/skillMeta";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

export type ProjectDetail = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  image?: SanityImage;
  featured?: boolean;
  skills: { name: string }[];
  githubUrl?: string;
  demoUrl?: string;
};

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetailsView({ project }: Props) {
  const imageUrl = project.image
    ? urlFor(project.image).width(1200).height(600).fit("crop").url()
    : null;

  const tags = (project.skills ?? [])
    .map((s) => SKILL_META[s.name])
    .filter(Boolean);

  return (
    <div className="min-h-screen px-6 md:px-16 py-12">
      <div className="max-w-3xl mx-auto w-full">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> All projects
          </Link>
        </motion.div>

        {/* Hero image */}
        {imageUrl && (
          <motion.div
            className="w-full h-52 md:h-80 relative rounded-xl overflow-hidden mb-8 md:mb-10"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </motion.div>
        )}

        {/* Title + featured badge */}
        <motion.div
          className="flex items-start gap-3 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-white flex-1 leading-tight">
            {project.title}
          </h1>
          {project.featured && (
            <span className="flex items-center gap-1 border border-amber-400/40 text-amber-400 rounded-full px-2.5 py-1 text-xs font-medium shrink-0 mt-1">
              <Star size={11} fill="currentColor" /> Featured
            </span>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        >
          {project.description}
        </motion.p>

        {/* Skills */}
        {tags.length > 0 && (
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Tech stack
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tags.map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-3 py-1.5"
                  whileHover={{
                    scale: 1.07,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon size={15} color={color} />
                  <span className="text-xs text-slate-300 whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
        >
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-white/15 text-slate-200 hover:bg-white/5 transition-colors"
            >
              <Code2 size={16} /> View Code
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-white/10 text-slate-500 cursor-not-allowed"
            >
              <Code2 size={16} /> View Code
            </button>
          )}

          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} /> Live Demo
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white/40 bg-purple-gradient opacity-40 cursor-not-allowed"
            >
              <ExternalLink size={16} /> Live Demo
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
