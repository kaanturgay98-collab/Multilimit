"use client"

import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/hooks/use-toast'
import { AdminOverlay } from '@/components/public/admin-overlay'
import { 
  ShoppingCart, 
  MessageCircle, 
  Check, 
  Star, 
  Atom, 
  Droplets, 
  Wheat,
  Minus,
  Plus,
  Shield,
  Truck,
  RefreshCw,
  Package
} from 'lucide-react'

const packages = [
  {
    id: 'small',
    name: 'Kucuk Paket',
    description: '30 Gunluk Kullanim',
    price: 599,
    originalPrice: 749,
    items: '30 Kapsul + 30 Sase',
    popular: false,
  },
  {
    id: 'large',
    name: 'Buyuk Paket',
    description: '60 Gunluk Kullanim',
    price: 999,
    originalPrice: 1299,
    items: '60 Kapsul + 60 Sase',
    popular: true,
  },
]

const features = [
  'Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel formul',
  'Kapsul ve sase formatinda pratik kullanim',
  'Premium kalite hammaddeler',
  'GMP sertifikali tesislerde uretim',
  'Kolay tasinabilir ambalaj',
]

const ingredients = [
  { icon: Atom, name: 'Zeolit', description: 'Dogal mineral' },
  { icon: Droplets, name: 'L-Sistein', description: 'Amino asit' },
  { icon: Wheat, name: 'Pirinc Kepegi', description: 'Dogal kaynak' },
]

const faqs = [
  {
    question: 'Bu urun nasil kullanilir?',
    answer: 'Gunluk 1 kapsul ve 1 sase, tercihen sabah kahvaltisiyla birlikte alinmasi onerilir.',
  },
  {
    question: 'Ne kadar surede etki gosterir?',
    answer: 'Her birey farklidir. Duzenli kullanim onerilir, ancak herhangi bir tedavi vaadi bulunmamaktadir.',
  },
  {
    question: 'Yan etkileri var mi?',
    answer: 'Dogal iceriklerden olusan formulumuz genel olarak iyi tolere edilir. Herhangi bir saglik durumunuz varsa once doktorunuza danisin.',
  },
]

const whatsappMessage = encodeURIComponent('Merhaba, Multilimit Premium Detoks Kompleksi hakkinda bilgi almak istiyorum.')
const whatsappLink = `https://wa.me/905551234567?text=${whatsappMessage}`

export default function ProductPage() {
  const [selectedPackage, setSelectedPackage] = useState<'small' | 'large'>('large')
  const [quantity, setQuantity] = useState(1)
  const { addItem, setItems } = useCart()
  const { toast } = useToast()

  const currentPackage = packages.find((p) => p.id === selectedPackage)!

  const handleAddToCart = () => {
    addItem(
      {
        productId: 'multilimit-detoks',
        productName: 'Multilimit Premium Detoks Kompleksi',
        variantId: selectedPackage,
        variantName: currentPackage.name,
        unitPrice: currentPackage.price,
        imageUrl: '/product.jpg',
      },
      quantity
    )
    toast({
      title: "Sepete eklendi",
      description: `${currentPackage.name} · ${quantity} adet`,
    })
  }

  return (
    <>
      <AdminOverlay slug="urun" />
      {/* Product Hero */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <span className="font-serif text-4xl font-bold text-gradient-gold mb-4">MULTILIMIT</span>
                  <span className="text-xl text-foreground mb-2">Premium Detoks</span>
                  <span className="text-muted-foreground">Kompleksi</span>
                  
                  {/* Ingredients Preview */}
                  <div className="flex items-center gap-4 mt-8">
                    {ingredients.map((ing) => (
                      <div key={ing.name} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2">
                          <ing.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">{ing.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Premium
                  </span>
                  <span className="px-3 py-1 bg-destructive/90 text-white text-xs font-semibold rounded-full">
                    %{Math.round(((currentPackage.originalPrice - currentPackage.price) / currentPackage.originalPrice) * 100)} Indirim
                  </span>
                </div>
              </div>

              {/* Thumbnail Placeholders */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-secondary rounded-xl border border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Package className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
                <span>/</span>
                <span className="text-foreground">Urun</span>
              </div>

              {/* Title & Rating */}
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Multilimit Premium Detoks Kompleksi
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.9/5 (234 degerlendirme)</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                Gunluk yasam temposuna destek veren premium formul. Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel kompozisyonumuz, pratik kapsul ve sase formatinda sunulmaktadir.
              </p>

              {/* Package Selection */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Paket Secimi</h3>
                <div className="grid grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id as 'small' | 'large')}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        selectedPackage === pkg.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          Populer
                        </span>
                      )}
                      <p className="font-semibold text-foreground">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pkg.items}</p>
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
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Toplam:</span>
                  <span className="text-2xl font-bold text-primary">{currentPackage.price * quantity} TL</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Sepete Ekle
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary/50 text-foreground hover:bg-primary/10 h-14"
                  onClick={() => {
                    setItems([
                      {
                        productId: "multilimit-detoks",
                        productName: "Multilimit Premium Detoks Kompleksi",
                        variantId: selectedPackage,
                        variantName: currentPackage.name,
                        unitPrice: currentPackage.price,
                        quantity,
                        imageUrl: "/product.jpg",
                      },
                    ])
                    toast({
                      title: "Checkout hazir",
                      description: `${currentPackage.name} · ${quantity} adet`,
                    })
                    location.href = "/checkout"
                  }}
                >
                  Hemen Satin Al
                </Button>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-green-600/10 border border-green-600/30 rounded-xl text-green-500 hover:bg-green-600/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">WhatsApp ile Sor</span>
              </a>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Hizli Kargo</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Guvenli Odeme</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Kolay Iade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            Urun <span className="text-gradient-gold">Ozellikleri</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Highlight */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            <span className="text-gradient-gold">Iceriklerimiz</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <ing.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{ing.name}</h3>
                <p className="text-sm text-muted-foreground">{ing.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary/50">
              <Link href="/icerikler">Detayli Icerik Bilgisi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            Sik Sorulan <span className="text-gradient-gold">Sorular</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary/50">
              <Link href="/sss">Tum Sorular</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
