"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

type Product = {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  longDescription: string
  price: number
  salePrice: number | null
  stock: number
  featured: boolean
  badge: string | null
  isActive: boolean
  trendyolLink: string | null
}

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === "new"

  const [row, setRow] = useState<Product | null>(
    isNew
      ? {
          id: "new",
          name: "",
          slug: "",
          sku: "",
          shortDescription: "",
          longDescription: "",
          price: 0,
          salePrice: null,
          stock: 0,
          featured: false,
          badge: null,
          isActive: true,
          trendyolLink: null,
        }
      : null
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`)
      const data = (await res.json().catch(() => null)) as { ok: boolean; row?: Product }
      if (!cancelled && data?.ok && data.row) setRow(data.row)
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const canSave = useMemo(() => {
    if (!row) return false
    return row.name.trim() && row.slug.trim() && row.sku.trim()
  }, [row])

  async function save() {
    if (!row || !canSave) return
    setSaving(true)
    try {
      const payload = {
        name: row.name,
        slug: row.slug,
        sku: row.sku,
        shortDescription: row.shortDescription,
        longDescription: row.longDescription,
        price: Number(row.price),
        salePrice: row.salePrice === null ? null : Number(row.salePrice),
        stock: Number(row.stock),
        featured: row.featured,
        badge: row.badge,
        isActive: row.isActive,
        trendyolLink: row.trendyolLink,
      }

      if (isNew) {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
        const data = (await res.json().catch(() => null)) as { ok: boolean; row?: Product }
        if (data?.ok && data.row) router.replace(`/admin/products/${data.row.id}`)
      } else {
        await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (isNew) return
    await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" })
    router.replace("/admin/products")
    router.refresh()
  }

  if (!row) return <div className="text-muted-foreground">Yukleniyor...</div>

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={isNew ? "Yeni Urun" : "Urun Duzenle"}
        description="Urun bilgileri, fiyat ve durum alanlari."
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
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Urun Adi</div>
          <Input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} className="bg-background/60 border-border/60" />
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">SKU</div>
          <Input value={row.sku} onChange={(e) => setRow({ ...row, sku: e.target.value })} className="bg-background/60 border-border/60" />
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Slug</div>
          <Input value={row.slug} onChange={(e) => setRow({ ...row, slug: e.target.value })} className="bg-background/60 border-border/60" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Fiyat</div>
            <Input value={String(row.price)} onChange={(e) => setRow({ ...row, price: Number(e.target.value || 0) })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Indirim</div>
            <Input value={row.salePrice === null ? "" : String(row.salePrice)} onChange={(e) => setRow({ ...row, salePrice: e.target.value ? Number(e.target.value) : null })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Stok</div>
            <Input value={String(row.stock)} onChange={(e) => setRow({ ...row, stock: Number(e.target.value || 0) })} className="bg-background/60 border-border/60" />
          </div>
        </div>
        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Trendyol Linki</div>
          <Input value={row.trendyolLink || ""} onChange={(e) => setRow({ ...row, trendyolLink: e.target.value || null })} className="bg-background/60 border-border/60" placeholder="https://www.trendyol.com/..." />
        </div>
        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Kisa Aciklama</div>
          <Textarea value={row.shortDescription} onChange={(e) => setRow({ ...row, shortDescription: e.target.value })} className="bg-background/60 border-border/60 min-h-20" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-muted-foreground">Uzun Aciklama</div>
          <Textarea value={row.longDescription} onChange={(e) => setRow({ ...row, longDescription: e.target.value })} className="bg-background/60 border-border/60 min-h-40" />
        </div>
      </Card>
    </div>
  )
}

