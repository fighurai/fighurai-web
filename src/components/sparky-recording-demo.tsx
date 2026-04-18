/**
 * Stock market analyzer — embedded YouTube walkthrough.
 * @see https://www.youtube.com/watch?v=U1lsOr4o_5A
 */

import type { ReactNode } from "react";

type SparkyRecordingDemoProps = {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  className?: string;
  headingId?: string;
};

const YOUTUBE_WATCH = "https://www.youtube.com/watch?v=U1lsOr4o_5A";
const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed/U1lsOr4o_5A";

export function SparkyRecordingDemo({
  eyebrow = "Demo",
  title = "Stock market analyzer",
  description = (
    <>
      YouTube walkthrough — embedded below.{" "}
      <a
        href={YOUTUBE_WATCH}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
      >
        Open in YouTube
      </a>{" "}
      if the player does not load.
    </>
  ),
  className = "",
  headingId = "stock-market-analyzer-demo-heading",
}: SparkyRecordingDemoProps) {
  return (
    <section className={`${className}`.trim()} aria-labelledby={headingId}>
      <div className="mx-auto max-w-4xl px-2 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)]/95 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06] sm:p-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-2 font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {description}
          </p>

          <div className="mt-6 min-w-0 overflow-x-auto overflow-y-visible rounded-xl border border-white/[0.1] bg-black/40 ring-1 ring-white/[0.05] [-webkit-overflow-scrolling:touch] sm:overflow-hidden">
            <div className="relative aspect-video max-sm:aspect-auto w-full min-w-0 max-w-full min-h-[min(56vw,22rem)] max-sm:min-h-[min(72dvh,36rem)] max-h-[min(88dvh,52rem)] max-sm:max-h-none sm:min-h-[200px] sm:max-h-[70vh]">
              <iframe
                title="Stock market analyzer — YouTube video"
                src={`${YOUTUBE_EMBED}?rel=0`}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
