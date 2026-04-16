import { google } from "googleapis";
import { NextResponse } from "next/server";

const SPREADSHEET_ID_DEFAULT =
  "1TRw1BULbggY4qHhb-30zx42Vq-QjhZ0VkDtuazmd8wc";

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    return null;
  }
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function POST(request: Request) {
  const sheets = getSheetsClient();
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || SPREADSHEET_ID_DEFAULT;

  if (!sheets) {
    return NextResponse.json(
      {
        error:
          "Server is not configured for Google Sheets. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.",
      },
      { status: 503 },
    );
  }

  let body: { name?: unknown; email?: unknown; action?: unknown };
  try {
    body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      action?: unknown;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const action =
    body.action === "signin" || body.action === "signup" ? body.action : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (action === "signup" && !name) {
    return NextResponse.json({ error: "Name is required for sign up." }, { status: 400 });
  }

  if (!action) {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }

  const tab = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Sheet1";
  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    name || "—",
    email,
    action === "signup" ? "sign_up" : "sign_in",
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tab}!A:D`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });
  } catch (err) {
    console.error("[accounts/sheet]", err);
    return NextResponse.json(
      {
        error:
          "Could not save to the sheet. Check that the service account can edit the spreadsheet.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    name: name || email.split("@")[0] || "",
    email,
  });
}
