"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminActivityLogPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Aktivite Loglari" description="Adminlerin yaptigi degisikliklerin gecmisi." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `ActivityLog` liste + filtre + detay ile tamamlanacak.
      </Card>
    </div>
  )
}

