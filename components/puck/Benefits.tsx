import React from "react"
import { Sun, Shield, Leaf, Zap, Atom, Droplets, Wheat, Award, Beaker, Heart, Clock } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"

const ICON_MAP = {
  Sun, Shield, Leaf, Zap, Atom, Droplets, Wheat, Award, Beaker, Heart, Clock
};

export type BenefitItem = {
  icon: keyof typeof ICON_MAP;
  title: string;
  description: string;
};

export type BenefitsProps = {
  badge: string;
  titleLight: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  items: BenefitItem[];
};

export const BenefitsConfig: ComponentConfig<BenefitsProps> = {
  fields: {
    badge: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    items: {
      type: "array",
      getItemSummary: (item) => item.title || "Benefit",
      arrayFields: {
        icon: {
          type: "select",
          options: Object.keys(ICON_MAP).map(key => ({ label: key, value: key }))
        },
        title: { type: "text" },
        description: { type: "textarea" },
      },
    },
  },
  defaultProps: {
    badge: "Öne Çıkan Faydalar",
    titleLight: "Neden",
    titleHighlight: "Multilimit",
    titleEnd: "Tercih Ediliyor?",
    description: "Premium detoks formülümüz, günlük yaşam temposuna destek olmak için tasarlandı.",
    items: [
      { icon: "Sun", title: "Zinde Başlangıçlar", description: "Günlük rutininize destek olacak formül ile sabahlarınıza canlılık katın." },
      { icon: "Shield", title: "Premium Kalite", description: "Özenle seçilmiş, yüksek kaliteli içeriklerle üretilmiş güvenilir formül." },
      { icon: "Leaf", title: "Doğal İçerikler", description: "Zeolit, L-Sistein ve Pirinç Kepeği gibi doğal bileşenlerin gücü." },
      { icon: "Zap", title: "Kolay Kullanım", description: "Pratik kapsül ve şase formatı ile günlük rutininize kolayca dahil edin." },
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
            {props.titleLight} <span className="text-gradient-gold">{props.titleHighlight}</span> {props.titleEnd}
          </h2>
          <p className="text-muted-foreground text-lg">
            {props.description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {props.items?.map((benefit, index) => {
            const IconComponent = ICON_MAP[benefit.icon] || Sun;
            return (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ),
};
