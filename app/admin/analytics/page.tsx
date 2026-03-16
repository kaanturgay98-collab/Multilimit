"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { Button } from "@/components/ui/button"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type Report = {
  since: string
  ctr: { heroPrimary: number }
  counts: {
    homeViews: number
    heroPrimaryClicks: number
    orderClicks: number
    whatsappClicks: number
    newsletterClicks: number
  }
  topPages: Array<{ path: string; count: number }>
  topClicks: Array<{ name: string; count: number }>
}

export default function AdminAnalyticsPage() {
  const [since, setSince] = useState<"24h" | "7d">("7d")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  async function refresh(nextSince = since) {
    setLoading(true)
    try {
      const json = await adminFetchJson<any>(`/api/admin/analytics/report?since=${encodeURIComponent(nextSince)}`)
      if (json?.ok) setReport(json)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [since])

  const kpis = useMemo(() => {
    const r = report
    return [
      { label: "Ana sayfa goruntulenme", value: r?.counts.homeViews ?? 0 },
      { label: "Hero CTA tiklama", value: r?.counts.heroPrimaryClicks ?? 0 },
      { label: "Hero CTR", value: `${Math.round((((r?.ctr.heroPrimary ?? 0) * 100) + Number.EPSILON) * 100) / 100}%` },
      { label: "Siparis CTA tiklama", value: r?.counts.orderClicks ?? 0 },
      { label: "WhatsApp tiklama", value: r?.counts.whatsappClicks ?? 0 },
      { label: "Newsletter tiklama", value: r?.counts.newsletterClicks ?? 0 },
    ]
  }, [report])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        description="Basit trafik ve tiklama KPI'lari (hafif, kendi DB'mizde)."
        actions={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={since === "24h" ? "default" : "outline"}
              onClick={() => setSince("24h")}
              className={since === "24h" ? "bg-primary text-primary-foreground" : "border-border/60"}
            >
              24 Saat
            </Button>
            <Button
              size="sm"
              variant={since === "7d" ? "default" : "outline"}
              onClick={() => setSince("7d")}
              className={since === "7d" ? "bg-primary text-primary-foreground" : "border-border/60"}
            >
              7 Gun
            </Button>
            <Button size="sm" variant="outline" onClick={() => void refresh()} className="border-border/60">
              Yenile
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border/70 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground">{k.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-semibold">{k.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{loading ? "Yukleniyor..." : "Canli veri"}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/80 p-4 space-y-3">
          <div className="text-sm font-medium">En cok goruntulenen sayfalar</div>
          <AdminTable
            columns={[
              { key: "path", header: "Path" },
              { key: "count", header: "PV" },
            ]}
            rows={(report?.topPages ?? []).map((r) => ({ id: r.path, path: r.path, count: r.count }))}
            emptyText={loading ? "Yukleniyor..." : "Veri yok."}
          />
        </Card>

        <Card className="border-border/70 bg-card/80 p-4 space-y-3">
          <div className="text-sm font-medium">En cok tiklanan event'ler</div>
          <AdminTable
            columns={[
              { key: "name", header: "Event" },
              { key: "count", header: "Clicks" },
            ]}
            rows={(report?.topClicks ?? []).map((r) => ({ id: r.name, name: r.name, count: r.count }))}
            emptyText={loading ? "Yukleniyor..." : "Veri yok."}
          />
        </Card>
      </div>
    </div>
  )
}

