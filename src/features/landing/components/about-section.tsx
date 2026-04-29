"use client";

import { Palette, Scale, Wrench, Layers } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Palette,
    title: "UI / UX",
    description: "Clean, intuitive interfaces that are easy to use and actually make sense to the people using them.",
  },
  {
    icon: Scale,
    title: "Scalability",
    description: "Apps built with growth in mind — structured so adding features later doesn't mean rewriting everything.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Clean, readable code that's easy to come back to — whether that's next week or next year.",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Comfortable with Convex, Supabase, Clerk, Firebase, and Prisma — picking what fits the project, not just what's trending.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-5 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-6 gradient-text-blue">About Me</h2>
          <p className="text-xs md:text-base max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Frontend and mobile developer focused on building polished, production-ready products.
            I work across web and mobile, from Next.js apps to React Native and SwiftUI experiences,
            always reaching for the right tool to get things done properly.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card p-3 md:p-6 flex flex-col gap-2 md:gap-4 cursor-default hover:bg-white/[0.07]! hover:border-white/20! hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-icon-purple text-accent-light">
                <f.icon size={16} className="md:hidden" />
                <f.icon size={20} className="hidden md:block" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base mb-1 md:mb-2">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
