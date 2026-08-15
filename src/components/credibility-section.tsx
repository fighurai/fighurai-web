/**
 * Consulting credibility — founder/engineering proof near the top of /consulting.
 * Portrait uses the existing About asset for Neema / Fighur Kania.
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
            Who builds this
          </p>
          <h2
            id="credibility-heading"
            className="mt-2 max-w-3xl font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            Built and led by engineers who ship production AI systems — not just advise on them.
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
                BS in Artificial Intelligence · Lead AI Engineer
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                Currently building production ML pipelines and LLM/agent systems (LangChain,
                LangGraph, FastAPI) that process over 1M records daily — hands-on engineering, not
                consulting theory alone.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-faint)]">
                FIGHURAI is backed by a team of engineers, not a solo advisor. Clients get
                founder-led delivery from people who actually build the systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
