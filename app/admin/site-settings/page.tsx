"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, Phone, Mail, MessageCircle, Globe, Copyright, UploadCloud, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type SiteSettings = {
  siteName: string
  logoUrl: string | null
  faviconUrl: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  youtubeUrl: string | null
  xUrl: string | null
  footerText: string | null
  copyright: string | null
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
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingFavicon, setUploadingFavicon] = useState(false)
  
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "Multilimit",
    logoUrl: "",
    faviconUrl: "",
    phone: "",
    email: "",
    whatsapp: "",
    instagramUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
    xUrl: "",
    footerText: "",
    copyright: ""
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await adminFetchJson<{ ok: boolean; row?: SiteSettings; error?: string }>("/api/admin/site-settings")
        if (data.ok && data.row) {
          setSettings(data.row)
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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') {
    const file = e.target.files?.[0]
    if (!file) return

    if (type === 'logo') setUploadingLogo(true)
    else setUploadingFavicon(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("collection", "site-assets")

      const data = await adminFetchJson<any>("/api/admin/media", {
        method: "POST",
        body: formData,
      })

      if (data.ok && data.asset) {
        setSettings(prev => ({
          ...prev,
          [type === 'logo' ? 'logoUrl' : 'faviconUrl']: data.asset.url
        }))
        toast({
          title: "Yüklendi",
          description: `${type === 'logo' ? 'Logo' : 'Favicon'} başarıyla yüklendi. Ayarları kaydetmeyi unutmayın.`,
        })
      } else {
        throw new Error(data.error || "Dosya yüklenemedi")
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: toReadableAdminError(error),
        variant: "destructive"
      })
    } finally {
      if (type === 'logo') setUploadingLogo(false)
      else setUploadingFavicon(false)
      e.target.value = ""
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500 bg-white min-h-screen">Yükleniyor...</div>

  return (
    <div className="space-y-6 bg-slate-50/30 p-4 lg:p-8 rounded-2xl min-h-screen text-slate-900">
      <AdminPageHeader 
        title="Site Ayarları" 
        description="Marka kimliği, iletişim bilgileri ve alt bilgi içeriklerini buradan yönetebilirsiniz." 
        className="text-slate-900"
        actions={
            <Button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white hover:bg-slate-800 px-6 rounded-xl shadow-md transition-all">
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
        }
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Brand/Identity */}
        <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl h-full flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Marka Kimliği</h3>
            </div>

            <div className="p-6 space-y-6 flex-1">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Site Adı</label>
                    <Input 
                        value={settings.siteName} 
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="bg-white border-slate-300 text-slate-900 focus:ring-slate-200"
                    />
                </div>

                {/* Logo Upload */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Site Logosu</label>
                    <div className="flex items-center gap-6">
                        <div className="relative group w-24 h-24 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                            {settings.logoUrl ? (
                                <>
                                    <img src={settings.logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSettings({ ...settings, logoUrl: "" })}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-slate-300 text-[10px] text-center p-2 font-bold uppercase">LOGO YOK</div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="inline-flex cursor-pointer">
                                <span className={cn(
                                    "flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-all border border-slate-200",
                                    uploadingLogo && "opacity-50 pointer-events-none"
                                )}>
                                    <UploadCloud className="w-4 h-4" />
                                    {uploadingLogo ? "Yükleniyor..." : "Yeni Logo Seç"}
                                </span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} disabled={uploadingLogo} />
                            </label>
                            <p className="text-[10px] text-slate-400">Önerilen: 300x80px PNG veya SVG</p>
                        </div>
                    </div>
                </div>

                {/* Favicon Upload */}
                <div className="space-y-3 pt-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Favicon (Sekme İkonu)</label>
                    <div className="flex items-center gap-6">
                        <div className="relative group w-12 h-12 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                            {settings.faviconUrl ? (
                                <>
                                    <img src={settings.faviconUrl} alt="Favicon" className="w-full h-full object-contain p-2" />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="destructive" size="icon" className="h-6 w-6 rounded-full" onClick={() => setSettings({ ...settings, faviconUrl: "" })}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-slate-300 text-[8px] font-bold uppercase">FAV</div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="inline-flex cursor-pointer">
                                <span className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all border border-slate-200",
                                    uploadingFavicon && "opacity-50 pointer-events-none"
                                )}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {uploadingFavicon ? "Yükleniyor..." : "Yükle"}
                                </span>
                                <input type="file" className="hidden" accept="image/x-icon,image/png" onChange={(e) => handleFileUpload(e, 'favicon')} disabled={uploadingFavicon} />
                            </label>
                            <p className="text-[10px] text-slate-400">Önerilen: 32x32px .ico veya .png</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        {/* Contact Info */}
        <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl h-full flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-900" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">İletişim Bilgileri</h3>
          </div>
          
          <div className="p-6 space-y-6 flex-1">
            <div className="space-y-2">
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
                <Input
                    value={settings.instagramUrl || ""}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="bg-white border-slate-300 text-slate-900"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Facebook URL</label>
                <Input
                    value={settings.facebookUrl || ""}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="bg-white border-slate-300 text-slate-900"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">YouTube URL</label>
                <Input
                    value={settings.youtubeUrl || ""}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                    className="bg-white border-slate-300 text-slate-900"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">X URL</label>
                <Input
                    value={settings.xUrl || ""}
                    onChange={(e) => setSettings({ ...settings, xUrl: e.target.value })}
                    placeholder="https://x.com/..."
                    className="bg-white border-slate-300 text-slate-900"
                />
            </div>
          </div>
        </Card>

        {/* Footer & Meta */}
        <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl md:col-span-2">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <Copyright className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Alt Bilgi (Footer)</h3>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Telif Hakkı (Copyright)</label>
                    <Input 
                        value={settings.copyright || ""} 
                        onChange={(e) => setSettings({ ...settings, copyright: e.target.value })}
                        placeholder="© 2024 Multilimit. Tüm Hakları Saklıdır."
                        className="bg-white border-slate-300 text-slate-900"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Footer Logo Altı Metin</label>
                    <Textarea 
                        value={settings.footerText || ""} 
                        onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                        placeholder="Şirket vizyonu veya kısa bir slogan..."
                        className="bg-white border-slate-300 text-slate-900 min-h-[100px] resize-none"
                    />
                </div>
            </div>
        </Card>
      </div>
    </div>
  )
}
