import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const testimonials = [
  {
    name: 'Ayse K.',
    location: 'Istanbul',
    rating: 5,
    text: 'Sabahları daha dinlenmis hissediyorum. Urun kalitesi gercekten farkediliyor, paketlemesi de cok silik.',
    date: '2 hafta once',
  },
  {
    name: 'Mehmet Y.',
    location: 'Ankara',
    rating: 5,
    text: 'Yogun is temposunda gunluk rutinime kolayca dahil edebildim. Pratik kullanimi ve premium hissi ile cok memnunum.',
    date: '1 ay once',
  },
  {
    name: 'Zeynep A.',
    location: 'Izmir',
    rating: 5,
    text: 'Arkadas tavsiyesiyle basladim, simdi duzenli kullananlar arasindayim. Musteri hizmetleri de cok ilgili.',
    date: '3 hafta once',
  },
]

export function TestimonialsPreview() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Kullanici Yorumlari</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Kullanicılarimiz <span className="text-gradient-gold">Ne Diyor?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Binlerce kullanicimizin deneyimleri ve gorusleri.
          </p>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delayMs={index * 100}
              className="bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover"
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
        <Reveal className="text-center" delayMs={180}>
          <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
            <Link href="/yorumlar">
              Tum Yorumlari Gor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
