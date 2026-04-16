"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeControls } from "@/components/theme-controls";
import { BOOKING_URL } from "@/lib/site-links";

const tabs = [
  { href: "/", label: "Ask" },
  { href: "/consulting", label: "Consulting" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function tabActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg-deep)]">
      <header className="fixed inset-x-0 top-0 z-[100] flex h-14 shrink-0 flex-col border-b border-white/[0.06] bg-[var(--bg-deep)]/95 backdrop-blur-xl sm:h-[3.25rem]">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-5">
          <Link
            href="/"
            className="shrink-0 font-display text-lg tracking-tight text-[var(--text-primary)] transition hover:text-[var(--accent)] sm:text-xl"
          >
            FIGHURAI
          </Link>
          <nav
            className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1 py-1 sm:gap-1.5"
            aria-label="Site sections"
          >
            {tabs.map((t) => {
              const active = tabActive(pathname, t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition sm:px-4 ${
                    active
                      ? "bg-white/[0.1] text-[var(--text-primary)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "text-[var(--text-muted)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
                  }`}
                  prefetch
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-2.5 py-1.5 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/20 sm:px-3"
          >
            Book
          </a>
          <ThemeControls />
        </div>
      </header>

      <main className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col pt-14 sm:pt-[3.25rem]">
        {children}
      </main>
    </div>
  );
}
