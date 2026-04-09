import { NextResponse } from "next/server"
import { listLatestPublishedPosts } from "@/lib/blog-db"

export const runtime = "nodejs"

/** Public blog list — yalnızca yayında ve aktif yazılar (içerik gönderilmez). */
export async function GET() {
  try {
    const rows = listLatestPublishedPosts(500)
    return NextResponse.json({
      ok: true,
      posts: rows.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        isFeatured: p.isFeatured,
        publishedAt: p.publishedAt,
        authorName: p.authorName,
      })),
    })
  } catch (error: unknown) {
    console.error("[Public blog API] GET Error:", error)
    const message = error instanceof Error ? error.message : "Liste alinamadi"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
