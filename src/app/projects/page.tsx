import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import ProjectsView from "@/features/projects/views/projects-view";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A full showcase of projects by Jaime Nguyen — web apps, mobile experiences, and everything in between, built with Next.js, React Native, Expo, and SwiftUI.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    title: "Projects | Jaime Nguyen",
    description:
      "A full showcase of projects by Jaime Nguyen — web apps, mobile experiences, and everything in between.",
  },
};

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });

  return <ProjectsView projects={projects ?? []} />;
}
