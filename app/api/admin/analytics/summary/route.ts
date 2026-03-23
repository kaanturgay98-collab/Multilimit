import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  try {
    const ds = await getDb()
    const repo = ds.getRepository("AnalyticsEvent")

    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    // TypeORM sqlite "count with date" is easier via query builder
    const pv24 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.createdAt >= :d", { d: since24h.toISOString() })
      .getCount()

    const pv7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.createdAt >= :d", { d: since7d.toISOString() })
      .getCount()

    const uniq24 = await repo
      .createQueryBuilder("e")
      .select("COUNT(DISTINCT e.sessionId)", "c")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.createdAt >= :d", { d: since24h.toISOString() })
      .getRawOne<{ c: string | number }>()

    // CTR example: hero primary CTA clicks / home page views over last 7d
    const homePv7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.path = :p", { p: "/" })
      .andWhere("e.createdAt >= :d", { d: since7d.toISOString() })
      .getCount()

    const heroClicks7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "click" })
      .andWhere("e.name = :n", { n: "hero_primary_cta" })
      .andWhere("e.createdAt >= :d", { d: since7d.toISOString() })
      .getCount()

    const ctrHeroPrimary = homePv7 > 0 ? heroClicks7 / homePv7 : 0

    return NextResponse.json({
      ok: true,
      kpis: {
        pageViews24h: pv24,
        pageViews7d: pv7,
        uniqueSessions24h: Number(uniq24?.c ?? 0),
        heroPrimaryCtr7d: ctrHeroPrimary,
      },
    })
  } catch (error: any) {
    console.error("Dashboard analytics error:", error)
    return NextResponse.json(
      { ok: false, error: "Veri yuklenirken hata olustu" },
      { status: 500 }
    )
  }
}

