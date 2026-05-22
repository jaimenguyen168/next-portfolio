"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { SKILL_META } from "@/sanity/constants/skillMeta";
import SimpleIcon from "@/components/simple-icon";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

export type Project = {
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

const MAX_VISIBLE_BADGES = 3;

type Props = {
  project: Project;
  index: number;
  variant?: "landing" | "page";
};

export default function ProjectCard({
  project,
  index,
  variant = "landing",
}: Props) {
  const router = useRouter();

  const imageUrl = project.image
    ? urlFor(project.image).width(800).height(500).fit("crop").url()
    : null;

  const tags = (project.skills ?? [])
    .map((s) => SKILL_META[s.name])
    .filter(Boolean);

  const visibleTags = tags.slice(0, MAX_VISIBLE_BADGES);
  const extraCount = tags.length - MAX_VISIBLE_BADGES;

  const animationProps =
    variant === "landing"
      ? ({
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: false },
          transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
        } as const)
      : ({
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: index * 0.07, ease: "easeOut" },
        } as const);

  return (
    <motion.div
      className="card overflow-hidden flex flex-col cursor-pointer"
      {...animationProps}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={() => project.slug && router.push(`/projects/${project.slug}`)}
      role="article"
      aria-label={project.title}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && project.slug && router.push(`/projects/${project.slug}`)}
    >
      {/* Image */}
      <div className="overflow-hidden h-28 md:h-48 shrink-0 relative">
        <motion.div
          className="w-full h-full relative"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 400px"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-card-subtle opacity-60">
              <ImageIcon size={22} />
              <span className="text-white text-xs hidden md:block">
                Project Image
              </span>
            </div>
          )}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-amber-400/40 text-amber-400 rounded-full px-2 py-0.5 text-[10px] font-medium">
            <Star size={9} fill="currentColor" /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3 flex-1">
        <h3 className="font-semibold text-white text-xs md:text-base leading-tight">
          {project.title}
        </h3>

        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Skill badges */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 md:gap-2 overflow-hidden">
            {visibleTags.map(({ iconSlug, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-1 md:gap-1.5 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 md:px-3 md:py-1 shrink-0"
              >
                <SimpleIcon slug={iconSlug} color={color} size={12} label={label} />
                <span className="text-xs text-slate-300 hidden md:inline whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
            {extraCount > 0 && (
              <span className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 md:px-2.5 md:py-1 shrink-0 whitespace-nowrap">
                +{extraCount}
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium border border-white/15 text-slate-200 bg-transparent hover:bg-white/5 transition-colors"
            >
              <Code2 size={14} aria-hidden="true" /> <span className="hidden md:inline">Code</span>
            </Link>
          ) : (
            <button
              disabled
              aria-label={`Source code for ${project.title} is not available`}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium border border-white/10 text-slate-500 bg-transparent cursor-not-allowed"
            >
              <Code2 size={14} aria-hidden="true" /> <span className="hidden md:inline">Code</span>
            </button>
          )}

          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={14} aria-hidden="true" />{" "}
              <span className="hidden md:inline">Demo</span>
            </Link>
          ) : (
            <button
              disabled
              aria-label={`Live demo for ${project.title} is not available`}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium text-white/40 bg-purple-gradient opacity-40 cursor-not-allowed"
            >
              <ExternalLink size={14} aria-hidden="true" />{" "}
              <span className="hidden md:inline">Demo</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
