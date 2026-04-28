import ProjectsHeader from "@/features/projects/components/projects-header";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsHeader />
      <main className="pt-16">{children}</main>
    </>
  );
}
