"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CreditCard, XCircle, CheckCircle2, Lock, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MockPaymentPage() {
  const sp = useSearchParams()
  const sessionId = sp.get("session") ?? ""
  const amount = Number(sp.get("amount") ?? "0")
  const currency = sp.get("currency") ?? "TRY"
  const success = sp.get("success") ?? "/checkout/success"
  const cancel = sp.get("cancel") ?? "/checkout/cancel"
  const fail = sp.get("fail") ?? "/checkout/fail"

  const [loading, setLoading] = useState<"success" | "fail" | "cancel" | null>(null)

  const disabled = !sessionId || loading !== null

  const confirm = async (outcome: "success" | "fail" | "cancel") => {
    if (!sessionId) return
    setLoading(outcome)
    try {
      const res = await fetch("/api/payments/mock/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, outcome }),
      })
      const data = (await res.json().catch(() => null)) as any
      if (!res.ok || !data?.ok) throw new Error("failed")
      window.location.href = outcome === "success" ? success : outcome === "cancel" ? cancel : fail
    } catch {
      window.location.href = fail
    }
  }

  const maskedSession = useMemo(() => (sessionId ? `${sessionId.slice(0, 6)}…${sessionId.slice(-4)}` : "—"), [sessionId])

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-[#071534] via-background to-background p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hosted Payment (Mock)</p>
                <p className="text-lg font-semibold text-foreground">Multilimit Güvenli Ödeme</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Ödenecek Tutar</p>
              <p className="text-xl font-bold text-primary">
                {Number.isFinite(amount) ? amount.toLocaleString("tr-TR") : "—"} {currency}
              </p>
            </div>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Kart ile Ödeme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>256-bit SSL ile güvenli ödeme (demo) · PCI-DSS uyumlu altyapı alanı</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span>Session: {maskedSession}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kart Numarası</Label>
                <Input disabled value="4242 4242 4242 4242" />
              </div>
              <div className="space-y-2">
                <Label>Kart Üzerindeki İsim</Label>
                <Input disabled value="MUSTERİ KULLANICI" />
              </div>
              <div className="space-y-2">
                <Label>Son Kullanma</Label>
                <Input disabled value="12/30" />
              </div>
              <div className="space-y-2">
                <Label>CVV</Label>
                <Input disabled value="***" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={disabled} onClick={() => confirm("success")}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Ödemeyi Tamamla
              </Button>
              <Button variant="outline" disabled={disabled} onClick={() => confirm("cancel")}>
                <XCircle className="mr-2 h-4 w-4" />
                Vazgeç
              </Button>
              <Button variant="destructive" disabled={disabled} onClick={() => confirm("fail")}>
                <XCircle className="mr-2 h-4 w-4" />
                Hata Simüle Et
              </Button>
            </div>

            {!sessionId && (
              <div className="text-sm text-destructive">Session bulunamadı. Checkout ekranından tekrar başlatın.</div>
            )}

            <div className="text-sm text-muted-foreground">
              Geri dönmek için <Link className="text-primary hover:underline" href="/checkout">checkout</Link>.
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

