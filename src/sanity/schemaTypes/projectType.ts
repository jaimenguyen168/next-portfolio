import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier. Click Generate to auto-fill from title.",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "demoUrl",
      title: "Demo URL",
      type: "url",
    }),
    defineField({
      name: "images",
      title: "Additional Images",
      type: "array",
      description: "Extra screenshots or images shown in the project detail page.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description: "Key features of this project.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "upcomingFeatures",
      title: "Upcoming Features",
      type: "array",
      description: "Features planned for future releases.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on the landing page. Maximum 4 projects can be featured.",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;

          const client = context.getClient({ apiVersion: "2024-01-01" });

          // Get current doc id (draft or published)
          const rawId = context.document?._id ?? "";
          const id = rawId.replace(/^drafts\./, "");

          const count = await client.fetch<number>(
            `count(*[_type == "project" && featured == true && !(_id in [$id, "drafts." + $id])])`,
            { id }
          );

          if (count >= 4) {
            return "You already have 4 featured projects. Unfeature one before featuring another.";
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title,
        media,
        subtitle: featured ? "⭐ Featured" : "",
      };
    },
  },
  orderings: [
    {
      title: "Featured first",
      name: "featuredDesc",
      by: [
        { field: "featured", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
});
