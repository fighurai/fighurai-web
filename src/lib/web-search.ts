/**
 * Lightweight web snippets via DuckDuckGo Instant Answer API (no API key).
 * Results are incomplete vs a full search engine — good enough to ground replies.
 */
export async function searchWeb(query: string): Promise<string> {
  const q = query.trim().slice(0, 400);
  if (!q) return "(Empty search query.)";

  const url = new URL("https://api.duckduckgo.com/");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("no_html", "1");
  url.searchParams.set("skip_disambig", "1");

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "FIGHURAI/1.0 (+https://fighurai.com)",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return `(Web lookup failed: HTTP ${res.status})`;
  }

  const data = (await res.json()) as {
    Abstract?: string;
    AbstractText?: string;
    Answer?: string;
    RelatedTopics?: Array<{ Text?: string } | { Topics?: unknown[] }>;
  };

  const parts: string[] = [];

  const abstract = data.AbstractText || data.Abstract;
  if (abstract) {
    parts.push(`Summary: ${abstract}`);
  }
  if (data.Answer) {
    parts.push(`Instant answer: ${data.Answer}`);
  }

  const topics = data.RelatedTopics || [];
  for (const t of topics.slice(0, 10)) {
    if (t && typeof t === "object" && "Text" in t && typeof t.Text === "string") {
      parts.push(`• ${t.Text}`);
    }
  }

  if (parts.length === 0) {
    return "(No web snippets returned — DuckDuckGo had no instant results for this query. You may still answer from general knowledge.)";
  }

  return parts.join("\n");
}
