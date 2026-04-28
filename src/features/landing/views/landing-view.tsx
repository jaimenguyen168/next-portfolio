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
};

export default function LandingView({ activeSkills, projects }: Props) {
  return (
    <>
      <Navbar />
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
