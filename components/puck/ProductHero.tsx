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
  productID?: string
  packages: ProductPackage[]
}

export const ProductHeroConfig: ComponentConfig<ProductHeroProps> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    rating: { type: "text" },
    reviews: { type: "text" },
    productID: { type: "text" },
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
    ],
    productID: "",
  },
  render: ({ title, description, rating, reviews, packages, productID }) => {
    // Note: Render must be pure-ish. Using local state for selection.
    const [selectedId, setSelectedId] = useState(packages[0]?.id)
    const [quantity, setQuantity] = useState(1)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [productData, setProductData] = useState<any>(null)
    const selectedPkg = packages.find(p => p.id === selectedId) || packages[0]

    React.useEffect(() => {
      if (!productID) return
      fetch(`/api/products?id=${productID}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) setProductData(json.data)
        })
    }, [productID])

    const images = productData?.media || []

    React.useEffect(() => {
      if (images.length <= 1) return
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }, [images.length])

    const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length)
    const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)

    return (
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery / Slider */}
            <div className="relative aspect-square bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border flex items-center justify-center overflow-hidden group">
              {images.length > 0 ? (
                <>
                  <img 
                    src={images[activeImageIndex].url} 
                    alt={images[activeImageIndex].alt || title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Minus size={20} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_: any, idx: number) => (
                          <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-primary w-4' : 'bg-white/50'}`} 
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <span className="font-serif text-4xl font-bold text-gradient-gold">PRODUCT IMAGE</span>
              )}
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
