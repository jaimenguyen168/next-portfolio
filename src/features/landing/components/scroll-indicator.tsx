"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const scrollY = useMotionValue(0);
  const opacity = useTransform(scrollY, [0, 80], [0.4, 0]);

  useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const onScroll = () => scrollY.set(scroller.scrollTop);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  return (
    <motion.div
      style={{ opacity }}
      animate={{ y: [0, 16, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      className="absolute bottom-16 z-10 flex flex-col items-center gap-1"
      aria-hidden="true"
    >
      <div className="w-5 h-8 rounded-full border border-white flex items-start justify-center p-1">
        <div className="w-1 h-2 rounded-full bg-white" />
      </div>
    </motion.div>
  );
}
