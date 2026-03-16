"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  authorName: string
  status: "draft" | "published"
  isFeatured: boolean
  isActive: boolean
}

export default function AdminBlogPostEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === "new"

  const [row, setRow] = useState<BlogPost | null>(
    isNew
      ? {
          id: "new",
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: null,
          tags: [],
          authorName: "Multilimit",
          status: "draft",
          isFeatured: false,
          isActive: true,
        }
      : null
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      const data = await adminFetchJson<{ ok: boolean; row?: BlogPost }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`)
      if (!cancelled && data?.ok && data.row) setRow(data.row)
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const canSave = useMemo(() => {
    if (!row) return false
    return row.title.trim().length >= 3 && row.slug.trim().length >= 3
  }, [row])

  async function save() {
    if (!row || !canSave) return
    setSaving(true)
    try {
      const payload = {
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        coverImage: row.coverImage,
        tags: row.tags,
        authorName: row.authorName,
        status: row.status,
        isFeatured: row.isFeatured,
        isActive: row.isActive,
      }

      if (isNew) {
        const created = await adminFetchJson<{ ok: boolean; row?: { id: string } }>("/api/admin/blog-posts", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (created?.ok && created.row?.id) router.replace(`/admin/blog-posts/${created.row.id}`)
      } else {
        await adminFetchJson<{ ok: boolean }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (isNew) return
    if (!confirm("Bu blog yazisini silmek istedigine emin misin?")) return
    await adminFetchJson<{ ok: boolean }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`, { method: "DELETE" })
    router.replace("/admin/blog-posts")
    router.refresh()
  }

  if (!row) return <div className="text-muted-foreground">Yukleniyor...</div>

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={isNew ? "Yeni Blog Yazisi" : "Blog Yazisi Duzenle"}
        description="Baslik, icerik, durum ve SEO alanlarini buradan yonet."
        actions={
          <div className="flex gap-2">
            {!isNew && (
              <Button variant="destructive" onClick={() => void remove()}>
                Sil
              </Button>
            )}
            <Button className="bg-primary text-primary-foreground" disabled={!canSave || saving} onClick={() => void save()}>
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        }
      />

      <Card className="border-border/70 bg-card/80 p-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Baslik</div>
          <Input value={row.title} onChange={(e) => setRow({ ...row, title: e.target.value })} className="bg-background/60 border-border/60" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Slug</div>
          <Input value={row.slug} onChange={(e) => setRow({ ...row, slug: e.target.value })} className="bg-background/60 border-border/60" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Yazar</div>
          <Input value={row.authorName} onChange={(e) => setRow({ ...row, authorName: e.target.value })} className="bg-background/60 border-border/60" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Durum</div>
          <select
            value={row.status}
            onChange={(e) => setRow({ ...row, status: e.target.value === "published" ? "published" : "draft" })}
            className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">One Cikan</div>
          <select
            value={row.isFeatured ? "yes" : "no"}
            onChange={(e) => setRow({ ...row, isFeatured: e.target.value === "yes" })}
            className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            <option value="no">Hayir</option>
            <option value="yes">Evet</option>
          </select>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Aktif</div>
          <select
            value={row.isActive ? "yes" : "no"}
            onChange={(e) => setRow({ ...row, isActive: e.target.value === "yes" })}
            className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm"
          >
            <option value="yes">Aktif</option>
            <option value="no">Pasif</option>
          </select>
        </div>

        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Ozet</div>
          <Textarea value={row.excerpt} onChange={(e) => setRow({ ...row, excerpt: e.target.value })} className="bg-background/60 border-border/60 min-h-20" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Icerik</div>
          <Textarea value={row.content} onChange={(e) => setRow({ ...row, content: e.target.value })} className="bg-background/60 border-border/60 min-h-56" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Etiketler (virgul ile)</div>
          <Input
            value={row.tags.join(", ")}
            onChange={(e) => setRow({ ...row, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
            className="bg-background/60 border-border/60"
          />
        </div>
      </Card>
    </div>
  )
}

