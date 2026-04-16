"use client";

import { useRouter } from "next/navigation";

import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";

export default function ConsultingPage() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-10 sm:px-6 sm:py-14">
      <HeroSection
        onOpenChat={() => router.push("/")}
        onOpenMembership={() => router.push("/membership")}
      />
      <ServicesSection />
    </div>
  );
}
