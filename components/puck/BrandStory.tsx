import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Building } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export type BrandStoryProps = {
  tagline: string
  titleHighlight: string
  titleEnd: string
  paragraphs: { text: string }[]
  experienceValue: string
  experienceLabel: string
}

export const BrandStoryConfig: ComponentConfig<BrandStoryProps> = {
  fields: {
    tagline: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    paragraphs: {
      type: "array",
      getItemSummary: (p) => p.text.substring(0, 50) + "...",
      arrayFields: {
        text: { type: "textarea" },
      },
    },
    experienceValue: { type: "text" },
    experienceLabel: { type: "text" },
  },
  defaultProps: {
    tagline: "Hikayemiz",
    titleHighlight: "Marka",
    titleEnd: "Hikayemiz",
    paragraphs: [
      { text: "Multilimit, modern yaşamın getirdiği yorgunluk ve strese karşı doğal çözümler sunmak amacıyla kuruldu." },
      { text: "Kurucularımız, yıllar boyunca sağlık ve wellness alanında edindikleri deneyimi, premium kalitede ürünler oluşturmak için bir araya getirdi." },
    ],
    experienceValue: "2+ Yıl",
    experienceLabel: "Kaliteli Hizmet",
  },
  render: ({ tagline, titleHighlight, titleEnd, paragraphs, experienceValue, experienceLabel }) => (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal y={18}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tagline}</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
              {titleHighlight} <span className="text-gradient-gold">{titleEnd}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p.text}</p>
              ))}
            </div>
          </Reveal>
          
          <Reveal className="relative" delayMs={140} y={18}>
            <div className="aspect-[4/3] bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building className="w-24 h-24 text-primary/30" />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
              <p className="text-3xl font-bold text-primary">{experienceValue}</p>
              <p className="text-sm text-muted-foreground">{experienceLabel}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  ),
}
