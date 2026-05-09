import {
  SiBetterauth,
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiGraphql,
  SiReact, SiNextdotjs, SiVuedotjs, SiNuxt, SiAngular,
  SiSvelte, SiAstro, SiRemix, SiGatsby, SiSolid, SiQwik,
  SiTailwindcss, SiSass, SiCssmodules, SiStyledcomponents,
  SiBootstrap, SiMui, SiAntdesign, SiChakraui, SiDaisyui, SiRadixui,
  SiFramer, SiGreensock, SiThreedotjs, SiLottiefiles,
  SiRedux, SiReactquery, SiPinia, SiMobx, SiSwr, SiXstate, SiRecoil,
  SiTrpc, SiApollographql, SiSocketdotio,
  SiVite, SiWebpack, SiTurborepo, SiRollupdotjs, SiEsbuild, SiBabel, SiSwc,
  SiPwa, SiWebassembly,
  SiExpo, SiFlutter, SiSwift, SiKotlin, SiDart,
  SiPython, SiGo, SiRust, SiPhp, SiRuby,
  SiNodedotjs, SiExpress, SiFastify, SiNestjs, SiHono,
  SiDjango, SiFastapi, SiFlask, SiLaravel, SiSpringboot, SiRubyonrails,
  SiPostgresql, SiMysql, SiSqlite, SiMongodb, SiRedis,
  SiSupabase, SiFirebase, SiElasticsearch,
  SiPrisma, SiDrizzle, SiTypeorm, SiSequelize, SiMongoose, SiKnexdotjs,
  SiApachekafka, SiRabbitmq,
  SiClerk, SiAuth0, SiPassport,
  SiGit, SiGithub, SiGitlab,
  SiVercel, SiNetlify, SiRender, SiRailway, SiCloudflare,
  SiGooglecloud, SiDocker, SiKubernetes,
  SiGithubactions, SiCircleci, SiTerraform, SiNginx, SiLinux,
  SiSanity, SiContentful, SiStrapi, SiPayloadcms, SiDirectus, SiWordpress,
  SiOpenai, SiAnthropic, SiLangchain, SiHuggingface, SiGooglegemini, SiOllama, SiRevenuecat, SiStripe, SiSwagger,
  SiJest, SiVitest, SiCypress, SiTestinglibrary, SiStorybook,
  SiEslint, SiPrettier, SiZod, SiNx, SiFigma, SiElectron, SiTauri,
} from "react-icons/si";

import {
  FaJava, FaCode, FaDatabase, FaServer,
  FaPlug, FaBolt, FaBox, FaAtom, FaWindows, FaPlane, FaAws,
} from "react-icons/fa";

import type { IconType } from "react-icons";

export type SkillMeta = {
  icon: IconType;
  label: string;
  color: string;
};

