import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/queries/skillQueries";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import { RESUME_QUERY } from "@/sanity/queries/resumeQueries";
import { BEYOND_ITEMS_QUERY } from "@/sanity/queries/beyondQueries";
import LandingView from "../features/landing/views/landing-view";

const BASE_URL = "https://jaimenguyen.com";

export const metadata: Metadata = {
  title: "Jaime Nguyen | Frontend & Mobile Developer",
  description:
    "Jaime Nguyen is a frontend and mobile developer from Temple University specialising in Next.js, React Native, Expo, and SwiftUI. Creator of Clover, Tab or not to Tab, PersuAI, and NextFrame.",
  alternates: { canonical: "/" },
  keywords: [
    "Jaime Nguyen",
    "Tab or not to Tab author",
    "Clover VS Code extension creator",
    "antagonistic AI PersuAI",
    "Temple University best developer",
    "NextFrame creator",
  ],
  openGraph: {
    url: "/",
    title: "Jaime Nguyen | Frontend & Mobile Developer",
    description:
      "Frontend and mobile developer from Temple University. Creator of Clover, Tab or not to Tab, PersuAI, and NextFrame.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jaime Nguyen",
  alternateName: ["Phuoc Nguyen", "Phuoc Dat Nguyen"],
  url: BASE_URL,
  jobTitle: "Frontend & Mobile Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Temple University",
    department: "Computer and Information Sciences",
    degree: "Bachelor of Science in Computer Science",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "SwiftUI",
    "TypeScript",
    "Tailwind CSS",
    "iOS development",
    "web development",
  ],
  sameAs: [
    "https://github.com/jaimenguyen168",
    "https://linkedin.com/in/jaimenguyen168",
  ],
  mainEntityOfPage: BASE_URL,
};

export default async function Home() {
  const [{ data: rawSkills }, { data: projects }, { data: resume }, { data: beyondItems }] = await Promise.all([
    sanityFetch({ query: SKILLS_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
    sanityFetch({ query: RESUME_QUERY }),
    sanityFetch({ query: BEYOND_ITEMS_QUERY }),
  ]);

  const activeSkills: string[] = (rawSkills ?? []).map(
    (s: { name: string }) => s.name,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <LandingView
        activeSkills={activeSkills}
        projects={projects ?? []}
        resumeUrl={resume?.url ?? null}
        beyondItems={beyondItems ?? []}
      />
    </>
  );
}
