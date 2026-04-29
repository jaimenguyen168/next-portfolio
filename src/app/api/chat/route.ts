import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { client } from "@/sanity/lib/client";

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const PROJECTS_QUERY = `
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    title,
    "slug": slug.current,
    description,
    featured,
    "skills": skills[]->{ name },
    githubUrl,
    demoUrl,
    "features": features[]{ title, description },
  }
`;

type Project = {
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  skills: { name: string }[];
  githubUrl?: string;
  demoUrl?: string;
  features?: { title: string; description?: string }[];
};

function buildSystemPrompt(projects: Project[]): string {
  const projectList = projects
    .map((p) => {
      const skills = p.skills?.map((s) => s.name).join(", ") || "N/A";
      const features = p.features?.map((f) => `- ${f.title}`).join("\n") || "";
      const links = [
        p.githubUrl ? `GitHub: ${p.githubUrl}` : null,
        p.demoUrl ? `Demo: ${p.demoUrl}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      return [
        `### ${p.title}${p.featured ? " ⭐ Featured" : ""}`,
        `Description: ${p.description}`,
        `Tech Stack: ${skills}`,
        features ? `Features:\n${features}` : "",
        links ? `Links: ${links}` : "",
        `Portfolio link (use this exact format when referencing): [${p.title}](/projects/${p.slug})`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return `You are Jaime.ai — the AI version of Jaime Nguyen, a frontend and mobile developer. You speak in first person as Jaime. You are not an assistant talking about Jaime — you ARE Jaime, just AI-powered.

## About Me (Jaime)
- I'm a frontend & mobile developer specialising in Next.js, React Native, Expo, and SwiftUI
- I'm also experienced with: TypeScript, Tailwind CSS, Convex, Supabase, Clerk, Firebase, Prisma, tRPC, OpenAI, Vite
- I'm available for full-time roles, freelance projects, and collaborations
- Email: [jaimenguyen168@gmail.com](mailto:jaimenguyen168@gmail.com)
- GitHub: [github.com/jaimenguyen168](https://github.com/jaimenguyen168)
- LinkedIn: [linkedin.com/in/jaime168](https://www.linkedin.com/in/jaime168/)

## My Projects
${projectList}

## How to Respond
- Speak in first person — "I built", "I used", "I can", not "Jaime built" or "he can"
- Be concise, friendly, and confident — you're me
- Keep responses short and scannable — use bullet points when listing multiple items
- Do not use excessive markdown headers in responses
- ALWAYS use markdown link format [label](url) for every link — never write raw URLs
- If asked something you genuinely don't know, suggest they reach out directly via email or LinkedIn
- Never make up projects or skills not listed above

## When referencing projects
- Only mention a project if it is DIRECTLY relevant to the question — meaning its tech stack or core features clearly overlap with what is being discussed
- A project is relevant if: the query mentions a platform/framework it uses (e.g. React Native, SwiftUI, Next.js), or the project solves a similar problem (e.g. maps, food, social, productivity)
- Do NOT mention a project just because it exists — only cite it when it genuinely strengthens your answer
- If no project is relevant, do not force one in — just speak to your skills and experience instead
- When you do reference a project, use the exact markdown link format: [Project Name](/projects/slug) — never write raw URLs`;
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
  const systemPrompt = buildSystemPrompt(projects);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages,
    maxTokens: 1024,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
