import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_MILESTONES_QUERY } from "@/sanity/queries/milestoneQueries";
import TimelineView from "@/features/timeline/views/timeline-view";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A chronological record of Jaime Nguyen's key milestones — career moves, education, personal growth, and projects shipped along the way.",
  alternates: {
    canonical: "/timeline",
  },
  keywords: [
    "Jaime Nguyen timeline",
    "developer journey",
    "career milestones",
    "Temple University",
    "React Native",
    "Next.js",
    "frontend developer story",
  ],
  openGraph: {
    url: "/timeline",
    title: "Timeline | Jaime Nguyen",
    description:
      "A living record of Jaime Nguyen's journey — career moves, personal growth, and projects that shaped who he is as a developer.",
  },
};

export default async function TimelinePage() {
  const { data: milestones } = await sanityFetch({ query: ALL_MILESTONES_QUERY });

  return <TimelineView milestones={milestones ?? []} />;
}
