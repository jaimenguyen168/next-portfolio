"use client";

import { useEffect } from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import AboutSection from "../components/about-section";
import SkillsSection from "../components/skills-section";
import ProjectsSection from "../components/projects-section";
import ContactSection from "../components/contact-section";
import type { Project } from "../components/projects-section";

type Props = {
  activeSkills: string[];
  projects: Project[];
  resumeUrl: string | null;
};

export default function LandingView({ activeSkills, projects, resumeUrl }: Props) {
  // Keep the URL hash in sync with whichever section is most visible,
  // so refreshing the page returns to the same section.
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "contact"];

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
        { threshold: 0.5 }
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
