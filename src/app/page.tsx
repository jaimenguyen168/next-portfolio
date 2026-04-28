import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/queries/skillQueries";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import LandingView from "../features/landing/views/landing-view";

export default async function Home() {
  const [{ data: rawSkills }, { data: projects }] = await Promise.all([
    sanityFetch({ query: SKILLS_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
  ]);

  const activeSkills: string[] = (rawSkills ?? []).map(
    (s: { name: string }) => s.name,
  );

  return <LandingView activeSkills={activeSkills} projects={projects ?? []} />;
}
