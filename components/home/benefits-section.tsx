import { Zap, Shield, Leaf, Sun } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const benefits = [
  {
    icon: Sun,
    title: 'Zinde Baslangiçlar',
    description: 'Gunluk rutininize destek olacak formul ile sabahlariniza canlilik katin.',
  },
  {
    icon: Shield,
    title: 'Premium Kalite',
    description: 'Ozenle secilmis, yuksek kaliteli iceriklerle uretilmis guvenilir formul.',
  },
  {
    icon: Leaf,
    title: 'Dogal Icerikler',
    description: 'Zeolit, L-Sistein ve Pirinc Kepegi gibi dogal bilesenlerin gucu.',
  },
  {
    icon: Zap,
    title: 'Kolay Kullanim',
    description: 'Pratik kapsul ve sase formati ile gunluk rutininize kolayca dahil edin.',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">One Cikan Faydalar</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Neden <span className="text-gradient-gold">Multilimit</span> Tercih Ediliyor?
          </h2>
          <p className="text-muted-foreground text-lg">
            Premium detoks formulumuz, gunluk yasam temposuna destek olmak icin tasarlandi.
          </p>
        </Reveal>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              delayMs={index * 90}
              className="group relative bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
