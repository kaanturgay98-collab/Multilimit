import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")

  const row = await repo.findOne({ where: { id } as any, relations: { category: true } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  const p: any = row
  return NextResponse.json({
    ok: true,
    row: {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      categoryId: p.category?.id ?? null,
      categoryName: p.category?.name ?? null,
      tags: p.tags ?? [],
      authorName: p.authorName,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      status: p.status,
      isFeatured: Boolean(p.isFeatured),
      isActive: Boolean(p.isActive),
    },
  })
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")
  const catRepo = ds.getRepository("BlogCategory")

  const row = await repo.findOne({ where: { id } as any, relations: { category: true } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  const body = (await req.json().catch(() => null)) as any
  const p: any = row
  p.title = String(body?.title ?? p.title)
  p.slug = String(body?.slug ?? p.slug)
  p.excerpt = String(body?.excerpt ?? p.excerpt)
  p.content = String(body?.content ?? p.content)
  p.coverImage = body?.coverImage ? String(body.coverImage) : null
  p.tags = Array.isArray(body?.tags) ? body.tags.map(String) : (typeof body?.tags === "string" ? String(body.tags).split(",").map((s) => s.trim()).filter(Boolean) : p.tags)
  p.authorName = String(body?.authorName ?? p.authorName)
  p.status = body?.status === "published" ? "published" : "draft"
  p.isFeatured = Boolean(body?.isFeatured)
  p.isActive = body?.isActive !== false

  // Category (optional)
  if (body?.categoryId === null) {
    p.category = null
  } else if (typeof body?.categoryId === "string" && body.categoryId) {
    const cat = await catRepo.findOne({ where: { id: String(body.categoryId) } as any })
    if (cat) p.category = cat as any
  }

  if (p.status === "published" && !p.publishedAt) p.publishedAt = new Date()
  if (p.status === "draft") p.publishedAt = null

  await repo.save(row as any)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")
  await repo.delete({ id } as any)
  return NextResponse.json({ ok: true })
}

