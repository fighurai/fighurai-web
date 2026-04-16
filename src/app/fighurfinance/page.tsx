import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FighurFinance — FIGHURAI",
  description: "Financial dashboard embedded from public/finance-dashboard.",
};

export default function FighurFinancePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg-deep)] text-[var(--text-primary)]">
      <header className="z-10 shrink-0 border-b border-white/[0.06] bg-[var(--bg-deep)]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="shrink-0 font-display text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]"
            >
              ← FIGHURAI
            </Link>
            <span className="hidden h-4 w-px bg-white/[0.12] sm:block" aria-hidden />
            <span className="truncate font-display text-base tracking-tight sm:text-lg">
              FighurFinance
            </span>
          </div>
          <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[0.6rem] font-medium uppercase tracking-wider text-[var(--text-faint)] sm:px-2.5 sm:text-[0.65rem]">
            Embedded
          </span>
        </div>
      </header>

      <iframe
        title="FighurFinance dashboard"
        src="/finance-dashboard/index.html"
        className="min-h-0 w-full flex-1 border-0 bg-[var(--bg-deep)]"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
