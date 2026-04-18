const ACUITY_API = "https://acuityscheduling.com/api/v1";

function basicAuthHeader(): string | null {
  const userId = process.env.ACUITY_USER_ID?.trim();
  const apiKey = process.env.ACUITY_API_KEY?.trim();
  if (!userId || !apiKey) return null;
  return `Basic ${Buffer.from(`${userId}:${apiKey}`).toString("base64")}`;
}

export function isAcuityApiConfigured(): boolean {
  return basicAuthHeader() !== null;
}

export function acuityAppointmentTypeId(): number {
  const raw = process.env.ACUITY_APPOINTMENT_TYPE_ID?.trim() || "86702710";
  const n = Number(raw);
  return Number.isFinite(n) ? n : 86702710;
}

export function acuityCalendarId(): number | undefined {
  const raw = process.env.ACUITY_CALENDAR_ID?.trim() || "13223132";
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

async function acuityJson<T>(
  pathWithQuery: string,
  init?: RequestInit,
): Promise<
  { ok: true; data: T } | { ok: false; status: number; message: string; code?: "POWERHOUSE" }
> {
  const auth = basicAuthHeader();
  if (!auth) return { ok: false, status: 503, message: "Acuity API is not configured." };

  const url = pathWithQuery.startsWith("http") ? pathWithQuery : `${ACUITY_API}${pathWithQuery}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: auth,
      ...(init?.method === "POST" ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const rawMsg =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : text.slice(0, 400) || res.statusText;
    const powerhouse =
      res.status === 403 &&
      /powerhouse|API access is only available/i.test(rawMsg + text);
    const msg = powerhouse
      ? "Acuity blocked this API call: full REST API access requires an Acuity **Powerhouse** plan. Upgrade in Acuity (My Account), or book using **Book a session** / the header **Book** on fighurai.com (browser scheduling, no REST API)."
      : rawMsg;
    return {
      ok: false,
      status: res.status,
      message: msg,
      ...(powerhouse ? { code: "POWERHOUSE" as const } : {}),
    };
  }

  return { ok: true, data: body as T };
}

export type AcuityTimeSlot = { time: string };

/** GET /availability/times — `date` is YYYY-MM-DD */
export async function acuityListTimesForDate(date: string): Promise<
  | { ok: true; slots: string[] }
  | { ok: false; message: string; code?: "POWERHOUSE" }
> {
  const appointmentTypeID = acuityAppointmentTypeId();
  const calendarID = acuityCalendarId();
  const params = new URLSearchParams({
    date,
    appointmentTypeID: String(appointmentTypeID),
  });
  if (calendarID !== undefined) params.set("calendarID", String(calendarID));

  const path = `/availability/times?${params.toString()}`;
  const res = await acuityJson<AcuityTimeSlot[]>(path);
  if (!res.ok) return { ok: false, message: res.message, code: res.code };
  const slots = Array.isArray(res.data) ? res.data.map((r) => r.time).filter(Boolean) : [];
  return { ok: true, slots };
}

/** One lightweight probe to see if Acuity allows REST calls (fails on non–Powerhouse plans). */
export async function acuityRestApiReachable(): Promise<{
  ok: boolean;
  code?: "POWERHOUSE";
  message?: string;
}> {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const date = d.toISOString().slice(0, 10);
  const out = await acuityListTimesForDate(date);
  if (out.ok) return { ok: true };
  return { ok: false, code: out.code, message: out.message };
}

export type AcuityBookInput = {
  datetime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export async function acuityBookAppointment(
  input: AcuityBookInput,
): Promise<{ ok: true; appointment: unknown } | { ok: false; message: string }> {
  const appointmentTypeID = acuityAppointmentTypeId();
  const calendarID = acuityCalendarId();

  const body: Record<string, unknown> = {
    datetime: input.datetime,
    appointmentTypeID,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
  };
  if (input.phone?.trim()) body.phone = input.phone.trim();
  if (calendarID !== undefined) body.calendarID = calendarID;

  const res = await acuityJson<unknown>("/appointments", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) return { ok: false, message: res.message };
  return { ok: true, appointment: res.data };
}
