import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import ProjectsView from "@/features/projects/views/projects-view";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A full showcase of projects by Jaime Nguyen — from Clover, a VS Code extension built as a Temple University capstone, to PersuAI, an antagonistic AI for argument training. Web apps, mobile experiences, and everything in between.",
  alternates: {
    canonical: "/projects",
  },
  keywords: [
    "Jaime Nguyen projects",
    "Clover developer",
    "Clover VS Code extension",
    "antagonistic AI",
    "PersuAI",
    "Temple University capstone",
    "HCI research",
    "Next.js projects",
    "React Native",
    "Expo",
    "SwiftUI",
    "frontend developer portfolio",
    "full stack projects",
    "TypeScript",
    "mobile app developer",
  ],
  openGraph: {
    url: "/projects",
    title: "Projects | Jaime Nguyen",
    description:
      "From Clover (a VS Code extension capstone) to PersuAI (antagonistic AI for argument training) — a full showcase of Jaime Nguyen's web, mobile, and research projects.",
  },
};

type Props = {
  searchParams: Promise<{ skill?: string | string[] }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });
  const { skill } = await searchParams;

  const initialSkills = skill
    ? Array.isArray(skill) ? skill : [skill]
    : [];

  return <ProjectsView projects={projects ?? []} initialSkills={initialSkills} />;
}
