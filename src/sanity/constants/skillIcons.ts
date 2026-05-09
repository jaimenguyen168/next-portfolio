import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiGraphql,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiAngular,
  SiSvelte,
  SiAstro,
  SiRemix,
  SiGatsby,
  SiSolid,
  SiQwik,
  SiTailwindcss,
  SiSass,
  SiCssmodules,
  SiStyledcomponents,
  SiBootstrap,
  SiMui,
  SiAntdesign,
  SiChakraui,
  SiDaisyui,
  SiRadixui,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
  SiLottiefiles,
  SiRedux,
  SiReactquery,
  SiPinia,
  SiMobx,
  SiSwr,
  SiXstate,
  SiRecoil,
  SiTrpc,
  SiApollographql,
  SiSocketdotio,
  SiVite,
  SiWebpack,
  SiTurborepo,
  SiRollupdotjs,
  SiEsbuild,
  SiBabel,
  SiSwc,
  SiPwa,
  SiWebassembly,
  SiReact as SiReactNative,
  SiExpo,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiDart,
  SiPython,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiNestjs,
  SiHono,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiLaravel,
  SiSpringboot,
  SiRubyonrails,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiElasticsearch,
  SiPrisma,
  SiDrizzle,
  SiTypeorm,
  SiSequelize,
  SiMongoose,
  SiKnexdotjs,
  SiApachekafka,
  SiRabbitmq,
  SiClerk,
  SiAuth0,
  SiPassport,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiNetlify,
  SiRender,
  SiRailway,
  SiCloudflare,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiCircleci,
  SiTerraform,
  SiNginx,
  SiLinux,
  SiSanity,
  SiContentful,
  SiStrapi,
  SiPayloadcms,
  SiDirectus,
  SiWordpress,
  SiOpenai,
  SiAnthropic,
  SiLangchain,
  SiHuggingface,
  SiGooglegemini,
  SiOllama,
  SiRevenuecat,
  SiStripe,
  SiSwagger,
  SiJest,
  SiVitest,
  SiCypress,
  SiTestinglibrary,
  SiStorybook,
  SiEslint,
  SiPrettier,
  SiZod,
  SiNx,
  SiFigma,
  SiElectron,
  SiTauri,
} from "react-icons/si";

import {
  FaJava,
  FaCode,
  FaDatabase,
  FaServer,
  FaPlug,
  FaBolt,
  FaBox,
  FaAtom,
  FaWindows,
  FaPlane,
  FaAws,
} from "react-icons/fa";

import type { IconType } from "react-icons";

