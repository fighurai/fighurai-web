import { BOOKING_URL } from "@/lib/site-links";

type Offer = {
  name: string;
  price: string;
  deliverable: string;
  timeline: string;
  badge?: string;
  featured?: boolean;
};

const offers: Offer[] = [
  {
    name: "AI Workflow Audit & Implementation",
    price: "$1,500–$5,000",
    deliverable:
      "A 2-hour discovery session: we identify the top 3 AI opportunities and build + deploy one working automation into your actual tools. Not a slide deck — a working system.",
    timeline: "1–3 weeks",
    badge: "Lead offer",
    featured: true,
  },
  {
    name: "Custom AI Agent Development",
    price: "$5,000–$25,000",
    deliverable:
      "Bespoke AI agents for specific business functions (customer support, data analysis, document processing, sales outreach), deployed with documentation and training.",
    timeline: "3–8 weeks",
    badge: "Core offer",
    featured: true,
  },
  {
    name: "AI Training & Enablement",
    price: "$500–$2,000/session or $3,000–$8,000 program",
    deliverable:
      "Hands-on team training with recorded sessions, custom prompt libraries, and workflow guides.",
    timeline: "Per session or multi-session program",
  },
  {
    name: "Retainer — Ongoing AI Operations Support",
    price: "$1,500–$5,000/month",
    deliverable:
      "Ongoing agent maintenance, new workflow builds, and AI strategy. Three-month minimum.",
    timeline: "Rolling, 3-month minimum",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        offer.featured
          ? "border-[var(--accent)]/35 bg-[var(--card)] shadow-[0_0_60px_-12px_var(--accent-glow)]"
          : "border-white/[0.06] bg-[var(--card)]"
      }`}
    >
      {offer.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
          {offer.badge}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{offer.name}</h3>
      <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{offer.price}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {offer.deliverable}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-[var(--text-faint)]">
        Timeline: {offer.timeline}
      </p>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
          offer.featured
            ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110"
            : "border border-white/[0.1] bg-white/[0.04] text-[var(--text-primary)] hover:bg-white/[0.08]"
        }`}
      >
        Book a call
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
            Engagements &amp; pricing
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Clear scopes with working systems — not slide-only advice. Book a call and we will
            match the engagement to what you actually need.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <OfferCard key={offer.name} offer={offer} />
          ))}
        </div>

        {/* TODO: add client testimonials/case studies once first engagements complete */}
      </div>
    </section>
  );
}
