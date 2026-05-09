"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Star, Rocket, Trophy } from "lucide-react";
import Image from "next/image";
import type { Milestone } from "../views/timeline-view";

const CATEGORY_COLORS: Record<string, string> = {
  work: "#818cf8",
  education: "#a78bfa",
  personal: "#34d399",
  project: "#60a5fa",
  achievement: "#f472b6",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  work: Briefcase,
  education: GraduationCap,
  personal: Star,
  project: Rocket,
  achievement: Trophy,
};

type Props = {
  milestone: Milestone;
  inView: boolean;
  index: number;
};

export default function TimelineConnector({ milestone, inView, index }: Props) {
  const color = CATEGORY_COLORS[milestone.category] ?? "#818cf8";
  const Icon = CATEGORY_ICONS[milestone.category] ?? Star;
  const logoUrl = milestone.logo?.url;

  console.log("logoUrl", logoUrl);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.05 + 0.1,
        type: "spring",
        stiffness: 200,
      }}
      className="relative flex items-center justify-center"
    >
      {milestone.highlighted && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 64,
            height: 64,
            background: `${color}20`,
            border: `1px solid ${color}40`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        className="size-10 rounded-full flex items-center justify-center border-2 shadow-lg overflow-hidden p-0.5"
        style={{
          background: logoUrl ? "#0b1230" : `${color}18`,
          borderColor: `${color}60`,
          boxShadow: milestone.highlighted
            ? `0 0 18px ${color}50`
            : `0 0 8px ${color}30`,
        }}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={milestone.title}
            width={28}
            height={28}
            className="size-full object-contain p-0.5"
          />
        ) : (
          <Icon size={20} style={{ color }} />
        )}
      </div>
    </motion.div>
  );
}
