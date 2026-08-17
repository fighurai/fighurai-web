/**
 * Consulting team / credibility near the top of /consulting.
 */

import Image from "next/image";

const team: readonly {
  name: string;
  title: string;
  bio: string;
  src: string;
  linkedinHref: string;
}[] = [
  {
    name: "Neema Kania",
    title: "Co-Founder, Lead AI Engineer",
    bio: "FighurAI is led by Neema Kania, a working Lead AI Engineer who builds production AI systems for a living, not just advises on them. Currently shipping machine learning models, AI agents, and LLM based applications in production environments, including end to end ML pipelines processing over 1 million records daily, AI agents built with LangChain and FastAPI that automate real business processes, and machine learning integrated directly into live systems. Backed by a small team of engineers, not a single consultant working alone.",
    src: "/images/cofounders/fighur-kania-201a.png",
    linkedinHref:
      "https://www.linkedin.com/in/neema-kania-6433a41b7/?skipRedirect=true",
  },
  {
    name: "Matthew Ogunsemi",
    title: "Co-Founder, AI & Business Strategy",
    bio: "Matthew brings enterprise AI transformation experience from Deloitte, where he delivers GenAI and analytics workstreams for financial services, energy, and public sector clients — from use-case discovery through proof-of-concept delivery. Previously at Canadian Tire Corporation, he evaluated 15+ operational workflows and designed Microsoft Copilot adoption plans that cut reporting turnaround by over 80%. He pairs that enterprise process rigor with a finance background, giving FIGHURAI clients a bridge between AI capability and business ROI.",
    src: "/images/cofounders/mathew-ogunsemi.png",
    linkedinHref: "https://www.linkedin.com/in/matthew-ogunsemi-44bb961ba/",
  },
  {
    name: "David Adegborioye",
    title: "Co-Founder, AI Solutions & Client Development",
    bio: "David architects and builds FIGHURAI's custom AI systems end-to-end — including a full-stack autonomous trading agent (Python, FastAPI, Next.js, local LLMs) and bespoke productivity assistants — while also owning the client pipeline from prospecting through close. A former Division I student-athlete (Hofstra, UBC) and professional soccer player, he brings the same discipline and execution focus to building and scaling AI workflows for small businesses.",
    src: "/images/cofounders/david-adegborioye.png",
    linkedinHref: "https://www.linkedin.com/in/davidadegborioye1/",
  },
];

export function CredibilitySection() {
  return (
    <section
      id="credibility"
      className="scroll-mt-24 border-y border-white/[0.06] bg-[var(--bg-elevated)]/60 py-12 sm:py-16"
      aria-labelledby="credibility-heading"
    >
      <div className="mx-auto max-w-6xl px-2 sm:px-6">
        <div className="mb-8 max-w-3xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Team
          </p>
          <h2
            id="credibility-heading"
            className="mt-2 font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            The Team Behind FIGHURAI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            Working engineers and operators who build production AI systems — a small team, not a
            single consultant working alone.
          </p>
        </div>

        <ul className="grid gap-4 sm:gap-5 md:grid-cols-3" aria-label="FIGHURAI co-founders">
          {team.map((person) => (
            <li
              key={person.name}
              className="rounded-2xl border border-white/[0.08] bg-[var(--card)] p-6 sm:p-7"
            >
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-[var(--bg-deep)] ring-1 ring-white/[0.08] sm:mx-0 sm:h-28 sm:w-28">
                <Image
                  src={person.src}
                  alt={person.name}
                  fill
                  sizes="112px"
                  className="object-cover object-center"
                />
              </div>
              <p className="mt-5 text-lg font-semibold text-[var(--text-primary)]">{person.name}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{person.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{person.bio}</p>
              <a
                href={person.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] underline-offset-2 transition hover:text-[var(--accent)] hover:underline"
                aria-label={`${person.name} on LinkedIn`}
              >
                <LinkedInIcon className="h-3.5 w-3.5 shrink-0" />
                LinkedIn
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
