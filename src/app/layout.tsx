import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

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
    "frontend developer",
    "mobile developer",
    "Next.js",
    "React",
    "React Native",
    "Expo",
    "SwiftUI",
    "TypeScript",
    "Tailwind CSS",
    "web developer",
    "iOS developer",
    "portfolio",
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
          {children}
          <SanityLive />
        </body>
    </html>
  );
}
