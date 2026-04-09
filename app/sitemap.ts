import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

/** Public marketing & content paths (no /admin). */
const STATIC_PATHS: string[] = [
  "/",
  "/hakkimizda",
  "/urun",
  "/nasil-kullanilir",
  "/icerikler",
  "/sss",
  "/yorumlar",
  "/blog",
  "/iletisim",
  "/kimler-icin-uygun",
  "/gizlilik-politikasi",
  "/kullanim-kosullari",
  "/iade-politikasi",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  return STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }))
}
