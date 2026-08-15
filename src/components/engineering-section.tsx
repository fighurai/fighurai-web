/**
 * Background and experience (not FighurAI client case studies).
 */

const capabilities = [
  "Built and deployed AI agents and LLM based applications (LangChain, FastAPI) that automate real business processes",
  "Designed end to end ML pipelines: data ingestion, preprocessing, model training, evaluation, deployment",
  "Built ETL pipelines and real time analytics processing 1 million plus records per day",
  "Deployed ML models into live production systems (Docker, Kubernetes, cloud infrastructure)",
] as const;

export function EngineeringSection() {
  return (
    <section
      id="engineering"
      className="scroll-mt-24 py-12 sm:py-16"
      aria-labelledby="engineering-heading"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Background and experience
          </p>
          <h2
            id="engineering-heading"
            className="mt-2 font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            The Engineering Behind FIGHURAI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            Real engineering work that informs how we advise and build with clients. This is
            background and experience, not a list of paid FighurAI client deliverables.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {capabilities.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/[0.06] bg-[var(--card)] px-5 py-4 text-sm leading-relaxed text-[var(--text-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
