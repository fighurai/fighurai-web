import { MembershipSection } from "@/components/membership-section";
import { SparkDemoVideo } from "@/components/spark-demo-video";

export default function MembershipPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto py-10 sm:py-14">
      <SparkDemoVideo className="mb-12 sm:mb-16" />
      <MembershipSection />
    </div>
  );
}
