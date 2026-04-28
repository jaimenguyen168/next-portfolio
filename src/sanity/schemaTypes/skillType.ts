import { defineField, defineType } from "sanity";
import { SKILLS_LIST } from "../constants/skills";
import { SkillAutocompleteInput } from "../components/SkillAutocompleteInput";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      components: {
        input: SkillAutocompleteInput,
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          const valid = SKILLS_LIST.some((s) => s.value === value);
          return valid || "Please select a skill from the list";
        }),
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      const match = SKILLS_LIST.find((s) => s.value === title);
      return { title: match?.title ?? title };
    },
  },
});
