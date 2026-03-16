import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")
  const rows = await repo.find({ relations: { category: true }, order: { createdAt: "DESC" } as any })

  return NextResponse.json({
    ok: true,
    rows: rows.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category?.name ?? null,
      status: p.status,
      isFeatured: Boolean(p.isFeatured),
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
    })),
  })
}

export async function POST(req: Request) {
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")

  const body = (await req.json().catch(() => null)) as any
  const title = String(body?.title ?? "").trim()
  const slug = String(body?.slug ?? "").trim()
  if (!title || !slug) return NextResponse.json({ ok: false, error: "title/slug required" }, { status: 400 })

  const row = await repo.save(
    repo.create({
      title,
      slug,
      excerpt: String(body?.excerpt ?? ""),
      content: String(body?.content ?? ""),
      coverImage: body?.coverImage ? String(body.coverImage) : null,
      category: null,
      tags: Array.isArray(body?.tags) ? body.tags.map(String) : null,
      authorName: String(body?.authorName ?? "Multilimit"),
      publishedAt: null,
      status: body?.status === "published" ? "published" : "draft",
      isFeatured: Boolean(body?.isFeatured),
      isActive: body?.isActive !== false,
    } as any)
  )

  return NextResponse.json({ ok: true, row: { id: (row as any).id } })
}

