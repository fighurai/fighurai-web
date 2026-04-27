"use client";

import { BOOKING_URL } from "@/lib/site-links";

type HeroSectionProps = {
  onOpenChat?: () => void;
  onOpenMembership?: () => void;
  /** Consulting only: pill after “Ongoing membership” that scrolls to #demos. */
  onScrollToDemos?: () => void;
};

export function HeroSection({
  onOpenChat,
  onOpenMembership,
  onScrollToDemos,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-12 sm:pb-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[420px] w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute -right-1/4 top-24 h-[380px] w-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_65%)] blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]" />
          AI consulting &amp; training
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
          Fighur it out{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            with AI
          </span>
          — practical help, not hype.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] sm:text-xl">
          Use <strong className="font-medium text-[var(--text-primary)]">Ask</strong> on this site
          for questions about our services and how to book. For deeper work, we help your
          organization build workflows, training, and governance around AI — alongside hands-on
          consulting when you need a partner in the room.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {onOpenChat ? (
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_32px_var(--accent-glow)] transition hover:brightness-110"
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
          {onOpenMembership ? (
            <button
              type="button"
              onClick={onOpenMembership}
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur transition hover:border-white/[0.2] hover:bg-white/[0.07]"
            >
              Ongoing membership
            </button>
          ) : null}
          {onScrollToDemos ? (
            <button
              type="button"
              onClick={onScrollToDemos}
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-medium text-[var(--text-primary)] backdrop-blur transition hover:border-white/[0.2] hover:bg-white/[0.07]"
            >
              Demos
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
