"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Yonetim icin hizli aksiyonlar.
        </p>
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

