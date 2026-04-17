import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

function sinceFrom(q: string | null) {
  if (q === "24h") return "-24 hours"
  // default 7d
  return "-7 days"
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
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .groupBy("e.path")
    .orderBy("count", "DESC")
    .limit(20)
    .getRawMany<{ path: string; count: string }>()

  const topClicks = await repo
    .createQueryBuilder("e")
    .select("COALESCE(e.name, 'unknown')", "name")
    .addSelect("COUNT(1)", "count")
    .where("e.type = :t", { t: "click" })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .groupBy("e.name")
    .orderBy("count", "DESC")
    .limit(20)
    .getRawMany<{ name: string; count: string }>()

  const homeViews = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "page_view" })
    .andWhere("e.path = :p", { p: "/" })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .getCount()

  const heroPrimaryClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "hero_primary_cta" })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .getCount()

  const orderClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "header_order_cta" })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .getCount()

  const whatsappClicks = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name IN (:...names)", { names: ["header_whatsapp", "footer_whatsapp"] })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .getCount()

  const newsletter = await repo
    .createQueryBuilder("e")
    .where("e.type = :t", { t: "click" })
    .andWhere("e.name = :n", { n: "footer_newsletter_submit" })
    .andWhere(`e.createdAt >= datetime('now', '${since}')`)
    .getCount()

  const ctrHeroPrimary = homeViews > 0 ? heroPrimaryClicks / homeViews : 0

  return NextResponse.json({
    ok: true,
    since,
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

