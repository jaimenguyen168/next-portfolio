import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SanityLive } from "@/sanity/lib/live";
import ChatWidgetLoader from "@/features/chat/components/chat-widget-loader";
import { PageViewTracker } from "@/components/page-view-tracker";
import { PostHogProvider } from "@/components/posthog-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://jaimenguyen.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Jaime Nguyen | Frontend & Mobile Developer",
    template: "%s | Jaime Nguyen",
  },
  description:
    "Frontend and mobile developer specialising in Next.js, React Native, Expo, and SwiftUI. I build polished, production-ready web and mobile apps.",
  keywords: [
    "Jaime Nguyen",
    "Phuoc Nguyen",
    "Phuoc Dat Nguyen",
    "Jaime Nguyen developer",
    "jaimenguyen",
    "jaimenguyen.com",
    "frontend developer",
    "mobile developer",
    "full stack developer",
    "software engineer portfolio",
    "AI developer",
    "web developer",
    "iOS developer",
    "Android developer",
    "Next.js developer",
    "React Native developer",
    "Expo developer",
    "SwiftUI developer",
    "TypeScript",
    "Tailwind CSS",
    "Convex developer",
    "Clerk authentication",
    "tRPC",
    "Inngest",
    "Drizzle ORM",
    "Neon database",
    "BetterAuth",
    "Resend email",
    "OpenRouter AI",
    "Polar payments",
    "TanStack Start",
    "Firebase",
    "Stripe",
    "Prisma ORM",
    "Zustand",
    "Shadcn UI",
    "portfolio",
    "Temple University developer",
    "Temple University computer science",
    "Temple University computer science graduate",
    "Bachelor of Science Computer Science Temple",
    "best developer at Temple University",
    "Philadelphia developer",
    "Vietnamese developer",
    "HCI research",
    "capstone project Temple",
    "Tab or not to Tab",
    "Tab or not to Tab author",
    "antagonistic AI",
    "PersuAI",
    "Clover VS Code extension",
    "Clover project",
    "NextFrame",
    "NextFrame video platform",
    "Musez",
    "DevFolio",
    "devfolio.me",
    "StackCraft",
    "Nom Nom recipe app",
    "Opentunity",
    "StudyBop",
    "AI-powered app developer",
    "job matching platform",
    "recipe web app",
    "AI course generator",
    "video upload platform",
    "human-computer interaction",
  ],
  authors: [{ name: "Jaime Nguyen", url: BASE_URL }],
  creator: "Jaime Nguyen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Jaime Nguyen",
    title: "Jaime Nguyen | Frontend & Mobile Developer",
    description:
      "Frontend and mobile developer specialising in Next.js, React Native, Expo, and SwiftUI. I build polished, production-ready web and mobile apps.",
    images: [
      {
        url: "/jaime.png",
        width: 1200,
        height: 630,
        alt: "Jaime Nguyen — Frontend & Mobile Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaime Nguyen | Frontend & Mobile Developer",
    description:
      "Frontend and mobile developer specialising in Next.js, React Native, Expo, and SwiftUI.",
    images: ["/jaime.png"],
  },
  icons: {
    icon: [
      { url: "/logo.svg", media: "(prefers-color-scheme: light)" },
      { url: "/logo.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  verification: {
    google: "Q58f2PHllq1pisGi9mX0eYHeflP4KO3XyEZe1d9SkvI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          <Suspense>
            <PageViewTracker />
          </Suspense>
          {children}
          <SanityLive />
          <ChatWidgetLoader />
        </PostHogProvider>
      </body>
    </html>
  );
}
