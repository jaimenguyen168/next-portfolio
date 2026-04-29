import { defineField, defineType } from "sanity";

export const resumeType = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({
      name: "file",
      title: "Resume PDF",
      type: "file",
      description: "Upload your resume as a PDF. This will be used for the download button on the site.",
      options: { accept: ".pdf" },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Resume" };
    },
  },
});
