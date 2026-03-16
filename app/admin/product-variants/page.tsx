"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminPageHeader, AdminPrimaryAction } from "@/components/admin/admin-page-header"
import { AdminTable, AdminTableColumn } from "@/components/admin/admin-table"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type VariantRow = {
  id: string
  name: string
  productName: string
  productId: string | null
  price: number
  salePrice: number | null
  stock: number
  isOnSale: boolean
  isDefault: boolean
}

export default function AdminProductVariantsPage() {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<VariantRow[]>([])
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; rows?: VariantRow[]; error?: string }>("/api/admin/product-variants")
      if (data?.ok) setRows(data.rows || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  const filtered = rows.filter((v) => {
    const q = query.toLowerCase()
    return v.name.toLowerCase().includes(q) || v.productName.toLowerCase().includes(q)
  })

  async function remove(id: string) {
    await fetch(`/api/admin/product-variants/${encodeURIComponent(id)}`, { method: "DELETE" })
    await refresh()
  }

  const columns: AdminTableColumn<VariantRow>[] = [
    {
      key: "name",
      header: "Varyant",
      render: (row) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium">{row.name}</span>
          <span className="text-xs text-muted-foreground">{row.productName}</span>
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
              <span className="font-semibold text-primary">{row.salePrice.toLocaleString("tr-TR")} TL</span>
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
      render: (row) => <span className="text-sm">{row.stock}</span>,
    },
    {
      key: "isOnSale",
      header: "Satis",
      render: (row) => (
        <span className="text-xs text-muted-foreground">{row.isOnSale ? "Satis acik" : "Satis kapali"}</span>
      ),
    },
    {
      key: "isDefault",
      header: "Varsayilan",
      render: (row) =>
        row.isDefault ? (
          <span className="text-xs text-primary font-medium">Varsayilan paket</span>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        ),
    },
    {
      key: "id",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="xs" disabled={!row.productId}>
            <Link href={row.productId ? `/admin/products/${row.productId}` : "#"}>
              Duzenle
            </Link>
          </Button>
          <Button variant="ghost" size="xs" className="text-destructive" onClick={() => void remove(row.id)}>
            Sil
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Urun Varyantlari"
        description="Paketler, fiyatlar ve stoklari yonet."
        actions={<AdminPrimaryAction label="Yeni Varyant" disabled />}
      />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Input
            placeholder="Varyant veya urun ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm bg-background/60 border-border/60"
          />
        </div>

        <div className="mt-2 overflow-x-auto">
          <AdminTable columns={columns} rows={filtered} emptyText={loading ? "Yukleniyor..." : "Varyant yok."} />
        </div>
      </Card>
    </div>
  )
}

