"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  engineering: { label: "Engineering", color: "#818cf8" },
  career: { label: "Career", color: "#60a5fa" },
  personal: { label: "Personal", color: "#34d399" },
  tutorial: { label: "Tutorial", color: "#f472b6" },
  reflection: { label: "Reflection", color: "#a78bfa" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type BodyBlock =
  | {
      _type: "block";
      _key: string;
      style?: string;
      listItem?: string;
      children?: Array<{ text?: string; marks?: string[]; _key: string }>;
      markDefs?: Array<{
        _key: string;
        _type: string;
        href?: string;
        blank?: boolean;
      }>;
    }
  | {
      _type: "image";
      _key: string;
      url?: string;
      alt?: string;
      caption?: string;
    }
  | { _type: "codeBlock"; _key: string; language?: string; code?: string };

export type BlogDetail = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  coverImage?: { url: string; alt?: string } | null;
  body?: BodyBlock[];
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
};

type Props = { blog: BlogDetail };

export default function BlogDetailView({ blog }: Props) {
  const meta = CATEGORY_META[blog.category];
  const color = meta?.color ?? "#818cf8";

  return (
    <div className="min-h-screen px-4 md:px-16 py-18">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> All posts
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                color,
                borderColor: `${color}40`,
                background: `${color}15`,
              }}
            >
              {meta?.label ?? blog.category}
            </span>
            {blog.featured && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-accent-light/70 px-2.5 py-0.5 rounded-full border border-accent-light/20 bg-accent-light/5">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/70 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(blog.publishedAt)}
            </span>
            {blog.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {blog.readingTime} min read
              </span>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400"
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {blog.coverImage?.url && (
          <motion.div
            className="relative w-full h-52 md:h-96 rounded-xl overflow-hidden mb-10"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <Image
              src={blog.coverImage.url}
              alt={blog.coverImage.alt ?? blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d2e]/60 to-transparent" />
          </motion.div>
        )}

        {blog.body && blog.body.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="prose-blog"
          >
            <PortableBody blocks={blog.body} />
          </motion.div>
        )}

        <motion.div
          className="mt-14 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function PortableBody({ blocks }: { blocks: BodyBlock[] }) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block._type === "block" && block.listItem === "bullet") {
      const items: BodyBlock[] = [];
      while (i < blocks.length) {
        const b = blocks[i];
        if (b._type === "block" && b.listItem === "bullet") {
          items.push(b);
          i++;
        } else {
          break;
        }
      }
      elements.push(
        <ul key={`ul-${items[0]._key}`} className="blog-list">
          {items.map((item) => (
            <li key={item._key} className="blog-list-item">
              <InlineChildren
                block={item as Extract<BodyBlock, { _type: "block" }>}
              />
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (block._type === "block") {
      elements.push(<BlockRenderer key={block._key} block={block} />);
    } else if (block._type === "image") {
      elements.push(<InlineImage key={block._key} block={block} />);
    } else if (block._type === "codeBlock") {
      elements.push(<CodeBlockRenderer key={block._key} block={block} />);
    }

    i++;
  }

  return <>{elements}</>;
}

function BlockRenderer({
  block,
}: {
  block: Extract<BodyBlock, { _type: "block" }>;
}) {
  const content = <InlineChildren block={block} />;

  switch (block.style) {
    case "h2":
      return <h2 className="blog-h2">{content}</h2>;
    case "h3":
      return <h3 className="blog-h3">{content}</h3>;
    case "h4":
      return <h4 className="blog-h4">{content}</h4>;
    case "blockquote":
      return <blockquote className="blog-blockquote">{content}</blockquote>;
    default:
      return <p className="blog-p">{content}</p>;
  }
}

function InlineChildren({
  block,
}: {
  block: Extract<BodyBlock, { _type: "block" }>;
}) {
  const markDefs = block.markDefs ?? [];

  return (
    <>
      {(block.children ?? []).map((child) => {
        let node: React.ReactNode = child.text ?? "";
        const marks = child.marks ?? [];

        for (const mark of marks) {
          const def = markDefs.find((d) => d._key === mark);
          if (def?._type === "link") {
            node = (
              <a
                key={`link-${child._key}`}
                href={def.href}
                target={def.blank ? "_blank" : undefined}
                rel={def.blank ? "noopener noreferrer" : undefined}
                className="blog-link"
              >
                {node}
              </a>
            );
          } else if (mark === "strong") {
            node = (
              <strong
                key={`strong-${child._key}`}
                className="text-white font-semibold"
              >
                {node}
              </strong>
            );
          } else if (mark === "em") {
            node = <em key={`em-${child._key}`}>{node}</em>;
          } else if (mark === "underline") {
            node = <u key={`u-${child._key}`}>{node}</u>;
          } else if (mark === "code") {
            node = (
              <code key={`code-${child._key}`} className="blog-inline-code">
                {node}
              </code>
            );
          }
        }

        return <span key={child._key}>{node}</span>;
      })}
    </>
  );
}

function InlineImage({
  block,
}: {
  block: Extract<BodyBlock, { _type: "image" }>;
}) {
  if (!block.url) return null;
  return (
    <figure className="my-8 md:my-10">
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={block.url}
          alt={block.alt ?? ""}
          fill
          className="object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground/60 italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function CodeBlockRenderer({
  block,
}: {
  block: Extract<BodyBlock, { _type: "codeBlock" }>;
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/10">
      {block.language && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-muted-foreground font-mono">
          {block.language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed bg-white/[0.03]">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
