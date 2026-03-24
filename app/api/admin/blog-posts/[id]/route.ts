import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const ds = await getDb()
  const repo = ds.getRepository("BlogPost")

  const row = await repo.findOne({ where: { id } as any })
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
      categoryName: null,
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
  try {
    const { id } = await ctx.params
    const ds = await getDb()
    const repo = ds.getRepository("BlogPost")

    const row = await repo.findOne({ where: { id } as any })
    if (!row) return NextResponse.json({ ok: false, error: "Blog yazısı bulunamadı" }, { status: 404 })

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

    if (p.status === "published" && !p.publishedAt) p.publishedAt = new Date()
    if (p.status === "draft") p.publishedAt = null

    await repo.save(row as any)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[Blog API] PUT Error:", error)
    return NextResponse.json({ ok: false, error: error.message || "Güncelleme hatası" }, { status: 500 })
  }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params
    const ds = await getDb()
    const repo = ds.getRepository("BlogPost")
    
    const row = await repo.findOne({ where: { id } as any })
    if (!row) return NextResponse.json({ ok: false, error: "Yazı zaten silinmiş" }, { status: 404 })

    await repo.delete({ id } as any)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[Blog API] DELETE Error:", error)
    return NextResponse.json({ ok: false, error: "Silme işlemi başarısız oldu" }, { status: 500 })
  }
}

