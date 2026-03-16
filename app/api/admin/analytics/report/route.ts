import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

function sinceFrom(q: string | null) {
  if (q === "24h") return new Date(Date.now() - 24 * 60 * 60 * 1000)
  // default 7d
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const since = sinceFrom(url.searchParams.get("since"))

  const ds = await getDb()
  const repo = ds.getRepository("AnalyticsEvent")

  const topPages = await repo
    .createQueryBuilder("e")
    .select("e.path", "path")
    .addSelect("COUNT(1)", "count")
    .where("e.type = :t", { t: "page_view" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .groupBy("e.path")
    .orderBy("count", "DESC")
    .limit(20)
    .getRawMany<{ path: string; count: string }>()

  const topClicks = await repo
    .createQueryBuilder("e")
    .select("COALESCE(e.name, 'unknown')", "name")
    .addSelect("COUNT(1)", "count")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .groupBy("e.name")
    .orderBy("count", "DESC")
    .limit(20)
    .getRawMany<{ name: string; count: string }>()

  const homeViews = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "page_view" })
    .andWhere("e.path = :p", { p: "/" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .getCount()

  const heroPrimaryClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "hero_primary_cta" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .getCount()

  const orderClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "header_order_cta" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .getCount()

  const whatsappClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name IN (:...names)", { names: ["header_whatsapp", "footer_whatsapp"] })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .getCount()

  const newsletter = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "footer_newsletter_submit" })
    .andWhere("e.createdAt >= :d", { d: since.toISOString() })
    .getCount()

  const ctrHeroPrimary = homeViews > 0 ? heroPrimaryClicks / homeViews : 0

  return NextResponse.json({
    ok: true,
    since: since.toISOString(),
    ctr: {
      heroPrimary: ctrHeroPrimary,
    },
    counts: {
      homeViews,
      heroPrimaryClicks,
      orderClicks,
      whatsappClicks,
      newsletterClicks: newsletter,
    },
    topPages: topPages.map((r) => ({ path: r.path, count: Number(r.count) })),
    topClicks: topClicks.map((r) => ({ name: r.name, count: Number(r.count) })),
  })
}

