import { ShieldCheck, Award, Factory, Leaf, Truck, Headphones } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const badges = [
  {
    icon: Factory,
    title: 'GMP Sertifikali',
    description: 'Iyi Uretim Uygulamalari standartlarinda uretim',
  },
  {
    icon: ShieldCheck,
    title: 'Kalite Kontrol',
    description: 'Her urun titizlikle test edilir',
  },
  {
    icon: Award,
    title: 'ISO Standartlari',
    description: 'Uluslararası kalite standartlarina uygunluk',
  },
  {
    icon: Leaf,
    title: 'Dogal Icerikler',
    description: 'Ozenle secilmis dogal bileskenler',
  },
  {
    icon: Truck,
    title: 'Hizli Kargo',
    description: 'Turkiye genelinde hizli teslimat',
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Musteri memnuniyeti onceligi',
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 lg:py-20 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            Guven & <span className="text-gradient-gold">Kalite</span>
          </h2>
        </Reveal>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <Reveal
              key={badge.title}
              delayMs={index * 70}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-card border border-border flex items-center justify-center mb-3 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
                <badge.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
