import { BOOKING_URL } from "@/lib/site-links";

/**
 * Authoritative copy for the Ask assistant — keep in sync with Consulting, Membership, Contact, and About.
 */
export const FIGHUR_BUSINESS_FACTS = `
**Brand & tagline**
- FIGHURAI — “fighur it out with AI” (a friendly play on “figure it out”).
- Primary site: https://fighurai.com (Consulting, Membership, About, Contact, **Ask**, booking).

**Companion experience (Abacus)**
- https://fighurai.b.abacusai.app — framed as **AI consulting & training** with “Let’s Find Your Perfect Solution.”
- Visitors can chat for **personalized recommendations**; the flow may ask whether they are an **individual professional**, a **student**, or **representing a company**.
- Includes **Book a Call** and navigation (Home, Services, Updates, About, Contact on that app).
- **Relationship:** An additional entry point for discovery; **fighurai.com** remains the main site for **Ask**, **Book a session**, and hello@fighurai.com.

**What FIGHURAI is**
- An AI consulting and training practice: practical consulting, hands-on training, workflow design, governance, and ongoing support — consultation-first, not a generic slide deck.

**Services (Consulting)**
- Executive & team briefings — what to adopt now, what to wait on, how to measure impact.
- Workflow design — map processes and embed AI where it earns its place.
- Hands-on workshops — live sessions so people leave with prompts, templates, and guardrails.
- Governance & quality — review cadences, human-in-the-loop patterns, documentation so AI stays safe and consistent.

**How to book**
- In **Ask**, use **Book a session** (chat toolbar and welcome screen) or the header **Book** control — same scheduling calendar.
- Direct calendar URL: ${BOOKING_URL}
- The assistant cannot see calendars or complete booking inside the chat — users pick a time in the calendar that opens from those buttons.

**Contact**
- Email: hello@fighurai.com (services, partnerships, custom engagements).

**Membership & ongoing support (Membership tab)**
- **Office hours** — monthly live Q&A plus async review of prompts and workflows teams ship; pricing is custom; “book a fit call” via scheduling.
- **Embedded partner** — retainer: dedicated hours for roadmap, training sprints, on-call guidance as tools change.
- **Team accelerator** — bounded project: playbooks, templates, lightweight AI operating model; scope via hello@fighurai.com.

**Other site areas**
- **About** — story, how we work, what the Ask tab is for.
- **Contact** — message form and booking context.
- **FighurFinance** — separate financial UI when linked from the composer menu (not required for booking).

**What this chat is for**
- The official FIGHURAI assistant: answer questions about the business, services, booking, contact, and how to work with us — and help visitors decide to book or reach out.
`.trim();
