"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminContactMessagesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Iletisim Mesajlari" description="Yeni/okundu/yanitlandi mesaj yonetimi." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `ContactMessage` liste + detay + durum guncelleme ile tamamlanacak.
      </Card>
    </div>
  )
}

