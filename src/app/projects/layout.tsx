import { sanityFetch } from "@/sanity/lib/live";
import { RESUME_QUERY } from "@/sanity/queries/resumeQueries";
import ProjectsHeader from "@/features/projects/components/projects-header";
import SiteFooter from "@/features/shared/components/site-footer";

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { data: resume } = await sanityFetch({ query: RESUME_QUERY });

  return (
    <>
      <ProjectsHeader resumeUrl={resume?.url ?? null} />
      <main className="pt-12">
        {children}
        <SiteFooter />
      </main>
    </>
  );
}
