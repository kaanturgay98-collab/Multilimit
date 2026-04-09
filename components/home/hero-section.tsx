"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { MultilimitHeroBackground } from '@/components/hero/multilimit-hero-background'
import { trackClick } from '@/components/analytics/tracker'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <MultilimitHeroBackground />

      {/* Glowing Orb Effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[96px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Premium Detoks Formulu</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Sabah Daha{' '}
              <span className="text-gradient-gold">Zinde</span>{' '}
              Baslayin
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Gunluk yasam temposuna destek veren premium formul. Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel kompozisyonumuzla tanisın.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-[#f27a1a] hover:bg-[#d66512] text-white font-semibold px-8 h-14 text-base">
                <a href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513" target="_blank" rel="noopener noreferrer">
                  Trendyol'dan Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 h-14 text-base">
                <Link
                  href="/urun"
                  onClick={() => {
                    trackClick("hero_primary_cta")
                  }}
                >
                  Urunu Incele
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10.000+</p>
                <p className="text-sm text-muted-foreground">Mutlu Musteri</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">4.9/5</p>
                <p className="text-sm text-muted-foreground">Musteri Puani</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">%100</p>
                <p className="text-sm text-muted-foreground">Dogal Icerik</p>
              </div>
            </div>
          </div>

          {/* Product Visual */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glow Effect Behind Product */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-[80px] scale-75" />
              
              {/* Product Box Placeholder */}
              <div className="relative w-[280px] sm:w-[340px] lg:w-[400px] aspect-[3/4] bg-gradient-to-br from-navy-light to-secondary rounded-2xl border border-border/50 shadow-2xl flex flex-col items-center justify-center p-8 animate-float">
                {/* Premium Label */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Premium</span>
                </div>
                
                {/* Brand */}
                <div className="text-center mb-6">
                  <span className="font-serif text-3xl font-bold text-gradient-gold tracking-wide">MULTILIMIT</span>
                </div>
                
                {/* Product Name */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Premium Detoks</h2>
                  <p className="text-sm text-muted-foreground">Kompleksi</p>
                </div>
                
                {/* Ingredients Preview */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2">
                      <span className="text-xs font-bold text-primary">Ze</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Zeolit</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2">
                      <span className="text-xs font-bold text-primary">LS</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">L-Sistein</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2">
                      <span className="text-xs font-bold text-primary">PK</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Pirinc K.</span>
                  </div>
                </div>
                
                {/* Format */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary rounded-full border border-border">Kapsul</span>
                  <span className="px-3 py-1 bg-secondary rounded-full border border-border">Sase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
