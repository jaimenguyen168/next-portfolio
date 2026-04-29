"use client";

import Link from "next/link";
import { Code2Icon } from "lucide-react";
import ResumeButton from "@/features/shared/components/resume-button";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  resumeUrl: string | null;
};

export default function ProjectsHeader({ resumeUrl }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    const target = main ?? window;
    const getScrollTop = () =>
      target instanceof Element ? target.scrollTop : window.scrollY;
    const onScroll = () => setScrolled(getScrollTop() > 20);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,13,46,0.85)] backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-gradient">
          <Code2Icon size={18} className="text-white" />
        </div>
        <span className="text-white font-semibold text-base">Jaime Dev</span>
      </Link>

      <ResumeButton resumeUrl={resumeUrl} />
    </motion.nav>
  );
}
