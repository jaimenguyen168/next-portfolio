import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_BY_SLUG_QUERY } from "@/sanity/queries/blogQueries";
import BlogDetailView from "@/features/blogs/views/blog-detail-view";

const BASE_URL = "https://jaimenguyen.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    keywords: blog.tags ?? [],
    openGraph: {
      url: `/blogs/${slug}`,
      title: `${blog.title} | Jaime Nguyen`,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: ["Jaime Nguyen"],
      ...(blog.coverImage?.url
        ? {
            images: [{ url: blog.coverImage.url, width: 1200, height: 630, alt: blog.coverImage.alt ?? blog.title }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Jaime Nguyen`,
      description: blog.excerpt,
      ...(blog.coverImage?.url ? { images: [blog.coverImage.url] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: blog } = await sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!blog) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    author: {
      "@type": "Person",
      name: "Jaime Nguyen",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Jaime Nguyen",
      url: BASE_URL,
    },
    url: `${BASE_URL}/blogs/${slug}`,
    mainEntityOfPage: `${BASE_URL}/blogs/${slug}`,
    ...(blog.coverImage?.url ? { image: blog.coverImage.url } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailView blog={blog} />
    </>
  );
}
