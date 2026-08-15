"use client";

import { useRouter } from "next/navigation";

import { HeroSection } from "@/components/hero-section";
import { MembershipSection } from "@/components/membership-section";
import { ServicesSection } from "@/components/services-section";
import { SparkyRecordingDemo } from "@/components/sparky-recording-demo";

export default function ConsultingPage() {
  const router = useRouter();
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl flex-1 overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-14">
      <HeroSection
        onOpenChat={() => router.push("/")}
        onOpenMembership={() =>
          document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })
        }
        onScrollToDemos={() =>
          document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <ServicesSection />
      <div id="demos" className="scroll-mt-24 sm:scroll-mt-28">
        <SparkyRecordingDemo className="mb-12 sm:mb-16" />
      </div>
      <MembershipSection />
    </div>
  );
}
