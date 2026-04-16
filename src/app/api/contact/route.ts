import { Resend } from "resend";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "hello@fighurai.com";

const SERVICE_VALUES = new Set([
  "Consulting",
  "Training & workshops",
  "Membership",
  "Ask (booking & Q&A)",
  "Partnership",
  "Other",
]);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
      company?: string;
    };

    if (body.company) {
      return Response.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 200) {
      return Response.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!service || !SERVICE_VALUES.has(service)) {
      return Response.json({ error: "Please select a service." }, { status: 400 });
    }
    if (!message || message.length < 4 || message.length > 20000) {
      return Response.json({ error: "Please enter a message (up to 20,000 characters)." }, { status: 400 });
    }
    if (phone.length > 40) {
      return Response.json({ error: "Phone is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Email is not configured. Set RESEND_API_KEY on the server." },
        { status: 503 },
      );
    }

    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "FIGHURAI Contact <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const phoneLine = phone
      ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`
      : "";

    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[FIGHURAI] ${service} — ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phoneLine}
        <p><strong>Service interest:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Service interest: ${service}`,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact]", error);
      return Response.json({ error: "Could not send your message. Try again later." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact]", e);
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
