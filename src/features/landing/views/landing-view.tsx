"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import SiteFooter from "@/features/shared/components/site-footer";
import type { Project } from "../components/projects-section";

const AboutSection = dynamic(() => import("../components/about-section"));
const ValuesSection = dynamic(() => import("../components/beyond-section"));
const SkillsSection = dynamic(() => import("../components/skills-section"));
const ProjectsSection = dynamic(() => import("../components/projects-section"));
const ContactSection = dynamic(() => import("../components/contact-section"));

type BeyondItem = {
  _id: string;
  order: number;
  label: string;
  title: string;
  body: string;
  images?: Array<{ asset?: { url: string }; hotspot?: unknown }>;
  imageTags?: string[];
};

type Props = {
  activeSkills: string[];
  projects: Project[];
  resumeUrl: string | null;
  beyondItems?: BeyondItem[];
};

export default function LandingView({
  activeSkills,
  projects,
  resumeUrl,
  beyondItems,
}: Props) {
  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "beyond",
      "skills",
      "projects",
      "contact",
    ];

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
        { root: main, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <main className="h-screen overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ValuesSection beyondItems={beyondItems} />
        <SkillsSection activeSkills={activeSkills} />
        <ProjectsSection projects={projects} />
        <ContactSection />
        <SiteFooter />
      </main>
    </>
  );
}
