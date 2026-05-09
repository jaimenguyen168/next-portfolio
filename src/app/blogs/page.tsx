import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BLOGS_QUERY } from "@/sanity/queries/blogQueries";
import BlogsView from "@/features/blogs/views/blogs-view";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on engineering, career growth, and building things that matter — written by Jaime Nguyen, frontend and mobile developer.",
  alternates: {
    canonical: "/blogs",
  },
  keywords: [
    "Jaime Nguyen blog",
    "frontend developer blog",
    "React Native blog",
    "Next.js blog",
    "developer career",
    "software engineering",
    "mobile development",
    "web development",
    "TypeScript",
    "programming",
  ],
  openGraph: {
    url: "/blogs",
    title: "Blog | Jaime Nguyen",
    description:
      "Thoughts on engineering, career growth, and building things that matter.",
  },
};

export default async function BlogsPage() {
  const { data: blogs } = await sanityFetch({ query: ALL_BLOGS_QUERY });

  return <BlogsView blogs={blogs ?? []} />;
}
