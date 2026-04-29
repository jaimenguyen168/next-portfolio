"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Star, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SKILL_META } from "@/sanity/constants/skillMeta";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type FeatureItem = {
  title: string;
  description?: string;
};

export type ProjectDetail = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  image?: SanityImage;
  images?: SanityImage[];
  featured?: boolean;
  skills: { name: string }[];
  githubUrl?: string;
  demoUrl?: string;
  features?: FeatureItem[];
  upcomingFeatures?: FeatureItem[];
};

type Props = {
  project: ProjectDetail;
};

export default function ProjectDetailsView({ project }: Props) {
  const imageUrl = project.image
    ? urlFor(project.image).width(1200).height(600).fit("crop").url()
    : null;

  const extraImageUrls = (project.images ?? []).map((img) =>
    urlFor(img).width(1200).height(600).fit("crop").url()
  );

  const tags = (project.skills ?? [])
    .map((s) => SKILL_META[s.name])
    .filter(Boolean);

  return (
    <div className="min-h-screen px-4 md:px-16 py-18">
      <div className="max-w-5xl mx-auto w-full">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <Link
            href="/projects"
            aria-label="Back to all projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={15} aria-hidden="true" /> All projects
          </Link>
        </motion.div>

        {/* Hero image */}
        {imageUrl && (
          <motion.div
            className="w-full h-64 md:h-120 relative rounded-xl overflow-hidden mb-8 md:mb-10"
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
          className="flex gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
        >
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-white/15 text-slate-200 hover:bg-white/5 transition-colors"
            >
              <Code2 size={16} aria-hidden="true" /> View Code
            </Link>
          ) : (
            <button
              disabled
              aria-label="Source code not available"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-white/10 text-slate-500 cursor-not-allowed"
            >
              <Code2 size={16} aria-hidden="true" /> View Code
            </button>
          )}

          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} aria-hidden="true" /> Live Demo
            </Link>
          ) : (
            <button
              disabled
              aria-label="Live demo not available"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white/40 bg-purple-gradient opacity-40 cursor-not-allowed"
            >
              <ExternalLink size={16} aria-hidden="true" /> Live Demo
            </button>
          )}
        </motion.div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Features
            </p>
            <div className="flex flex-col gap-3">
              {project.features.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 card p-3 md:p-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.32 + i * 0.07, ease: "easeOut" }}
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    {f.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Upcoming Features */}
        {project.upcomingFeatures && project.upcomingFeatures.length > 0 && (
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Coming Soon
            </p>
            <div className="flex flex-col gap-3">
              {project.upcomingFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 card p-3 md:p-4 opacity-70"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.37 + i * 0.07, ease: "easeOut" }}
                >
                  <Clock size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    {f.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Additional images */}
        {extraImageUrls.length > 0 && (
          <motion.div
            className="mb-10 md:mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Screenshots
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {extraImageUrls.map((url, i) => (
                <motion.div
                  key={i}
                  className="w-full aspect-video relative rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.42 + i * 0.08, ease: "easeOut" }}
                >
                  <Image
                    src={url}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
