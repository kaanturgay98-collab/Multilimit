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
import { cn } from "@/lib/utils"

export default function AdminProductsPage() {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<ProductRow[]>([])

  useEffect(() => {
    let cancelled = false
      ; (async () => {
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
    {
      key: "name",
      header: "Ürün",
      render: (row) => (
        <span className="font-bold text-slate-900">{row.name}</span>
      )
    },
    {
      key: "sku",
      header: "SKU / Slug",
      render: (row) => (
        <div className="flex flex-col text-[11px]">
          <span className="font-mono text-slate-700">{row.sku}</span>
          <span className="text-slate-400">/{row.slug}</span>
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
              <span className="font-bold text-slate-900">
                {row.salePrice.toLocaleString("tr-TR")} TL
              </span>
              <span className="text-xs line-through text-slate-400">
                {row.price.toLocaleString("tr-TR")} TL
              </span>
            </div>
          ) : (
            <span className="font-bold text-slate-900">{row.price.toLocaleString("tr-TR")} TL</span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stok",
      render: (row) => (
        <span className="text-sm font-medium text-slate-700">{row.stock} Adet</span>
      ),
    },
    {
      key: "badge",
      header: "Etiket",
      render: (row) =>
        row.badge ? (
          <Badge variant="outline" className="border-slate-200 text-slate-600 bg-slate-50 text-[10px] font-bold uppercase tracking-tight">
            {row.badge === "bestseller" ? "Çok Satan" : row.badge === "premium" ? "Premium" : "Yeni"}
          </Badge>
        ) : (
          <span className="text-xs text-slate-300">-</span>
        ),
    },
    {
      key: "isActive",
      header: "Durum",
      render: (row) => (
        <Badge
          className={cn(
            "text-[10px] font-bold uppercase",
            row.isActive ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
          )}
        >
          {row.isActive ? "Aktif" : "Pasif"}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2 text-slate-900">
          <Button asChild variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 text-slate-700 h-8">
            <Link href={`/admin/products/${row.id}`}>Düzenle</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8"
            onClick={async () => {
              if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return
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
        title="Ürün Yönetimi"
        description="Mağazanızdaki ürünleri listeleyin, fiyat ve stok durumlarını güncelleyin."
        actions={
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg shadow-sm">
            <Link href="/admin/products/new">
              + Yeni Ürün Ekle
            </Link>
          </Button>
        }
      />

      <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-xl">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-sm">
            <Input
              placeholder="Ürün adı, SKU veya slug ile ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 focus:border-slate-400 pl-4 h-10 rounded-lg placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 rounded-lg flex-1 sm:flex-none">
              Dışa Aktar
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <AdminTable columns={columns} rows={filtered} />
        </div>
      </Card>
    </div>
  )
}

