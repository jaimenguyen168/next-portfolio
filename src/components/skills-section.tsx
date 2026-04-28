"use client";

import { motion } from "framer-motion";
import { SKILL_META } from "@/sanity/constants/skillMeta";
import { SKILL_CATEGORIES } from "@/sanity/constants/skillCategories";

type Props = {
  activeSkills: string[];
};

export default function SkillsSection({ activeSkills }: Props) {
  const activeSet = new Set(activeSkills);

  const categories = SKILL_CATEGORIES.map((cat) => ({
    title: cat.title,
    accentClass: cat.accentClass,
    skills: cat.skills
      .filter((value) => activeSet.has(value))
      .map((value) => SKILL_META[value])
      .filter(Boolean),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">

        {/* Heading drops down */}
        <motion.div
          className="text-center mb-6 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 gradient-text-blue">Technical Skills</h2>
          <p className="text-xs md:text-base text-muted-foreground">
            My toolkit for building modern web and mobile applications
          </p>
        </motion.div>

        {/* Cards zoom out */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="card p-3 md:p-7"
              initial={{ opacity: 0, scale: 1.15 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className={`h-0.5 w-6 md:w-8 rounded-full ${cat.accentClass}`} />
                <h3 className="font-semibold text-white text-sm md:text-lg">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {cat.skills.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-2 py-1 md:px-3 md:py-1.5"
                  >
                    <Icon size={14} color={color} className="md:hidden" />
                    <Icon size={16} color={color} className="hidden md:block" />
                    <span className="text-xs text-slate-300 whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
