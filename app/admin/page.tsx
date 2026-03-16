"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type DashboardData = {
  kpis: {
    totalOrders: number
    pendingOrders: number
    activeProducts: number
    publishedBlogs: number
    unreadMessages: number
  }
  recentOrders: Array<{ id: string; orderNo: string; status: string; totalAmount: number; currency: string; createdAt: string }>
}

type AnalyticsSummary = {
  kpis: {
    pageViews24h: number
    pageViews7d: number
    uniqueSessions24h: number
    heroPrimaryCtr7d: number
  }
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const json = await adminFetchJson<any>("/api/admin/dashboard")
      if (!cancelled && json?.ok) setData(json)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const json = await adminFetchJson<any>("/api/admin/analytics/summary")
      if (!cancelled && json?.ok) setAnalytics(json)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = [
    { label: "Toplam Siparis", value: data?.kpis.totalOrders ?? 0 },
    { label: "Bekleyen Siparis", value: data?.kpis.pendingOrders ?? 0 },
    { label: "Aktif Urun", value: data?.kpis.activeProducts ?? 0 },
    { label: "Yayinlanan Blog", value: data?.kpis.publishedBlogs ?? 0 },
    { label: "Okunmamis Mesaj", value: data?.kpis.unreadMessages ?? 0 },
    { label: "Ziyaret (24s)", value: analytics?.kpis.pageViews24h ?? 0 },
    { label: "Tekil (24s)", value: analytics?.kpis.uniqueSessions24h ?? 0 },
    { label: "Ziyaret (7g)", value: analytics?.kpis.pageViews7d ?? 0 },
    { label: "Hero CTR (7g)", value: `${Math.round(((analytics?.kpis.heroPrimaryCtr7d ?? 0) * 100 + Number.EPSILON) * 100) / 100}%` },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Icerik, urun ve siparislerin ozet gorunumu. Asagidaki hizli aksiyonlarla yonetime baslayabilirsin.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/70 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-semibold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Canli veri</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/80 lg:col-span-2">
          <CardHeader>
            <CardTitle>Son Siparisler</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.recentOrders?.length ? (
              <div className="space-y-2">
                {data.recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-foreground">{o.orderNo}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("tr-TR")}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{o.status}</div>
                    <div className="font-semibold text-primary text-sm">
                      {o.totalAmount.toLocaleString("tr-TR")} {o.currency}
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin/orders">Tum siparisler</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Henuz siparis yok.</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle>Son Mesajlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Iletisim formundan gelen en son mesajlarin ozetini burada goreceksin. Detay icin &quot;Iletisim
              Mesajlari&quot; ekranina git.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle>Sayfa Iceriklerini Guncelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Ana sayfa, hakkimizda ve diger bolumlerin metinlerini ve bloklarini yonet.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/pages">Sayfa yonetimine git</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle>Urun ve Paketler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Multilimit urununu, varyantlarini ve fiyatlarini tek yerden kontrol et.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/products">Urunlere git</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle>Blog & SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Blog yazilarini ve SEO alanlarini optimize ederek organik trafigi artir.
            </p>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/admin/blog-posts">Blog yonetimine git</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

