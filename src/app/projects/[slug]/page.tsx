import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries/projectQueries";
import ProjectDetailsView from "@/features/views/project-details-view";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!project) notFound();

  return <ProjectDetailsView project={project} />;
}
