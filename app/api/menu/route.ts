import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const location = url.searchParams.get("location")
    const group = url.searchParams.get("group")
    const ds = await getDb()
    const repo = ds.getRepository("MenuItem")

    const where: any = { isActive: true }
    if (location === "header" || location === "footer") where.location = location
    if (where.location === "footer" && (group === "quick" || group === "product" || group === "legal")) {
      where.group = group
    }

    const rows = await repo.find({ where, order: { sortOrder: "ASC", createdAt: "ASC" } })
    return NextResponse.json({ ok: true, rows })
  } catch (error) {
    console.error("Menu API error:", error)
    // Never hard-fail the public site if DB is down.
    return NextResponse.json({ ok: true, rows: [] })
  }
}

