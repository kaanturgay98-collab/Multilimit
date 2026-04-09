import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Quote } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

export type TestimonialItem = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
};

export type TestimonialsProps = {
  badge: string;
  titleLight: string;
  titleHighlight: string;
  description: string;
  items: TestimonialItem[];
  buttonText: string;
  buttonLink: string;
};

export const TestimonialsConfig: ComponentConfig<TestimonialsProps> = {
  fields: {
    badge: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    description: { type: "textarea" },
    buttonText: { type: "text" },
    buttonLink: { type: "text" },
    items: {
      type: "array",
      getItemSummary: (item) => item.name || "Testimonial",
      arrayFields: {
        name: { type: "text" },
        location: { type: "text" },
        rating: { 
          type: "number",
          min: 1,
          max: 5
        },
        text: { type: "textarea" },
        date: { type: "text" },
      },
    },
  },
  defaultProps: {
    badge: "Kullanıcı Yorumları",
    titleLight: "Kullanıcılarımız",
    titleHighlight: "Ne Diyor?",
    description: "Binlerce kullanıcımızın deneyimleri ve görüşleri.",
    buttonText: "Tüm Yorumları Gör",
    buttonLink: "/yorumlar",
    items: [
      { name: "Ayşe K.", location: "İstanbul", rating: 5, text: "Sabahları daha dinlenmiş hissediyorum. Ürün kalitesi gerçekten farkediliyor, paketlemesi de çok şık.", date: "2 hafta önce" },
      { name: "Mehmet Y.", location: "Ankara", rating: 5, text: "Yoğun iş temposunda günlük rutinime kolayca dahil edebildim. Pratik kullanımı ve premium hissi ile çok memnunum.", date: "1 ay önce" },
      { name: "Zeynep A.", location: "İzmir", rating: 5, text: "Arkadaş tavsiyesiyle başladım, şimdi düzenli kullananlar arasındayım. Müşteri hizmetleri de çok ilgili.", date: "3 hafta önce" },
    ]
  },
  render: (props) => (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      {/* Decorative Quote */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 rotate-180">
        <Quote className="w-32 h-32 text-primary" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            {props.titleLight} <span className="text-gradient-gold">{props.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {props.description}
          </p>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {props.items?.map((testimonial, index) => (
            <Reveal
              key={index}
              delayMs={index * 90}
              className="bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover shadow-sm"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <span className="text-xs text-muted-foreground">{testimonial.date}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        {props.buttonText && props.buttonLink && (
          <Reveal className="text-center" delayMs={160}>
            <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
              <Link href={props.buttonLink || "#"}>
                {props.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  ),
};
