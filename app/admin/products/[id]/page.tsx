"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { cn } from "@/lib/utils"
import { Trash2, UploadCloud } from "lucide-react"

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
  media?: { id: string; url: string; alt: string | null }[]
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
          media: [],
        }
      : null
  )
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`)
        const data = (await res.json().catch(() => null)) as { ok: boolean; row?: Product }
        if (!cancelled && data?.ok && data.row) setRow(data.row)
      } catch (e) {
        console.error("Fetch error", e)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const canSave = useMemo(() => {
    if (!row) return false
    // Debug point: Ensure these fields are populated
    return (row.name || "").trim() !== "" && (row.slug || "").trim() !== "" && (row.sku || "").trim() !== ""
  }, [row])

  async function save() {
    if (!row) return
    // If validations fail, we shouldn't continue
    if (!canSave) {
        alert("Lütfen Ürün Adı, SKU ve Slug alanlarını doldurunuz.")
        return
    }
    
    setSaving(true)
    try {
      const payload = {
        name: row.name,
        slug: row.slug,
        sku: row.sku,
        shortDescription: row.shortDescription,
        longDescription: row.longDescription,
        price: Number(row.price || 0),
        salePrice: row.salePrice === null ? null : Number(row.salePrice),
        stock: Number(row.stock || 0),
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
        const data = (await res.json().catch(() => null)) as { ok: boolean; row?: Product; error?: string }
        if (data?.ok && data.row) {
            router.replace("/admin/products")
            setTimeout(() => router.refresh(), 100)
        } else {
            alert("Hata: " + (data?.error || "Ürün oluşturulamadı."))
        }
      } else {
        const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
        const data = (await res.json().catch(() => null)) as { ok: boolean; error?: string }
        if (data?.ok) {
            alert("Başarıyla kaydedildi!")
            router.replace("/admin/products")
            setTimeout(() => router.refresh(), 100)
        } else {
            alert("Hata: " + (data?.error || "Güncelleme başarısız."))
        }
      }
    } catch (e) {
        console.error("Save error", e)
        alert("Bağlantı hatası: Kaydedilemedi.")
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (isNew) return
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return
    await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" })
    router.replace("/admin/products")
    router.refresh()
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || isNew || !row) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}/media`, {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.ok && data.asset) {
        setRow({ ...row, media: [...(row.media || []), data.asset] })
      }
    } finally {
      setUploading(false)
      e.target.value = "" // Reset input
    }
  }

  async function deleteImage(mediaId: string) {
    if (!row || isNew) return
    const res = await fetch(`/api/admin/products/${encodeURIComponent(id)}/media?mediaId=${mediaId}`, {
      method: "DELETE",
    })
    const data = await res.json()
    if (data.ok) {
      setRow({ ...row, media: (row.media || []).filter((m) => m.id !== mediaId) })
    }
  }

  if (!row) return <div className="text-slate-500 p-8 text-center bg-white min-h-screen font-medium">Lütfen bekleyin, veriler çekiliyor...</div>

  return (
    <div className="space-y-6 text-slate-900 bg-white p-4 lg:p-8 rounded-2xl min-h-screen">
      <AdminPageHeader
        title={isNew ? "Yeni Ürün Ekle" : "Ürünü Düzenle"}
        description="Ürün bilgilerini, fiyatını ve stok durumunu buradan güncelleyebilirsiniz."
        className="text-slate-900"
        actions={
          <div className="flex gap-2">
            {!isNew && (
              <Button variant="outline" className="text-destructive hover:bg-destructive/5" onClick={() => void remove()}>
                Ürünü Sil
              </Button>
            )}
            <Button 
                className={cn(
                    "bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-lg px-6 shadow-md",
                    !canSave && "opacity-50 cursor-not-allowed"
                )} 
                onClick={() => void save()}
                disabled={saving}
            >
              {saving ? "İşlem Yapılıyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ürün Bilgileri</h3>
            </div>
            <div className="p-6 grid gap-6">
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Ürün Adı *</label>
                <Input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} className="bg-white border-slate-300 text-slate-900 h-11 focus:ring-slate-200 focus:border-slate-400" placeholder="Örn: Premium Detoks Kompleksi" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">SKU / Stok Kodu *</label>
                  <Input value={row.sku} onChange={(e) => setRow({ ...row, sku: e.target.value })} className="bg-white border-slate-300 text-slate-900 h-10" placeholder="ML-001" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Slug / URL Uzantısı *</label>
                  <Input value={row.slug} onChange={(e) => setRow({ ...row, slug: e.target.value })} className="bg-white border-slate-300 text-slate-900 h-10" placeholder="premium-detoks" />
                </div>
              </div>

              <div className="grid gap-2 pt-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Kısa Açıklama</label>
                <Textarea value={row.shortDescription} onChange={(e) => setRow({ ...row, shortDescription: e.target.value })} className="bg-white border-slate-300 text-slate-900 min-h-20 resize-none" placeholder="Ürün listelerinde görünecek kısa metin..." />
              </div>

              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Detaylı Ürün Açıklaması</label>
                <Textarea value={row.longDescription} onChange={(e) => setRow({ ...row, longDescription: e.target.value })} className="bg-white border-slate-300 text-slate-900 min-h-40" placeholder="Ürün sayfasında görünecek tüm detaylar..." />
              </div>
            </div>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ürün Görselleri</h3>
            </div>
            <div className="p-6">
              {isNew ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <UploadCloud className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-sm text-slate-500 font-medium">Görsel yüklemek için önce ürünü oluşturmalısınız.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {row.media?.map((m) => (
                    <div key={m.id} className="relative group aspect-square border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
                      <img src={m.url} alt={m.alt || ""} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg" onClick={() => deleteImage(m.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <label className="aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all text-slate-400 hover:text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{uploading ? "Yükleniyor" : "Görsel Ekle"}</span>
                    <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={uploading} />
                  </label>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Fiyatlandırma</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Normal Fiyat (TL)</label>
                <Input 
                    type="number"
                    value={row.price} 
                    onChange={(e) => setRow({ ...row, price: Number(e.target.value || 0) })} 
                    className="bg-white border-slate-300 text-slate-900 font-bold text-lg" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">İndirimli Satış Fiyatı</label>
                <Input 
                    type="number"
                    value={row.salePrice === null ? "" : row.salePrice} 
                    onChange={(e) => setRow({ ...row, salePrice: e.target.value ? Number(e.target.value) : null })} 
                    className="bg-white border-slate-300 text-emerald-600 font-bold text-lg" 
                    placeholder="İndirim yok"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Mevcut Stok Miktarı</label>
                <Input 
                    type="number"
                    value={row.stock} 
                    onChange={(e) => setRow({ ...row, stock: Number(e.target.value || 0) })} 
                    className="bg-white border-slate-300 text-slate-900" 
                />
              </div>
            </div>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Durum & Etiketler</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Trendyol Satış Linki</label>
                <Input value={row.trendyolLink || ""} onChange={(e) => setRow({ ...row, trendyolLink: e.target.value || null })} className="bg-white border-slate-300 text-slate-900 text-xs" placeholder="Ürün linkini buraya yapıştırın" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Öne Çıkan Etiket</label>
                <select 
                  value={row.badge || ""} 
                  onChange={(e) => setRow({ ...row, badge: e.target.value || null })}
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-200"
                >
                  <option value="">Seçilmedi</option>
                  <option value="new">Yeni Ürün</option>
                  <option value="premium">Premium</option>
                  <option value="bestseller">Çok Satan</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="space-y-0.5">
                  <label className="text-sm font-bold text-slate-900">Aktif Durum</label>
                  <p className="text-[10px] text-slate-500 uppercase">Sitede gösterilsin mi?</p>
                </div>
                <button 
                  onClick={() => setRow({ ...row, isActive: !row.isActive })}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    row.isActive ? "bg-emerald-500" : "bg-slate-300"
                  )}
                >
                  <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm", row.isActive ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
