import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/queries/skillQueries";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import { RESUME_QUERY } from "@/sanity/queries/resumeQueries";
import LandingView from "../features/landing/views/landing-view";

export const metadata: Metadata = {
  title: "Jaime Nguyen | Frontend & Mobile Developer",
  description:
    "Frontend and mobile developer specialising in Next.js, React Native, Expo, and SwiftUI. I build polished, production-ready web and mobile apps.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Jaime Nguyen | Frontend & Mobile Developer",
    description:
      "Frontend and mobile developer specialising in Next.js, React Native, Expo, and SwiftUI.",
  },
};

export default async function Home() {
  const [{ data: rawSkills }, { data: projects }, { data: resume }] = await Promise.all([
    sanityFetch({ query: SKILLS_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
    sanityFetch({ query: RESUME_QUERY }),
  ]);

  const activeSkills: string[] = (rawSkills ?? []).map(
    (s: { name: string }) => s.name,
  );

  return (
    <LandingView
      activeSkills={activeSkills}
      projects={projects ?? []}
      resumeUrl={resume?.url ?? null}
    />
  );
}
