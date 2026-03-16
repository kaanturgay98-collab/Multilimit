"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

type HomeConfig = {
  heroTitle: string
  heroDescription: string
  ctaPrimary: string
  ctaSecondary: string
}

export default function AdminHomePage() {
  const [cfg, setCfg] = useState<HomeConfig>({
    heroTitle: "Sabah Daha Zinde Baslayin",
    heroDescription: "Gunluk yasam temposuna destek veren premium formul.",
    ctaPrimary: "Siparis Ver",
    ctaSecondary: "Urunu Incele",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // ileri adim: PageSection ile DB'den oku/yaz
  }, [])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Ana Sayfa Yonetimi"
        description="Hero baslik/aciklama ve CTA metinlerini yonet (simdilik mock; sonraki adimda TypeORM PageSection'a baglanacak)."
        actions={
          <Button
            className="bg-primary text-primary-foreground"
            disabled={saving}
            onClick={async () => {
              setSaving(true)
              await new Promise((r) => setTimeout(r, 600))
              setSaving(false)
            }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        }
      />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Hero Baslik</div>
            <Input value={cfg.heroTitle} onChange={(e) => setCfg({ ...cfg, heroTitle: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">CTA (Primary)</div>
            <Input value={cfg.ctaPrimary} onChange={(e) => setCfg({ ...cfg, ctaPrimary: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">CTA (Secondary)</div>
            <Input value={cfg.ctaSecondary} onChange={(e) => setCfg({ ...cfg, ctaSecondary: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="text-xs text-muted-foreground">Hero Aciklama</div>
            <Textarea value={cfg.heroDescription} onChange={(e) => setCfg({ ...cfg, heroDescription: e.target.value })} className="bg-background/60 border-border/60 min-h-28" />
          </div>
        </div>
      </Card>
    </div>
  )
}

