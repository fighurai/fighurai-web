"use client";

import { useRouter } from "next/navigation";

import { CredibilitySection } from "@/components/credibility-section";
import { HeroSection } from "@/components/hero-section";
import { MembershipSection } from "@/components/membership-section";
import { ServicesSection } from "@/components/services-section";

export default function ConsultingPage() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl flex-1 overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-14">
      <HeroSection
        onOpenChat={() => router.push("/")}
        onOpenMembership={() =>
          document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <CredibilitySection />
      <ServicesSection />
      <MembershipSection />
    </div>
  );
}
