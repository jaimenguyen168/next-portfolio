"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type ValueDef } from "../constants/beyondDefaults";
import { ImageCarousel } from "./beyond-image-carousel";

type Props = {
  active: { value: ValueDef; x: number; y: number } | null;
  showCard: boolean;
  size: { w: number; h: number };
  onClose: () => void;
  onDismiss: () => void;
};

export function BeyondPlanetCard({ active, showCard, size, onClose, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {active &&
        showCard &&
        (() => {
          const POPOVER_W = 380;
          const POPOVER_H = 400;
          const PAD = 16;
          const isMobile = size.w < 640;

          const popLeft = isMobile
            ? size.w / 2 - Math.min(POPOVER_W, size.w - PAD * 2) / 2
            : (() => {
                const toRight = active.x + POPOVER_W + PAD + 20 < size.w;
                return toRight
                  ? active.x + PAD + 12
                  : active.x - POPOVER_W - PAD - 12;
              })();
          const popTop = isMobile
            ? size.h / 2 - POPOVER_H / 2
            : Math.min(
                Math.max(active.y - POPOVER_H / 2, PAD),
                size.h - POPOVER_H - PAD,
              );
          const popWidth = isMobile ? Math.min(POPOVER_W, size.w - PAD * 2) : POPOVER_W;
          const toRight = !isMobile && active.x + POPOVER_W + PAD + 20 < size.w;

          return (
            <>
              <div className="absolute inset-0 z-20" onClick={onDismiss} />
              <motion.div
                key={active.value.id}
                className="absolute z-30"
                style={{ left: popLeft, top: popTop, width: popWidth }}
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  x: isMobile ? 0 : toRight ? -8 : 8,
                }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div
                  className="rounded-xl overflow-hidden flex flex-col relative"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: `${active.value.accentColor}40`,
                    background: "rgba(8,12,36,0.97)",
                    boxShadow: `0 0 30px ${active.value.accentColor}28`,
                  }}
                >
                  {/* Image area */}
                  <div
                    className="w-full relative overflow-hidden"
                    style={{ height: 216, background: active.value.accentBg }}
                  >
                    {active.value.images && active.value.images.length > 0 ? (
                      (() => {
                        const imgs = active.value.images!;
                        if (imgs.length === 1) {
                          return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imgs[0]}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          );
                        }
                        return (
                          <ImageCarousel
                            images={imgs}
                            accentColor={active.value.accentColor}
                          />
                        );
                      })()
                    ) : (
                      <>
                        <svg
                          className="absolute inset-0 w-full h-full opacity-20"
                          preserveAspectRatio="none"
                        >
                          {[...Array(6)].map((_, i) => (
                            <line
                              key={`v${i}`}
                              x1={`${(i + 1) * 16.6}%`}
                              y1="0"
                              x2={`${(i + 1) * 16.6}%`}
                              y2="100%"
                              stroke={active.value.accentColor}
                              strokeWidth="0.5"
                            />
                          ))}
                          {[...Array(4)].map((_, i) => (
                            <line
                              key={`h${i}`}
                              x1="0"
                              y1={`${(i + 1) * 25}%`}
                              x2="100%"
                              y2={`${(i + 1) * 25}%`}
                              stroke={active.value.accentColor}
                              strokeWidth="0.5"
                            />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{
                              background: `${active.value.accentColor}30`,
                              border: `2px solid ${active.value.accentColor}60`,
                              boxShadow: `0 0 20px ${active.value.accentColor}40`,
                            }}
                          >
                            <svg width="28" height="28" viewBox="0 0 28 28">
                              <circle
                                cx="14"
                                cy="14"
                                r="12"
                                fill={active.value.accentColor}
                                opacity="0.9"
                              />
                              <circle cx="10" cy="11" r="4" fill="white" opacity="0.15" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                    <div
                      className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,12,36,0.92) 0%, transparent 100%)",
                      }}
                    />
                    <span
                      className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-widest z-20"
                      style={{
                        color: active.value.accentColor,
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {active.value.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <button
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                      onClick={onClose}
                    >
                      <X size={11} />
                    </button>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {active.value.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {active.value.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
    </AnimatePresence>
  );
}
