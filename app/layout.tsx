import type { Metadata, Viewport } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Caesar Hinlo | Certified Vue.js Developer & Senior Full-Stack Developer",
  keywords: [
    "hinlocaesar",
    "Caesar Hinlo",
    "Certified Vue.js Developer",
    "Senior Full-Stack Developer",
    "React",
    "Next.js",
    "Laravel",
    "Python",
    "Embedded Systems",
  ],
  description:
    "Caesar Herman Hinlo, Certified Vue.js Developer and Senior Full-Stack Software Engineer with 14 years of experience across embedded systems and modern web development using Vue, React, Next.js, Python, and Laravel.",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The hero content sits under a fixed header, and this is what lets the
  // layout extend into the display's safe area on notched phones.
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

/**
 * No hand-written `<link rel="preload">` for the hero backdrop.
 *
 * This template used to preload `assets/hero-team.webp` by hand, because the
 * largest-contentful-paint element lives in the body and is otherwise only
 * discovered after the stylesheet has parsed. Next.js 16 detects the LCP image
 * and emits that preload itself, as the first element in `<head>`, which is the
 * same request at the same time. Adding one by hand only produced a second,
 * identical `<link>`.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Next.js 16 no longer neutralises `scroll-behavior: smooth` during
    // navigation by default; opting back in keeps in-page anchor jumps -- which
    // is how every nav link on this page works -- animating rather than snapping.
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
