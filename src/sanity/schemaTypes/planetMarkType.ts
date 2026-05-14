import { defineField, defineType } from "sanity";

export const planetMarkType = defineType({
  name: "planetMark",
  title: "Planet Mark",
  type: "document",
  fields: [
    defineField({
      name: "planet",
      title: "Planet",
      type: "reference",
      to: [{ type: "beyondItem" }],
      description: "Which planet this mark belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "The emoji the visitor picked to represent themselves",
      validation: (Rule) => Rule.required().max(8),
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
      description: "Optional name or nickname",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "mark",
      title: "Mark",
      type: "text",
      description: "What the visitor said",
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional photo (e.g. a photo with Jaime)",
      options: { hotspot: true },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      emoji: "emoji",
      nickname: "nickname",
      mark: "mark",
      planet: "planet.label",
    },
    prepare({ emoji, nickname, mark, planet }: { emoji: string; nickname?: string; mark?: string; planet?: string }) {
      return {
        title: `${emoji} ${nickname ?? "Anonymous"} — ${planet ?? "?"}`,
        subtitle: mark?.slice(0, 80),
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
