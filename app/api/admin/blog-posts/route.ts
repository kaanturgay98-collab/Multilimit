import { NextResponse } from "next/server"
import { insertBlogPost, listPostsForAdmin } from "@/lib/blog-db"

export const runtime = "nodejs"

export async function GET() {
  try {
    const rows = listPostsForAdmin()

    return NextResponse.json({
      ok: true,
      rows: rows.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        status: p.status,
        isFeatured: Boolean(p.isFeatured),
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
        updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
      })),
    })
  } catch (error: any) {
    console.error("[Blog API] GET Error:", error)
    return NextResponse.json({ ok: false, error: "Blog yazıları listelenirken bir hata oluştu: " + error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as any
    const title = String(body?.title ?? "").trim()
    const slug = String(body?.slug ?? "").trim()

    if (!title || !slug) {
      return NextResponse.json({ ok: false, error: "Başlık ve Slug alanları zorunludur" }, { status: 400 })
    }

    const id = insertBlogPost({
      title,
      slug,
      excerpt: String(body?.excerpt ?? ""),
      content: String(body?.content ?? ""),
      coverImage: body?.coverImage ? String(body.coverImage) : null,
      tags: Array.isArray(body?.tags) ? body.tags.map(String) : null,
      authorName: String(body?.authorName ?? "Multilimit"),
      publishedAt: null,
      status: body?.status === "published" ? "published" : "draft",
      isFeatured: Boolean(body?.isFeatured),
      isActive: body?.isActive !== false,
    })

    return NextResponse.json({ ok: true, row: { id } })
  } catch (error: any) {
    console.error("[Blog API] POST Error:", error)
    return NextResponse.json(
      { ok: false, error: error.message || "Blog yazısı kaydedilirken bir hata oluştu" },
      { status: 500 }
    )
  }
}
