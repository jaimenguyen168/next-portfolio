<img width="1536" height="1024" alt="jaimedev" src="https://github.com/user-attachments/assets/9e5fd04d-54b4-4867-9315-801b34ea7a14" />

<br />
<div align="center">
  <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
  <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/-Sanity-black?style=for-the-badge&logoColor=white&logo=sanity&color=111111" alt="Sanity" />
  <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logoColor=white&logo=framer&color=0055FF" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/-Groq-black?style=for-the-badge&logoColor=white&logo=groq&color=F55036" alt="Groq" />
  <img src="https://img.shields.io/badge/-Resend-black?style=for-the-badge&logoColor=white&logo=resend&color=000000" alt="Resend" />
</div>

## 📋 <a name="table-of-contents">Table of Contents</a>

1. 📋 [Project Overview](#project-overview)
2. 🔋 [Key Features](#key-features)
3. 📌 [Getting Started](#getting-started)

---

## <a name="project-overview">📋 Project Overview</a>

This is a personal portfolio built with Next.js 16 and powered by Sanity as a live CMS. It showcases projects, a career and personal milestone timeline, and an AI-powered chat assistant — all in a dark, animated interface designed to reflect my work as a frontend and full-stack developer.

## <a name="key-features">🔋 Key Features</a>

- 👉 **Projects Showcase**: filterable gallery of projects with skill-based filtering and URL-synced state <br />
- 👉 **Milestone Timeline**: chronological career and personal milestones managed via Sanity, with category filters and animated alternating layout <br />
- 👉 **AI Chat Assistant**: streaming chat widget powered by Groq, available across the site <br />
- 👉 **Live CMS**: all content (projects, milestones, skills) managed through Sanity Studio at `/studio` <br />
- 👉 **Contact Form**: email delivery via Resend <br />
- 👉 **Animated UI**: smooth scroll-triggered and hover animations throughout using Framer Motion <br />
- 👉 **SEO Optimized**: rich metadata, OpenGraph tags, and canonical URLs on every page <br />

---

## <a name="getting-started">📌 Getting Started</a>

### Installation

**Clone the repository**

```bash
git clone https://github.com/jaimenguyen168/NextJS-Portfolio.git
cd NextJS-Portfolio
```

**Install dependencies**

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

# Resend
RESEND_API_KEY=
CONTACT_EMAIL=

# Groq
GROQ_API_KEY=
```

**Run the development server**

```bash
pnpm dev
```

**Open Sanity Studio**

Navigate to `http://localhost:3000/studio` to manage content.
