import type { Tool } from "@anthropic-ai/sdk/resources/messages/messages";

import { acuityBookAppointment, acuityListTimesForDate } from "@/lib/acuity-server";

export const ACUITY_CHAT_TOOLS: Tool[] = [
  {
    name: "acuity_list_available_times",
    description:
      "Fetch real available appointment start times from the FIGHURAI Acuity calendar for one calendar day. " +
      "Always call this before suggesting specific slots. Only offer times returned here.",
    input_schema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "Local calendar date to check, in YYYY-MM-DD format (e.g. 2026-04-22).",
        },
      },
      required: ["date"],
    },
  },
  {
    name: "acuity_book_appointment",
    description:
      "Create a confirmed Acuity appointment after the visitor explicitly agrees to an exact slot. " +
      "The datetime string must match one returned by acuity_list_available_times (same spelling and offset). " +
      "Requires first name, last name, and email.",
    input_schema: {
      type: "object",
      properties: {
        datetime: {
          type: "string",
          description: "Exact slot string from acuity_list_available_times (e.g. 2026-04-22T14:00:00-0700).",
        },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        phone: { type: "string", description: "Optional phone number." },
      },
      required: ["datetime", "firstName", "lastName", "email"],
    },
  },
];

export async function runAcuityChatTool(
  name: string,
  input: Record<string, unknown>,
): Promise<unknown> {
  try {
    if (name === "acuity_list_available_times") {
      const date = typeof input.date === "string" ? input.date.trim() : "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return { error: "date must be YYYY-MM-DD" };
      }
      const out = await acuityListTimesForDate(date);
      if (!out.ok) return { error: out.message };
      return { date, slots: out.slots, count: out.slots.length };
    }

    if (name === "acuity_book_appointment") {
      const datetime = typeof input.datetime === "string" ? input.datetime.trim() : "";
      const firstName = typeof input.firstName === "string" ? input.firstName : "";
      const lastName = typeof input.lastName === "string" ? input.lastName : "";
      const email = typeof input.email === "string" ? input.email : "";
      const phone = typeof input.phone === "string" ? input.phone : undefined;
      if (!datetime || !firstName || !lastName || !email) {
        return { error: "datetime, firstName, lastName, and email are required." };
      }
      const out = await acuityBookAppointment({
        datetime,
        firstName,
        lastName,
        email,
        phone,
      });
      if (!out.ok) return { error: out.message };
      return { booked: true, appointment: out.appointment };
    }

    return { error: `Unknown tool: ${name}` };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Tool failed.";
    return { error: message };
  }
}
