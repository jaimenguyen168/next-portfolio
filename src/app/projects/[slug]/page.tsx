import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries/projectQueries";
import ProjectDetailsView from "@/features/projects/views/project-details-view";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      url: `/projects/${slug}`,
      title: `${project.title} | Jaime Nguyen`,
      description: project.description,
      ...(project.image && {
        images: [
          {
            url: project.image,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Jaime Nguyen`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!project) notFound();

  return <ProjectDetailsView project={project} />;
}
