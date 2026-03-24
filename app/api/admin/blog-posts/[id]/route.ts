import { NextResponse } from "next/server"
import { deleteBlogPostById, getBlogPostById, updateBlogPost } from "@/lib/blog-db"

export const runtime = "nodejs"

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const p = getBlogPostById(id)
  if (!p) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

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
    const existing = getBlogPostById(id)
    if (!existing) return NextResponse.json({ ok: false, error: "Blog yazısı bulunamadı" }, { status: 404 })

    const body = (await req.json().catch(() => null)) as any

    let tags: string[] | null | undefined = undefined
    if (Array.isArray(body?.tags)) tags = body.tags.map(String)
    else if (typeof body?.tags === "string")
      tags = String(body.tags)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

    const ok = updateBlogPost(id, {
      title: String(body?.title ?? existing.title),
      slug: String(body?.slug ?? existing.slug),
      excerpt: String(body?.excerpt ?? existing.excerpt),
      content: String(body?.content ?? existing.content),
      coverImage: body?.coverImage ? String(body.coverImage) : null,
      tags: tags !== undefined ? tags : existing.tags,
      authorName: String(body?.authorName ?? existing.authorName),
      status: body?.status === "published" ? "published" : "draft",
      isFeatured: Boolean(body?.isFeatured),
      isActive: body?.isActive !== false,
    })

    if (!ok) return NextResponse.json({ ok: false, error: "Blog yazısı bulunamadı" }, { status: 404 })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[Blog API] PUT Error:", error)
    return NextResponse.json({ ok: false, error: error.message || "Güncelleme hatası" }, { status: 500 })
  }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params

    const removed = deleteBlogPostById(id)
    if (!removed) return NextResponse.json({ ok: false, error: "Yazı zaten silinmiş" }, { status: 404 })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error("[Blog API] DELETE Error:", error)
    return NextResponse.json({ ok: false, error: "Silme işlemi başarısız oldu" }, { status: 500 })
  }
}
