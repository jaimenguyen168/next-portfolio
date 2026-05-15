import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://jaimenguyen.com";

async function getSlugs() {
  const [blogs, projects] = await Promise.all([
    client.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "blog" && defined(slug.current)] { "slug": slug.current, publishedAt }`
    ),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "project" && defined(slug.current)] { "slug": slug.current, _updatedAt }`
    ),
  ]);
  return { blogs, projects };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogs, projects } = await getSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/timeline`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: b.publishedAt ? new Date(b.publishedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
