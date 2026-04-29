"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

export default function FloatingDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: Dot[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      dots = [];
      const count = Math.floor((canvas.width * canvas.height) / 50000);
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.15,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    let lastTime = 0;
    const INTERVAL = 1000 / 30; // cap at 30fps

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);
      if (document.hidden) return;
      if (time - lastTime < INTERVAL) return;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dots) {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x < -10) dot.x = canvas.width + 10;
        if (dot.x > canvas.width + 10) dot.x = -10;
        if (dot.y < -10) dot.y = canvas.height + 10;
        if (dot.y > canvas.height + 10) dot.y = -10;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${dot.opacity})`;
        ctx.fill();
      }
    };

    resize();
    createDots();
    animationId = requestAnimationFrame(draw);

    const handleResize = () => { resize(); createDots(); };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
