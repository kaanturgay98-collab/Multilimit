"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { XCircle, MessageCircle, RefreshCw, ShieldAlert } from "lucide-react"

export default function CheckoutFailPage() {
  const sp = useSearchParams()
  const orderId = sp.get("order") ?? ""
  const orderNumber = sp.get("orderNumber") ?? ""

  const waText = encodeURIComponent("Merhaba, ödeme başarısız oldu. Sipariş desteği almak istiyorum.")
  const waUrl = `https://wa.me/905551234567?text=${waText}`

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-[#071534] via-background to-background p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-destructive/15 border border-destructive/25 flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Ödeme Tamamlanamadı</h1>
            <p className="text-muted-foreground max-w-xl mb-8">
              İşleminiz güvenlik doğrulamalarından geçemedi veya banka tarafından reddedildi. Tekrar deneyebilir ya da destek alabilirsiniz.
            </p>

            <div className="w-full max-w-xl bg-card/70 border border-border rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sipariş Numarası</p>
                  <p className="text-xl font-bold text-primary">{orderNumber || "—"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Referans</p>
                  <p className="text-sm font-medium text-foreground break-all">{orderId || "—"}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary" /> Kart limiti / 3D Secure / banka onayı gibi nedenler etkileyebilir.
                </p>
                <p>Sepetiniz korunur; farklı bir kartla tekrar deneyebilirsiniz.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xl">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1" size="lg">
                <Link href="/checkout">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Tekrar Dene
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1" size="lg">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Destek
                </a>
              </Button>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              Ana sayfaya dönmek için <Link className="text-primary hover:underline" href="/">tıklayın</Link>.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

