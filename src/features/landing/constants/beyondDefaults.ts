export type PlanetMark = {
  _id: string;
  emoji: string;
  nickname?: string;
  mark: string;
  imageUrl?: string;
  submittedAt: string;
};

export type ValueDef = {
  id: string;
  label: string;
  title: string;
  body: string;
  images?: string[];
  accentColor: string;
  accentBg: string;
  marks: PlanetMark[];
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
  "rgba(74,144,217,0.12)", // Earth
  "rgba(207,77,42,0.12)", // Mars
  "rgba(200,139,58,0.12)", // Jupiter
  "rgba(228,201,138,0.12)", // Saturn
  "rgba(125,232,232,0.12)", // Uranus
  "rgba(75,112,221,0.12)", // Neptune
  "rgba(140,115,85,0.12)", // Pluto
];
