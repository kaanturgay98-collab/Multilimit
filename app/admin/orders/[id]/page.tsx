"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

type Order = {
  id: string
  orderNo: string
  status: string
  paymentStatus: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  postalCode: string
  totalAmount: number
  currency: string
  couponCode?: string | null
  createdAt: string
}

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [order, setOrder] = useState<Order | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const data = await adminFetchJson<{ ok: boolean; order?: Order; error?: string }>(`/api/admin/orders/${encodeURIComponent(id)}`)
      if (!cancelled && data.ok && data.order) setOrder(data.order)
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  async function patch(p: Partial<Pick<Order, "status" | "paymentStatus">>) {
    setSaving(true)
    try {
      await adminFetchJson(`/api/admin/orders/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(p),
      })
    } finally {
      setSaving(false)
    }
  }

  if (!order) return <div className="text-muted-foreground">Yukleniyor...</div>

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={`Siparis ${order.orderNo}`}
        description="Siparis detaylari ve durum yonetimi."
        actions={
          <Button variant="outline" disabled={saving} onClick={() => location.reload()}>
            Yenile
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/80 p-4 lg:col-span-2 space-y-3">
          <div className="text-sm text-muted-foreground">
            <div>
              <span className="text-foreground font-medium">Musteri:</span> {order.firstName} {order.lastName}
            </div>
            <div>
              <span className="text-foreground font-medium">Iletisim:</span> {order.email} · {order.phone}
            </div>
            <div>
              <span className="text-foreground font-medium">Adres:</span> {order.address}, {order.district}/{order.city} {order.postalCode}
            </div>
          </div>
        </Card>

        <Card className="border-border/70 bg-card/80 p-4 space-y-4">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Siparis Durumu</div>
            <Select
              value={order.status}
              onValueChange={async (v) => {
                setOrder({ ...order, status: v })
                await patch({ status: v })
              }}
            >
              <SelectTrigger className="bg-background/60 border-border/60">
                <SelectValue placeholder="Durum sec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="confirmed">Onaylandi</SelectItem>
                <SelectItem value="processing">Hazirlaniyor</SelectItem>
                <SelectItem value="shipped">Kargoya Verildi</SelectItem>
                <SelectItem value="delivered">Teslim Edildi</SelectItem>
                <SelectItem value="cancelled">Iptal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Odeme Durumu</div>
            <Select
              value={order.paymentStatus}
              onValueChange={async (v) => {
                setOrder({ ...order, paymentStatus: v })
                await patch({ paymentStatus: v })
              }}
            >
              <SelectTrigger className="bg-background/60 border-border/60">
                <SelectValue placeholder="Odeme durum sec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Bekliyor</SelectItem>
                <SelectItem value="paid">Odendi</SelectItem>
                <SelectItem value="refunded">Iade</SelectItem>
                <SelectItem value="failed">Basarisiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 border-t border-border/60 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toplam</span>
              <span className="font-semibold text-primary">
                {order.totalAmount.toLocaleString("tr-TR")} {order.currency}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Kupon</span>
              <span>{order.couponCode ?? "-"}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

