import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Atom, Droplets, Wheat, Sparkles } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

const ICON_MAP = {
  Atom, Droplets, Wheat, Sparkles
}

export type DetailedIngredient = {
  icon: keyof typeof ICON_MAP
  name: string
  tagline: string
  description: string
  details: { text: string }[]
  color: string
}

export type DetailedIngredientsProps = {
  ingredients: DetailedIngredient[]
}

export const DetailedIngredientsConfig: ComponentConfig<DetailedIngredientsProps> = {
  fields: {
    ingredients: {
      type: "array",
      getItemSummary: (i) => i.name,
      arrayFields: {
        icon: {
          type: "select",
          options: Object.keys(ICON_MAP).map(k => ({ label: k, value: k }))
        },
        name: { type: "text" },
        tagline: { type: "text" },
        description: { type: "textarea" },
        details: {
          type: "array",
          getItemSummary: (d) => d.text,
          arrayFields: {
            text: { type: "text" }
          }
        },
        color: { type: "text" },
      }
    }
  },
  defaultProps: {
    ingredients: [
      {
        icon: "Atom",
        name: "Zeolit",
        tagline: "Doğal Mineral",
        description: "Zeolit, doğada oluşan kristalin bir mineral yapıdır.",
        details: [{ text: "Doğal volkanik mineral" }, { text: "Kristal yapılar" }],
        color: "from-blue-500/20 to-cyan-500/20"
      }
    ]
  },
  render: ({ ingredients }) => (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-12 lg:space-y-20">
          {ingredients.map((ingredient, index) => {
            const Icon = ICON_MAP[ingredient.icon] || Atom
            return (
              <Reveal
                key={index}
                delayMs={index * 120}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`relative aspect-square max-w-md mx-auto bg-gradient-to-br ${ingredient.color} rounded-3xl border border-border overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 text-primary">
                        <Icon size={48} />
                      </div>
                      <span className="font-serif text-3xl font-bold text-foreground mb-2">{ingredient.name}</span>
                      <span className="text-primary font-medium">{ingredient.tagline}</span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-4">
                    {ingredient.tagline}
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">{ingredient.name}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{ingredient.description}</p>
                  
                  <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">Önemli Bilgiler</h3>
                    <ul className="space-y-3">
                      {ingredient.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-muted-foreground">{detail.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
