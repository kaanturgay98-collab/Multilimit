import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { MultilimitHeroBackground } from "@/components/hero/multilimit-hero-background"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

export type HeroProps = {
  backgroundImage: string;
  badgeText: string;
  titleLight: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  productBadge: string;
  productBrand: string;
  productName: string;
  productSubtitle: string;
};

export const HeroConfig: ComponentConfig<HeroProps> = {
  fields: {
    backgroundImage: {
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Görsel URL'si veya Dosya Yükle</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... veya bilgisayardan seçin"
          />
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer text-slate-500"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Dosya boyutunu kontrol et (isteğe bağlı, örn 5MB sınırı)
                if (file.size > 5 * 1024 * 1024) {
                  alert("Lütfen 5MB'dan daha küçük bir görsel seçin.");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  onChange(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {value && value.startsWith("data:image") && (
            <div className="text-xs text-green-600 font-medium bg-green-50 p-2 rounded-md">
              ✓ Dosyadan görsel seçildi
            </div>
          )}
        </div>
      )
    },
    badgeText: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    primaryButtonText: { type: "text" },
    primaryButtonLink: { type: "text" },
    secondaryButtonText: { type: "text" },
    secondaryButtonLink: { type: "text" },
    stat1Value: { type: "text" },
    stat1Label: { type: "text" },
    stat2Value: { type: "text" },
    stat2Label: { type: "text" },
    stat3Value: { type: "text" },
    stat3Label: { type: "text" },
    productBadge: { type: "text" },
    productBrand: { type: "text" },
    productName: { type: "text" },
    productSubtitle: { type: "text" },
  },
  defaultProps: {
    backgroundImage: "/multilimit-hero-bg.png",
    badgeText: "Premium Detoks Formülü",
    titleLight: "Sabah Daha",
    titleHighlight: "Zinde",
    titleEnd: "Başlayın",
    description: "Günlük yaşam temposuna destek veren premium formül. Zeolit, L-Sistein ve Pirinç Kepeği içeren özel kompozisyonumuzla tanışın.",
    primaryButtonText: "Trendyol'dan Satın Al",
    primaryButtonLink: "https://www.trendyol.com",
    secondaryButtonText: "Ürünü İncele",
    secondaryButtonLink: "/urun",
    stat1Value: "10.000+",
    stat1Label: "Mutlu Müşteri",
    stat2Value: "4.9/5",
    stat2Label: "Müşteri Puanı",
    stat3Value: "%100",
    stat3Label: "Doğal İçerik",
    productBadge: "Premium",
    productBrand: "MULTILIMIT",
    productName: "Premium Detoks",
    productSubtitle: "Kompleksi",
  },
  render: (props) => (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <MultilimitHeroBackground bgImageUrl={props.backgroundImage} />

      {/* Glowing Orb Effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[96px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{props.badgeText}</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delayMs={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
                {props.titleLight}{' '}
                <span className="text-gradient-gold">{props.titleHighlight}</span>{' '}
                {props.titleEnd}
              </h1>
            </Reveal>

            {/* Subheadline */}
            <Reveal delayMs={180}>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                {props.description}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delayMs={260}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-[#f27a1a] hover:bg-[#d66512] text-white font-semibold px-8 h-14 text-base shadow-lg hover:shadow-[#f27a1a]/20">
                <a href={props.primaryButtonLink || "#"} target={props.primaryButtonLink?.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                  {props.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 h-14 text-base">
                <Link href={props.secondaryButtonLink || "#"}>
                  {props.secondaryButtonText}
                </Link>
              </Button>
              </div>
            </Reveal>

            {/* Trust Indicators */}
            <Reveal delayMs={340}>
              <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{props.stat1Value}</p>
                <p className="text-sm text-muted-foreground">{props.stat1Label}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{props.stat2Value}</p>
                <p className="text-sm text-muted-foreground">{props.stat2Label}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{props.stat3Value}</p>
                <p className="text-sm text-muted-foreground">{props.stat3Label}</p>
              </div>
              </div>
            </Reveal>
          </div>

          {/* Product Visual */}
          <Reveal delayMs={200} durationMs={700} y={22} className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glow Effect Behind Product */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-[80px] scale-75" />
              
              {/* Product Box */}
              <div className="relative w-[280px] sm:w-[340px] lg:w-[400px] aspect-[3/4] bg-gradient-to-br from-navy-light to-secondary rounded-2xl border border-border/50 shadow-2xl flex flex-col items-center justify-center p-8 animate-float">
                <div className="absolute top-6 left-6 px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{props.productBadge}</span>
                </div>
                
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-gradient-gold tracking-wide">{props.productBrand}</span>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-2">{props.productName}</h2>
                  <p className="text-sm text-muted-foreground">{props.productSubtitle}</p>
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
                    <span className="text-[10px] text-muted-foreground">Pirinç K.</span>
                  </div>
                </div>
                
                {/* Format */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-3 py-1 bg-secondary rounded-full border border-border">Kapsül</span>
                  <span className="px-3 py-1 bg-secondary rounded-full border border-border">Şase</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  ),
};
