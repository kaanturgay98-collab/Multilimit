import { Check, Award, Beaker, Heart, Clock } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const features = [
  {
    icon: Award,
    title: 'Premium Kalite Standartlari',
    description: 'Urunlerimiz en yuksek kalite standartlarinda, ozenle secilmis tesislerde uretilmektedir.',
  },
  {
    icon: Beaker,
    title: 'Bilimsel Yaklasim',
    description: 'Formulumuz, modern arastirmalar ve geleneksel bilgi birikimiyle sekillenmistir.',
  },
  {
    icon: Heart,
    title: 'Kullanici Odakli Tasarim',
    description: 'Gunluk rutininize kolayca uyum saglayacak pratik kullanim secenekleri sunuyoruz.',
  },
  {
    icon: Clock,
    title: 'Duzenlı Kullanim Destegi',
    description: 'Duzenli kullanim icin tasarlanmis, pratik paketleme ve hatirlatma onerileri.',
  },
]

const highlights = [
  'Yuksek kalite hammaddeler',
  'GMP sertifikali uretim',
  'Seffaf icerik bilgisi',
  'Kolay kullanim formati',
  'Hizli teslimat',
  'Musteri memnuniyeti onceligi',
]

export function WhyMultilimit() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <Reveal y={18}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Neden Biz?</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
              Neden <span className="text-gradient-gold">Multilimit</span> Tercih Etmelisiniz?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Premium detoks formulumuz, kalite, guvenilirlik ve kullanici deneyimini bir arada sunmak icin tasarlandi. Her adimda sizin icin en iyisini hedefliyoruz.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Reveal key={feature.title} className="flex gap-4" delayMs={index * 80}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Highlights Card */}
          <Reveal className="relative" delayMs={140} y={18}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px]" />
            
            <div className="relative bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary mb-4">
                  Multilimit Farki
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Kalite Taahhutumuz
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
