import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_BY_SLUG_QUERY } from "@/sanity/queries/blogQueries";
import BlogDetailView from "@/features/blogs/views/blog-detail-view";

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
      ...(blog.coverImage?.url
        ? {
            images: [
              {
                url: blog.coverImage.url,
                width: 1200,
                height: 630,
                alt: blog.coverImage.alt ?? blog.title,
              },
            ],
          }
        : {}),
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

  return <BlogDetailView blog={blog} />;
}
