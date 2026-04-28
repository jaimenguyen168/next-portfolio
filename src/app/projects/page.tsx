import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PROJECTS_QUERY } from "@/sanity/queries/projectQueries";
import ProjectsView from "@/features/views/projects-view";

export const metadata = {
  title: "Projects | Jaime",
  description: "All projects built by Jaime — web, mobile, and everything in between.",
};

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: ALL_PROJECTS_QUERY });

  return <ProjectsView projects={projects ?? []} />;
}
