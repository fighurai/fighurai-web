"use client";

import { useRouter } from "next/navigation";

import { AboutSection } from "@/components/about-section";

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl flex-1 overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-14">
      <AboutSection
        onOpenChat={() => router.push("/")}
        onOpenContact={() => router.push("/contact")}
      />
    </div>
  );
}
