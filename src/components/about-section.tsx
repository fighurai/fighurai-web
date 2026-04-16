"use client";

import { BOOKING_URL } from "@/lib/site-links";

type AboutSectionProps = {
  onOpenChat?: () => void;
  onOpenContact?: () => void;
};

const highlights = [
  {
    title: "Clarity first",
    body: "Practical help on how to use AI well in real work — not generic hype or buzzword decks.",
  },
  {
    title: "Change that sticks",
    body: "Workshops and coaching tied to your workflows, so your team keeps the habit after the session ends.",
  },
  {
    title: "Human partnership",
    body: "When you need strategy, training, or governance — we work alongside you, not just ship a PDF.",
  },
];

const steps = [
  {
    step: "01",
    title: "Understand your context",
    body: "Short conversation about goals, constraints, and how your team already works.",
  },
  {
    step: "02",
    title: "Design what to change",
    body: "Briefings, working sessions, or ongoing office hours — always tied to outcomes you can name.",
  },
  {
    step: "03",
    title: "Leave with reusable assets",
    body: "Prompts, guardrails, and habits your people can reuse without a consultant in the room.",
  },
];

export function AboutSection({ onOpenChat, onOpenContact }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="relative overflow-hidden pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
          <div className="absolute -left-1/4 top-0 h-[380px] w-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.16),transparent_65%)] blur-3xl" />
          <div className="absolute -right-1/4 top-32 h-[340px] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_65%)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />
            About FIGHURAI
          </p>

          <h2 className="font-display max-w-3xl text-3xl font-medium leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            AI help that meets you where you{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              already work
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl">
            Most teams don&apos;t need another generic chatbot — they need{" "}
            <strong className="font-medium text-[var(--text-primary)]">clarity</strong> on how to
            use AI well day to day. FIGHURAI pairs practical consulting with hands-on training and
            workflows that fit how your team already works.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {onOpenChat ? (
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_28px_var(--accent-glow)] transition hover:brightness-110"
              >
                Open Ask
              </button>
            ) : null}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur transition hover:border-white/[0.2] hover:bg-white/[0.07]"
            >
              Book a call
            </a>
            {onOpenContact ? (
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur transition hover:border-white/[0.2] hover:bg-white/[0.07]"
              >
                Contact us
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-white/[0.06] bg-[var(--card)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[var(--accent)]/20"
            >
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              The name is the promise
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              <em>Fighur it out</em> sounds like &quot;figure it out&quot; — because that&apos;s the
              job. Whether you&apos;re a founder, a team lead, or a specialist, you usually know{" "}
              <strong className="font-medium text-[var(--text-primary)]">what</strong> you want AI
              to do; you need it phrased so models respond consistently.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              The <strong className="font-medium text-[var(--text-primary)]">Ask</strong> tab is your
              assistant for questions about FIGHURAI — services, how to book, membership, and how to
              work with us. When you want strategy, training, or governance that lasts, we go deeper
              together on a call or engagement.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.06] p-5 sm:p-6">
              <p className="text-sm font-medium text-[var(--accent)]">How we work with clients</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                Engagements start with your goals and constraints — not a canned deck. We might
                run briefings, hands-on workshops, or ongoing office hours. We don&apos;t promise
                magic; we build habits and assets your team can reuse.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)] p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                What you get on this site
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-[var(--text-muted)]">
                <li className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[0.65rem] font-bold text-[var(--accent)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Ask assistant</strong> — answers
                    about FIGHURAI, booking, and services; speech can refine your message before you
                    send.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-secondary)]/20 text-[0.65rem] font-bold text-[var(--accent-secondary)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Server-side processing</strong>{" "}
                    — Ask runs through our API; model credentials stay on the server, not in your
                    browser.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[0.65rem] font-bold text-[var(--accent)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Optional dictation</strong>{" "}
                    — where your browser supports it, speak first and review the text before you
                    send.
                  </span>
                </li>
              </ul>
              <p className="mt-5 border-t border-white/[0.06] pt-5 text-xs leading-relaxed text-[var(--text-faint)]">
                Optional <strong className="font-medium text-[var(--text-muted)]">Web</strong> mode
                adds public search snippets; facts about FIGHURAI always come from our site content,
                not the open web.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_24px_var(--accent-glow)] transition hover:brightness-110"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/[0.06] pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              A simple rhythm
            </h3>
            <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
              Three beats — so you always know what happens next.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((s) => (
              <li key={s.step} className="relative text-center sm:text-left">
                <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent)]">
                  {s.step}
                </span>
                <p className="mt-2 font-medium text-[var(--text-primary)]">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
