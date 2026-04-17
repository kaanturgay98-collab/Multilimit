"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type PageImage = { id: string; url: string; alt: string | null; sortOrder: number }
type Page = {
  slug: string
  title: string
  data: unknown
  images: PageImage[]
}

function stringifyJson(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2)
}

export default function AdminPageEditor() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const [page, setPage] = useState<Page | null>(null)
  const [title, setTitle] = useState("")
  const [jsonText, setJsonText] = useState("")
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [uploadAlt, setUploadAlt] = useState("")
  const [uploadSort, setUploadSort] = useState("0")

  const parsedJson = useMemo(() => {
    try {
      const v = JSON.parse(jsonText || "{}") as unknown
      setJsonError(null)
      return v
    } catch {
      setJsonError("JSON gecersiz")
      return null
    }
  }, [jsonText])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await adminFetchJson<{ ok: boolean; page?: Page; error?: string }>(`/api/admin/pages/${encodeURIComponent(slug)}`)
      if (!data.ok || !data.page) return
      if (cancelled) return
      setPage(data.page)
      setTitle(data.page.title)
      setJsonText(stringifyJson(data.page.data))
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  async function save() {
    if (!page) return
    if (!parsedJson) return
    setSaving(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; page?: Page; error?: string }>(`/api/admin/pages/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, data: parsedJson }),
      })
      if (!data.ok || !data.page) throw new Error(data.error || "Kaydedilemedi")
      setPage(data.page)
    } finally {
      setSaving(false)
    }
  }

  async function upload(file: File) {
    setUploading(true)
    try {
      const form = new FormData()
      form.set("file", file)
      if (uploadAlt.trim()) form.set("alt", uploadAlt.trim())
      if (uploadSort.trim()) form.set("sortOrder", uploadSort.trim())

      const data = await adminFetchJson<{ ok: boolean; image?: PageImage; error?: string }>(
        `/api/admin/pages/${encodeURIComponent(slug)}/images`,
        { method: "POST", body: form }
      )
      if (!data.ok || !data.image) throw new Error(data.error || "Upload basarisiz")
      const image = data.image
      setPage((p) => (p ? { ...p, images: [...p.images, image].sort((a, b) => a.sortOrder - b.sortOrder) } : p))
      setUploadAlt("")
    } finally {
      setUploading(false)
    }
  }

  async function removeImage(id: string) {
    const res = await fetch(`/api/admin/images/${encodeURIComponent(id)}`, { method: "DELETE" })
    if (!res.ok) return
    setPage((p) => (p ? { ...p, images: p.images.filter((i) => i.id !== id) } : p))
  }

  if (!page) {
    return <div className="text-muted-foreground">Yukleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sayfa Duzenle</h1>
          <p className="text-muted-foreground font-mono text-xs">{page.slug}</p>
        </div>
        <Button onClick={save} disabled={saving || !parsedJson} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <Card className="p-5 border-border space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Baslik</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="json">Icerik (JSON)</Label>
          <Textarea id="json" value={jsonText} onChange={(e) => setJsonText(e.target.value)} className="min-h-64 font-mono text-xs" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Ornek: {"{ \"mode\": \"overlay\", \"adminHtml\": \"<p>Merhaba</p>\" }"}
            </div>
            {jsonError && <div className="text-sm text-destructive">{jsonError}</div>}
          </div>
        </div>
      </Card>

      <Card className="p-5 border-border space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Gorseller</h2>
            <p className="text-sm text-muted-foreground">Ekle / sil</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <Label htmlFor="alt">Alt</Label>
              <Input id="alt" value={uploadAlt} onChange={(e) => setUploadAlt(e.target.value)} placeholder="opsiyonel" />
            </div>
            <div className="space-y-1 w-24">
              <Label htmlFor="sort">Sira</Label>
              <Input id="sort" value={uploadSort} onChange={(e) => setUploadSort(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Dosya</Label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) void upload(f)
                  e.currentTarget.value = ""
                }}
              />
            </div>
          </div>
        </div>

        {page.images.length === 0 ? (
          <div className="text-sm text-muted-foreground">Henuz gorsel yok.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.images
              .slice()
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((img) => (
                <div key={img.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div className="text-xs text-muted-foreground truncate">
                      {img.sortOrder} · {img.url}
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => void removeImage(img.id)}>
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

