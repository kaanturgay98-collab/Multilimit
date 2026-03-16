"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Kullanici Yorumlari" description="Yorumlari onayla, one cikar, gorunurlugu yonet." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `Testimonial` CRUD + onay/gorunurluk toggles ile tamamlanacak.
      </Card>
    </div>
  )
}

