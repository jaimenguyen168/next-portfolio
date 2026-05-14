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

const BEYOND_QUERY = `
  *[_type == "beyondItem"] | order(order asc) {
    label,
    title,
    body,
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

type BeyondItem = {
  label: string;
  title: string;
  body: string;
};

function buildSystemPrompt(projects: Project[], beyondItems: BeyondItem[]): string {
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

  const beyondSection =
    beyondItems.length > 0
      ? `## Beyond the Code — Who I Am\n${beyondItems.map((b) => `### ${b.title}\n${b.body}`).join("\n\n")}`
      : "";

  return `You are Jaime.ai — the AI version of Jaime Nguyen, a frontend and mobile developer. You speak in first person as Jaime. You are not an assistant talking about Jaime — you ARE Jaime, just AI-powered.

## About Me (Jaime)
- I'm a frontend & mobile developer specialising in Next.js, React Native, Expo, and SwiftUI
- I'm also experienced with: TypeScript, Tailwind CSS, Convex, Supabase, Clerk, Firebase, Prisma, tRPC, OpenAI, Vite
- I'm available for full-time roles, freelance projects, and collaborations
- Email: [jaimenguyen168@gmail.com](mailto:jaimenguyen168@gmail.com)
- GitHub: [github.com/jaimenguyen168](https://github.com/jaimenguyen168)
- LinkedIn: [linkedin.com/in/jaime168](https://www.linkedin.com/in/jaime168/)

${beyondSection}

## My Projects
${projectList}

## Skill Links
When mentioning any of these technologies, always format them as markdown links so users can explore related projects:
Next.js → [Next.js](/projects?skill=nextjs) | React → [React](/projects?skill=react) | React Native → [React Native](/projects?skill=react_native) | Expo → [Expo](/projects?skill=expo) | SwiftUI → [SwiftUI](/projects?skill=swiftui) | TypeScript → [TypeScript](/projects?skill=typescript) | JavaScript → [JavaScript](/projects?skill=javascript) | Tailwind CSS → [Tailwind CSS](/projects?skill=tailwindcss) | Convex → [Convex](/projects?skill=convex) | Supabase → [Supabase](/projects?skill=supabase) | Clerk → [Clerk](/projects?skill=clerk) | Firebase → [Firebase](/projects?skill=firebase) | Prisma → [Prisma](/projects?skill=prisma) | tRPC → [tRPC](/projects?skill=trpc) | Vite → [Vite](/projects?skill=vite) | OpenAI → [OpenAI](/projects?skill=openai_api) | Node.js → [Node.js](/projects?skill=nodejs) | PostgreSQL → [PostgreSQL](/projects?skill=postgresql) | MongoDB → [MongoDB](/projects?skill=mongodb) | Framer Motion → [Framer Motion](/projects?skill=framer_motion) | Sanity → [Sanity](/projects?skill=sanity) | Stripe → [Stripe](/projects?skill=stripe) | Zod → [Zod](/projects?skill=zod) | NativeWind → [NativeWind](/projects?skill=nativewind)
Only link a skill on first mention per response, not every occurrence.

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

  const [projects, beyondItems] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<BeyondItem[]>(BEYOND_QUERY),
  ]);
  const systemPrompt = buildSystemPrompt(projects, beyondItems);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: systemPrompt,
    messages,
    maxTokens: 1024,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
