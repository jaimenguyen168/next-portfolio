import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/queries/skillQueries";

export default async function Home() {
  const { data: rawSkills } = await sanityFetch({ query: SKILLS_QUERY });

  // Pass only serialisable strings — icons are resolved on the client
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
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
