import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/queries/skillQueries";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";

export default async function Home() {
  const [{ data: rawSkills }, { data: projects }] = await Promise.all([
    sanityFetch({ query: SKILLS_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
  ]);

  const activeSkills: string[] = (rawSkills ?? []).map(
    (s: { name: string }) => s.name
  );

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection activeSkills={activeSkills} />
        <ProjectsSection projects={projects ?? []} />
        <ContactSection />
      </main>
    </>
  );
}
