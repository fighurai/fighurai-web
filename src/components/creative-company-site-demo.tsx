/** Sample creative-studio site preview (public/videos/creative-company-site-demo.html). */

type CreativeCompanySiteDemoProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  headingId?: string;
};

const IFRAME_SRC = "/videos/creative-company-site-demo.html?embed=1";

export function CreativeCompanySiteDemo({
  eyebrow = "Case study",
  title = "Creative company website",
  description =
    "A sample creative-studio site: editorial type, coral accent, depth, stats, testimonial, and CTAs — plus a front-page chatbot so visitors can ask questions about the site itself (how booking works, who you work with, etc.) in a familiar chat panel.",
  className = "",
  headingId = "creative-company-site-demo-heading",
}: CreativeCompanySiteDemoProps) {
  return (
    <section className={`${className}`.trim()} aria-labelledby={headingId}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
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
            <div className="relative aspect-video w-full min-h-[min(52vw,20rem)] min-w-0 max-w-full max-h-[min(88dvh,52rem)] sm:min-h-[200px] sm:max-h-[70vh]">
              <iframe
                title="Sample creative studio site with front-page site assistant chatbot"
                src={IFRAME_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-[0.65rem] text-[var(--text-faint)]">
            Fictional brand for demonstration — your design system and content would be yours.
          </p>
        </div>
      </div>
    </section>
  );
}
