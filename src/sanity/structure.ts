import type { StructureResolver } from "sanity/structure";
import { QuickDeleteList } from "./components/quick-delete-list";

function listPane(S: Parameters<StructureResolver>[0], schemaType: string, title: string, orderField?: string) {
  return S.listItem()
    .title(title)
    .child(
      S.component(() => QuickDeleteList({ schemaType, orderField }))
        .title(title)
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Resume")
        .id("resume")
        .child(
          S.document()
            .schemaType("resume")
            .documentId("resume")
        ),
      S.divider(),
      listPane(S, "project", "Projects", "featured desc, _createdAt desc"),
      listPane(S, "skill", "Skills", "name asc"),
      listPane(S, "beyondItem", "Beyond the Code", "order asc"),
      listPane(S, "milestone", "Milestones", "date desc"),
      listPane(S, "blog", "Blog Posts", "publishedAt desc"),
      S.divider(),
      listPane(S, "planetMark", "Planet Marks ✍️", "submittedAt desc"),
    ]);
