"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type MediaAsset = { id: string; url: string; alt: string | null; collection: string | null; createdAt: string }

export default function AdminMediaPage() {
  const [rows, setRows] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState("general")
  const [alt, setAlt] = useState("")

  async function refresh() {
    setLoading(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; assets?: MediaAsset[]; error?: string }>("/api/admin/media")
      if (data.ok) setRows(data.assets || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function upload(file: File) {
    const form = new FormData()
    form.set("file", file)
    form.set("collection", collection)
    if (alt.trim()) form.set("alt", alt.trim())
    await fetch("/api/admin/media", { method: "POST", body: form })
    setAlt("")
    await refresh()
  }

  async function remove(id: string) {
    await fetch(`/api/admin/media/${encodeURIComponent(id)}`, { method: "DELETE" })
    await refresh()
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Medya Kutuphanesi" description="Gorsel yukle, listele ve yonet." />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Koleksiyon</div>
            <Input value={collection} onChange={(e) => setCollection(e.target.value)} className="bg-background/60 border-border/60 w-56" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-xs text-muted-foreground">Alt (opsiyonel)</div>
            <Input value={alt} onChange={(e) => setAlt(e.target.value)} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Dosya</div>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="bg-background/60 border-border/60"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void upload(f)
                e.currentTarget.value = ""
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-muted-foreground text-sm">Yukleniyor...</div>
        ) : rows.length === 0 ? (
          <div className="text-muted-foreground text-sm">Henuz medya yok.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((m) => (
              <div key={m.id} className="border border-border/60 rounded-xl overflow-hidden bg-background/40">
                <div className="relative aspect-video bg-muted">
                  <Image src={m.url} alt={m.alt || ""} fill className="object-cover" />
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground truncate">{m.collection ?? "general"}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{m.url}</div>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => void remove(m.id)}>
                    Sil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

