import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Beaker, Shield, Leaf } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

const ICON_MAP = {
  Beaker, Shield, Leaf
}

export type SynergyItem = {
  icon: keyof typeof ICON_MAP
  title: string
  description: string
}

export type FormulaSynergyProps = {
  tagline: string
  titleHighlight: string
  titleEnd: string
  description: string
  items: SynergyItem[]
}

export const FormulaSynergyConfig: ComponentConfig<FormulaSynergyProps> = {
  fields: {
    tagline: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    items: {
      type: "array",
      getItemSummary: (i) => i.title,
      arrayFields: {
        icon: {
          type: "select",
          options: Object.keys(ICON_MAP).map(k => ({ label: k, value: k }))
        },
        title: { type: "text" },
        description: { type: "textarea" },
      }
    }
  },
  defaultProps: {
    tagline: "Formül Birliği",
    titleHighlight: "Birlikte",
    titleEnd: "Daha Güçlü",
    description: "Formülümüzdeki her bileşen, birbirleriyle uyum içinde çalışmak üzere özenle seçilmiştir.",
    items: [
      { icon: "Beaker", title: "Formül Uyumu", description: "Her bileşen ozenle secilmiştir." },
      { icon: "Shield", title: "Kalite Kontrolü", description: "Tüm içerikler test edilir." },
      { icon: "Leaf", title: "Doğal Kaynaklar", description: "Özenle seçilmiş bileşenler." },
    ]
  },
  render: ({ tagline, titleHighlight, titleEnd, description, items }) => (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tagline}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">{titleHighlight}</span> {titleEnd}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Beaker
            return (
              <Reveal key={i} className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center card-hover" delayMs={i * 90}>
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary">
                  <Icon size={28} />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
