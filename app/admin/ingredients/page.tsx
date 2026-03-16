"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminIngredientsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Icerikler" description="Ingredient kartlarini yonet (siralama, aktiflik, metinler, ikon)." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `Ingredient` CRUD tablo + create/edit formlari ile tamamlanacak.
      </Card>
    </div>
  )
}

