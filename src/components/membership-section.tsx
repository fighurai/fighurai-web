import { BOOKING_URL } from "@/lib/site-links";

type AuditTier = {
  name: string;
  audience: string;
  price: string;
  deliverable: string;
};

type Offer = {
  name: string;
  price: string;
  deliverable: string;
  timeline: string;
  badge?: string;
  featured?: boolean;
};

const auditTiers: AuditTier[] = [
  {
    name: "Micro businesses",
    audience: "1 to 10 employees",
    price: "$497 flat",
    deliverable:
      "AI Workflow Audit: a short call to map where AI saves real time, plus we build and deploy one working automation live in the session.",
  },
  {
    name: "Small businesses",
    audience: "11 to 50 employees",
    price: "$1,500 flat",
    deliverable: "Same AI Workflow Audit format, standard scope.",
  },
  {
    name: "Larger accounts",
    audience: "50 plus employees or more complex scope",
    price: "$3,000",
    deliverable: "Standard AI Workflow Audit plus Implementation.",
  },
];

const higherOffers: Offer[] = [
  {
    name: "Custom AI Agent Development",
    price: "$5,000 to $25,000",
    deliverable:
      "Bespoke AI agents for specific business functions (customer support, data analysis, document processing, sales outreach), deployed with documentation and training.",
    timeline: "3 to 8 weeks",
    badge: "Core offer",
    featured: true,
  },
  {
    name: "AI Training and Enablement",
    price: "$500 to $2,000 per session or $3,000 to $8,000 for a program",
    deliverable:
      "Hands on team training with recorded sessions, custom prompt libraries, and workflow guides.",
    timeline: "Per session or multi session program",
  },
  {
    name: "Retainer: Ongoing AI Operations Support",
    price: "$1,500 to $5,000 per month",
    deliverable:
      "Ongoing agent maintenance, new workflow builds, and AI strategy. Three month minimum.",
    timeline: "Rolling, three month minimum",
  },
];

function AuditCard({ tier }: { tier: AuditTier }) {
  return (
    <div className="relative flex flex-col rounded-2xl border border-[var(--accent)]/35 bg-[var(--card)] p-6 shadow-[0_0_60px_-12px_var(--accent-glow)]">
      <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
        Entry offer
      </span>
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{tier.name}</h3>
      <p className="mt-1 text-xs text-[var(--text-faint)]">{tier.audience}</p>
      <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{tier.price}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {tier.deliverable}
      </p>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition hover:brightness-110"
      >
        Book a call
      </a>
    </div>
  );
}

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
            Engagements and pricing
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Clear scopes with working systems, not slide only advice. Book a call and we will match
            the engagement to what you actually need.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-faint)]">
            AI Workflow Audit
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
            Entry offer sized for the business, so smaller teams are not asked to pay enterprise
            pricing.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {auditTiers.map((tier) => (
              <AuditCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-faint)]">
            Projects and ongoing support
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {higherOffers.map((offer) => (
              <OfferCard key={offer.name} offer={offer} />
            ))}
          </div>
        </div>

        {/* TODO: add client testimonials/case studies once first engagements complete */}
      </div>
    </section>
  );
}
