import ProjectsHeader from "@/components/projects-header";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsHeader />
      <main className="pt-16">{children}</main>
    </>
  );
}
