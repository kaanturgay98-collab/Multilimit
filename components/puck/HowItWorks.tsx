import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

export type StepItem = {
  number: string;
  title: string;
  description: string;
};

export type HowItWorksProps = {
  badge: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  steps: StepItem[];
  buttonText: string;
  buttonLink: string;
};

export const HowItWorksConfig: ComponentConfig<HowItWorksProps> = {
  fields: {
    badge: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    buttonText: { type: "text" },
    buttonLink: { type: "text" },
    steps: {
      type: "array",
      getItemSummary: (item) => item.title || "Step",
      arrayFields: {
        number: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
      },
    },
  },
  defaultProps: {
    badge: "Nasıl Çalışır?",
    titleHighlight: "3 Kolay",
    titleEnd: "Adımda Başlayın",
    description: "Multilimit Premium Detoks Kompleksi ile tanışmak çok kolay.",
    buttonText: "Trendyol'da Incele",
    buttonLink: "https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513",
    steps: [
      { number: "01", title: "Siparişinizi Verin", description: "Size uygun paketi seçin ve güvenli ödeme ile siparişinizi tamamlayın." },
      { number: "02", title: "Hızlı Teslimat", description: "Siparişiniz özenle paketlenir ve en kısa sürede adresinize ulaştırılır." },
      { number: "03", title: "Düzenli Kullanın", description: "Önerilere uygun şekilde düzenli kullanımla rutininize dahil edin." },
    ]
  },
  render: (props) => (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">{props.titleHighlight}</span> {props.titleEnd}
          </h2>
          <p className="text-muted-foreground text-lg">
            {props.description}
          </p>
        </Reveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {props.steps?.map((step, index) => (
            <Reveal key={index} className="relative" delayMs={index * 120}>
              {/* Connector Line */}
              {index < props.steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-gold" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        {props.buttonText && props.buttonLink && (
          <Reveal className="text-center" delayMs={180}>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14">
              <a href={props.buttonLink || "#"} target={props.buttonLink?.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">
                {props.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  ),
};
