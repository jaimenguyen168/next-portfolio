"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import type { Project } from "../components/projects-section";

const AboutSection    = dynamic(() => import("../components/about-section"));
const SkillsSection   = dynamic(() => import("../components/skills-section"));
const ProjectsSection = dynamic(() => import("../components/projects-section"));
const ContactSection  = dynamic(() => import("../components/contact-section"));

type Props = {
  activeSkills: string[];
  projects: Project[];
  resumeUrl: string | null;
};

export default function LandingView({ activeSkills, projects, resumeUrl }: Props) {
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "contact"];

    const main = document.querySelector("main");

    const observers = sectionIds.map((id) => {
      const el = document.querySelector(`#${id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const hash = id === "hero" ? "/" : `#${id}`;
            window.history.replaceState(null, "", hash);
          }
        },
        { root: main, threshold: 0.1 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection activeSkills={activeSkills} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </>
  );
}
