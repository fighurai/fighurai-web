"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";

import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
  type AuthSession,
} from "@/lib/auth-session";

export function AuthPanel() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readAuthSession());
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setMessage(null);
      const em = email.trim().toLowerCase();
      if (!em) {
        setMessage("Enter your email.");
        return;
      }
      if (mode === "signup" && !name.trim()) {
        setMessage("Enter your name.");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/accounts/sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: em,
            name: mode === "signup" ? name.trim() : "",
            action: mode === "signup" ? "signup" : "signin",
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          name?: string;
          email?: string;
        };

        if (!res.ok) {
          setMessage(data.error || "Something went wrong.");
          return;
        }

        const next: AuthSession = {
          email: data.email || em,
          name: data.name || name.trim() || em.split("@")[0] || "Member",
          signedAt: Date.now(),
        };
        writeAuthSession(next);
        setSession(next);
        setMessage(
          mode === "signup"
            ? "You are signed up. Welcome!"
            : "Signed in. Good to see you again.",
        );
        if (mode === "signup") setName("");
        setEmail("");
      } catch {
        setMessage("Network error. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, name, mode],
  );

  const signOut = useCallback(() => {
    clearAuthSession();
    setSession(null);
    setMessage(null);
  }, []);

  return (
    <div className="shrink-0 border-t border-white/[0.06] bg-[var(--bg-deep)]/40 px-3 pt-3 pb-0">
      <p className="px-0.5 pb-2 text-[0.65rem] font-medium uppercase tracking-wider text-[var(--text-faint)]">
        Account
      </p>

      {session ? (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 py-2">
          <p className="text-[0.7rem] text-[var(--text-faint)]">Signed in</p>
          <p className="truncate text-xs font-medium text-[var(--text-primary)]">
            {session.name}
          </p>
          <p className="truncate text-[0.7rem] text-[var(--text-muted)]">{session.email}</p>
          <button
            type="button"
            onClick={signOut}
            className="mt-2 w-full rounded-lg border border-white/[0.1] py-1.5 text-[0.7rem] text-[var(--text-muted)] transition hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2 flex rounded-lg bg-white/[0.04] p-0.5">
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`flex-1 rounded-md py-1.5 text-[0.7rem] font-medium transition ${
                mode === "signup"
                  ? "bg-white/[0.1] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setMessage(null);
              }}
              className={`flex-1 rounded-md py-1.5 text-[0.7rem] font-medium transition ${
                mode === "signin"
                  ? "bg-white/[0.1] text-[var(--text-primary)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              Sign in
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-2">
            {mode === "signup" ? (
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]/40 focus:outline-none"
              />
            ) : null}
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--accent)]/20 py-2 text-xs font-semibold text-[var(--accent)] ring-1 ring-[var(--accent)]/30 transition hover:bg-[var(--accent)]/30 disabled:opacity-50"
            >
              {loading ? "…" : mode === "signup" ? "Sign up" : "Sign in"}
            </button>
          </form>
          <p className="mt-2 pb-2 text-[0.6rem] leading-snug text-[var(--text-faint)]">
            Adds you to our list for updates. Email automation comes next.
          </p>
        </>
      )}

      {message ? (
        <p className="mt-2 pb-2 text-[0.65rem] text-[var(--accent)]">{message}</p>
      ) : null}
    </div>
  );
}
