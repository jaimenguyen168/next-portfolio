"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
  accentColor: string;
};

export function ImageCarousel({ images, accentColor }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-2 right-3 flex gap-1 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i === current ? accentColor : "rgba(255,255,255,0.35)",
              boxShadow: i === current ? `0 0 6px ${accentColor}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
