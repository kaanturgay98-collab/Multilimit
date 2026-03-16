import { NextResponse } from "next/server"
import { ADMIN_PAGES } from "@/lib/admin-pages"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ds = await getDb()
  const repo = ds.getRepository("Page")
  const page = await repo.findOne({
    where: { slug },
    relations: { images: true },
    order: { images: { sortOrder: "ASC", createdAt: "ASC" } },
  })

  if (!page) {
    const seed = ADMIN_PAGES.find((p) => p.slug === slug)
    if (!seed) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

    await repo.save(repo.create({ slug, title: seed.title, data: { mode: "overlay" } }))
    const created = await repo.findOne({
      where: { slug },
      relations: { images: true },
      order: { images: { sortOrder: "ASC", createdAt: "ASC" } },
    })
    return NextResponse.json({ ok: true, page: created })
  }

  return NextResponse.json({ ok: true, page })
}

