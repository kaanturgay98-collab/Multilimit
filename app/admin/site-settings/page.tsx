"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Save, Phone, Mail, MessageCircle, Link2, ShoppingBag, MapPin } from "lucide-react"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type SiteSettings = {
  phone: string | null
  email: string | null
  whatsapp: string | null
  address: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  trendyolUrl: string | null
}

function toReadableAdminError(error: unknown) {
  const raw = String((error as any)?.message || error || "Bir hata oluştu")
  const lower = raw.toLowerCase()

  if (
    lower.includes("read-only") ||
    lower.includes("readonly") ||
    lower.includes("sqlite_readonly")
  ) {
    return "Canlı ortam veritabanı yazmaya kapalı görünüyor. Sunucuda DATABASE_URL ve dosya izinlerini kontrol edin."
  }

  return raw
}

export default function AdminSiteSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState<SiteSettings>({
    phone: "",
    email: "",
    whatsapp: "",
    address: "",
    instagramUrl: "",
    facebookUrl: "",
    trendyolUrl: "",
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await adminFetchJson<{ ok: boolean; row?: SiteSettings; error?: string }>("/api/admin/site-settings")
        if (data.ok && data.row) {
          setSettings({
            phone: data.row.phone || "",
            email: data.row.email || "",
            whatsapp: data.row.whatsapp || "",
            address: data.row.address || "",
            instagramUrl: data.row.instagramUrl || "",
            facebookUrl: data.row.facebookUrl || "",
            trendyolUrl: data.row.trendyolUrl || "",
          })
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; row?: SiteSettings; error?: string }>("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (data.ok) {
        toast({
            title: "Başarılı",
            description: "Site ayarları başarıyla kaydedildi.",
        })
      } else {
        throw new Error(data.error || "Bir hata oluştu")
      }
    } catch (error: any) {
        toast({
            title: "Hata",
            description: toReadableAdminError(error),
            variant: "destructive"
        })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500 bg-white min-h-screen">Yükleniyor...</div>

  return (
    <div className="space-y-6 bg-slate-50/30 p-4 lg:p-8 rounded-2xl min-h-screen text-slate-900">
      <AdminPageHeader
        title="İletişim Bilgileri"
        description="Header ve iletişim alanlarında kullanılan bilgileri buradan yönetin."
        className="text-slate-900"
        actions={
          <Button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white hover:bg-slate-800 px-6 rounded-xl shadow-md transition-all">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </Button>
        }
      />

      <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl max-w-3xl">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-900" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Düzenlenebilir Alanlar</h3>
        </div>

        <div className="p-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">E-posta Adresi</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@multilimit.com"
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Telefon Numarası</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+90 850 XXX XX XX"
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">WhatsApp Hattı</label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
              <Input
                value={settings.whatsapp || ""}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                placeholder="90XXXXXXXXXX"
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
            <p className="text-[10px] text-slate-400 italic">Ülke koduyla beraber (Örn: 90555...)</p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Instagram URL</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={settings.instagramUrl || ""}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Facebook URL</label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={settings.facebookUrl || ""}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                placeholder="https://facebook.com/..."
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Adres</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Levent Mah. Buyukdere Cad. No:123, Besiktas, Istanbul 34394"
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Trendyol Linki</label>
            <div className="relative">
              <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F27A1A]" />
              <Input
                value={settings.trendyolUrl || ""}
                onChange={(e) => setSettings({ ...settings, trendyolUrl: e.target.value })}
                placeholder="https://www.trendyol.com/..."
                className="bg-white border-slate-300 text-slate-900 pl-10"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
