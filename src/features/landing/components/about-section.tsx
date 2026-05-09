"use client";

import { Palette, Scale, Wrench, Layers, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Palette,
    title: "UI / UX",
    description:
      "Clean, intuitive interfaces that are easy to use and actually make sense to the people using them.",
  },
  {
    icon: Scale,
    title: "Scalability",
    description:
      "Apps built with growth in mind — structured so adding features later doesn't mean rewriting everything.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Clean, readable code that's easy to come back to — whether that's next week or next year.",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description:
      "Comfortable with Convex, Supabase, Clerk, Firebase, and Prisma — picking what fits the project, not just what's trending.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-5 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Avatar */}
          <div className="shrink-0 w-24 h-28 md:w-36 md:h-44 rounded-full overflow-hidden border border-white/10 shadow-lg shadow-indigo-500/10">
            <Image
              src="/jaime-nguyen.jpg"
              alt="Jaime Nguyen"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 80px, 144px"
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 gradient-text-blue">
              About Me
            </h2>
            <p className="text-xs md:text-base max-w-2xl leading-relaxed text-muted-foreground mb-3">
              Frontend and mobile developer focused on building polished,
              production-ready products. I work across web and mobile, from
              Next.js apps to React Native and SwiftUI experiences, always
              reaching for the right tool to get things done properly.
            </p>
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-300/80">
                🎓 B.S. Computer Science · Temple University
              </span>
              <Link
                href="/timeline"
                className="group inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-muted-foreground hover:text-white"
              >
                <span>See my journey</span>
                <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        <div
          role="list"
          aria-label="Core strengths"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              role="listitem"
              aria-label={f.title}
              className="card p-3 md:p-6 flex flex-col gap-2 md:gap-4 cursor-default hover:bg-white/[0.07]! hover:border-white/20! hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeInOut" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-icon-purple text-accent-light">
                <f.icon size={16} className="md:hidden" />
                <f.icon size={20} className="hidden md:block" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base mb-1 md:mb-2">
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Eagles */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-6 md:mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/eagles.svg"
            alt="Philadelphia Eagles"
            width={36}
            height={36}
            className="w-8 h-8 md:w-9 md:h-9"
          />
          <span className="text-base md:text-xl font-extrabold tracking-widest uppercase gradient-text-green">
            Go Birds
          </span>
        </motion.div>
      </div>
    </section>
  );
}
