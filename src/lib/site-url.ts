/**
 * Canonical public site URL (production: https://fighurai.com).
 * Set NEXT_PUBLIC_SITE_URL in hosting env if the apex differs (e.g. preview deploys).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://fighurai.com";
}
