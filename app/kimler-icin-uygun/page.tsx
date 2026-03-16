import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Briefcase, 
  PartyPopper, 
  Sun, 
  Target, 
  AlertTriangle,
  UserCheck,
  ArrowRight,
  Check,
  X
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kimler Icin Uygun | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi kimler icin uygun? Hedef kullanici profilleri ve onemli uyarilar.',
}

const targetAudiences = [
  {
    icon: Briefcase,
    title: 'Yogun Calisanlar',
    description: 'Is hayatinin yogun temposunda gunluk rutinlerine destek arayanlar icin idealdir.',
    benefits: [
      'Pratik kullanim formati',
      'Gunluk rutine kolay dahil olur',
      'Tasinabilir ambalaj',
    ],
  },
  {
    icon: PartyPopper,
    title: 'Sosyal Yaşam Temposu Yueksek Olanlar',
    description: 'Aktif sosyal yasam surdurenler ve gunluk enerji ihtiyaci olanlar icin uygundur.',
    benefits: [
      'Gune daha hazir baslamayi hedefler',
      'Duzenli kullanim icin idealdir',
      'Premium formul',
    ],
  },
  {
    icon: Sun,
    title: 'Sabah Rutinini Gelistirmek Isteyenler',
    description: 'Sabahlarinı daha verimli baslatmak isteyenler icin tasarlanmistir.',
    benefits: [
      'Sabah kullanimina uygun',
      'Kolay uygulanabilir',
      'Duzenli rutin destegi',
    ],
  },
  {
    icon: Target,
    title: 'Rutin Arayanlar',
    description: 'Gunluk yasam rutinlerine bir ekleme yapmak isteyenler icin idealdir.',
    benefits: [
      'Sistematik kullanim',
      'Takip edilebilir rutin',
      'Premium kalite',
    ],
  },
]

const suitableFor = [
  'Yetiskin bireyler (18 yas ve uzeri)',
  'Gunluk rutinlerine takviye eklemek isteyenler',
  'Premium kalite arayan tuketiciler',
  'Dogal icerikli urunleri tercih edenler',
]

const consultRequired = [
  'Hamile veya emziren kadinlar',
  'Kronik hastalik tedavisi gorenler',
  'Duzenlı ilac kullananlar',
  '18 yas altindaki bireyler',
  'Alerjik reaksiyonu olanlar',
  'Ciddi saglik sorunlari bulunanlar',
]

export default function WhoIsItForPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Hedef Kitle
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Kimler Icin <span className="text-gradient-gold">Uygun?</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Multilimit Premium Detoks Kompleksi&apos;nin hangi kullanici profilleri icin uygun oldugunu kesfkedin.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ideal Kullanicilar</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              <span className="text-gradient-gold">Sizin Icin</span> Uygun mu?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {targetAudiences.map((audience) => (
              <div key={audience.title} className="bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <audience.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-2">{audience.title}</h3>
                    <p className="text-muted-foreground mb-4">{audience.description}</p>
                    <ul className="space-y-2">
                      {audience.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable For / Consultation Required */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Suitable For */}
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <UserCheck className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Uygun Kullanicilar</h2>
                  <p className="text-muted-foreground text-sm">Guvenle kullanilabilir</p>
                </div>
              </div>

              <ul className="space-y-3">
                {suitableFor.map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 bg-green-500/5 rounded-xl border border-green-500/10">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultation Required */}
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Uzmana Danisin</h2>
                  <p className="text-muted-foreground text-sm">Once doktorunuza sorun</p>
                </div>
              </div>

              <ul className="space-y-3">
                {consultRequired.map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-card border border-border rounded-2xl p-8">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-foreground mb-3">Onemli Bilgilendirme</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bu urun bir gida takviyesidir. Hastaliklari tedavi etmek, onlemek veya iyilestirmek icin kullanilmaz. Herhangi bir saglik sorununuz varsa veya ilac kullaniyorsaniz, urunu kullanmadan once mutlaka bir saglik uzmanina danisiniz. Onerilen dozaji asmayiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Siz de <span className="text-gradient-gold">Baslayin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Multilimit Premium Detoks Kompleksi ile gunluk rutininize destek verin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14">
              <Link href="/siparis">
                Siparis Ver
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 px-8 h-14">
              <Link href="/urun">
                Urunu Incele
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
