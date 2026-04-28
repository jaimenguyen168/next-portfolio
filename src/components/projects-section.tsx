"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, ImageIcon } from "lucide-react";
import {
  SiNextdotjs, SiExpo, SiReact, SiSupabase, SiPrisma, SiFirebase, SiStripe,
} from "react-icons/si";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce with real-time inventory, payments, and admin dashboard.",
    tags: [
      { label: "Next.js",  icon: SiNextdotjs, color: "#ffffff" },
      { label: "Stripe",   icon: SiStripe,    color: "#635bff" },
    ],
  },
  {
    title: "Real-Time Chat App",
    description: "Chat app with rooms, direct messaging, typing indicators, and file sharing.",
    tags: [
      { label: "React Native", icon: SiReact, color: "#61dafb" },
      { label: "Expo",         icon: SiExpo,  color: "#f59e0b" },
    ],
  },
  {
    title: "Project Management Tool",
    description: "Collaborative kanban boards with task assignment and real-time updates.",
    tags: [
      { label: "Next.js",  icon: SiNextdotjs, color: "#ffffff" },
      { label: "Supabase", icon: SiSupabase,  color: "#3ecf8e" },
      { label: "Prisma",   icon: SiPrisma,    color: "#ffffff" },
    ],
  },
  {
    title: "Social Media Analytics",
    description: "Analytics dashboard with data visualization and automated reporting.",
    tags: [
      { label: "React",    icon: SiReact,    color: "#61dafb" },
      { label: "Firebase", icon: SiFirebase, color: "#ffca28" },
    ],
  },
];


export default function ProjectsSection() {
  return (
    <section id="projects" className="section-full px-4 md:px-16 py-6 md:py-24">
      <div className="max-w-5xl mx-auto w-full">

        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4 gradient-text-blue">Featured Projects</h2>
          <p className="text-xs md:text-base text-muted-foreground">
            A selection of projects showcasing my expertise in web and mobile development
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="card overflow-hidden flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <motion.div
                  className="w-full h-16 md:h-36 flex flex-col items-center justify-center gap-1 bg-card-subtle opacity-60"
                  whileHover={{ scale: 1.07, transition: { duration: 0.35, ease: "easeOut" } }}
                >
                  <ImageIcon size={22} />
                  <span className="text-white text-xs hidden md:block">Project Image</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3 flex-1">
                <h3 className="font-semibold text-white text-xs md:text-base leading-tight">{project.title}</h3>
                <p className="text-xs leading-relaxed flex-1 text-muted-foreground">{project.description}</p>

                {/* Tags: icon only on mobile, icon + name on desktop */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.map(({ label, icon: Icon, color }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-1.5 py-1 md:px-3 md:py-1"
                    >
                      <Icon size={13} color={color} />
                      <span className="text-xs text-slate-300 hidden md:inline">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-1">
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium border border-white/15 text-slate-200 bg-transparent hover:bg-white/5 transition-colors">
                    <Code2 size={14} /> <span className="hidden md:inline">Code</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 md:py-2.5 rounded-lg text-xs font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity">
                    <ExternalLink size={14} /> <span className="hidden md:inline">Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
