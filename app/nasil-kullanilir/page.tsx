import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AdminOverlay } from '@/components/public/admin-overlay'
import { 
  Sun, 
  Moon, 
  Coffee, 
  Droplets, 
  Clock, 
  AlertTriangle,
  Thermometer,
  Package,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nasil Kullanilir | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi nasil kullanilir? Gunluk kullanim onerileri, adim adim kullanim ve saklama kosullari.',
}

const steps = [
  {
    number: '01',
    title: 'Sabah Kahvaltisi ile Birlikte',
    description: 'Gunluk 1 kapsul, kahvaltinizla birlikte bol su ile alin.',
    icon: Coffee,
    time: 'Sabah 07:00 - 09:00',
  },
  {
    number: '02',
    title: 'Sase Kullanimi',
    description: 'Gunluk 1 saseyi bir bardak su ile karistirarak icin.',
    icon: Droplets,
    time: 'Sabah veya Oglen',
  },
  {
    number: '03',
    title: 'Duzenli Kullanim',
    description: 'En iyi sonuclar icin duzenli ve surekli kullanim onerilir.',
    icon: Clock,
    time: 'Her Gun',
  },
]

const scenarios = [
  {
    title: 'Sabah Rutini',
    description: 'Kahvaltidan once veya kahvalti sirasinda kullanim onerilir.',
    icon: Sun,
    tips: ['Bol su icin', 'Duzenli saatlerde alin', 'Kahvaltiyla birlikte'],
  },
  {
    title: 'Is Yerinde',
    description: 'Pratik sase formati, is yerinde kolayca kullanilabilir.',
    icon: Package,
    tips: ['Cantanizda tasiyin', 'Su ile karistirin', 'Herhangi bir saatte'],
  },
  {
    title: 'Seyahatte',
    description: 'Kompakt ambalaj, seyahat sirasinda kullanimi kolaylastirir.',
    icon: Moon,
    tips: ['Gunluk dozajı atlamayin', 'Su erisimi saglayin', 'Rutininizi koruyun'],
  },
]

const warnings = [
  'Onerilen dozaji asmayin.',
  'Cocuklarin erisemeyecegi yerde saklayin.',
  'Hamile veya emziren kadinlar kullanmadan once doktora danismalidir.',
  'Kronik bir hastalik veya ilac kullaniminiz varsa doktorunuza danisin.',
  'Bu urun bir gida takviyesidir, hastaliklari tedavi etmez.',
]

const storage = [
  { title: 'Sicaklik', value: '25°C altinda', icon: Thermometer },
  { title: 'Isik', value: 'Gunes isingindan uzakta', icon: Sun },
  { title: 'Nem', value: 'Kuru ortamda', icon: Droplets },
  { title: 'Ambalaj', value: 'Orijinal ambalajinda', icon: Package },
]

export default function HowToUsePage() {
  return (
    <>
      <AdminOverlay slug="nasil-kullanilir" />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Kullanim Kilavuzu
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Nasil <span className="text-gradient-gold">Kullanilir?</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Multilimit Premium Detoks Kompleksi&apos;ni dogru ve etkili sekilde kullanmak icin rehberimizi inceleyin.
            </p>
          </div>
        </div>
      </section>

      {/* Daily Usage */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Gunluk Kullanim</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Adim Adim <span className="text-gradient-gold">Kullanim</span>
            </h2>
            <p className="text-muted-foreground">
              Gunluk rutininize kolayca dahil edebileceginiz basit kullanim adimlari.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-primary/50 to-primary/10" />
                )}

                <div className="bg-card border border-border rounded-2xl p-8 text-center card-hover">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                      <span className="font-serif text-xl font-bold text-primary-foreground">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Scenarios */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Kullanim Senaryolari</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Pratik <span className="text-gradient-gold">Kullanim Tipleri</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {scenarios.map((scenario) => (
              <div key={scenario.title} className="bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <scenario.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-2">{scenario.title}</h3>
                <p className="text-muted-foreground mb-4">{scenario.description}</p>
                <ul className="space-y-2">
                  {scenario.tips.map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warnings */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Onemli Uyarilar</h2>
                  <p className="text-muted-foreground">Lutfen kullanim oncesi okuyunuz</p>
                </div>
              </div>

              <ul className="space-y-4">
                {warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-500">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Conditions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Saklama</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Saklama <span className="text-gradient-gold">Kosullari</span>
            </h2>
            <p className="text-muted-foreground">
              Urunun kalitesini korumak icin asagidaki kosullara dikkat ediniz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storage.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Hemen <span className="text-gradient-gold">Baslayin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Multilimit Premium Detoks Kompleksi ile gunluk rutininize destek verin.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14">
            <Link href="/siparis">
              Siparis Ver
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
