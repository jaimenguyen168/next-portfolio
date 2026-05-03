import { defineArrayMember, defineField, defineType } from "sanity";

export const beyondItemType = defineType({
  name: "beyondItem",
  title: "Beyond Item",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order of this item (0-9). Used to sort items in the UI.",
      validation: (Rule) => Rule.required().min(0).max(9),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Short name shown on the planet (e.g., 'Curiosity')",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Card heading",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      description: "Card body text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Optional photos for this item",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "imageTags",
      title: "Image Tags",
      type: "array",
      description: "Tags for the images",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: {
      title: "label",
      order: "order",
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: `Order: ${order}`,
      };
    },
  },
  orderings: [
    {
      title: "Order (ascending)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
