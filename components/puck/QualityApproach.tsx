import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Award, Shield } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export type QualityApproachProps = {
  tagline: string
  titleHighlight: string
  titleEnd: string
  description1: string
  description2: string
  badge1: string
  badge2: string
}

export const QualityApproachConfig: ComponentConfig<QualityApproachProps> = {
  fields: {
    tagline: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description1: { type: "textarea" },
    description2: { type: "textarea" },
    badge1: { type: "text" },
    badge2: { type: "text" },
  },
  defaultProps: {
    tagline: "Kalite Anlayışı",
    titleHighlight: "Kalite",
    titleEnd: "Taahhüdümüz",
    description1: "Multilimit olarak, her ürünümüzde en yüksek kalite standartlarını hedefliyoruz.",
    description2: "GMP sertifikalı tesislerde üretilen ürünlerimiz, uluslararası kalite standartlarına uygun şekilde hazırlanır.",
    badge1: "GMP Sertifikalı",
    badge2: "ISO Standartları",
  },
  render: ({ tagline, titleHighlight, titleEnd, description1, description2, badge1, badge2 }) => (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="relative order-2 lg:order-1" delayMs={120} y={18}>
            <div className="aspect-[4/3] bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-24 h-24 text-primary/30" />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" y={18}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tagline}</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
              {titleHighlight} <span className="text-gradient-gold">{titleEnd}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{description1}</p>
              <p>{description2}</p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge1}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge2}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  ),
}
