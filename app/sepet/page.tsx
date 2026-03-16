"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Sepetiniz Bos</h1>
            <p className="text-muted-foreground mb-8">
              Henuz sepetinize urun eklememissiniz. Premium detoks kompleksimizi kesfetmek icin asagidaki butona tiklayin.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/urun">
                Urunu Incele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Sepetim</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}:${item.variantId}`}
                className="bg-card border border-border rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4"
              >
                <div className="relative w-full md:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">{item.variantName}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label="Urunu kaldir"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-background transition-colors"
                        aria-label="Azalt"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-background transition-colors"
                        aria-label="Artir"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      {(item.unitPrice * item.quantity).toLocaleString("tr-TR")} TL
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Siparis Ozeti</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Ara Toplam ({getTotalItems()} urun)</span>
                  <span>{getTotalPrice().toLocaleString("tr-TR")} TL</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Kargo</span>
                  <span className="text-green-500">Ucretsiz</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Toplam</span>
                    <span className="text-primary">{getTotalPrice().toLocaleString("tr-TR")} TL</span>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4" size="lg">
                <Link href="/checkout">
                  Odemeye Gec
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <div className="space-y-3 pt-4 border-t border-border">
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
      </div>
    </main>
  )
}
