import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Check } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export type ProductFeaturesProps = {
  title: string
  titleHighlight: string
  features: { text: string }[]
}

export const ProductFeaturesConfig: ComponentConfig<ProductFeaturesProps> = {
  fields: {
    title: { type: "text" },
    titleHighlight: { type: "text" },
    features: {
      type: "array",
      getItemSummary: (f) => f.text,
      arrayFields: {
        text: { type: "text" },
      }
    }
  },
  defaultProps: {
    title: "Ürün",
    titleHighlight: "Özellikleri",
    features: [
      { text: "Zeolit, L-Sistein ve Pirinç Kepeği içeren özel formül" },
      { text: "Kapsül ve şase formatında pratik kullanım" },
      { text: "Premium kalite hammaddeler" },
      { text: "GMP sertifikalı tesislerde üretim" },
      { text: "Kolay taşınabilir ambalaj" },
    ]
  },
  render: ({ title, titleHighlight, features }) => (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
          {title} <span className="text-gradient-gold">{titleHighlight}</span>
          </h2>
        </Reveal>
        <div className="max-w-2xl mx-auto space-y-4">
          {features.map((feature, i) => (
            <Reveal key={i} className="flex items-start gap-3" delayMs={i * 70}>
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 text-primary">
                <Check size={16} />
              </div>
              <span className="text-foreground">{feature.text}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
