"use client"

import { Card } from "@/components/ui/card"
import { AdminPageHeader } from "@/components/admin/admin-page-header"

export default function AdminBlogCategoriesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Blog Kategorileri" description="Kategori olustur, duzenle, aktif/pasif yap." />
      <Card className="border-border/70 bg-card/80 p-4 text-sm text-muted-foreground">
        Bu ekran bir sonraki adimda `BlogCategory` CRUD tablo + form ile tamamlanacak.
      </Card>
    </div>
  )
}

