export type ValueDef = {
  id: string;
  label: string;
  title: string;
  body: string;
  images?: string[];
  accentColor: string;
  accentBg: string;
};

export const ACCENT_COLORS = [
  "#f59e0b",
  "#818cf8",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#60a5fa",
  "#a78bfa",
  "#e879f9",
];

export const ACCENT_BG = [
  "rgba(245,158,11,0.15)",
  "rgba(99,102,241,0.15)",
  "rgba(52,211,153,0.15)",
  "rgba(244,114,182,0.15)",
  "rgba(251,146,60,0.15)",
  "rgba(96,165,250,0.15)",
  "rgba(167,139,250,0.15)",
  "rgba(232,121,249,0.15)",
];

export const DEFAULT_BEYOND_VALUES: ValueDef[] = [
  {
    // ☿ Mercury — fast, always moving, always asking
    id: "curiosity",
    label: "Venus",
    title: "Curiosity sometimes saves the cat",
    body: "Life is full of wonder, and I've always seen myself as someone who can't stop asking questions. That itch drives me every day to seek answers. I don't waste time looking for them — but not all of them are always there, and that's the beauty of it. In the age of AI, I often wonder: will there be a day it helps us answer the questions we once thought were unanswerable?",
    accentColor: ACCENT_COLORS[0],
    accentBg: ACCENT_BG[0],
  },
  {
    // ♀ Venus — relationships, people, emotional intelligence
    id: "connection",
    label: "Venus",
    title: "Good people, good time",
    body: "I treasure friendship and companionship more than most things. When life is good, I cherish those moments with the people I love — when life is hard, I turn to them for guidance. They're my second family, the ones who push me emotionally and intellectually. Good people don't just improve the work. They elevate everything around them.",
    accentColor: ACCENT_COLORS[1],
    accentBg: ACCENT_BG[1],
  },
  {
    // 🌍 Earth — balance, daily life, routines, coffee, grounding
    id: "balance",
    label: "Balance",
    title: "Coffee first, everything else second",
    body: "I protect my mornings. A good cup of coffee, no notifications, some quiet — that's how I reset and think clearly. Not everything has to move fast. The best ideas come when you slow down enough to actually notice them.",
    accentColor: ACCENT_COLORS[2],
    accentBg: ACCENT_BG[2],
  },
  {
    // ♂ Mars — drive, execution, showing up
    id: "drive",
    label: "Drive",
    title: "Show up. Do the work. Repeat.",
    body: "I don't wait for motivation. I build the habit and let consistency do the heavy lifting. Whether it's a side project, a workout, or something I don't feel like doing — I've learned that showing up on the hard days is what actually separates people.",
    accentColor: ACCENT_COLORS[3],
    accentBg: ACCENT_BG[3],
  },
  {
    // ♃ Jupiter — exploration, adventure, big experiences
    id: "adventure",
    label: "Adventure",
    title: "I go places, sometimes alone",
    body: "I hike, I travel, and I don't always wait for someone to come with me. Some of my best experiences have been solo — a trail with no signal, a city where I don't speak the language. Getting comfortable being uncomfortable is something I practice off-screen too.",
    accentColor: ACCENT_COLORS[4],
    accentBg: ACCENT_BG[4],
  },
  {
    // ♄ Saturn — structure, accountability, self-management
    id: "structure",
    label: "Structure",
    title: "I run myself like a project",
    body: "No one tells me when to work, what to prioritize, or how to stay on track — I do. I set my own goals, manage my own time, and hold myself accountable. Long-term thinking beats short-term hustle, and I plan accordingly.",
    accentColor: ACCENT_COLORS[5],
    accentBg: ACCENT_BG[5],
  },
  {
    // ♅ Uranus — creativity, thinking differently, individuality
    id: "creativity",
    label: "Creativity",
    title: "I think sideways",
    body: "My best solutions rarely come from the obvious path. I approach problems from odd angles, connect unrelated things, and enjoy the moments when something clicks in an unexpected way. Coming from outside the traditional tech path gave me a way of seeing things that I still rely on.",
    accentColor: ACCENT_COLORS[6],
    accentBg: ACCENT_BG[6],
  },
  {
    // ♇ Pluto — transformation, reinvention, growth through change
    id: "transformation",
    label: "Growth",
    title: "I've rebuilt myself before",
    body: "I moved to a new country, switched careers, and learned to code from scratch. That kind of change teaches you that identity isn't fixed — it's built. I'm not the same person I was five years ago, and I don't expect to be the same five years from now either.",
    accentColor: ACCENT_COLORS[7],
    accentBg: ACCENT_BG[7],
  },
];
