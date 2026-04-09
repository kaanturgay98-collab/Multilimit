import React from "react"
import { Check, Sun, Shield, Leaf, Zap, Atom, Droplets, Wheat, Award, Beaker, Heart, Clock } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

const ICON_MAP = {
  Sun, Shield, Leaf, Zap, Atom, Droplets, Wheat, Award, Beaker, Heart, Clock
};

export type FeatureItem = {
  icon: keyof typeof ICON_MAP;
  title: string;
  description: string;
};

export type WhyMultilimitProps = {
  badge: string;
  titleLight: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  features: FeatureItem[];
  highlightBadge: string;
  highlightTitle: string;
  highlights: { title: string }[];
};

export const WhyMultilimitConfig: ComponentConfig<WhyMultilimitProps> = {
  fields: {
    badge: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    highlightBadge: { type: "text" },
    highlightTitle: { type: "text" },
    features: {
      type: "array",
      getItemSummary: (item) => item.title || "Feature",
      arrayFields: {
        icon: {
          type: "select",
          options: Object.keys(ICON_MAP).map(key => ({ label: key, value: key }))
        },
        title: { type: "text" },
        description: { type: "textarea" },
      },
    },
    highlights: {
      type: "array",
      getItemSummary: (item) => item.title || "Highlight Item",
      arrayFields: {
        title: { type: "text" },
      },
    },
  },
  defaultProps: {
    badge: "Neden Biz?",
    titleLight: "Neden",
    titleHighlight: "Multilimit",
    titleEnd: "Tercih Etmelisiniz?",
    description: "Premium detoks formülümüz, kalite, güvenilirlik ve kullanıcı deneyimini bir arada sunmak için tasarlandı. Her adımda sizin için en iyisini hedefliyoruz.",
    highlightBadge: "Multilimit Farkı",
    highlightTitle: "Kalite Taahhüdümüz",
    features: [
      { icon: "Award", title: "Premium Kalite Standartları", description: "Ürünlerimiz en yüksek kalite standartlarında, özenle seçilmiş tesislerde üretilmektedir." },
      { icon: "Beaker", title: "Bilimsel Yaklaşım", description: "Formülümüz, modern araştırmalar ve geleneksel bilgi birikimiyle şekillenmiştir." },
      { icon: "Heart", title: "Kullanıcı Odaklı Tasarım", description: "Günlük rutininize kolayca uyum sağlayacak pratik kullanım seçenekleri sunuyoruz." },
      { icon: "Clock", title: "Düzenli Kullanım Desteği", description: "Düzenli kullanım için tasarlanmış, pratik paketleme ve hatırlatma önerileri." },
    ],
    highlights: [
      { title: "Yüksek kalite hammaddeler" },
      { title: "GMP sertifikalı üretim" },
      { title: "Şeffaf içerik bilgisi" },
      { title: "Kolay kullanım formatı" },
      { title: "Hızlı teslimat" },
      { title: "Müşteri memnuniyeti önceliği" },
    ]
  },
  render: (props) => (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <Reveal y={18}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
              {props.titleLight} <span className="text-gradient-gold">{props.titleHighlight}</span> {props.titleEnd}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {props.description}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {props.features?.map((feature, index) => {
                const IconComponent = ICON_MAP[feature.icon] || Award;
                return (
                  <Reveal key={index} className="flex gap-4" delayMs={index * 80}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          {/* Highlights Card */}
          <Reveal className="relative" delayMs={140} y={18}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px]" />
            
            <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary mb-4">
                  {props.highlightBadge}
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  {props.highlightTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {props.highlights?.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{highlight.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  ),
};
