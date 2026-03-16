"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type PageRow = { slug: string; title: string; updatedAt: string }

export default function AdminPagesList() {
  const [pages, setPages] = useState<PageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await adminFetchJson<{ ok: boolean; pages?: PageRow[]; error?: string }>("/api/admin/pages")
        if (!data.ok) throw new Error(data.error || "Yukleme basarisiz")
        if (!cancelled) setPages(data.pages || [])
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Hata")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sayfalar</h1>
        <p className="text-muted-foreground">Icerik JSON ve gorsel yonetimi.</p>
      </div>

      <Card className="border-border overflow-hidden">
        {loading ? (
          <div className="p-6 text-muted-foreground">Yukleniyor...</div>
        ) : error ? (
          <div className="p-6 text-destructive">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Slug</TableHead>
                <TableHead>Baslik</TableHead>
                <TableHead>Guncelleme</TableHead>
                <TableHead className="text-right">Islem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((p) => (
                <TableRow key={p.slug}>
                  <TableCell className="font-mono text-xs">{p.slug}</TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm">
                      <Link href={`/admin/pages/${p.slug}`}>Duzenle</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

