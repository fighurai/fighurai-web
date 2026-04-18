"use client";

import { useRouter } from "next/navigation";

import { AboutSection } from "@/components/about-section";

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto py-10 sm:py-14">
      <AboutSection
        onOpenChat={() => router.push("/")}
        onOpenContact={() => router.push("/contact")}
      />
    </div>
  );
}
