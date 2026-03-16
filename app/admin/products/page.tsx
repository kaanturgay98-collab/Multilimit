"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AdminPageHeader, AdminPrimaryAction } from "@/components/admin/admin-page-header"
import { AdminTable, AdminTableColumn } from "@/components/admin/admin-table"
import type { ProductRow } from "@/lib/admin/mock-data"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

export default function AdminProductsPage() {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<ProductRow[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await adminFetchJson<{ ok: boolean; rows?: ProductRow[]; error?: string }>("/api/admin/products")
      if (!cancelled && data?.ok) setRows(data.rows || [])
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = rows.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    )
  })

  const columns: AdminTableColumn<ProductRow>[] = [
    { key: "name", header: "Urun" },
    {
      key: "sku",
      header: "SKU / Slug",
      render: (row) => (
        <div className="flex flex-col text-xs">
          <span className="font-mono text-foreground">{row.sku}</span>
          <span className="text-muted-foreground">/{row.slug}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: "Fiyat",
      render: (row) => (
        <div className="text-sm">
          {row.salePrice ? (
            <div className="flex flex-col">
              <span className="font-semibold text-primary">
                {row.salePrice.toLocaleString("tr-TR")} TL
              </span>
              <span className="text-xs line-through text-muted-foreground">
                {row.price.toLocaleString("tr-TR")} TL
              </span>
            </div>
          ) : (
            <span className="font-semibold">{row.price.toLocaleString("tr-TR")} TL</span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stok",
      render: (row) => (
        <span className="text-sm">{row.stock}</span>
      ),
    },
    {
      key: "badge",
      header: "Etiket",
      render: (row) =>
        row.badge ? (
          <Badge variant="outline" className="border-primary/60 text-primary text-[11px]">
            {row.badge === "bestseller" ? "Cok satan" : row.badge === "premium" ? "Premium" : "Yeni"}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        ),
    },
    {
      key: "isActive",
      header: "Durum",
      render: (row) => (
        <Badge
          className={row.isActive ? "bg-emerald-600/80" : "bg-gray-600/60"}
        >
          {row.isActive ? "Aktif" : "Pasif"}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/admin/products/${row.id}`}>Duzenle</Link>
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-destructive"
            onClick={async () => {
              if (!confirm("Bu urunu silmek istedigine emin misin?")) return
              await fetch(`/api/admin/products/${encodeURIComponent(row.id)}`, { method: "DELETE" })
              const data = await adminFetchJson<{ ok: boolean; rows?: ProductRow[]; error?: string }>("/api/admin/products")
              if (data?.ok) setRows(data.rows || [])
            }}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Urunler"
        description="Multilimit urunlerini, fiyatlarini ve stoklarini yonet."
        actions={
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            <Link href="/admin/products/new">Yeni Urun</Link>
          </Button>
        }
      />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Input
            placeholder="Urun adi, SKU veya slug ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm bg-background/60 border-border/60"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Filtreler
            </Button>
          </div>
        </div>

        <div className="mt-2 overflow-x-auto">
          <AdminTable columns={columns} rows={filtered} />
        </div>
      </Card>
    </div>
  )
}

