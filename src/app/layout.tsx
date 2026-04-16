import type { Metadata } from "next";
import { DM_Sans, Fraunces, Geist_Mono } from "next/font/google";

import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const siteUrl = getSiteUrl();

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIGHURAI — Fighur it out with AI",
  description:
    "FIGHURAI: AI consulting, training, and workshops — plus Ask on this site for questions about services and how to book. Fighur it out with AI.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "FIGHURAI — Fighur it out with AI",
    description:
      "Consultation-first AI practice. Use Ask for booking and business questions, or reach out for strategy, training, and governance.",
    url: siteUrl,
    siteName: "FIGHURAI",
    locale: "en_US",
    type: "website",
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
      className={`${dmSans.variable} ${fraunces.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-deep)]">{children}</body>
    </html>
  );
}
