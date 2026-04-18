const items = [
  {
    title: "Executive & team briefings",
    body: "Cut through the noise: what to adopt now, what to wait on, and how to measure impact.",
  },
  {
    title: "Workflow design",
    body: "From customer support to research and content — we map processes and embed AI where it earns its place.",
  },
  {
    title: "Hands-on workshops",
    body: "Live working sessions so your people leave with working prompts, templates, and guardrails.",
  },
  {
    title: "Governance & quality",
    body: "Review cadences, human-in-the-loop patterns, and documentation so AI stays safe and consistent.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Services
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            The same pillars you expect from a serious AI practice — discovery-led first,
            with scoped build and automation when the engagement needs something running —
            not slide-theatre alone.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.title}
              className="group rounded-2xl border border-white/[0.06] bg-[var(--card)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[var(--accent)]/25 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.08)]"
            >
              <h3 className="text-lg font-medium text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
