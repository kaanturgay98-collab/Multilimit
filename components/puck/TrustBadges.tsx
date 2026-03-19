import React from "react"
import { ShieldCheck, Award, Factory, Leaf, Truck, Headphones, CheckCircle, Zap } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"

const ICON_MAP = {
  ShieldCheck, Award, Factory, Leaf, Truck, Headphones, CheckCircle, Zap
};

export type BadgeItem = {
  icon: keyof typeof ICON_MAP;
  title: string;
  description: string;
};

export type TrustBadgesProps = {
  titleStart: string;
  titleHighlight: string;
  badges: BadgeItem[];
};

export const TrustBadgesConfig: ComponentConfig<TrustBadgesProps> = {
  fields: {
    titleStart: { type: "text" },
    titleHighlight: { type: "text" },
    badges: {
      type: "array",
      getItemSummary: (item) => item.title || "Badge",
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
    titleStart: "Güven &",
    titleHighlight: "Kalite",
    badges: [
      { icon: "Factory", title: "GMP Sertifikalı", description: "İyi Üretim Uygulamaları standartlarında üretim" },
      { icon: "ShieldCheck", title: "Kalite Kontrol", description: "Her ürün titizlikle test edilir" },
      { icon: "Award", title: "ISO Standartları", description: "Uluslararası kalite standartlarına uygunluk" },
      { icon: "Leaf", title: "Doğal İçerikler", description: "Özenle seçilmiş doğal bileşenler" },
      { icon: "Truck", title: "Hızlı Kargo", description: "Türkiye genelinde hızlı teslimat" },
      { icon: "Headphones", title: "7/24 Destek", description: "Müşteri memnuniyeti önceliği" },
    ]
  },
  render: (props) => (
    <section className="py-16 lg:py-20 border-y border-border relative overflow-hidden">
      {/* Background (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
            {props.titleStart} <span className="text-gradient-gold">{props.titleHighlight}</span>
          </h2>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {props.badges?.map((badge, index) => {
            const IconComponent = ICON_MAP[badge.icon] || ShieldCheck;
            return (
              <div
                key={index}
                className="group text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-card border border-border flex items-center justify-center mb-3 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors shadow-sm">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ),
};
