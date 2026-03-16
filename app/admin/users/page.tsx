"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Kullanicilar" description="Kullanici listesi, roller ve aktivite." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `User` CRUD + filtreleme ve detay sayfasi ile tamamlanacak.
      </Card>
    </div>
  )
}

