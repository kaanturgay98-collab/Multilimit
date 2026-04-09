"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Minus } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQProps = {
  badge: string;
  titleLight: string;
  titleHighlight: string;
  description: string;
  items: FAQItem[];
  buttonText: string;
  buttonLink: string;
};

// Extracted inner component to handle state properly inside Puck preview
function FAQRenderer(props: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <Reveal className="lg:sticky lg:top-24" y={18}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              {props.titleLight} <span className="text-gradient-gold">{props.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {props.description}
            </p>
            {props.buttonText && props.buttonLink && (
              <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
                <Link href={props.buttonLink || "#"}>
                  {props.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </Reveal>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {props.items?.map((faq, index) => (
              <Reveal
                key={index}
                delayMs={index * 80}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const FAQConfig: ComponentConfig<FAQProps> = {
  fields: {
    badge: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    description: { type: "textarea" },
    buttonText: { type: "text" },
    buttonLink: { type: "text" },
    items: {
      type: "array",
      getItemSummary: (item) => item.question || "Soru",
      arrayFields: {
        question: { type: "text" },
        answer: { type: "textarea" },
      },
    },
  },
  defaultProps: {
    badge: "SSS",
    titleLight: "Sık Sorulan",
    titleHighlight: "Sorular",
    description: "En çok merak edilen soruların yanıtları burada. Daha fazla bilgi için SSS sayfamızı ziyaret edebilir veya bize ulaşabilirsiniz.",
    buttonText: "Tüm Soruları Gör",
    buttonLink: "/sss",
    items: [
      { question: "Multilimit Premium Detoks Kompleksi nasıl kullanılır?", answer: "Günlük önerilen dozaj talimatlarına uygun şekilde, tercihen sabah kahvaltısıyla birlikte kullanmanızı öneririz. Detaylı bilgi için 'Nasıl Kullanılır' sayfamızı ziyaret edebilirsiniz." },
      { question: "Ürün ne kadar sürede teslim edilir?", answer: "Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya verilir. Türkiye genelinde ortalama 2-5 iş günü içinde teslimat sağlanmaktadır." },
      { question: "İade yapabilir miyim?", answer: "Evet, açılmamış ve hasar görmemiş ürünler için 14 gün içerisinde iade talebinde bulunabilirsiniz." },
    ]
  },
  render: (props) => <FAQRenderer {...props} />
};
