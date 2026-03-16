"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type SeoRow = {
  id: string
  seoTitle: string
  seoDescription: string
  canonicalUrl: string | null
  ogImage: string | null
  indexable: boolean
}

export default function AdminSeoPage() {
  const [rows, setRows] = useState<SeoRow[]>([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    ogImage: "",
    indexable: true,
  })

  async function refresh() {
    setLoading(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; rows?: SeoRow[]; error?: string }>("/api/admin/seo")
      if (data.ok) setRows(data.rows || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function create() {
    await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        canonicalUrl: form.canonicalUrl || null,
        ogImage: form.ogImage || null,
        indexable: form.indexable,
      }),
    })
    setForm({ seoTitle: "", seoDescription: "", canonicalUrl: "", ogImage: "", indexable: true })
    await refresh()
  }

  async function remove(id: string) {
    await fetch(`/api/admin/seo/${encodeURIComponent(id)}`, { method: "DELETE" })
    await refresh()
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="SEO Yonetimi" description="Sayfa/urun/blog icin SEO meta kayitlarini yonet (simdilik genel meta)." />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">SEO Title</div>
            <Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Canonical</div>
            <Input value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <div className="text-xs text-muted-foreground">SEO Description</div>
            <Textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} className="bg-background/60 border-border/60 min-h-28" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <div className="text-xs text-muted-foreground">OG Image URL</div>
            <Input value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => void create()} className="bg-primary text-primary-foreground">
            SEO Kaydi Ekle
          </Button>
        </div>
      </Card>

      <Card className="border-border/70 bg-card/80 p-4 space-y-3">
        {loading ? (
          <div className="text-muted-foreground text-sm">Yukleniyor...</div>
        ) : rows.length === 0 ? (
          <div className="text-muted-foreground text-sm">Kayit yok.</div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="border border-border/60 rounded-xl p-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{r.seoTitle}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{r.seoDescription}</div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => void remove(r.id)}>
                  Sil
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

