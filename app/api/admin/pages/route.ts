import { NextResponse } from "next/server"
import { ADMIN_PAGES } from "@/lib/admin-pages"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

async function ensureSeedPages() {
  const ds = await getDb()
  const repo = ds.getRepository("Page")
  for (const p of ADMIN_PAGES) {
    const existing = await repo.findOne({ where: { slug: p.slug } })
    if (!existing) {
      await repo.save(repo.create({ slug: p.slug, title: p.title, data: { mode: "overlay" } }))
    }
  }
}

export async function GET() {
  await ensureSeedPages()
  const ds = await getDb()
  const pages = await ds.getRepository("Page").find({
    order: { updatedAt: "DESC" },
    select: { slug: true, title: true, updatedAt: true, createdAt: true },
  })
  return NextResponse.json({ ok: true, pages })
}