export const SKILL_ICONS: Record<string, IconType> = {
  // ─── Frontend & Web ────────────────────────────────────────────────────────

  // Languages
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss,
  graphql: SiGraphql,

  // Frameworks
  react: SiReact,
  nextjs: SiNextdotjs,
  vuejs: SiVuedotjs,
  nuxtjs: SiNuxt,
  angular: SiAngular,
  svelte: SiSvelte,
  sveltekit: SiSvelte, // No dedicated SvelteKit icon
  astro: SiAstro,
  remix: SiRemix,
  gatsby: SiGatsby,
  solidjs: SiSolid,
  qwik: SiQwik,

  // Styling
  tailwindcss: SiTailwindcss,
  sass: SiSass,
  css_modules: SiCssmodules,
  styled_components: SiStyledcomponents,
  emotion: FaCode, // No Emotion icon
  bootstrap: SiBootstrap,
  material_ui: SiMui,
  shadcn_ui: FaBox, // No Shadcn/UI icon
  radix_ui: SiRadixui,
  ant_design: SiAntdesign,
  chakra_ui: SiChakraui,
  daisyui: SiDaisyui,

  // Animation
  framer_motion: SiFramer,
  gsap: SiGreensock,
  threejs: SiThreedotjs,
  react_spring: FaBolt, // No React Spring icon
  lottie: SiLottiefiles,

  // State Management
  redux_toolkit: SiRedux,
  zustand: FaAtom, // No Zustand icon
  jotai: FaAtom, // No Jotai icon
  recoil: SiRecoil,
  mobx: SiMobx,
  react_query: SiReactquery,
  swr: SiSwr,
  xstate: SiXstate,
  pinia: SiPinia,

  // API & Communication
  rest_api: FaServer,
  trpc: SiTrpc,
  apollo_client: SiApollographql,
  axios: FaCode, // No Axios icon
  websockets: FaPlug,
  socket_io: SiSocketdotio,

  // Build Tools
  vite: SiVite,
  webpack: SiWebpack,
  turbopack: SiTurborepo, // No Turbopack icon
  rollup: SiRollupdotjs,
  esbuild: SiEsbuild,
  parcel: FaBox, // No Parcel icon
  babel: SiBabel,
  swc: SiSwc,

  // PWA / WASM
  pwa: SiPwa,
  wasm: SiWebassembly,

  // ─── Mobile ──────────────────────────────────────────────────────────────────

  react_native: SiReactNative, // Same icon as React
  expo: SiExpo,
  nativewind: SiTailwindcss, // NativeWind = Tailwind for React Native
  flutter: SiFlutter,
  swift: SiSwift,
  swiftui: SiSwift,
  kotlin: SiKotlin,
  dart: SiDart,

  // ─── Backend & Database ───────────────────────────────────────────────────────

  // Languages
  python: SiPython,
  go: SiGo,
  rust: SiRust,
  php: SiPhp,
  ruby: SiRuby,
  java: FaJava,

  // Frameworks
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  fastify: SiFastify,
  nestjs: SiNestjs,
  hono: SiHono,
  django: SiDjango,
  fastapi: SiFastapi,
  flask: SiFlask,
  laravel: SiLaravel,
  spring_boot: SiSpringboot,
  rails: SiRubyonrails,

  // Databases
  postgresql: SiPostgresql,
  neon: SiPostgresql, // Neon is serverless Postgres
  mysql: SiMysql,
  sqlite: SiSqlite,
  mongodb: SiMongodb,
  redis: SiRedis,
  dynamodb: FaDatabase, // No DynamoDB icon
  supabase: SiSupabase,
  firebase: SiFirebase,
  elasticsearch: SiElasticsearch,

  // ORMs
  prisma: SiPrisma,
  drizzle: SiDrizzle,
  typeorm: SiTypeorm,
  sequelize: SiSequelize,
  mongoose: SiMongoose,
  knex: SiKnexdotjs,

  // Messaging
  kafka: SiApachekafka,
  rabbitmq: SiRabbitmq,

  // ─── Auth & Tools ─────────────────────────────────────────────────────────────

  // Auth
  nextauth: FaCode, // No NextAuth icon
  authjs: FaCode, // No Auth.js icon
  clerk: SiClerk,
  auth0: SiAuth0,
  passportjs: SiPassport,
  jwt: FaCode, // No JWT icon

  // Version Control
  git: SiGit,
  github: SiGithub,
  gitlab: SiGitlab,

  // Deployment & Hosting
  vercel: SiVercel,
  netlify: SiNetlify,
  render: SiRender,
  railway: SiRailway,
  flyio: FaPlane, // No Fly.io icon
  cloudflare_workers: SiCloudflare,
  aws: FaAws,
  gcp: SiGooglecloud,
  azure: FaWindows, // No Azure icon

  // DevOps
  docker: SiDocker,
  kubernetes: SiKubernetes,
  github_actions: SiGithubactions,
  gitlab_cicd: SiGitlab,
  circleci: SiCircleci,
  terraform: SiTerraform,
  nginx: SiNginx,
  linux: SiLinux,

  // CMS
  sanity: SiSanity,
  contentful: SiContentful,
  strapi: SiStrapi,
  payload_cms: SiPayloadcms,
  directus: SiDirectus,
  wordpress: SiWordpress,

  // AI & APIs
  openai_api: SiOpenai,
  anthropic_api: SiAnthropic,
  langchain: SiLangchain,
  hugging_face: SiHuggingface,
  gemini_api: SiGooglegemini,
  groq_api: FaBolt, // No Groq icon
  ollama: SiOllama,
  deepseek_api: FaCode, // No DeepSeek icon
  stripe: SiStripe,
  polar: FaCode, // No Polar icon
  revenuecat: SiRevenuecat,
  swagger: SiSwagger,

  // Testing
  jest: SiJest,
  vitest: SiVitest,
  playwright: FaCode, // Not in this react-icons version
  cypress: SiCypress,
  testing_library: SiTestinglibrary,
  storybook: SiStorybook,

  // Code Quality & Monorepo
  eslint: SiEslint,
  prettier: SiPrettier,
  zod: SiZod,
  turborepo: SiTurborepo,
  nx: SiNx,

  // Design
  figma: SiFigma,

  // Desktop
  electron: SiElectron,
  tauri: SiTauri,
};
