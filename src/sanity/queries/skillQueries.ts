import { defineQuery } from "groq";

export const SKILLS_QUERY = defineQuery(`*[_type == "skill"]{ name }`);
