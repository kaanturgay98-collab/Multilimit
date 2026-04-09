"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { MultilimitHeroBackground } from '@/components/hero/multilimit-hero-background'
import { HeroProductShowcase } from '@/components/hero/hero-product-showcase'
import { trackClick } from '@/components/analytics/tracker'
import { Reveal } from '@/components/ui/reveal'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-x-clip overflow-y-visible py-10 md:py-14 lg:min-h-[90vh] lg:py-16">
      <MultilimitHeroBackground withFixedProduct />

      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[96px]" />

      <div className="container relative z-10 mx-auto w-full px-4 lg:px-8">
        <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 xl:gap-14">
          <div className="min-w-0 text-center lg:max-w-2xl lg:text-left">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 lg:mb-3">
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-tight text-foreground">
                  Premium Detoks Formulu
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <h1 className="mb-4 text-4xl font-bold leading-[1.08] text-foreground sm:leading-[1.1] sm:text-5xl lg:mb-3 lg:text-6xl xl:text-7xl">
                Sabah Daha <span className="text-gradient-gold">Zinde</span> Baslayin
              </h1>
            </Reveal>

            <Reveal delayMs={180}>
              <p className="mx-auto mb-6 max-w-xl text-lg leading-snug text-muted-foreground lg:mx-0 lg:mb-5 lg:text-xl">
                Gunluk yasam temposuna destek veren premium formul. Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel
                kompozisyonumuzla tanisın.
              </p>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 bg-[#f27a1a] px-8 text-base font-semibold text-white hover:bg-[#d66512]"
                >
                  <a
                    href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Trendyol'dan Al
                    <ArrowRight className="ml-2 h-5 w-5" />
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 border-primary/50 px-8 text-base text-foreground hover:border-primary hover:bg-primary/10"
                >
                  <Link
                    href="/urun"
                    onClick={() => {
                      trackClick('hero_primary_cta')
                    }}
                  >
                    Urunu Incele
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delayMs={340}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:mt-7 lg:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">10.000+</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">Mutlu Musteri</p>
                </div>
                <div className="hidden h-10 w-px bg-border sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">4.9/5</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">Musteri Puani</p>
                </div>
                <div className="hidden h-10 w-px bg-border sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">%100</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">Dogal Icerik</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex min-h-0 w-full min-w-0 items-center justify-center overflow-visible lg:justify-end lg:self-center">
            <HeroProductShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}
