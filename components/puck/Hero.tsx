import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { MultilimitHeroBackground } from "@/components/hero/multilimit-hero-background"
import { HeroProductShowcase } from "@/components/hero/hero-product-showcase"
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
  },
  render: (props) => (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-x-clip overflow-y-visible py-10 md:py-14 lg:min-h-[90vh] lg:py-16">
      <MultilimitHeroBackground bgImageUrl={props.backgroundImage} withFixedProduct />

      {/* Glowing Orb Effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[96px]" />

      <div className="container relative z-10 mx-auto w-full px-4 lg:px-8">
        <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 xl:gap-14">
          <div className="min-w-0 text-center lg:max-w-2xl lg:text-left">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 lg:mb-3">
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-tight text-foreground">{props.badgeText}</span>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <h1 className="mb-4 text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl sm:leading-[1.1] lg:mb-3 lg:text-6xl xl:text-7xl">
                {props.titleLight}{" "}
                <span className="text-gradient-gold">{props.titleHighlight}</span> {props.titleEnd}
              </h1>
            </Reveal>

            <Reveal delayMs={180}>
              <p className="mx-auto mb-6 max-w-xl text-lg leading-snug text-muted-foreground lg:mx-0 lg:mb-5 lg:text-xl">
                {props.description}
              </p>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 bg-[#f27a1a] px-8 text-base font-semibold text-white shadow-lg hover:bg-[#d66512] hover:shadow-[#f27a1a]/20"
                >
                  <a
                    href={props.primaryButtonLink || "#"}
                    target={props.primaryButtonLink?.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    {props.primaryButtonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 border-primary/50 px-8 text-base text-foreground hover:border-primary hover:bg-primary/10"
                >
                  <Link href={props.secondaryButtonLink || "#"}>{props.secondaryButtonText}</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delayMs={340}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:mt-7 lg:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">{props.stat1Value}</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">{props.stat1Label}</p>
                </div>
                <div className="hidden h-10 w-px bg-border sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">{props.stat2Value}</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">{props.stat2Label}</p>
                </div>
                <div className="hidden h-10 w-px bg-border sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold leading-tight text-primary">{props.stat3Value}</p>
                  <p className="mt-0.5 text-sm leading-tight text-muted-foreground">{props.stat3Label}</p>
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
  ),
};
