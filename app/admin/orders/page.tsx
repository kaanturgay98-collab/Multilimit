"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type Order = {
  id: string
  orderNo: string
  status: string
  firstName: string
  lastName: string
  email: string
  phone: string
  totalAmount: number
  currency: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await adminFetchJson<{ ok: boolean; orders?: Order[]; error?: string }>("/api/admin/orders")
        if (!data.ok) throw new Error(data.error || "Yukleme basarisiz")
        if (!cancelled) setOrders(data.orders || [])
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
      <AdminPageHeader title="Siparisler" description="Siparisleri izle, durum guncelle, detay incele." />

      <Card className="border-border overflow-hidden">
        {loading ? (
          <div className="p-6 text-muted-foreground">Yukleniyor...</div>
        ) : error ? (
          <div className="p-6 text-destructive">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Musteri</TableHead>
                <TableHead>Iletisim</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.orderNo}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell>
                    {o.firstName} {o.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {o.email}
                    <br />
                    {o.phone}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {o.totalAmount.toLocaleString("tr-TR")} {o.currency}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/orders/${o.id}`}>Detay</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                    Henuz siparis yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

