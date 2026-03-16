"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminPageHeader, AdminPrimaryAction } from "@/components/admin/admin-page-header"
import { AdminTable, AdminTableColumn } from "@/components/admin/admin-table"
import type { BlogPostRow } from "@/lib/admin/mock-data"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

export default function AdminBlogPostsPage() {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<BlogPostRow[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await adminFetchJson<{ ok: boolean; rows?: BlogPostRow[] }>("/api/admin/blog-posts")
      if (!cancelled && data?.ok) setRows(data.rows || [])
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = rows.filter((p) => {
    const q = query.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || (p.category ?? "").toLowerCase().includes(q)
  })

  const columns: AdminTableColumn<BlogPostRow>[] = [
    {
      key: "title",
      header: "Baslik",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.title}</span>
          <span className="text-xs text-muted-foreground">/{row.slug}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      render: (row) => <span className="text-xs text-muted-foreground">{row.category ?? "-"}</span>,
    },
    {
      key: "status",
      header: "Durum",
      render: (row) => (
        <Badge className={row.status === "published" ? "bg-emerald-600/80" : "bg-slate-600/80"}>{row.status}</Badge>
      ),
    },
    {
      key: "isFeatured",
      header: "One Cikan",
      render: (row) =>
        row.isFeatured ? (
          <span className="text-xs text-primary font-medium">One cikan</span>
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        ),
    },
    {
      key: "id",
      header: "",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="xs">
            <Link href={`/admin/blog-posts/${row.id}`}>Duzenle</Link>
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-destructive"
            onClick={async () => {
              if (!confirm("Bu blog yazisini silmek istedigine emin misin?")) return
              await fetch(`/api/admin/blog-posts/${encodeURIComponent(row.id)}`, { method: "DELETE" })
              const data = await adminFetchJson<{ ok: boolean; rows?: BlogPostRow[] }>("/api/admin/blog-posts")
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
        title="Blog Yazilari"
        description="Blog iceriklerini, SEO alanlarini ve yayin durumlarini yonet."
        actions={
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            <Link href="/admin/blog-posts/new">Yeni Yazi</Link>
          </Button>
        }
      />
      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Input
            placeholder="Baslik, slug veya kategori ara..."
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

