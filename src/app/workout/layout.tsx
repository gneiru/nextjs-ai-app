import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { AI } from "./generate";
import "../globals.css";

const meta = {
  title: "Workout Planner",
  description:
    "Demo of an Workout Planner built with Nextjs App Router and AI RSC",
};
export const metadata: Metadata = {
  ...meta,
  title: {
    default: "Workout Planner",
    template: "%s - Workout Planner",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    ...meta,
    card: "summary_large_image",
    site: "@vercel",
  },
  openGraph: {
    ...meta,
    locale: "en-US",
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`font-sans antialiased ${GeistSans.variable}${GeistMono.variable}`}
    >
      <AI>{children}</AI>
    </div>
  );
}
