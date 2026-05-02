import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton — only one resume document ever exists
      S.listItem()
        .title("Resume")
        .id("resume")
        .child(
          S.document()
            .schemaType("resume")
            .documentId("resume")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("skill").title("Skills"),
      S.documentTypeListItem("beyondItem").title("Beyond the Code"),
    ]);
