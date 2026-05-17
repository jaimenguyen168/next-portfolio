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
  SiOpenai, SiAnthropic, SiLangchain, SiHuggingface, SiGooglegemini, SiOllama, SiRevenuecat, SiStripe, SiResend, SiSwagger,
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
  description: string;
};

export const SKILL_META: Record<string, SkillMeta> = {
  // ─── Frontend & Web — Languages ─────────────────────────────────────────────
  javascript:         { icon: SiJavascript,      label: "JavaScript",          color: "#f7df1e", description: "The language of the web — used for dynamic UIs, event handling, and browser APIs across all frontend projects." },
  typescript:         { icon: SiTypescript,       label: "TypeScript",          color: "#3178c6", description: "Strongly-typed superset of JavaScript that catches bugs at compile time and improves code maintainability at scale." },
  html:               { icon: SiHtml5,            label: "HTML",                color: "#e34f26", description: "Semantic markup for structuring web content with accessibility and SEO best practices in mind." },
  css:                { icon: SiCss,              label: "CSS",                 color: "#1572b6", description: "Styling language for layouts, animations, and responsive design across web applications." },
  graphql:            { icon: SiGraphql,          label: "GraphQL",             color: "#e10098", description: "Query language for APIs that lets clients request exactly the data they need, reducing over-fetching." },

  // ─── Frontend & Web — Frameworks ────────────────────────────────────────────
  react:              { icon: SiReact,            label: "React",               color: "#61dafb", description: "Component-based UI library used to build interactive, high-performance web applications." },
  nextjs:             { icon: SiNextdotjs,        label: "Next.js",             color: "#ffffff", description: "Full-stack React framework with App Router, server components, server actions, and edge rendering." },
  vuejs:              { icon: SiVuedotjs,         label: "Vue.js",              color: "#42b883", description: "Progressive JavaScript framework for building reactive UIs with a gentle learning curve." },
  nuxtjs:             { icon: SiNuxt,             label: "Nuxt.js",             color: "#00dc82", description: "Full-stack Vue framework with file-based routing, SSR, and auto-imports." },
  angular:            { icon: SiAngular,          label: "Angular",             color: "#dd0031", description: "Opinionated TypeScript framework by Google for building large-scale enterprise web applications." },
  svelte:             { icon: SiSvelte,           label: "Svelte",              color: "#ff3e00", description: "Compiler-based framework that ships zero runtime JavaScript, resulting in fast, lean web apps." },
  sveltekit:          { icon: SiSvelte,           label: "SvelteKit",           color: "#ff3e00", description: "Full-stack Svelte framework with routing, SSR, and server-side load functions." },
  astro:              { icon: SiAstro,            label: "Astro",               color: "#ff5d01", description: "Static-first framework that ships minimal JS by default, ideal for content-heavy and documentation sites." },
  remix:              { icon: SiRemix,            label: "Remix",               color: "#ffffff", description: "Full-stack React framework focused on web standards, nested routing, and progressive enhancement." },
  gatsby:             { icon: SiGatsby,           label: "Gatsby",              color: "#663399", description: "React-based static site generator optimized for performance with GraphQL data sourcing." },
  solidjs:            { icon: SiSolid,            label: "Solid.js",            color: "#446b9e", description: "Fine-grained reactive UI framework with no virtual DOM, delivering near-native rendering performance." },
  qwik:               { icon: SiQwik,             label: "Qwik",                color: "#18b6f6", description: "Resumable framework designed for instant page loads with lazy-loaded interactivity." },

  // ─── Frontend & Web — Styling ───────────────────────────────────────────────
  tailwindcss:        { icon: SiTailwindcss,      label: "Tailwind CSS",        color: "#38bdf8", description: "Utility-first CSS framework for rapidly building custom designs without leaving HTML." },
  sass:               { icon: SiSass,             label: "Sass / SCSS",         color: "#cc6699", description: "CSS preprocessor adding variables, nesting, and mixins for maintainable stylesheets." },
  css_modules:        { icon: SiCssmodules,       label: "CSS Modules",         color: "#1572b6", description: "Scoped CSS solution that prevents class name collisions in component-based architectures." },
  styled_components:  { icon: SiStyledcomponents, label: "Styled Components",   color: "#db7093", description: "CSS-in-JS library for writing component-scoped styles with dynamic theming support." },
  emotion:            { icon: FaCode,             label: "Emotion",             color: "#d36ac2", description: "Performant CSS-in-JS library with object and string styles for React applications." },
  bootstrap:          { icon: SiBootstrap,        label: "Bootstrap",           color: "#7952b3", description: "Popular CSS framework with a responsive grid system and pre-built UI components." },
  material_ui:        { icon: SiMui,              label: "Material UI",         color: "#007fff", description: "React component library implementing Google's Material Design with full theming support." },
  shadcn_ui:          { icon: FaBox,              label: "Shadcn/UI",           color: "#ffffff", description: "Copy-paste component library built on Radix UI and Tailwind CSS — fully customizable, no vendor lock-in." },
  radix_ui:           { icon: SiRadixui,          label: "Radix UI",            color: "#ffffff", description: "Accessible, unstyled React primitives for building high-quality design systems." },
  ant_design:         { icon: SiAntdesign,        label: "Ant Design",          color: "#1677ff", description: "Enterprise-grade React UI library with a rich set of components and design tokens." },
  chakra_ui:          { icon: SiChakraui,         label: "Chakra UI",           color: "#319795", description: "Simple, accessible React component library with a strong focus on developer experience." },
  daisyui:            { icon: SiDaisyui,          label: "DaisyUI",             color: "#ff9903", description: "Tailwind CSS component library with semantic class names and multiple built-in themes." },

  // ─── Frontend & Web — Animation ─────────────────────────────────────────────
  framer_motion:      { icon: SiFramer,           label: "Framer Motion",       color: "#00d2ff", description: "Production-ready animation library for React with declarative gestures, layout animations, and spring physics." },
  gsap:               { icon: SiGreensock,        label: "GSAP",                color: "#88ce02", description: "Industry-standard JavaScript animation library for high-performance, timeline-based animations." },
  threejs:            { icon: SiThreedotjs,       label: "Three.js",            color: "#ffffff", description: "3D graphics library for the web, enabling WebGL-powered scenes and interactive 3D experiences." },
  react_spring:       { icon: FaBolt,             label: "React Spring",        color: "#61dafb", description: "Physics-based animation library for React that models real-world spring dynamics." },
  lottie:             { icon: SiLottiefiles,      label: "Lottie",              color: "#00ddb4", description: "Renders Adobe After Effects animations as lightweight, scalable JSON in web and mobile apps." },

  // ─── Frontend & Web — State Management ──────────────────────────────────────
  redux_toolkit:      { icon: SiRedux,            label: "Redux Toolkit",       color: "#764abc", description: "Opinionated Redux setup with simplified reducers, async thunks, and built-in immer integration." },
  zustand:            { icon: FaAtom,             label: "Zustand",             color: "#f16728", description: "Minimal, un-opinionated React state management with a simple API and no boilerplate." },
  jotai:              { icon: FaAtom,             label: "Jotai",               color: "#ffffff", description: "Atomic state management for React inspired by Recoil, with a bottom-up approach to shared state." },
  recoil:             { icon: SiRecoil,           label: "Recoil",              color: "#3578e5", description: "Facebook's experimental state management library for React using atoms and selectors." },
  mobx:               { icon: SiMobx,             label: "MobX",                color: "#ff7102", description: "Reactive state management that automatically tracks dependencies and updates views." },
  react_query:        { icon: SiReactquery,       label: "React Query",         color: "#ff4154", description: "Powerful async state management for fetching, caching, and synchronizing server data in React." },
  tanstack_start:     { icon: SiReactquery,       label: "TanStack Start",      color: "#ff4154", description: "Full-stack React framework from the TanStack team with type-safe routing and server functions." },
  swr:                { icon: SiSwr,              label: "SWR",                 color: "#ffffff", description: "React hooks library for remote data fetching with stale-while-revalidate caching strategy." },
  xstate:             { icon: SiXstate,           label: "XState",              color: "#ffffff", description: "State machine and statechart library for managing complex application logic predictably." },
  pinia:              { icon: SiPinia,            label: "Pinia",               color: "#ffd859", description: "The official Vue state management library with a clean, modular API and TypeScript support." },

  // ─── Frontend & Web — API & Communication ───────────────────────────────────
  rest_api:           { icon: FaServer,           label: "REST API",            color: "#6b7280", description: "Architectural style for building stateless HTTP APIs with standard CRUD operations." },
  trpc:               { icon: SiTrpc,             label: "tRPC",                color: "#398ccb", description: "End-to-end type-safe API layer that eliminates the need for schemas or code generation." },
  apollo_client:      { icon: SiApollographql,    label: "Apollo Client",       color: "#311c87", description: "Comprehensive GraphQL client with caching, optimistic updates, and React integration." },
  axios:              { icon: FaCode,             label: "Axios",               color: "#5a29e4", description: "Promise-based HTTP client with request/response interceptors and automatic JSON parsing." },
  websockets:         { icon: FaPlug,             label: "WebSockets",          color: "#6b7280", description: "Protocol for full-duplex, real-time communication between client and server." },
  socket_io:          { icon: SiSocketdotio,      label: "Socket.io",           color: "#ffffff", description: "Real-time event-based communication library with fallback transport and room support." },

  // ─── Frontend & Web — Build Tools ───────────────────────────────────────────
  vite:               { icon: SiVite,             label: "Vite",                color: "#646cff", description: "Lightning-fast build tool using native ES modules for near-instant HMR during development." },
  webpack:            { icon: SiWebpack,          label: "Webpack",             color: "#8dd6f9", description: "Powerful module bundler for JavaScript with extensive plugin and loader ecosystem." },
  turbopack:          { icon: SiTurborepo,        label: "Turbopack",           color: "#ffffff", description: "Rust-based successor to Webpack, designed for ultra-fast incremental builds in Next.js." },
  rollup:             { icon: SiRollupdotjs,      label: "Rollup",              color: "#ff3333", description: "ES module bundler optimized for libraries, producing clean, tree-shaken output." },
  esbuild:            { icon: SiEsbuild,          label: "esbuild",             color: "#ffcf00", description: "Extremely fast JavaScript bundler and minifier written in Go." },
  parcel:             { icon: FaBox,              label: "Parcel",              color: "#c07c3b", description: "Zero-config web application bundler with automatic transforms and hot reloading." },
  babel:              { icon: SiBabel,            label: "Babel",               color: "#f9dc3e", description: "JavaScript compiler that transforms modern ES2015+ syntax for older browser compatibility." },
  swc:                { icon: SiSwc,              label: "SWC",                 color: "#f47a1f", description: "Rust-based JavaScript/TypeScript compiler used by Next.js and Vite for fast transforms." },

  // ─── Frontend & Web — Other ─────────────────────────────────────────────────
  pwa:                { icon: SiPwa,              label: "PWA",                 color: "#5a0fc8", description: "Progressive Web App techniques enabling offline support, installability, and native-like experiences." },
  wasm:               { icon: SiWebassembly,      label: "WebAssembly",         color: "#654ff0", description: "Binary instruction format enabling near-native performance for compute-heavy web tasks." },

  // ─── Mobile ─────────────────────────────────────────────────────────────────
  react_native:       { icon: SiReact,            label: "React Native",        color: "#61dafb", description: "Cross-platform mobile framework for building iOS and Android apps with React and native APIs." },
  expo:               { icon: SiExpo,             label: "Expo",                color: "#f59e0b", description: "Managed React Native platform with OTA updates, EAS Build, and a rich SDK for device features." },
  nativewind:         { icon: SiTailwindcss,      label: "NativeWind",          color: "#38bdf8", description: "Tailwind CSS utility classes for React Native, enabling consistent styling across platforms." },
  flutter:            { icon: SiFlutter,          label: "Flutter",             color: "#54c5f8", description: "Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from one codebase." },
  swift:              { icon: SiSwift,            label: "Swift",               color: "#f05138", description: "Apple's powerful, safe programming language for iOS, macOS, and system-level development." },
  swiftui:            { icon: SiSwift,            label: "SwiftUI",             color: "#f05138", description: "Apple's declarative UI framework for building native iOS and macOS apps with live previews." },
  kotlin:             { icon: SiKotlin,           label: "Kotlin",              color: "#7f52ff", description: "Modern, concise language for Android development with full Java interoperability." },
  dart:               { icon: SiDart,             label: "Dart",                color: "#00b4ab", description: "Optimized language for Flutter development with strong typing and async support." },

  // ─── Backend & Database — Languages ─────────────────────────────────────────
  python:             { icon: SiPython,           label: "Python",              color: "#3572a5", description: "Versatile language used for scripting, data processing, APIs, and AI/ML workflows." },
  go:                 { icon: SiGo,               label: "Go",                  color: "#00add8", description: "Statically typed language by Google known for high concurrency performance and simple syntax." },
  rust:               { icon: SiRust,             label: "Rust",                color: "#f74c00", description: "Systems programming language offering memory safety without a garbage collector." },
  php:                { icon: SiPhp,              label: "PHP",                 color: "#777bb4", description: "Widely-used server-side scripting language powering a large portion of the web." },
  ruby:               { icon: SiRuby,             label: "Ruby",                color: "#cc342d", description: "Elegant, developer-friendly language known for its expressive syntax and Rails ecosystem." },
  java:               { icon: FaJava,             label: "Java",                color: "#f89820", description: "Strongly-typed, object-oriented language widely used in enterprise backend and Android development." },

  // ─── Backend & Database — Frameworks ────────────────────────────────────────
  nodejs:             { icon: SiNodedotjs,        label: "Node.js",             color: "#68a063", description: "JavaScript runtime for building fast, scalable server-side applications and APIs." },
  expressjs:          { icon: SiExpress,          label: "Express.js",          color: "#ffffff", description: "Minimal Node.js web framework for building REST APIs and middleware pipelines." },
  fastify:            { icon: SiFastify,          label: "Fastify",             color: "#ffffff", description: "High-performance Node.js framework with schema-based validation and plugin architecture." },
  nestjs:             { icon: SiNestjs,           label: "NestJS",              color: "#e0234e", description: "Progressive Node.js framework with TypeScript-first design and Angular-inspired module system." },
  hono:               { icon: SiHono,             label: "Hono",                color: "#f36b13", description: "Ultrafast web framework for edge runtimes like Cloudflare Workers and Bun." },
  django:             { icon: SiDjango,           label: "Django",              color: "#44b78b", description: "High-level Python web framework with batteries-included ORM, auth, and admin panel." },
  fastapi:            { icon: SiFastapi,          label: "FastAPI",             color: "#009688", description: "Modern Python API framework with automatic OpenAPI docs and async support." },
  flask:              { icon: SiFlask,            label: "Flask",               color: "#ffffff", description: "Lightweight Python micro-framework for building simple APIs and web services." },
  laravel:            { icon: SiLaravel,          label: "Laravel",             color: "#ff2d20", description: "Elegant PHP framework with expressive syntax, Eloquent ORM, and rich ecosystem." },
  spring_boot:        { icon: SiSpringboot,       label: "Spring Boot",         color: "#6db33f", description: "Java framework for building production-ready microservices with auto-configuration." },
  rails:              { icon: SiRubyonrails,      label: "Ruby on Rails",       color: "#cc0000", description: "Convention-over-configuration Ruby framework for rapid full-stack web development." },

  // ─── Backend & Database — Databases ─────────────────────────────────────────
  convex:             { icon: FaBolt,             label: "Convex",              color: "#f5a623", description: "Real-time backend platform with reactive queries, ACID transactions, and serverless functions." },
  postgresql:         { icon: SiPostgresql,       label: "PostgreSQL",          color: "#336791", description: "Powerful open-source relational database with advanced features like JSON support and full-text search." },
  neon:               { icon: SiPostgresql,       label: "Neon",                color: "#00e5bf", description: "Serverless PostgreSQL platform with autoscaling, branching, and instant cold starts." },
  mysql:              { icon: SiMysql,            label: "MySQL",               color: "#4479a1", description: "Widely-used open-source relational database, common in web applications and CMSes." },
  sqlite:             { icon: SiSqlite,           label: "SQLite",              color: "#003b57", description: "Lightweight, file-based relational database ideal for local development and embedded applications." },
  mongodb:            { icon: SiMongodb,          label: "MongoDB",             color: "#4db33d", description: "Document-oriented NoSQL database for flexible, schema-less data at scale." },
  redis:              { icon: SiRedis,            label: "Redis",               color: "#dc382d", description: "In-memory key-value store used for caching, sessions, pub/sub, and real-time leaderboards." },
  dynamodb:           { icon: FaDatabase,         label: "DynamoDB",            color: "#4053d6", description: "AWS fully managed NoSQL database with single-digit millisecond performance at any scale." },
  supabase:           { icon: SiSupabase,         label: "Supabase",            color: "#3ecf8e", description: "Open-source Firebase alternative with PostgreSQL, auth, storage, and real-time subscriptions." },
  firebase:           { icon: SiFirebase,         label: "Firebase",            color: "#ffca28", description: "Google's app platform with real-time database, auth, Firestore, and cloud functions." },
  elasticsearch:      { icon: SiElasticsearch,    label: "Elasticsearch",       color: "#f04e98", description: "Distributed search and analytics engine for full-text search and log monitoring." },

  // ─── Backend & Database — ORMs ───────────────────────────────────────────────
  prisma:             { icon: SiPrisma,           label: "Prisma",              color: "#ffffff", description: "Next-generation ORM with type-safe queries, auto-migrations, and a visual database browser." },
  drizzle:            { icon: SiDrizzle,          label: "Drizzle ORM",         color: "#c5f74f", description: "Lightweight TypeScript ORM with SQL-like syntax and zero overhead over raw queries." },
  typeorm:            { icon: SiTypeorm,          label: "TypeORM",             color: "#e83524", description: "Feature-rich ORM for TypeScript and JavaScript with decorator-based entity definitions." },
  sequelize:          { icon: SiSequelize,        label: "Sequelize",           color: "#03afef", description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and MSSQL." },
  mongoose:           { icon: SiMongoose,         label: "Mongoose",            color: "#880000", description: "Elegant MongoDB object modeling for Node.js with schema validation and middleware hooks." },
  knex:               { icon: SiKnexdotjs,        label: "Knex.js",             color: "#e16426", description: "SQL query builder for Node.js that works with Postgres, MySQL, and SQLite." },

  // ─── Backend & Database — Messaging ─────────────────────────────────────────
  kafka:              { icon: SiApachekafka,      label: "Apache Kafka",        color: "#ffffff", description: "Distributed event streaming platform for high-throughput, fault-tolerant data pipelines." },
  rabbitmq:           { icon: SiRabbitmq,         label: "RabbitMQ",            color: "#ff6600", description: "Message broker implementing AMQP for reliable async communication between services." },

  // ─── Auth & Tools — Auth ─────────────────────────────────────────────────────
  betterauth:         { icon: SiBetterauth,       label: "BetterAuth",          color: "#ffffff", description: "Framework-agnostic TypeScript auth library with sessions, OAuth, and 2FA out of the box." },
  nextauth:           { icon: FaCode,             label: "NextAuth.js",         color: "#ffffff", description: "Authentication solution for Next.js with built-in OAuth providers and session handling." },
  authjs:             { icon: FaCode,             label: "Auth.js",             color: "#ffffff", description: "Framework-agnostic evolution of NextAuth supporting multiple runtimes and adapters." },
  clerk:              { icon: SiClerk,            label: "Clerk",               color: "#6c47ff", description: "Drop-in auth platform with pre-built UI components, MFA, organizations, and webhooks." },
  auth0:              { icon: SiAuth0,            label: "Auth0",               color: "#eb5424", description: "Enterprise identity platform with SSO, social login, RBAC, and compliance features." },
  passportjs:         { icon: SiPassport,         label: "Passport.js",         color: "#34e27a", description: "Middleware-based Node.js auth library with 500+ strategies for local and OAuth login." },
  jwt:                { icon: FaCode,             label: "JWT",                 color: "#d63aff", description: "Compact, URL-safe token format for securely transmitting claims between parties." },

  // ─── Auth & Tools — Version Control ─────────────────────────────────────────
  git:                { icon: SiGit,              label: "Git",                 color: "#f05032", description: "Distributed version control system for tracking changes and collaborating on code." },
  github:             { icon: SiGithub,           label: "GitHub",              color: "#ffffff", description: "Platform for hosting Git repositories with pull requests, Actions CI/CD, and project management." },
  gitlab:             { icon: SiGitlab,           label: "GitLab",              color: "#fc6d26", description: "DevOps platform with integrated CI/CD pipelines, issue tracking, and container registry." },

  // ─── Auth & Tools — Deployment & Hosting ────────────────────────────────────
  vercel:             { icon: SiVercel,           label: "Vercel",              color: "#ffffff", description: "Frontend cloud platform with zero-config deployments, edge functions, and preview environments." },
  netlify:            { icon: SiNetlify,          label: "Netlify",             color: "#00c7b7", description: "Web platform for deploying static sites and serverless functions with continuous deployment." },
  render:             { icon: SiRender,           label: "Render",              color: "#46e3b7", description: "Cloud platform for deploying web apps, APIs, and background workers with auto-scaling." },
  railway:            { icon: SiRailway,          label: "Railway",             color: "#ffffff", description: "Infrastructure platform that makes deploying apps, databases, and crons simple and fast." },
  flyio:              { icon: FaPlane,            label: "Fly.io",              color: "#7b3bf7", description: "Platform for running full-stack apps close to users via globally distributed VMs." },
  cloudflare_workers: { icon: SiCloudflare,       label: "Cloudflare Workers",  color: "#f48120", description: "Edge serverless platform executing code in 300+ locations worldwide with near-zero cold starts." },
  aws:                { icon: FaAws,              label: "AWS",                 color: "#ff9900", description: "Amazon's cloud platform with 200+ services covering compute, storage, databases, and AI." },
  gcp:                { icon: SiGooglecloud,      label: "Google Cloud",        color: "#4285f4", description: "Google's cloud platform for scalable compute, managed databases, and AI/ML services." },
  azure:              { icon: FaWindows,          label: "Azure",               color: "#0078d4", description: "Microsoft's enterprise cloud with deep integration into Windows, Active Directory, and .NET." },

  // ─── Auth & Tools — DevOps ───────────────────────────────────────────────────
  inngest:            { icon: FaBolt,             label: "Inngest",             color: "#e9d4ff", description: "Event-driven workflow platform for building reliable background jobs and scheduled functions." },
  docker:             { icon: SiDocker,           label: "Docker",              color: "#2496ed", description: "Container platform for packaging applications and dependencies into portable, reproducible images." },
  kubernetes:         { icon: SiKubernetes,       label: "Kubernetes",          color: "#326ce5", description: "Container orchestration system for automating deployment, scaling, and management of containerized apps." },
  github_actions:     { icon: SiGithubactions,    label: "GitHub Actions",      color: "#2088ff", description: "CI/CD platform built into GitHub for automating builds, tests, and deployments on push." },
  gitlab_cicd:        { icon: SiGitlab,           label: "GitLab CI/CD",        color: "#fc6d26", description: "Integrated pipeline system in GitLab for automated testing, building, and deploying code." },
  circleci:           { icon: SiCircleci,         label: "CircleCI",            color: "#343434", description: "CI/CD platform with fast pipelines, parallelism, and caching for modern software teams." },
  terraform:          { icon: SiTerraform,        label: "Terraform",           color: "#7b42bc", description: "Infrastructure-as-code tool for provisioning and managing cloud resources declaratively." },
  nginx:              { icon: SiNginx,            label: "Nginx",               color: "#009639", description: "High-performance web server and reverse proxy used for load balancing and serving static assets." },
  linux:              { icon: SiLinux,            label: "Linux",               color: "#fcc624", description: "Open-source operating system kernel powering most servers, cloud infrastructure, and developer tools." },

  // ─── Auth & Tools — CMS ──────────────────────────────────────────────────────
  sanity:             { icon: SiSanity,           label: "Sanity",              color: "#f04022", description: "Headless CMS with a real-time collaborative studio, GROQ query language, and portable text." },
  contentful:         { icon: SiContentful,       label: "Contentful",          color: "#2478cc", description: "API-first headless CMS for managing and delivering structured content across platforms." },
  strapi:             { icon: SiStrapi,           label: "Strapi",              color: "#4945ff", description: "Open-source headless CMS with customizable content types, REST and GraphQL APIs." },
  payload_cms:        { icon: SiPayloadcms,       label: "Payload CMS",         color: "#ffffff", description: "TypeScript-first headless CMS that lives inside your Next.js app with no external service needed." },
  directus:           { icon: SiDirectus,         label: "Directus",            color: "#6644ff", description: "Open-source data platform wrapping any SQL database with a no-code studio and REST/GraphQL API." },
  wordpress:          { icon: SiWordpress,        label: "WordPress",           color: "#21759b", description: "World's most popular CMS powering 40% of the web, with a massive plugin ecosystem." },

  // ─── Auth & Tools — AI & APIs ────────────────────────────────────────────────
  openai_api:         { icon: SiOpenai,           label: "OpenAI",              color: "#ffffff", description: "API access to GPT-4 and o-series models for chat, completions, embeddings, and vision tasks." },
  openrouter:         { icon: FaCode,             label: "OpenRouter",          color: "#6366f1", description: "Unified API gateway for 200+ LLMs including GPT, Claude, Gemini, and open-source models." },
  anthropic_api:      { icon: SiAnthropic,        label: "Anthropic",           color: "#d97757", description: "API access to Claude — Anthropic's AI assistant known for safety, long context, and reasoning." },
  langchain:          { icon: SiLangchain,        label: "LangChain",           color: "#ffffff", description: "Framework for building LLM-powered applications with chains, agents, and retrieval-augmented generation." },
  hugging_face:       { icon: SiHuggingface,      label: "Hugging Face",        color: "#ff9d00", description: "Hub for open-source ML models, datasets, and spaces with a Python SDK for inference and fine-tuning." },
  gemini_api:         { icon: SiGooglegemini,     label: "Gemini",              color: "#4285f4", description: "Google's multimodal AI API supporting text, image, audio, and video understanding." },
  groq_api:           { icon: FaBolt,             label: "Groq",                color: "#f55036", description: "Inference API delivering ultra-fast LLM responses using custom LPU hardware." },
  ollama:             { icon: SiOllama,           label: "Ollama",              color: "#ffffff", description: "Tool for running open-source LLMs like Llama and Mistral locally with a simple CLI and API." },
  deepseek_api:       { icon: FaCode,             label: "DeepSeek",            color: "#4d6bfe", description: "High-performance open-source LLM API known for strong reasoning and coding capabilities." },
  stripe:             { icon: SiStripe,           label: "Stripe",              color: "#635bff", description: "Developer-first payment platform for accepting payments, managing subscriptions, and handling billing." },
  resend:             { icon: SiResend,           label: "Resend",              color: "#ffffff", description: "Modern email API for developers with React-based templates and high deliverability." },
  polar:              { icon: FaCode,             label: "Polar",               color: "#3451b2", description: "Open-source monetization platform for developers with subscriptions, one-time payments, and benefits." },
  revenuecat:         { icon: SiRevenuecat,       label: "RevenueCat",          color: "#f25a5a", description: "In-app purchase and subscription management SDK for iOS and Android with analytics." },
  swagger:            { icon: SiSwagger,          label: "Swagger",             color: "#85ea2d", description: "OpenAPI toolset for designing, documenting, and testing REST APIs with interactive UI." },

  // ─── Auth & Tools — Testing ──────────────────────────────────────────────────
  jest:               { icon: SiJest,             label: "Jest",                color: "#c21325", description: "Delightful JavaScript testing framework with built-in mocking, coverage, and snapshot support." },
  vitest:             { icon: SiVitest,           label: "Vitest",              color: "#729b1b", description: "Vite-native unit testing framework that's fast, ESM-first, and compatible with Jest APIs." },
  playwright:         { icon: FaCode,             label: "Playwright",          color: "#2ead33", description: "Cross-browser end-to-end testing framework supporting Chromium, Firefox, and WebKit." },
  cypress:            { icon: SiCypress,          label: "Cypress",             color: "#04c38e", description: "JavaScript E2E testing framework with real-time browser interaction and time-travel debugging." },
  testing_library:    { icon: SiTestinglibrary,   label: "Testing Library",     color: "#e33332", description: "Testing utilities focused on user behavior, querying elements the way users find them." },
  storybook:          { icon: SiStorybook,        label: "Storybook",           color: "#ff4785", description: "UI component workshop for building, documenting, and testing components in isolation." },

  // ─── Auth & Tools — Code Quality & Monorepo ──────────────────────────────────
  eslint:             { icon: SiEslint,           label: "ESLint",              color: "#4b32c3", description: "Pluggable JavaScript linter for enforcing code style and catching potential errors early." },
  prettier:           { icon: SiPrettier,         label: "Prettier",            color: "#f7b93e", description: "Opinionated code formatter that enforces consistent style across the entire codebase." },
  zod:                { icon: SiZod,              label: "Zod",                 color: "#3068b7", description: "TypeScript-first schema validation library for parsing and validating data at runtime." },
  turborepo:          { icon: SiTurborepo,        label: "Turborepo",           color: "#ffffff", description: "High-performance monorepo build system with intelligent caching and task pipelines." },
  nx:                 { icon: SiNx,               label: "Nx",                  color: "#143055", description: "Smart monorepo tool with affected-based task running, code generation, and plugin ecosystem." },

  // ─── Auth & Tools — Design & Desktop ─────────────────────────────────────────
  figma:              { icon: SiFigma,            label: "Figma",               color: "#f24e1e", description: "Collaborative design tool for building UIs, prototypes, and design systems in the browser." },
  electron:           { icon: SiElectron,         label: "Electron",            color: "#47848f", description: "Framework for building cross-platform desktop apps with web technologies." },
  tauri:              { icon: SiTauri,            label: "Tauri",               color: "#ffc131", description: "Rust-based desktop app framework producing smaller, faster, and more secure binaries than Electron." },
};
