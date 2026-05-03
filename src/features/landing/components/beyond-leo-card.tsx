"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZodiacLeoIcon } from "lucide-react";

const NEON = "#f97316";
const NEON_BG = "rgba(249,115,22,0.08)";

type Props = {
  visible: boolean;
  position: { x: number; y: number };
  size: { w: number; h: number };
  onClose: () => void;
};

export function BeyondLeoCard({ visible, position, size, onClose }: Props) {
  return (
    <AnimatePresence>
      {visible && (() => {
        const POPOVER_W = 360;
        const POPOVER_H = 520;
        const PAD = 16;
        const isMobile = size.w < 640;

        const popLeft = isMobile
          ? size.w / 2 - Math.min(POPOVER_W, size.w - PAD * 2) / 2
          : (() => {
              const toRight = position.x + POPOVER_W + PAD + 20 < size.w;
              return toRight
                ? position.x + PAD + 12
                : position.x - POPOVER_W - PAD - 12;
            })();
        const popTop = isMobile
          ? size.h / 2 - POPOVER_H / 2
          : Math.min(
              Math.max(position.y - POPOVER_H / 2 + 160, PAD),
              size.h - POPOVER_H - PAD,
            );
        const popWidth = isMobile ? Math.min(POPOVER_W, size.w - PAD * 2) : POPOVER_W;
        const toRight = !isMobile && position.x + POPOVER_W + PAD + 20 < size.w;

        return (
          <motion.div
            key="leo-card"
            className="absolute z-30"
            style={{ left: popLeft, top: popTop, width: popWidth }}
            initial={{ opacity: 0, scale: 0.88, x: isMobile ? 0 : toRight ? -8 : 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div
              className="rounded-xl overflow-hidden flex flex-col relative"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: `${NEON}40`,
                background: "rgba(8,12,36,0.97)",
                boxShadow: `0 0 30px ${NEON}28`,
              }}
            >
              {/* Header area */}
              <div
                className="w-full relative flex flex-col items-center justify-center gap-3 py-8"
                style={{ height: 180, background: NEON_BG }}
              >
                {/* Grid lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  preserveAspectRatio="none"
                >
                  {[...Array(6)].map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={`${(i + 1) * 16.6}%`} y1="0"
                      x2={`${(i + 1) * 16.6}%`} y2="100%"
                      stroke={NEON} strokeWidth="0.5"
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0" y1={`${(i + 1) * 25}%`}
                      x2="100%" y2={`${(i + 1) * 25}%`}
                      stroke={NEON} strokeWidth="0.5"
                    />
                  ))}
                </svg>

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `${NEON}18`,
                    border: `1.5px solid ${NEON}50`,
                    boxShadow: `0 0 20px ${NEON}30`,
                  }}
                >
                  <ZodiacLeoIcon size={28} color={NEON} strokeWidth={1.5} />
                </div>

                {/* Pills */}
                <div className="relative z-10 flex gap-2">
                  {["Fire", "The Sun", "Jul 23 – Aug 22"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                      style={{
                        color: NEON,
                        background: `${NEON}14`,
                        border: `1px solid ${NEON}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(8,12,36,0.97) 0%, transparent 100%)",
                  }}
                />

                <span
                  className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: NEON, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  Leo ♌
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <button
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                  onClick={onClose}
                >
                  <X size={11} />
                </button>

                <h3 className="text-base font-bold text-white leading-snug">
                  The Lion of the Zodiac
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ruled by the Sun, Leo burns bright. Confident, generous, and magnetic by nature, Leos are built to lead — not from ego, but from a genuine desire to lift others up. They carry warmth wherever they go, and the people around them feel it.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Leo is a fixed sign, which means once committed, they don&apos;t waver. That same steadiness that makes them fiercely loyal can also make them resistant to change. But their passion is rarely performative — it comes from somewhere real.
                </p>

                {/* Strengths */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: NEON }}>
                    Strengths
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Loyal", "Courageous", "Generous", "Creative", "Warm-hearted", "Passionate"].map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-full text-slate-300"
                        style={{ background: `${NEON}10`, border: `1px solid ${NEON}25` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shadow side */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 text-slate-500">
                    Shadow side
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Stubborn", "Needs validation", "Dramatic", "Inflexible"].map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-full text-slate-400"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mantra */}
                <div
                  className="rounded-lg px-3 py-2 mt-1"
                  style={{ background: `${NEON}08`, border: `1px solid ${NEON}20` }}
                >
                  <p className="text-[11px] italic text-slate-400 leading-relaxed">
                    &ldquo;I will. I lead. I shine.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
}
