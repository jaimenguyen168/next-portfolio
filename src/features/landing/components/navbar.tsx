"use client";

import { Code2Icon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResumeButton from "@/features/shared/components/resume-button";

const links = ["About", "Skills", "Projects", "Contact"];

// Scroll the snap container (<main>) to a section by id
function scrollToSection(id: string) {
  const main = document.querySelector("main");
  const target = document.querySelector(id);
  if (!main || !target) return;
  main.scrollTo({ top: (target as HTMLElement).offsetTop, behavior: "smooth" });
  // Update the URL hash without triggering a navigation
  window.history.replaceState(null, "", id);
}

type Props = {
  resumeUrl: string | null;
};

export default function Navbar({ resumeUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Blur when hero leaves viewport
  useEffect(() => {
    const hero = document.querySelector("#hero");
    const main = document.querySelector("main");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { root: main, threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // On refresh, scroll <main> to whatever section is in the hash
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Wait one frame for the DOM to be ready
    requestAnimationFrame(() => scrollToSection(hash));
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 ${
          scrolled ? "bg-[rgba(8,13,46,0.85)] backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo — scrolls back to hero */}
        <button
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-gradient">
            <Code2Icon size={18} className="text-white" />
          </div>
          <span className="text-white font-semibold text-base">Jaime Nguyen</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
              className="text-base font-semibold nav-link"
            >
              {link}
            </a>
          ))}
          <ResumeButton resumeUrl={resumeUrl} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/90 hover:text-white transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-64 flex flex-col pt-24 pb-8 px-6 gap-2 md:hidden"
              style={{ background: "rgba(8, 13, 46, 0.98)" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                    className="text-lg font-semibold nav-link py-3 border-b border-white/10 block"
                  >
                    {link}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <ResumeButton
                  resumeUrl={resumeUrl}
                  className="mt-4 w-full justify-center py-3"
                  onAfterClick={() => setOpen(false)}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
