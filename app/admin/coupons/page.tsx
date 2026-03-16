"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Kuponlar / Kampanyalar" description="Kupon kodlari, indirim tipleri ve limitleri." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `Coupon` CRUD + tarih araligi + aktiflik yonetimi ile tamamlanacak.
      </Card>
    </div>
  )
}

