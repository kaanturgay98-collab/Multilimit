import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  try {
    const ds = await getDb()
    const repo = ds.getRepository("AnalyticsEvent")

    const totalPageViewsAllTime = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .getCount()

    const uniqueIpAllTime = await repo
      .createQueryBuilder("e")
      .select("COUNT(DISTINCT e.ipHash)", "c")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.ipHash IS NOT NULL")
      .getRawOne<{ c: string | number }>()

    const pv24 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.createdAt >= datetime('now', '-24 hours')")
      .getCount()

    const pv7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.createdAt >= datetime('now', '-7 days')")
      .getCount()

    const uniqIp24 = await repo
      .createQueryBuilder("e")
      .select("COUNT(DISTINCT e.ipHash)", "c")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.ipHash IS NOT NULL")
      .andWhere("e.createdAt >= datetime('now', '-24 hours')")
      .getRawOne<{ c: string | number }>()

    const uniqIp7 = await repo
      .createQueryBuilder("e")
      .select("COUNT(DISTINCT e.ipHash)", "c")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.ipHash IS NOT NULL")
      .andWhere("e.createdAt >= datetime('now', '-7 days')")
      .getRawOne<{ c: string | number }>()

    // CTR example: hero primary CTA clicks / home page views over last 7d
    const homePv7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "page_view" })
      .andWhere("e.path = :p", { p: "/" })
      .andWhere("e.createdAt >= datetime('now', '-7 days')")
      .getCount()

    const heroClicks7 = await repo
      .createQueryBuilder("e")
      .where("e.type = :t", { t: "click" })
      .andWhere("e.name = :n", { n: "hero_primary_cta" })
      .andWhere("e.createdAt >= datetime('now', '-7 days')")
      .getCount()

    const ctrHeroPrimary = homePv7 > 0 ? heroClicks7 / homePv7 : 0

    return NextResponse.json({
      ok: true,
      kpis: {
        totalPageViewsAllTime,
        uniqueIpAllTime: Number(uniqueIpAllTime?.c ?? 0),
        pageViews24h: pv24,
        pageViews7d: pv7,
        uniqueIp24h: Number(uniqIp24?.c ?? 0),
        uniqueIp7d: Number(uniqIp7?.c ?? 0),
        heroPrimaryCtr7d: ctrHeroPrimary,
      },
    })
  } catch (error: any) {
    console.error("Dashboard analytics error:", error)
    return NextResponse.json({
      ok: true,
      kpis: {
        totalPageViewsAllTime: 0,
        uniqueIpAllTime: 0,
        pageViews24h: 0,
        pageViews7d: 0,
        uniqueIp24h: 0,
        uniqueIp7d: 0,
        heroPrimaryCtr7d: 0,
      },
    })
  }
}