export const SKILL_META: Record<string, SkillMeta> = {
  // ─── Frontend & Web — Languages ─────────────────────────────────────────────
  javascript:         { icon: SiJavascript,      label: "JavaScript",       color: "#f7df1e" },
  typescript:         { icon: SiTypescript,       label: "TypeScript",       color: "#3178c6" },
  html:               { icon: SiHtml5,            label: "HTML",             color: "#e34f26" },
  css:                { icon: SiCss,              label: "CSS",              color: "#1572b6" },
  graphql:            { icon: SiGraphql,          label: "GraphQL",          color: "#e10098" },

  // ─── Frontend & Web — Frameworks ────────────────────────────────────────────
  react:              { icon: SiReact,            label: "React",            color: "#61dafb" },
  nextjs:             { icon: SiNextdotjs,        label: "Next.js",          color: "#ffffff" },
  vuejs:              { icon: SiVuedotjs,         label: "Vue.js",           color: "#42b883" },
  nuxtjs:             { icon: SiNuxt,             label: "Nuxt.js",          color: "#00dc82" },
  angular:            { icon: SiAngular,          label: "Angular",          color: "#dd0031" },
  svelte:             { icon: SiSvelte,           label: "Svelte",           color: "#ff3e00" },
  sveltekit:          { icon: SiSvelte,           label: "SvelteKit",        color: "#ff3e00" },
  astro:              { icon: SiAstro,            label: "Astro",            color: "#ff5d01" },
  remix:              { icon: SiRemix,            label: "Remix",            color: "#ffffff" },
  gatsby:             { icon: SiGatsby,           label: "Gatsby",           color: "#663399" },
  solidjs:            { icon: SiSolid,            label: "Solid.js",         color: "#446b9e" },
  qwik:               { icon: SiQwik,             label: "Qwik",             color: "#18b6f6" },

  // ─── Frontend & Web — Styling ───────────────────────────────────────────────
  tailwindcss:        { icon: SiTailwindcss,      label: "Tailwind CSS",     color: "#38bdf8" },
  sass:               { icon: SiSass,             label: "Sass / SCSS",      color: "#cc6699" },
  css_modules:        { icon: SiCssmodules,       label: "CSS Modules",      color: "#1572b6" },
  styled_components:  { icon: SiStyledcomponents, label: "Styled Components",color: "#db7093" },
  emotion:            { icon: FaCode,             label: "Emotion",          color: "#d36ac2" },
  bootstrap:          { icon: SiBootstrap,        label: "Bootstrap",        color: "#7952b3" },
  material_ui:        { icon: SiMui,              label: "Material UI",      color: "#007fff" },
  shadcn_ui:          { icon: FaBox,              label: "Shadcn/UI",        color: "#ffffff" },
  radix_ui:           { icon: SiRadixui,          label: "Radix UI",         color: "#ffffff" },
  ant_design:         { icon: SiAntdesign,        label: "Ant Design",       color: "#1677ff" },
  chakra_ui:          { icon: SiChakraui,         label: "Chakra UI",        color: "#319795" },
  daisyui:            { icon: SiDaisyui,          label: "DaisyUI",          color: "#ff9903" },

  // ─── Frontend & Web — Animation ─────────────────────────────────────────────
  framer_motion:      { icon: SiFramer,           label: "Framer Motion",    color: "#00d2ff" },
  gsap:               { icon: SiGreensock,        label: "GSAP",             color: "#88ce02" },
  threejs:            { icon: SiThreedotjs,       label: "Three.js",         color: "#ffffff" },
  react_spring:       { icon: FaBolt,             label: "React Spring",     color: "#61dafb" },
  lottie:             { icon: SiLottiefiles,      label: "Lottie",           color: "#00ddb4" },

  // ─── Frontend & Web — State Management ──────────────────────────────────────
  redux_toolkit:      { icon: SiRedux,            label: "Redux Toolkit",    color: "#764abc" },
  zustand:            { icon: FaAtom,             label: "Zustand",          color: "#f16728" },
  jotai:              { icon: FaAtom,             label: "Jotai",            color: "#ffffff" },
  recoil:             { icon: SiRecoil,           label: "Recoil",           color: "#3578e5" },
  mobx:               { icon: SiMobx,             label: "MobX",             color: "#ff7102" },
  react_query:        { icon: SiReactquery,       label: "React Query",      color: "#ff4154" },
  swr:                { icon: SiSwr,              label: "SWR",              color: "#ffffff" },
  xstate:             { icon: SiXstate,           label: "XState",           color: "#ffffff" },
  pinia:              { icon: SiPinia,            label: "Pinia",            color: "#ffd859" },

  // ─── Frontend & Web — API & Communication ───────────────────────────────────
  rest_api:           { icon: FaServer,           label: "REST API",         color: "#6b7280" },
  trpc:               { icon: SiTrpc,             label: "tRPC",             color: "#398ccb" },
  apollo_client:      { icon: SiApollographql,    label: "Apollo Client",    color: "#311c87" },
  axios:              { icon: FaCode,             label: "Axios",            color: "#5a29e4" },
  websockets:         { icon: FaPlug,             label: "WebSockets",       color: "#6b7280" },
  socket_io:          { icon: SiSocketdotio,      label: "Socket.io",        color: "#ffffff" },

  // ─── Frontend & Web — Build Tools ───────────────────────────────────────────
  vite:               { icon: SiVite,             label: "Vite",             color: "#646cff" },
  webpack:            { icon: SiWebpack,          label: "Webpack",          color: "#8dd6f9" },
  turbopack:          { icon: SiTurborepo,        label: "Turbopack",        color: "#ffffff" },
  rollup:             { icon: SiRollupdotjs,      label: "Rollup",           color: "#ff3333" },
  esbuild:            { icon: SiEsbuild,          label: "esbuild",          color: "#ffcf00" },
  parcel:             { icon: FaBox,              label: "Parcel",           color: "#c07c3b" },
  babel:              { icon: SiBabel,            label: "Babel",            color: "#f9dc3e" },
  swc:                { icon: SiSwc,              label: "SWC",              color: "#f47a1f" },

  // ─── Frontend & Web — Other ─────────────────────────────────────────────────
  pwa:                { icon: SiPwa,              label: "PWA",              color: "#5a0fc8" },
  wasm:               { icon: SiWebassembly,      label: "WebAssembly",      color: "#654ff0" },

  // ─── Mobile ─────────────────────────────────────────────────────────────────
  react_native:       { icon: SiReact,            label: "React Native",     color: "#61dafb" },
  expo:               { icon: SiExpo,             label: "Expo",             color: "#f59e0b" },
  nativewind:         { icon: SiTailwindcss,      label: "NativeWind",       color: "#38bdf8" },
  flutter:            { icon: SiFlutter,          label: "Flutter",          color: "#54c5f8" },
  swift:              { icon: SiSwift,            label: "Swift",            color: "#f05138" },
  swiftui:            { icon: SiSwift,            label: "SwiftUI",          color: "#f05138" },
  kotlin:             { icon: SiKotlin,           label: "Kotlin",           color: "#7f52ff" },
  dart:               { icon: SiDart,             label: "Dart",             color: "#00b4ab" },

  // ─── Backend & Database — Languages ─────────────────────────────────────────
  python:             { icon: SiPython,           label: "Python",           color: "#3572a5" },
  go:                 { icon: SiGo,               label: "Go",               color: "#00add8" },
  rust:               { icon: SiRust,             label: "Rust",             color: "#f74c00" },
  php:                { icon: SiPhp,              label: "PHP",              color: "#777bb4" },
  ruby:               { icon: SiRuby,             label: "Ruby",             color: "#cc342d" },
  java:               { icon: FaJava,             label: "Java",             color: "#f89820" },

  // ─── Backend & Database — Frameworks ────────────────────────────────────────
  nodejs:             { icon: SiNodedotjs,        label: "Node.js",          color: "#68a063" },
  expressjs:          { icon: SiExpress,          label: "Express.js",       color: "#ffffff" },
  fastify:            { icon: SiFastify,          label: "Fastify",          color: "#ffffff" },
  nestjs:             { icon: SiNestjs,           label: "NestJS",           color: "#e0234e" },
  hono:               { icon: SiHono,             label: "Hono",             color: "#f36b13" },
  django:             { icon: SiDjango,           label: "Django",           color: "#44b78b" },
  fastapi:            { icon: SiFastapi,          label: "FastAPI",          color: "#009688" },
  flask:              { icon: SiFlask,            label: "Flask",            color: "#ffffff" },
  laravel:            { icon: SiLaravel,          label: "Laravel",          color: "#ff2d20" },
  spring_boot:        { icon: SiSpringboot,       label: "Spring Boot",      color: "#6db33f" },
  rails:              { icon: SiRubyonrails,      label: "Ruby on Rails",    color: "#cc0000" },

  // ─── Backend & Database — Databases ─────────────────────────────────────────
  convex:             { icon: FaBolt,             label: "Convex",           color: "#f5a623" },
  postgresql:         { icon: SiPostgresql,       label: "PostgreSQL",       color: "#336791" },
  neon:               { icon: SiPostgresql,       label: "Neon",             color: "#00e5bf" },
  mysql:              { icon: SiMysql,            label: "MySQL",            color: "#4479a1" },
  sqlite:             { icon: SiSqlite,           label: "SQLite",           color: "#003b57" },
  mongodb:            { icon: SiMongodb,          label: "MongoDB",          color: "#4db33d" },
  redis:              { icon: SiRedis,            label: "Redis",            color: "#dc382d" },
  dynamodb:           { icon: FaDatabase,         label: "DynamoDB",         color: "#4053d6" },
  supabase:           { icon: SiSupabase,         label: "Supabase",         color: "#3ecf8e" },
  firebase:           { icon: SiFirebase,         label: "Firebase",         color: "#ffca28" },
  elasticsearch:      { icon: SiElasticsearch,    label: "Elasticsearch",    color: "#f04e98" },

  // ─── Backend & Database — ORMs ───────────────────────────────────────────────
  prisma:             { icon: SiPrisma,           label: "Prisma",           color: "#ffffff" },
  drizzle:            { icon: SiDrizzle,          label: "Drizzle ORM",      color: "#c5f74f" },
  typeorm:            { icon: SiTypeorm,          label: "TypeORM",          color: "#e83524" },
  sequelize:          { icon: SiSequelize,        label: "Sequelize",        color: "#03afef" },
  mongoose:           { icon: SiMongoose,         label: "Mongoose",         color: "#880000" },
  knex:               { icon: SiKnexdotjs,        label: "Knex.js",          color: "#e16426" },

  // ─── Backend & Database — Messaging ─────────────────────────────────────────
  kafka:              { icon: SiApachekafka,      label: "Apache Kafka",     color: "#ffffff" },
  rabbitmq:           { icon: SiRabbitmq,         label: "RabbitMQ",         color: "#ff6600" },

  // ─── Auth & Tools — Auth ─────────────────────────────────────────────────────
  betterauth:         { icon: SiBetterauth,       label: "BetterAuth",       color: "#ffffff" },
  nextauth:           { icon: FaCode,             label: "NextAuth.js",      color: "#ffffff" },
  authjs:             { icon: FaCode,             label: "Auth.js",          color: "#ffffff" },
  clerk:              { icon: SiClerk,            label: "Clerk",            color: "#6c47ff" },
  auth0:              { icon: SiAuth0,            label: "Auth0",            color: "#eb5424" },
  passportjs:         { icon: SiPassport,         label: "Passport.js",      color: "#34e27a" },
  jwt:                { icon: FaCode,             label: "JWT",              color: "#d63aff" },

  // ─── Auth & Tools — Version Control ─────────────────────────────────────────
  git:                { icon: SiGit,              label: "Git",              color: "#f05032" },
  github:             { icon: SiGithub,           label: "GitHub",           color: "#ffffff" },
  gitlab:             { icon: SiGitlab,           label: "GitLab",           color: "#fc6d26" },

  // ─── Auth & Tools — Deployment & Hosting ────────────────────────────────────
  vercel:             { icon: SiVercel,           label: "Vercel",           color: "#ffffff" },
  netlify:            { icon: SiNetlify,          label: "Netlify",          color: "#00c7b7" },
  render:             { icon: SiRender,           label: "Render",           color: "#46e3b7" },
  railway:            { icon: SiRailway,          label: "Railway",          color: "#ffffff" },
  flyio:              { icon: FaPlane,            label: "Fly.io",           color: "#7b3bf7" },
  cloudflare_workers: { icon: SiCloudflare,       label: "Cloudflare Workers", color: "#f48120" },
  aws:                { icon: FaAws,              label: "AWS",              color: "#ff9900" },
  gcp:                { icon: SiGooglecloud,      label: "Google Cloud",     color: "#4285f4" },
  azure:              { icon: FaWindows,          label: "Azure",            color: "#0078d4" },

  // ─── Auth & Tools — DevOps ───────────────────────────────────────────────────
  inngest:            { icon: FaBolt,             label: "Inngest",          color: "#e9d4ff" },
  docker:             { icon: SiDocker,           label: "Docker",           color: "#2496ed" },
  kubernetes:         { icon: SiKubernetes,       label: "Kubernetes",       color: "#326ce5" },
  github_actions:     { icon: SiGithubactions,    label: "GitHub Actions",   color: "#2088ff" },
  gitlab_cicd:        { icon: SiGitlab,           label: "GitLab CI/CD",     color: "#fc6d26" },
  circleci:           { icon: SiCircleci,         label: "CircleCI",         color: "#343434" },
  terraform:          { icon: SiTerraform,        label: "Terraform",        color: "#7b42bc" },
  nginx:              { icon: SiNginx,            label: "Nginx",            color: "#009639" },
  linux:              { icon: SiLinux,            label: "Linux",            color: "#fcc624" },

  // ─── Auth & Tools — CMS ──────────────────────────────────────────────────────
  sanity:             { icon: SiSanity,           label: "Sanity",           color: "#f04022" },
  contentful:         { icon: SiContentful,       label: "Contentful",       color: "#2478cc" },
  strapi:             { icon: SiStrapi,           label: "Strapi",           color: "#4945ff" },
  payload_cms:        { icon: SiPayloadcms,       label: "Payload CMS",      color: "#ffffff" },
  directus:           { icon: SiDirectus,         label: "Directus",         color: "#6644ff" },
  wordpress:          { icon: SiWordpress,        label: "WordPress",        color: "#21759b" },

  // ─── Auth & Tools — AI & APIs ────────────────────────────────────────────────
  openai_api:         { icon: SiOpenai,           label: "OpenAI",           color: "#ffffff" },
  anthropic_api:      { icon: SiAnthropic,        label: "Anthropic",        color: "#d97757" },
  langchain:          { icon: SiLangchain,        label: "LangChain",        color: "#ffffff" },
  hugging_face:       { icon: SiHuggingface,      label: "Hugging Face",     color: "#ff9d00" },
  gemini_api:         { icon: SiGooglegemini,     label: "Gemini",           color: "#4285f4" },
  groq_api:           { icon: FaBolt,             label: "Groq",             color: "#f55036" },
  ollama:             { icon: SiOllama,           label: "Ollama",           color: "#ffffff" },
  deepseek_api:       { icon: FaCode,             label: "DeepSeek",         color: "#4d6bfe" },
  stripe:             { icon: SiStripe,           label: "Stripe",           color: "#635bff" },
  polar:              { icon: FaCode,             label: "Polar",            color: "#3451b2" },
  revenuecat:         { icon: SiRevenuecat,       label: "RevenueCat",       color: "#f25a5a" },
  swagger:            { icon: SiSwagger,          label: "Swagger",          color: "#85ea2d" },

  // ─── Auth & Tools — Testing ──────────────────────────────────────────────────
  jest:               { icon: SiJest,             label: "Jest",             color: "#c21325" },
  vitest:             { icon: SiVitest,           label: "Vitest",           color: "#729b1b" },
  playwright:         { icon: FaCode,             label: "Playwright",       color: "#2ead33" },
  cypress:            { icon: SiCypress,          label: "Cypress",          color: "#04c38e" },
  testing_library:    { icon: SiTestinglibrary,   label: "Testing Library",  color: "#e33332" },
  storybook:          { icon: SiStorybook,        label: "Storybook",        color: "#ff4785" },

  // ─── Auth & Tools — Code Quality & Monorepo ──────────────────────────────────
  eslint:             { icon: SiEslint,           label: "ESLint",           color: "#4b32c3" },
  prettier:           { icon: SiPrettier,         label: "Prettier",         color: "#f7b93e" },
  zod:                { icon: SiZod,              label: "Zod",              color: "#3068b7" },
  turborepo:          { icon: SiTurborepo,        label: "Turborepo",        color: "#ffffff" },
  nx:                 { icon: SiNx,               label: "Nx",               color: "#143055" },

  // ─── Auth & Tools — Design & Desktop ─────────────────────────────────────────
  figma:              { icon: SiFigma,            label: "Figma",            color: "#f24e1e" },
  electron:           { icon: SiElectron,         label: "Electron",         color: "#47848f" },
  tauri:              { icon: SiTauri,            label: "Tauri",            color: "#ffc131" },
};
