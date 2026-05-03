"use client";

import { motion } from "framer-motion";

export type RocketState =
  | "offscreen"
  | "entering"
  | "home"
  | "flying"
  | "landed"
  | "recalling";

type Props = {
  rocketState: RocketState;
  rocketPos: { x: number; y: number };
  recallPath: { x: number[]; y: number[] };
  sizeW: number;
  sizeH: number;
  onAnimationComplete: () => void;
};

export function BeyondRocket({
  rocketState,
  rocketPos,
  recallPath,
  sizeW,
  sizeH,
  onAnimationComplete,
}: Props) {
  return (
    <motion.g
      animate={(() => {
        if (rocketState === "offscreen") return { x: -200, y: 0 };
        if (rocketState === "entering")
          return { x: [-60, -20, 0], y: [sizeH * 0.4, sizeH * 0.1, 0] };
        if (rocketState === "flying")
          return { x: rocketPos.x - 20, y: rocketPos.y - (sizeH - 74) };
        if (rocketState === "recalling")
          return { x: recallPath.x, y: recallPath.y };
        const baseX = rocketState === "home" ? 0 : rocketPos.x - 20;
        const baseY = rocketState === "home" ? 0 : rocketPos.y - (sizeH - 74);
        return { x: baseX, y: [baseY, baseY - 10, baseY] };
      })()}
      transition={(() => {
        if (rocketState === "offscreen") return { duration: 0 };
        if (rocketState === "entering")
          return {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.5, 1],
          };
        if (rocketState === "home" && rocketPos.x === 20)
          return {
            x: { duration: 0.7, ease: "easeOut" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          };
        if (rocketState === "flying")
          return { duration: 0.8, ease: "easeInOut" };
        if (rocketState === "recalling")
          return { duration: 1.4, ease: "easeInOut" };
        return { duration: 2, repeat: Infinity, ease: "easeInOut" };
      })()}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.image
        href="/rocket.svg"
        x={40}
        y={sizeH - 180}
        animate={{
          width:
            rocketState === "home" || rocketState === "recalling" || rocketState === "entering" ? 80 : 36,
          height:
            rocketState === "home" || rocketState === "recalling" || rocketState === "entering" ? 80 : 36,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.9))" }}
      />
      {rocketState === "home" && (
        <foreignObject x={20} y={sizeH - 230} width={150} height={82}>
          <div
            className="relative rounded-[10px] px-2.5 py-1.5 text-[11px] text-white leading-[1.4]"
            style={{
              background: "rgba(20,16,50,0.92)",
              border: "1px solid rgba(167,139,250,0.4)",
              boxShadow: "0 0 12px rgba(167,139,250,0.2)",
            }}
          >
            Let&apos;s travel to each planet to explore! 🚀
          </div>
        </foreignObject>
      )}
    </motion.g>
  );
}
