/**
 * Canonical site origin for metadata, robots, sitemap.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://multilimit.com).
 */
const FALLBACK_SITE_URL = "https://multilimit.com"

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) {
    try {
      const u = new URL(raw)
      return u.origin
    } catch {
      // fall through
    }
  }
  return FALLBACK_SITE_URL
}
