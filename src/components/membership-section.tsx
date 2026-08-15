import { BOOKING_URL } from "@/lib/site-links";

type Tier = {
  name: string;
  price: string;
  blurb: string;
  whoFor: string;
  cta: string;
  href: string;
  external: boolean;
  badge?: string;
  featured?: boolean;
  scarcity?: string;
};

const audit: Tier = {
  name: "AI Opportunity Audit",
  price: "$297 flat, one-time",
  blurb:
    "A 45-minute working session plus a written 2-3 page report ranking the best AI opportunities for your business by effort vs. impact — from someone who builds production AI systems for a living, not just advises on them.",
  whoFor: "Best if you want a clear, ranked shortlist before committing to a larger engagement.",
  cta: "Book your audit",
  href: BOOKING_URL,
  external: true,
  featured: true,
  scarcity: "Booking a limited number of audits this month.",
};

const tiers: Tier[] = [
  {
    name: "Office hours",
    price: "$600/mo",
    blurb: "Monthly Q&A call plus async email/Slack review of prompts and workflows between sessions.",
    whoFor: "Best for teams that want a steady sounding board without a full retainer.",
    cta: "Book a fit call",
    href: BOOKING_URL,
    external: true,
  },
  {
    name: "Embedded partner",
    price: "$3,500/mo",
    blurb:
      "Weekly calls, on-call support, and roadmap ownership as models and tools shift.",
    whoFor: "Best for orgs that want FIGHURAI in the loop week-to-week.",
    cta: "Discuss retainer",
    href: BOOKING_URL,
    external: true,
    badge: "Best value",
    featured: true,
  },
  {
    name: "Team accelerator",
    price: "$5,000–6,000 one-time",
    blurb:
      "A 4–6 week engagement where we build and ship the agent, pipeline, or workflow — not just recommend one.",
    whoFor: "Best when you need a specific system shipped on a fixed timeline.",
    cta: "Scope a sprint",
    href: "mailto:hello@fighurai.com?subject=FIGHURAI%20—%20team%20accelerator",
    external: false,
  },
];

function TierCard({ tier, prominence = "default" }: { tier: Tier; prominence?: "default" | "audit" }) {
  const isAudit = prominence === "audit";
  const emphasize = Boolean(tier.featured) || isAudit;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        isAudit
          ? "border-[var(--accent)]/45 bg-[var(--card)] p-7 shadow-[0_0_80px_-10px_var(--accent-glow)] sm:p-8"
          : tier.featured
            ? "border-[var(--accent)]/35 bg-[var(--card)] shadow-[0_0_60px_-12px_var(--accent-glow)]"
            : "border-white/[0.06] bg-[var(--card)]"
      }`}
    >
      {tier.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
          {tier.badge}
        </span>
      ) : isAudit ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
          Primary offer
        </span>
      ) : null}
      <h3
        className={`font-semibold text-[var(--text-primary)] ${
          isAudit ? "text-xl sm:text-2xl" : "text-lg"
        }`}
      >
        {tier.name}
      </h3>
      <p
        className={`mt-1 font-medium text-[var(--text-primary)] ${
          isAudit ? "text-base sm:text-lg" : "text-sm"
        }`}
      >
        {tier.price}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">{tier.blurb}</p>
      <p className="mt-3 text-xs leading-relaxed text-[var(--text-faint)]">{tier.whoFor}</p>
      {tier.scarcity ? (
        <p className="mt-3 text-xs font-medium text-[var(--accent)]">{tier.scarcity}</p>
      ) : null}
      <a
        href={tier.href}
        {...(tier.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
          emphasize
            ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110"
            : "border border-white/[0.1] bg-white/[0.04] text-[var(--text-primary)] hover:bg-white/[0.08]"
        }`}
      >
        {tier.cta}
      </a>
    </div>
  );
}

export function MembershipSection() {
  return (
    <section
      id="membership"
      className="scroll-mt-24 border-y border-white/[0.06] bg-[var(--bg-elevated)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Membership &amp; ongoing support
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Start with a flat-fee audit, or choose an ongoing arrangement that keeps your org on a
            steady learning curve — not a one-off workshop and forgotten PDFs.
          </p>
        </div>

        <div className="mt-12">
          <TierCard tier={audit} prominence="audit" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* TODO: add client testimonials once first audits are complete */}
      </div>
    </section>
  );
}
