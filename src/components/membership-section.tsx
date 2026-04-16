import { BOOKING_URL } from "@/lib/site-links";

const tiers = [
  {
    name: "Office hours",
    price: "From custom",
    blurb: "Monthly live Q&A plus async review of prompts and workflows your team is shipping.",
    cta: "Book a fit call",
    href: BOOKING_URL,
    external: true,
    featured: false,
  },
  {
    name: "Embedded partner",
    price: "Retainer",
    blurb: "Dedicated hours for roadmap, training sprints, and on-call guidance as models and tools shift.",
    cta: "Discuss retainer",
    href: BOOKING_URL,
    external: true,
    featured: true,
  },
  {
    name: "Team accelerator",
    price: "Project",
    blurb: "A bounded engagement to stand up playbooks, templates, and a lightweight AI operating model.",
    cta: "Scope a sprint",
    href: "mailto:hello@fighurai.com?subject=FIGHURAI%20—%20team%20accelerator",
    external: false,
    featured: false,
  },
];

export function MembershipSection() {
  return (
    <section id="membership" className="scroll-mt-24 border-y border-white/[0.06] bg-[var(--bg-elevated)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Membership &amp; ongoing support
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            AI changes weekly. These arrangements keep your org on a steady learning curve
            — not a one-off workshop and forgotten PDFs.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.featured
                  ? "border-[var(--accent)]/35 bg-[var(--card)] shadow-[0_0_60px_-12px_var(--accent-glow)]"
                  : "border-white/[0.06] bg-[var(--card)]"
              }`}
            >
              {tier.featured ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                  Most common
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{tier.name}</h3>
              <p className="mt-1 text-sm text-[var(--text-faint)]">{tier.price}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                {tier.blurb}
              </p>
              <a
                href={tier.href}
                {...(tier.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  tier.featured
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110"
                    : "border border-white/[0.1] bg-white/[0.04] text-[var(--text-primary)] hover:bg-white/[0.08]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
