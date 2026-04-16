"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";

const SERVICES = [
  "Consulting",
  "Training & workshops",
  "Membership",
  "Ask (booking & Q&A)",
  "Partnership",
  "Other",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFeedback(null);
      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            service,
            message,
            company,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          setFeedback({ type: "err", text: data.error || "Something went wrong." });
          return;
        }
        setFeedback({
          type: "ok",
          text: "Thanks — we received your message and will get back to you soon.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setService("");
        setMessage("");
      } catch {
        setFeedback({ type: "err", text: "Network error. Try again." });
      } finally {
        setLoading(false);
      }
    },
    [name, email, phone, service, message, company],
  );

  const inputClass =
    "w-full rounded-lg border border-white/[0.12] bg-black px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] outline-none transition focus:border-white/25 focus:ring-1 focus:ring-white/15";

  return (
    <div className="w-full max-w-xl">
      <div className="mb-8 flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--text-primary)]"
            aria-hidden
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Send Us a Message
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          aria-hidden
        />

        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Name <span className="text-red-400/90">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Email <span className="text-red-400/90">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Phone <span className="text-[var(--text-faint)]">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Service Interest <span className="text-red-400/90">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M8 9l4-4 4 4M16 15l-4 4-4-4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Message <span className="text-red-400/90">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your needs and goals..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} min-h-[120px] resize-y`}
          />
        </div>

        {feedback ? (
          <p
            role="status"
            className={
              feedback.type === "ok"
                ? "text-sm text-[var(--accent)]"
                : "text-sm text-red-300/90"
            }
          >
            {feedback.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
