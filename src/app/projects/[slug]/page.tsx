import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries/projectQueries";
import ProjectDetailsView from "@/features/projects/views/project-details-view";
import { urlFor } from "@/sanity/lib/image";

const BASE_URL = "https://jaimenguyen.com";

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

  const imageUrl = project.image
    ? urlFor(project.image).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    keywords: [
      project.title,
      "Jaime Nguyen",
      ...(project.skills?.map((s: { name: string }) => s.name) ?? []),
    ],
    openGraph: {
      url: `/projects/${slug}`,
      title: `${project.title} | Jaime Nguyen`,
      description: project.description,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Jaime Nguyen`,
      description: project.description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
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

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Jaime Nguyen",
      url: BASE_URL,
    },
    url: `${BASE_URL}/projects/${slug}`,
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.demoUrl ? { installUrl: project.demoUrl } : {}),
    applicationCategory: "DeveloperApplication",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailsView project={project} />
    </>
  );
}
