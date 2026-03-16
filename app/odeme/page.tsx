"use client"

import { useEffect, useMemo, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Truck, CreditCard, Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { getPublicSession } from "@/lib/public-session"

type Step = "shipping" | "payment" | "confirmation"

const ShippingSchema = z.object({
  firstName: z.string().trim().min(2, "Ad en az 2 karakter olmalı"),
  lastName: z.string().trim().min(2, "Soyad en az 2 karakter olmalı"),
  email: z.string().trim().email("Geçerli bir e-posta gir"),
  phone: z
    .string()
    .trim()
    .min(10, "Telefon eksik görünüyor")
    .refine((v) => /^(?:\+?90)?0?5\d{9}$/.test(v.replace(/\s+/g, "")), "Telefon formatı geçersiz"),
  address: z.string().trim().min(8, "Adres daha detaylı olmalı"),
  city: z.string().trim().min(2, "İl gerekli"),
  district: z.string().trim().min(2, "İlçe gerekli"),
  postalCode: z.string().trim().min(4, "Posta kodu gerekli"),
})

function normalizePhone(v: string) {
  return v.replace(/[^\d+]/g, "").replace(/^(\+90)/, "0").replace(/^90/, "0")
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<Step>("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNo, setOrderNo] = useState<string | null>(null)
  const [mode, setMode] = useState<"guest" | "account">("guest")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  })

  const [couponCode, setCouponCode] = useState("")
  const [notes, setNotes] = useState("")

  const session = useMemo(() => getPublicSession(), [])

  useEffect(() => {
    if (!session) return
    setMode("account")
    setShippingData((s) => ({
      ...s,
      firstName: s.firstName || session.firstName,
      lastName: s.lastName || session.lastName,
      email: s.email || session.email,
      phone: s.phone || (session.phone ?? ""),
    }))
  }, [session])

  const pricing = useMemo(() => {
    const subtotal = getTotalPrice()
    const code = couponCode.trim().toUpperCase()
    let discountTotal = 0
    let couponLabel: string | null = null

    if (code === "ML10") {
      discountTotal = Math.round(subtotal * 0.1)
      couponLabel = "ML10 ( %10 )"
    } else if (code === "ML50") {
      discountTotal = Math.min(subtotal, 50)
      couponLabel = "ML50 ( 50 TL )"
    }

    const shippingTotal = 0
    const grandTotal = Math.max(0, subtotal - discountTotal + shippingTotal)
    return { subtotal, discountTotal, shippingTotal, grandTotal, couponLabel }
  }, [couponCode, getTotalPrice])

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const parsed = ShippingSchema.safeParse({
      ...shippingData,
      phone: normalizePhone(shippingData.phone),
    })
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form")
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      toast({ title: "Formu kontrol et", description: "Eksik/hatalı alanlar var.", variant: "destructive" as any })
      return
    }
    setShippingData(parsed.data)
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      const res = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          shipping: shippingData,
          couponCode: couponCode.trim() || undefined,
          notes: notes.trim() || undefined,
          currency: "TRY",
          items,
        }),
      })
      const data = (await res.json().catch(() => null)) as any
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Siparis olusturulamadi")

      setOrderNo(String(data.order?.orderNumber ?? data.order?.orderNo ?? ""))
      toast({ title: "Güvenli ödemeye yönlendiriliyorsun", description: "Mock ödeme ekranı açılıyor." })
      const redirectUrl = String(data.payment?.redirectUrl ?? "")
      if (!redirectUrl) throw new Error("Odeme oturumu olusturulamadi")
      location.href = redirectUrl
    } catch {
      toast({ title: "Hata", description: "Odeme baslatilamadi. Lütfen tekrar dene.", variant: "destructive" as any })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    router.push("/sepet")
    return null
  }

  const steps = [
    { id: "shipping", label: "Teslimat" },
    { id: "payment", label: "Odeme" },
    { id: "confirmation", label: "Onay" },
  ]

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep === step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : steps.findIndex(s => s.id === currentStep) > index
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {steps.findIndex(s => s.id === currentStep) > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep === step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === "confirmation" ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Siparisiz Alindi!</h1>
            <p className="text-muted-foreground mb-8">
              Siparisizin tamamlanmasi icin tesekkur ederiz. Siparis detaylariniz e-posta adresinize gonderilmistir.
              En kisa surede kargoya verilecektir.
            </p>
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Siparis Numarasi</p>
              <p className="text-2xl font-bold text-primary">{orderNo ?? "ML-OLUSTURULAMADI"}</p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">Ana Sayfaya Don</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {currentStep === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Teslimat Bilgileri</h2>

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setMode("guest")}
                      className={`flex-1 rounded-xl border px-4 py-3 text-left transition-colors ${
                        mode === "guest" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-foreground">Misafir Alışveriş</p>
                      <p className="text-sm text-muted-foreground">Hızlıca devam et</p>
                    </button>
                    <Link
                      href="/giris?next=/checkout"
                      className={`flex-1 rounded-xl border px-4 py-3 text-left transition-colors ${
                        mode === "account" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-foreground">Giriş Yap</p>
                      <p className="text-sm text-muted-foreground">Bilgilerin otomatik dolsun</p>
                    </Link>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input
                        id="firstName"
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input
                        id="lastName"
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        required
                        className="bg-background border-border"
                        placeholder="05XX XXX XX XX"
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      required
                      className="bg-background border-border"
                      placeholder="Mahalle, Sokak, Bina No, Daire No"
                    />
                    {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="city">Il</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Ilce</Label>
                      <Input
                        id="district"
                        value={shippingData.district}
                        onChange={(e) => setShippingData({ ...shippingData, district: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.district && <p className="text-sm text-destructive">{errors.district}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Posta Kodu</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    Odemeye Devam Et
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}

              {currentStep === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Odeme Bilgileri</h2>
                  
                  <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-6 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Bu demo ortaminda odeme akisi mock provider ile simule edilir. Gercek kart bilgisi istenmez.
                    </p>
                    <p className="text-xs text-muted-foreground">256-bit SSL ile guvenli odeme altyapisi icin alan hazirdir.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="coupon">Kupon Kodu (opsiyonel)</Label>
                      <Input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bg-background border-border"
                        placeholder="ML10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Not (opsiyonel)</Label>
                      <Input
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="bg-background border-border"
                        placeholder="Kapiya birakin..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("shipping")}
                      className="flex-1"
                      size="lg"
                    >
                      Geri Don
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Hazirlaniyor..." : "Guvenli Odemeye Gec"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Siparis Ozeti</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.productId}:${item.variantId}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">{item.variantName} x {item.quantity}</p>
                        <p className="text-sm font-bold text-primary">
                          {(item.unitPrice * item.quantity).toLocaleString("tr-TR")} TL
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Ara Toplam</span>
                    <span>{pricing.subtotal.toLocaleString("tr-TR")} TL</span>
                  </div>
                  {pricing.discountTotal > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>İndirim {pricing.couponLabel ? `(${pricing.couponLabel})` : ""}</span>
                      <span className="text-green-500">- {pricing.discountTotal.toLocaleString("tr-TR")} TL</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Kargo</span>
                    <span className="text-green-500">Ucretsiz</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border">
                    <span>Toplam</span>
                    <span className="text-primary">{pricing.grandTotal.toLocaleString("tr-TR")} TL</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>256-bit SSL Guvenli Odeme</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Ayni Gun Kargo</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span>Tum Kartlarla Odeme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
