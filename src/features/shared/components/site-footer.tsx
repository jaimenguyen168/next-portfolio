"use client";

import Link from "next/link";
import { Code2Icon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";

export default function SiteFooter() {
  return (
    <motion.footer
      className="w-full border-t border-white/10 px-6 md:px-12 py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-gradient">
            <Code2Icon size={16} className="text-white" />
          </div>
          <span className="text-white text-sm font-semibold">Jaime Nguyen</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blogs"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/timeline"
            className="text-xs text-muted-foreground hover:text-white transition-colors"
          >
            Timeline
          </Link>
        </div>

        <Link
          href="https://github.com/jaimenguyen168/NextJS-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View portfolio source code on GitHub"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
        >
          <SiGithub size={14} aria-hidden="true" /> Source
        </Link>
      </div>
    </motion.footer>
  );
}
