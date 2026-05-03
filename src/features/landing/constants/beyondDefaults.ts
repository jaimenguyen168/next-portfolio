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
  "#a8a8a8", // Mercury  — gray/silver
  "#e8c97e", // Venus    — warm golden yellow
  "#4a90d9", // Earth    — ocean blue
  "#cf4d2a", // Mars     — red-orange
  "#c88b3a", // Jupiter  — brown/amber
  "#e4c98a", // Saturn   — pale gold
  "#7de8e8", // Uranus   — cyan/teal
  "#4b70dd", // Neptune  — deep blue
  "#8c7355", // Pluto    — dusty brown
];

export const ACCENT_BG = [
  "rgba(168,168,168,0.12)", // Mercury
  "rgba(232,201,126,0.12)", // Venus
  "rgba(74,144,217,0.12)",  // Earth
  "rgba(207,77,42,0.12)",   // Mars
  "rgba(200,139,58,0.12)",  // Jupiter
  "rgba(228,201,138,0.12)", // Saturn
  "rgba(125,232,232,0.12)", // Uranus
  "rgba(75,112,221,0.12)",  // Neptune
  "rgba(140,115,85,0.12)",  // Pluto
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
    label: "Earth",
    title: "Down to earth... atmosphere",
    body: "I'm a dreamer at heart, but a thinker in practice. As I grow older, I find myself drawn less to speed and more to rhythm, a good cup of coffee, and the space to think clearly. Finding that balance isn't just a goal; it's how I stay honest with myself. When my mind is at peace, I see a clearer reflection of who I am in the people around me. And somehow, that's where the best of me tends to show up.",
    accentColor: ACCENT_COLORS[2],
    accentBg: ACCENT_BG[2],
  },
  {
    // ♂ Mars — drive, execution, showing up
    id: "drive",
    label: "Drive",
    title: "I'm going the extra miles, for Mars",
    body: "I'm the kind of person who stays busy by choice, not by accident. Consistency, due diligence, and showing up are the things I keep coming back to, especially when it matters most. When I believe in something, I naturally go further than what's asked. That's just who I am.",
    accentColor: ACCENT_COLORS[3],
    accentBg: ACCENT_BG[3],
  },
  {
    // ♃ Jupiter — exploration, adventure, big experiences
    id: "adventure",
    label: "Jupiter",
    title: "Going places, sometimes alone",
    body: "I hike, I travel, and I don't always wait for someone to come with me. Some of my best experiences have been solo, a trail with no signal, a city I never thought I would come to. I never regret saying yes to an adventure, being adventurous is what makes a life worth living",
    accentColor: ACCENT_COLORS[4],
    accentBg: ACCENT_BG[4],
  },
  {
    // ♄ Saturn — structure, accountability, self-management
    id: "structure",
    label: "Saturn",
    title: "Ongoing project: ME",
    body: "Self-management, to me, goes beyond just hitting deadlines. It’s about balancing time between work, the people I care about, and myself. I set my own goals, hold myself accountable, and keep adjusting as I go. Like orbiting something bigger, this never really ends. Life is an ongoing process of learning and unlearning every day.",
    accentColor: ACCENT_COLORS[5],
    accentBg: ACCENT_BG[5],
  },
  {
    // ♅ Uranus — creativity, thinking differently, individuality
    id: "creativity",
    label: "Uranus",
    title: "Inspired by everything around me",
    body: "I don't consider myself a creative person, but I have a deep appreciation for creativity in all shapes and forms. Old or new, it doesn't matter. When I travel, some of my favorite moments are wandering through museums, stumbling on underground art spaces, or stopping to watch a street performer. They are what inspire my ideas and the design of my work.",
    accentColor: ACCENT_COLORS[6],
    accentBg: ACCENT_BG[6],
  },
  {
    // ♆ Neptune — imagination, dreams, the unknown
    id: "imagination",
    label: "Neptune",
    title: "Embrace the unknown",
    body: "I've always been drawn to what I can't fully see yet. Imagination is how I fill in the gaps, whether it's a project that doesn't exist yet, a place I haven't been, or a version of myself still taking shape. Not knowing what comes next is not something I fear. It's something I look forward to.",
    accentColor: ACCENT_COLORS[7],
    accentBg: ACCENT_BG[7],
  },
  {
    // ♇ Pluto — transformation, reinvention, growth through change
    id: "transformation",
    label: "Pluto",
    title: "Growth is never a solo mission",
    body: "I moved to a new country, switched careers, and learned to code from scratch. That kind of change teaches you that identity isn't fixed; it's built. But growth never happens alone. The people around me, the ones I work alongside every day, are as much a part of my story as any decision I've made on my own. I'm not the same person I was five years ago, and I don't expect to be the same five years from now.",
    accentColor: ACCENT_COLORS[8],
    accentBg: ACCENT_BG[8],
  },
];
