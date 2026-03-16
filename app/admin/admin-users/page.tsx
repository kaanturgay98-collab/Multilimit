"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminAdminUsersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Admin Kullanicilari / Roller" description="Admin kullanicilari, roller ve yetkiler." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `AdminUser` + `Role` CRUD ve rol bazli erisimle tamamlanacak.
      </Card>
    </div>
  )
}

