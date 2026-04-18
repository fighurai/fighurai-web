"use client";

import { useRouter } from "next/navigation";

import { HeroSection } from "@/components/hero-section";
import { MembershipSection } from "@/components/membership-section";
import { ServicesSection } from "@/components/services-section";
import { ConstructionChatDemo } from "@/components/construction-chat-demo";
import { CreativeCompanySiteDemo } from "@/components/creative-company-site-demo";
import { EmailAutomationDemo } from "@/components/email-automation-demo";
import { CompanyChatDemo } from "@/components/company-chat-demo";
import { InvoiceConverterDemo } from "@/components/invoice-converter-demo";
import { SparkDemoVideo } from "@/components/spark-demo-video";

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
      <ServicesSection />
      <SparkDemoVideo className="mb-12 sm:mb-16" />
      <ConstructionChatDemo className="mb-12 sm:mb-16" />
      <CreativeCompanySiteDemo className="mb-12 sm:mb-16" />
      <EmailAutomationDemo className="mb-12 sm:mb-16" />
      <InvoiceConverterDemo className="mb-12 sm:mb-16" />
      <CompanyChatDemo className="mb-12 sm:mb-16" />
      <MembershipSection />
    </div>
  );
}
