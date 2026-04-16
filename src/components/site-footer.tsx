import { ContactForm } from "@/components/contact-form";
import { BOOKING_URL } from "@/lib/site-links";

export function SiteFooter() {
  return (
    <footer className="flex min-h-0 flex-1 flex-col border-t border-white/[0.06] bg-[var(--bg-elevated)]">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-14 px-4 py-12 sm:px-6 sm:py-16 lg:gap-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-10">
            <div className="max-w-md lg:max-w-lg">
              <p className="font-display text-2xl text-[var(--text-primary)] sm:text-3xl">FIGHURAI</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                We help you <em>fighur it out with AI</em> — practical consulting, hands-on
                training, and an Ask assistant for questions about our services and how to book.
                When you want a human partner for strategy or ongoing support, use the form or grab
                time on the calendar.
              </p>
            </div>
            <div className="flex max-w-md flex-col gap-3 text-sm">
              <span className="font-medium text-[var(--text-primary)]">Book a time</span>
              <p className="mt-1 text-[var(--text-muted)]">
                Prefer to pick a slot yourself? Use our scheduling calendar — you will see
                available times and can add a short note about what you need.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
              >
                Schedule on Acuity
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <div className="shrink-0 border-t border-white/[0.06] py-4">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-[var(--text-faint)] sm:px-6 md:text-left">
          © {new Date().getFullYear()} FIGHURAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
