import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const steps = [
  {
    number: '01',
    title: 'Siparisinizi Verin',
    description: 'Size uygun paketi secin ve guvenli odeme ile siparisinizi tamamlayin.',
  },
  {
    number: '02',
    title: 'Hizli Teslimat',
    description: 'Siparisiniz ozenle paketlenir ve en kisa surede adresinize ulastirilir.',
  },
  {
    number: '03',
    title: 'Duzenli Kullanin',
    description: 'Onerilere uygun sekilde duzenli kullanimla rutininize dahil edin.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Nasil Calisir?</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">3 Kolay</span> Adimda Baslayin
          </h2>
          <p className="text-muted-foreground text-lg">
            Multilimit Premium Detoks Kompleksi ile tanismak cok kolay.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step, index) => (
            <Reveal key={step.number} className="relative" delayMs={index * 120}>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-gold" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center" delayMs={180}>
          <Button asChild size="lg" className="bg-[#f27a1a] hover:bg-[#d66512] text-white font-semibold px-8 h-14">
            <a href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513" target="_blank" rel="noopener noreferrer">
              Trendyol'da Incele
              <ArrowRight className="ml-2 h-5 w-5" />
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
