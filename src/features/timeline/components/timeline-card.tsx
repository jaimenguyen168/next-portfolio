"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import type { Milestone } from "../views/timeline-view";

const CATEGORY_COLORS: Record<string, string> = {
  work: "#818cf8",
  education: "#a78bfa",
  personal: "#34d399",
  project: "#60a5fa",
  achievement: "#f472b6",
};

const CATEGORY_LABELS: Record<string, string> = {
  work: "Work",
  education: "Education",
  personal: "Personal",
  project: "Project",
  achievement: "Achievement",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

type Props = { milestone: Milestone };

export default function TimelineCard({ milestone }: Props) {
  const [expanded, setExpanded] = useState(false);
  const color = CATEGORY_COLORS[milestone.category] ?? "#818cf8";
  const label = CATEGORY_LABELS[milestone.category] ?? milestone.category;
  const hasBody = Array.isArray(milestone.body) && milestone.body.length > 0;
  const hasExpandable = hasBody || !!milestone.excerpt;

  if (!milestone.highlighted) {
    return (
      <MinimalCard
        milestone={milestone}
        color={color}
        label={label}
        hasExpandable={hasExpandable}
        hasBody={hasBody}
        expanded={expanded}
        setExpanded={setExpanded}
      />
    );
  }

  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative rounded-2xl border border-white/8 overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, #0b1230 0%, ${color}0a 100%)`,
        boxShadow: `0 0 0 1px ${color}25, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      {milestone.image?.url && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={milestone.image.url}
            alt={milestone.image.alt ?? milestone.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 384px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b1230] via-[#0b1230]/20 to-transparent" />
        </div>
      )}

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              color,
              borderColor: `${color}40`,
              background: `${color}12`,
            }}
          >
            {label}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
            <Calendar size={9} className="text-muted-foreground" />
            {formatDate(milestone.date)}
            {milestone.endDate && (
              <>
                <span className="text-muted-foreground">→</span>
                {formatDate(milestone.endDate)}
              </>
            )}
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border ml-auto"
            style={{
              color,
              borderColor: `${color}30`,
              background: `${color}10`,
            }}
          >
            ⭐ Key moment
          </span>
        </div>

        <h2 className="font-bold text-white text-sm md:text-base leading-snug mb-1.5">
          {milestone.title}
        </h2>

        {milestone.location && (
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={10} className="text-muted-foreground shrink-0" />
            <span className="text-[10px] text-muted-foreground">
              {milestone.location}
            </span>
          </div>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground mb-3">
          {milestone.excerpt}
        </p>

        {hasBody && (
          <>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-[10px] font-semibold cursor-pointer transition-colors"
              style={{ color: `${color}bb` }}
              aria-expanded={expanded}
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Show less" : "Read more"}
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <PortableBody blocks={milestone.body as Block[]} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {milestone.tags && milestone.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/6">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/4 border border-white/[0.07] text-muted-foreground/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

type MinimalProps = {
  milestone: Milestone;
  color: string;
  label: string;
  hasExpandable: boolean;
  hasBody: boolean;
  expanded: boolean;
  setExpanded: (v: (prev: boolean) => boolean) => void;
};

function MinimalCard({
  milestone,
  color,
  label,
  hasExpandable,
  hasBody,
  expanded,
  setExpanded,
}: MinimalProps) {
  return (
    <motion.article
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      transition={{ duration: 0.2 }}
      className="relative rounded-xl border border-white/5 px-4 py-3 cursor-default"
      style={{ background: "transparent" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
              style={{
                color,
                borderColor: `${color}40`,
                background: `${color}12`,
              }}
            >
              {label}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Calendar size={9} className="text-muted-foreground" />
              {formatDate(milestone.date)}
              {milestone.endDate && (
                <>
                  <span className="text-muted-foreground">→</span>
                  {formatDate(milestone.endDate)}
                </>
              )}
            </span>
          </div>

          <h2 className="font-semibold text-white text-sm leading-snug">
            {milestone.title}
          </h2>

          {milestone.location && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={9} className="text-muted-foreground shrink-0" />
              <span className="text-[10px] text-muted-foreground">
                {milestone.location}
              </span>
            </div>
          )}
        </div>
      </div>

      {hasExpandable && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-2 text-[10px] font-semibold cursor-pointer transition-opacity hover:opacity-100 opacity-70"
            style={{ color }}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            {expanded ? "Show less" : "Read more"}
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-2 pt-2 border-t border-white/6 space-y-2">
                  {milestone.excerpt && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {milestone.excerpt}
                    </p>
                  )}
                  {hasBody && (
                    <PortableBody blocks={milestone.body as Block[]} dim />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.article>
  );
}

type Child = {
  _key: string;
  _type: string;
  text: string;
  marks?: string[];
};

type Block = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  children?: Child[];
};

function PortableBody({ blocks, dim }: { blocks: Block[]; dim?: boolean }) {
  const textColor = dim ? "text-muted-foreground" : "text-muted-foreground";
  const headingColor = "text-white/80";

  const rendered: React.ReactNode[] = [];
  let bulletBuffer: Block[] = [];

  function flushBullets() {
    if (!bulletBuffer.length) return;
    rendered.push(
      <ul key={`ul-${bulletBuffer[0]._key}`} className="space-y-1 mt-1">
        {bulletBuffer.map((b) => {
          const text = b.children?.map((c) => c.text).join("") ?? "";
          return (
            <li key={b._key} className={`flex items-start gap-2 text-xs leading-relaxed ${textColor}`}>
              <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0 opacity-50" />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
    );
    bulletBuffer = [];
  }

  for (const block of blocks) {
    if (block._type !== "block") continue;
    const text = block.children?.map((c) => c.text).join("") ?? "";
    if (!text.trim()) {
      flushBullets();
      continue;
    }

    if (block.listItem === "bullet") {
      bulletBuffer.push(block);
      continue;
    }

    flushBullets();

    if (block.style === "h3" || block.style === "h4") {
      rendered.push(
        <p key={block._key} className={`text-xs font-semibold mt-2 ${headingColor}`}>
          {text}
        </p>
      );
    } else {
      rendered.push(
        <p key={block._key} className={`text-xs leading-relaxed ${textColor}`}>
          {text}
        </p>
      );
    }
  }

  flushBullets();

  return <div className="mt-2 space-y-1.5">{rendered}</div>;
}
