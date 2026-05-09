"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, Clock, Tag, X } from "lucide-react";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  coverImage?: { url: string; alt?: string } | null;
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
};

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  engineering: { label: "Engineering", color: "#818cf8" },
  career: { label: "Career", color: "#60a5fa" },
  personal: { label: "Personal", color: "#34d399" },
  tutorial: { label: "Tutorial", color: "#f472b6" },
  reflection: { label: "Reflection", color: "#a78bfa" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = { blogs: Blog[] };

export default function BlogsView({ blogs }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    const seen = new Set<string>();
    for (const b of blogs) {
      if (CATEGORY_META[b.category]) seen.add(b.category);
    }
    return [...seen];
  }, [blogs]);

  const filtered = useMemo(() => {
    if (!activeCategory) return blogs;
    return blogs.filter((b) => b.category === activeCategory);
  }, [blogs, activeCategory]);

  const featured = useMemo(() => filtered.filter((b) => b.featured), [filtered]);
  const rest = useMemo(() => filtered.filter((b) => !b.featured), [filtered]);

  if (!blogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No posts yet — add some in Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-16 py-18">
      <div className="max-w-5xl mx-auto w-full">

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
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-blue mb-2 md:mb-4">Blog</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Thoughts on engineering, career, and building things that matter.
          </p>
        </motion.div>

        <motion.div
          className="mb-6 md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-2">
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
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isActive ? meta.color : "currentColor" }}
                  />
                  {meta.label}
                  {isActive && <X size={11} className="ml-0.5 opacity-70" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {featured.length > 0 && (
              <div className="mb-8 md:mb-12">
                {featured.map((blog, i) => (
                  <FeaturedBlogCard key={blog._id} blog={blog} index={i} />
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {rest.map((blog, i) => (
                  <BlogCard key={blog._id} blog={blog} index={i} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <motion.p
                className="text-center text-sm text-muted-foreground py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No posts in this category yet.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeaturedBlogCard({ blog, index }: { blog: Blog; index: number }) {
  const meta = CATEGORY_META[blog.category];
  const color = meta?.color ?? "#818cf8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link href={`/blogs/${blog.slug}`} className="group block">
        <div
          className="relative rounded-2xl overflow-hidden border transition-all duration-300 group-hover:border-white/20"
          style={{ borderColor: `${color}30`, background: "rgba(255,255,255,0.02)" }}
        >
          {blog.coverImage?.url && (
            <div className="relative w-full h-56 md:h-80 overflow-hidden">
              <Image
                src={blog.coverImage.url}
                alt={blog.coverImage.alt ?? blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d2e] via-[#080d2e]/40 to-transparent" />
            </div>
          )}

          <div className={`p-5 md:p-7 ${!blog.coverImage?.url ? "pt-7" : ""}`}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
                style={{ color, borderColor: `${color}40`, background: `${color}15` }}
              >
                {meta?.label ?? blog.category}
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-accent-light/70 px-2.5 py-0.5 rounded-full border border-accent-light/20 bg-accent-light/5">
                Featured
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-light transition-colors duration-200">
              {blog.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(blog.publishedAt)}
              </span>
              {blog.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {blog.readingTime} min read
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const meta = CATEGORY_META[blog.category];
  const color = meta?.color ?? "#818cf8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
        <div
          className="h-full flex flex-col rounded-xl overflow-hidden border transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-0.5"
          style={{ borderColor: `${color}25`, background: "rgba(255,255,255,0.02)" }}
        >
          {blog.coverImage?.url && (
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src={blog.coverImage.url}
                alt={blog.coverImage.alt ?? blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d2e]/80 to-transparent" />
            </div>
          )}

          <div className="flex flex-col flex-1 p-4 md:p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border"
                style={{ color, borderColor: `${color}40`, background: `${color}15` }}
              >
                {meta?.label ?? blog.category}
              </span>
            </div>

            <h3 className="text-sm md:text-base font-bold text-white mb-1.5 group-hover:text-accent-light transition-colors duration-200 line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
              {blog.excerpt}
            </p>

            <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60 mt-auto">
              <span className="flex items-center gap-1">
                <Calendar size={10} />
                {formatDate(blog.publishedAt)}
              </span>
              {blog.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {blog.readingTime} min
                </span>
              )}
              {blog.tags && blog.tags.length > 0 && (
                <span className="flex items-center gap-1 ml-auto">
                  <Tag size={10} />
                  {blog.tags[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
