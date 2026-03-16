"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminPageHeader, AdminPrimaryAction } from "@/components/admin/admin-page-header"
import { AdminTable, AdminTableColumn } from "@/components/admin/admin-table"
import { mockFaqs, type FaqRow } from "@/lib/admin/mock-data"

export default function AdminFaqPage() {
  const [query, setQuery] = useState("")
  const [rows] = useState<FaqRow[]>(mockFaqs)

  const filtered = rows.filter((f) => {
    const q = query.toLowerCase()
    return f.question.toLowerCase().includes(q) || (f.category ?? "").toLowerCase().includes(q)
  })

  const columns: AdminTableColumn<FaqRow>[] = [
    { key: "question", header: "Soru" },
    {
      key: "category",
      header: "Kategori",
      render: (row) => <span className="text-xs text-muted-foreground">{row.category ?? "-"}</span>,
    },
    {
      key: "isActive",
      header: "Durum",
      render: (row) => (
        <span className="text-xs text-muted-foreground">{row.isActive ? "Aktif" : "Pasif"}</span>
      ),
    },
    {
      key: "id",
      header: "",
      render: () => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="xs">
            Duzenle
          </Button>
          <Button variant="ghost" size="xs" className="text-destructive">
            Sil
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <AdminPageHeader
        title="SSS"
        description="Kullanicilarin en sik sordugu sorulari yonet."
        actions={<AdminPrimaryAction label="Yeni Soru" />}
      />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Input
            placeholder="Soru veya kategori ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm bg-background/60 border-border/60"
          />
        </div>
        <div className="mt-2 overflow-x-auto">
          <AdminTable columns={columns} rows={filtered} />
        </div>
      </Card>
    </div>
  )
}

