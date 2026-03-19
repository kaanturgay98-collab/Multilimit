"use client"

import React, { useState } from "react"
import type { ComponentConfig } from "@measured/puck"
import { ShoppingCart, Star, Package, Minus, Plus, Truck, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ProductPackage = {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  items: string
  popular: boolean
}

export type ProductHeroProps = {
  title: string
  description: string
  rating: string
  reviews: string
  packages: ProductPackage[]
}

export const ProductHeroConfig: ComponentConfig<ProductHeroProps> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    rating: { type: "text" },
    reviews: { type: "text" },
    packages: {
      type: "array",
      getItemSummary: (p) => p.name,
      arrayFields: {
        id: { type: "text" },
        name: { type: "text" },
        description: { type: "text" },
        price: { type: "number" },
        originalPrice: { type: "number" },
        items: { type: "text" },
        popular: { 
          type: "radio",
          options: [
            { label: "Evet", value: true as any },
            { label: "Hayır", value: false as any },
          ]
        },
      }
    }
  },
  defaultProps: {
    title: "Multilimit Premium Detoks Kompleksi",
    description: "Günlük yaşam temposuna destek veren premium formül.",
    rating: "4.9",
    reviews: "234",
    packages: [
      { id: "small", name: "Küçük Paket", description: "30 Günlük", price: 599, originalPrice: 749, items: "30 Kapsül", popular: false },
      { id: "large", name: "Büyük Paket", description: "60 Günlük", price: 999, originalPrice: 1299, items: "60 Kapsül", popular: true },
    ]
  },
  render: ({ title, description, rating, reviews, packages }) => {
    // Note: Render must be pure-ish. Using local state for selection.
    const [selectedId, setSelectedId] = useState(packages[0]?.id)
    const [quantity, setQuantity] = useState(1)
    const selectedPkg = packages.find(p => p.id === selectedId) || packages[0]

    return (
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border flex items-center justify-center p-8">
              <span className="font-serif text-4xl font-bold text-gradient-gold">PRODUCT IMAGE</span>
            </div>

            {/* Info */}
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">{title}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <div className="flex items-center gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-primary text-primary" />)}
                 </div>
                 <span className="text-sm text-muted-foreground">{rating}/5 ({reviews} değerlendirme)</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

              {/* Packages */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Paket Seçimi</h3>
                <div className="grid grid-cols-2 gap-4">
                  {packages.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedId(pkg.id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${selectedId === pkg.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      {pkg.popular && <span className="absolute -top-2 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">Popüler</span>}
                      <p className="font-semibold text-foreground">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">{pkg.price} TL</span>
                        <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice} TL</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-semibold text-foreground">Adet:</span>
                <div className="flex items-center border border-border rounded-lg">
                   <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="p-3 hover:bg-secondary"><Minus size={16}/></button>
                   <span className="px-4 font-medium">{quantity}</span>
                   <button onClick={() => setQuantity(quantity+1)} className="p-3 hover:bg-secondary"><Plus size={16}/></button>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="flex-1 h-14 bg-primary text-white"><ShoppingCart className="mr-2" size={20}/> Sepete Ekle</Button>
                <Button size="lg" variant="outline" className="flex-1 h-14 border-primary text-foreground">Hemen Satın Al</Button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-4 border-t pt-8">
                <div className="text-center"><Truck size={24} className="mx-auto text-primary mb-2"/><p className="text-xs">Hızlı Kargo</p></div>
                <div className="text-center"><Shield size={24} className="mx-auto text-primary mb-2"/><p className="text-xs">Güvenli Ödeme</p></div>
                <div className="text-center"><RefreshCw size={24} className="mx-auto text-primary mb-2"/><p className="text-xs">Kolay İade</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
