"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminSiteSettingsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Site Ayarlari" description="Logo, iletişim, sosyal linkler ve varsayilan SEO ayarlari." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `SiteSetting` entity + API ile gercek CRUD olacak.
      </Card>
    </div>
  )
}

