/**
 * Consulting About / credibility near the top of /consulting.
 */

import Image from "next/image";

export function CredibilitySection() {
  return (
    <section
      id="credibility"
      className="scroll-mt-24 border-y border-white/[0.06] bg-[var(--bg-elevated)]/60 py-12 sm:py-16"
      aria-labelledby="credibility-heading"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[var(--card)] p-6 sm:p-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            About
          </p>
          <h2
            id="credibility-heading"
            className="mt-2 max-w-3xl font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            Led by a working engineer
          </h2>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[var(--bg-deep)] ring-1 ring-white/[0.08] sm:mx-0 sm:h-28 sm:w-28">
              <Image
                src="/images/cofounders/fighur-kania-201a.png"
                alt="Neema Kania"
                fill
                sizes="112px"
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-[var(--text-primary)]">Neema Kania</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Lead AI Engineer · BS in Artificial Intelligence, LIU Post
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                FighurAI is led by Neema Kania, a working Lead AI Engineer who builds production AI
                systems for a living, not just advises on them. Currently shipping machine learning
                models, AI agents, and LLM based applications in production environments, including
                end to end ML pipelines processing over 1 million records daily, AI agents built with
                LangChain and FastAPI that automate real business processes, and machine learning
                integrated directly into live systems. BS in Artificial Intelligence, LIU Post.
                Backed by a small team of engineers, not a single consultant working alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
