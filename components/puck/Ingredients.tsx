import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Atom, Droplets, Wheat, Sun, Shield, Leaf, Zap, Award, Beaker, Heart, Clock } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"

const ICON_MAP = {
  Sun, Shield, Leaf, Zap, Atom, Droplets, Wheat, Award, Beaker, Heart, Clock
};

export type IngredientItem = {
  icon: keyof typeof ICON_MAP;
  name: string;
  description: string;
  highlight: string;
};

export type IngredientsProps = {
  badge: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  items: IngredientItem[];
  buttonText: string;
  buttonLink: string;
};

export const IngredientsConfig: ComponentConfig<IngredientsProps> = {
  fields: {
    badge: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    buttonText: { type: "text" },
    buttonLink: { type: "text" },
    items: {
      type: "array",
      getItemSummary: (item) => item.name || "Ingredient",
      arrayFields: {
        icon: {
          type: "select",
          options: Object.keys(ICON_MAP).map(key => ({ label: key, value: key }))
        },
        name: { type: "text" },
        description: { type: "textarea" },
        highlight: { type: "text" },
      },
    },
  },
  defaultProps: {
    badge: "İçeriklerimiz",
    titleHighlight: "Premium",
    titleEnd: "Formülümüzün Bileşenleri",
    description: "Özenle seçilmiş, yüksek kaliteli içeriklerle desteklenen formülümüz.",
    buttonText: "Tüm İçerikleri İncele",
    buttonLink: "/icerikler",
    items: [
      { icon: "Atom", name: "Zeolit", description: "Doğal mineral yapısıyla bilinen, geleneksel kullanımlarda tercih edilen özel bileşen.", highlight: "Doğal Mineral" },
      { icon: "Droplets", name: "L-Sistein", description: "Vücut tarafından kullanılan önemli bir amino asit. Protein yapıtaşlarından biridir.", highlight: "Amino Asit" },
      { icon: "Wheat", name: "Pirinç Kepeği", description: "Pirinç tanesinin dış kabuğundan elde edilen, besleyici değerler içeren doğal kaynak.", highlight: "Doğal Kaynak" },
    ]
  },
  render: (props) => (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">{props.titleHighlight}</span> {props.titleEnd}
          </h2>
          <p className="text-muted-foreground text-lg">
            {props.description}
          </p>
        </div>

        {/* Ingredients Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {props.items?.map((ingredient, index) => {
            const IconComponent = ICON_MAP[ingredient.icon] || Atom;
            return (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-8 card-hover text-center shadow-sm"
              >
                {/* Highlight Badge */}
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-6">
                  {ingredient.highlight}
                </span>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  {ingredient.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {props.buttonText && props.buttonLink && (
          <div className="text-center">
            <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
              <Link href={props.buttonLink || "#"}>
                {props.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  ),
};
