"use client";

import Markdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ChatMessage } from "@/lib/chat-types";
import { resolveBookingHref } from "@/lib/booking-from-prompt";
import { BOOKING_URL } from "@/lib/site-links";

const FAB_SRC = "/images/ask-fab-smiley.png";

const SUGGESTIONS = [
  "What does FIGHURAI offer?",
  "How do I book a call?",
];

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AskChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const sendInFlightRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: pending ? "auto" : "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const stopAll = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setPending(false);
  }, []);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || pending || sendInFlightRef.current) return;
    sendInFlightRef.current = true;

    const userMsg: ChatMessage = { id: id(), role: "user", content: trimmed };
    const assistantId = id();
    const assistantPlaceholder: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };
    const base = messagesRef.current;
    const nextMessages: ChatMessage[] = [...base, userMsg, assistantPlaceholder];
    messagesRef.current = nextMessages;
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const reqTid = window.setTimeout(() => controller.abort(), 120_000);

    const history = nextMessages
      .filter((m) => m.id !== assistantId)
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const msg =
          typeof (errJson as { error?: string }).error === "string"
            ? (errJson as { error: string }).error
            : `Request failed (${res.status})`;
        throw new Error(msg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let acc = "";
      let rafId: number | null = null;

      const flushStreamToUi = () => {
        rafId = null;
        const snapshot = acc;
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: snapshot } : msg)),
        );
      };

      const scheduleStreamFlush = () => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(flushStreamToUi);
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          scheduleStreamFlush();
        }
        acc += decoder.decode();
      } finally {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        flushStreamToUi();
      }

      if (!acc.trim()) {
        const fallback =
          "I’m here and ready to help. Please try sending that again, and I’ll respond right away.";
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: fallback } : msg)),
        );
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const errorMessage = e instanceof Error ? e.message : "Something went wrong.";
      setError(errorMessage);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `_Could not complete the reply: ${errorMessage}_` }
            : m,
        ),
      );
    } finally {
      clearTimeout(reqTid);
      setPending(false);
      abortRef.current = null;
      sendInFlightRef.current = false;
    }
  }, [input, pending]);

  const lastUserContent = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m?.role === "user") return m.content;
    }
    return "";
  }, [messages]);

  const bookingFromPrompt = useMemo(
    () => resolveBookingHref(BOOKING_URL, input.trim() || lastUserContent),
    [input, lastUserContent],
  );
  const bookingHref = bookingFromPrompt.href;

  const showEmpty = messages.length === 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] flex flex-col items-end p-4 sm:p-6">
      {open ? (
        <button
          type="button"
          aria-label="Close Ask panel"
          className="pointer-events-auto fixed inset-0 z-0 bg-black/45 backdrop-blur-[1px] sm:bg-black/20"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="relative z-[1] flex w-full max-w-[min(100%,22rem)] flex-col items-end gap-3">
        {open ? (
          <div
            id="ask-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-widget-title"
            className="pointer-events-auto flex h-[min(72dvh,26rem)] w-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[var(--bg-elevated)]/95 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2.5">
              <h2
                id="ask-widget-title"
                className="font-display text-sm font-medium tracking-tight text-[var(--text-primary)]"
              >
                Ask FIGHURAI
              </h2>
              <div className="flex items-center gap-1.5">
                <Link
                  href="/"
                  className="rounded-full px-2.5 py-1 text-[0.65rem] font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
                  onClick={() => setOpen(false)}
                >
                  Full Ask
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-[var(--text-muted)] transition hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={listRef}
              className="chat-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-2"
            >
              {showEmpty ? (
                <div className="space-y-3 pb-1">
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                    Services, booking, and how to work with us — same assistant as the Ask tab.
                  </p>
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2.5 text-xs font-semibold text-[var(--accent-foreground)] shadow-[0_0_20px_var(--accent-glow)] transition hover:brightness-110"
                  >
                    Book a session
                  </a>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setInput(s);
                          queueMicrotask(() =>
                            document.getElementById("ask-widget-input")?.focus(),
                          );
                        }}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-left text-[0.7rem] leading-snug text-[var(--text-muted)] transition hover:border-[var(--accent)]/25 hover:text-[var(--text-primary)]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {!showEmpty
                ? messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[92%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-[var(--accent)]/12 text-[var(--text-primary)] ring-1 ring-[var(--accent)]/20"
                            : "bg-white/[0.03] text-[var(--text-muted)] ring-1 ring-white/[0.06]"
                        }`}
                      >
                        {m.role === "assistant" ? (
                          <div className="studio-md">
                            <Markdown>{m.content || (pending ? " " : "")}</Markdown>
                            {pending && m.content === "" ? (
                              <span className="inline-block h-3 w-0.5 animate-pulse bg-[var(--accent)] align-middle" />
                            ) : null}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap text-[var(--text-primary)]">{m.content}</p>
                        )}
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <form
              className="shrink-0 border-t border-white/[0.06] p-2"
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
            >
              <textarea
                id="ask-widget-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Ask or type a time to book…"
                rows={2}
                className="mb-2 w-full resize-none rounded-lg bg-white/[0.04] px-2.5 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-faint)] ring-1 ring-white/[0.06] focus:outline-none focus:ring-[var(--accent)]/40"
                disabled={pending}
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                {pending ? (
                  <button
                    type="button"
                    onClick={stopAll}
                    className="text-[0.65rem] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    Stop
                  </button>
                ) : (
                  <a
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.65rem] font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Book
                  </a>
                )}
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[0.65rem] font-semibold text-[var(--accent-foreground)] shadow-[0_0_16px_var(--accent-glow)] transition hover:brightness-110 disabled:opacity-40"
                >
                  Send
                </button>
              </div>
              {error ? <p className="mt-1.5 text-center text-[0.65rem] text-red-300/90">{error}</p> : null}
            </form>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--bg-deep)]/90 shadow-[0_8px_32px_-6px_rgba(0,0,0,0.75),0_0_24px_var(--accent-glow)] ring-2 ring-[var(--accent)]/20 backdrop-blur-md transition hover:scale-[1.04] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-expanded={open}
          aria-controls={open ? "ask-widget-panel" : undefined}
          title={open ? "Close Ask" : "Ask FIGHURAI"}
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={FAB_SRC}
              alt=""
              width={40}
              height={40}
              className="object-contain object-center"
              priority={false}
            />
          </span>
          <span className="sr-only">{open ? "Close Ask assistant" : "Open Ask assistant"}</span>
        </button>
      </div>
    </div>
  );
}
