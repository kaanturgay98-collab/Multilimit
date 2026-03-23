"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { XCircle, MessageCircle } from "lucide-react"

import { Suspense } from "react"

function CheckoutCancelContent() {
  const sp = useSearchParams()
  const orderId = sp.get("order") ?? ""

  const waText = encodeURIComponent("Merhaba, ödeme sırasında iptal oldu. Destek alabilir miyim?")
  const waUrl = `https://wa.me/905551234567?text=${waText}`

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-orange-500/15 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Ödeme İptal Edildi</h1>
        <p className="text-muted-foreground mb-8">
          Ödeme işlemi iptal edildi. İsterseniz tekrar deneyebilirsiniz.
        </p>
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Sipariş Referansı</p>
          <p className="text-lg font-semibold text-primary break-all">{orderId || "—"}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/checkout">Tekrar Dene</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Destek
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <CheckoutCancelContent />
    </Suspense>
  )
}

