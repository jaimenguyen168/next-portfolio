import { defineField, defineType } from "sanity";

export const milestoneType = defineType({
  name: "milestone",
  title: "Milestone",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      description:
        "Optional. Leave blank if ongoing or a single-point-in-time event.",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Work", value: "work" },
          { title: "Education", value: "education" },
          { title: "Personal", value: "personal" },
          { title: "Project", value: "project" },
          { title: "Achievement", value: "achievement" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short summary shown in cards and used for SEO meta description.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Full content of the milestone.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Organisation or company logo — used as the connector dot icon on the timeline.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "Keywords for SEO and filtering (e.g. temple, react-native, hackathon).",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "City, country, or organisation name.",
      type: "string",
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted",
      description:
        "Pin this milestone as a major moment — shown with extra emphasis.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date (oldest first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      category: "category",
      media: "image",
      highlighted: "highlighted",
    },
    prepare({ title, date, category, media, highlighted }) {
      return {
        title: `${highlighted ? "⭐ " : ""}${title}`,
        subtitle: `${category} · ${date}`,
        media,
      };
    },
  },
});
