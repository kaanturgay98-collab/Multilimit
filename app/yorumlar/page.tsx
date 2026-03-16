import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, Quote, ArrowRight, User } from 'lucide-react'
import { AdminOverlay } from '@/components/public/admin-overlay'

export const metadata: Metadata = {
  title: 'Kullanici Yorumlari | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi kullanici yorumlari ve deneyimleri. Gercek kullanici gorusleri.',
}

const testimonials = [
  {
    name: 'Ayse K.',
    location: 'Istanbul',
    rating: 5,
    text: 'Sabahları daha dinlenmis hissediyorum. Urun kalitesi gercekten farkediliyor, paketlemesi de cok silik. 3 aydir duzenli kullaniyorum ve memnunum.',
    date: '2 hafta once',
    verified: true,
  },
  {
    name: 'Mehmet Y.',
    location: 'Ankara',
    rating: 5,
    text: 'Yogun is temposunda gunluk rutinime kolayca dahil edebildim. Pratik kullanimi ve premium hissi ile cok memnunum. Kesinlikle tavsiye ederim.',
    date: '1 ay once',
    verified: true,
  },
  {
    name: 'Zeynep A.',
    location: 'Izmir',
    rating: 5,
    text: 'Arkadas tavsiyesiyle basladim, simdi duzenli kullananlar arasindayim. Musteri hizmetleri de cok ilgili, sorularima hizlica yanit aldim.',
    date: '3 hafta once',
    verified: true,
  },
  {
    name: 'Can O.',
    location: 'Bursa',
    rating: 4,
    text: 'Premium bir urun oldugu paketinden belli oluyor. Kullanim kolayligi ve pratik sase formati is yerinde kullanmama olanak sagliyor.',
    date: '1 ay once',
    verified: true,
  },
  {
    name: 'Elif D.',
    location: 'Antalya',
    rating: 5,
    text: 'Gunluk rutinime ekledigim en iyi urunlerden biri. Ozellikle sabahları daha iyi hissettigimi soyleyebilirim. Tavsiye ederim.',
    date: '2 ay once',
    verified: true,
  },
  {
    name: 'Burak S.',
    location: 'Eskisehir',
    rating: 5,
    text: 'Kargo cok hizli geldi, urun tam bekledgim gibi. Daha once farkli markalar denedim ama bu kadar premium hissettiren olmamisti.',
    date: '3 hafta once',
    verified: true,
  },
  {
    name: 'Selin T.',
    location: 'Konya',
    rating: 5,
    text: 'Arkadaslarima tavsiye ettim, onlar da memnun kaldi. WhatsApp destegi de cok hizli yanit veriyor, herhangi bir sorunuz olursa rahatca sorabilirsiniz.',
    date: '1 ay once',
    verified: true,
  },
  {
    name: 'Emre K.',
    location: 'Trabzon',
    rating: 4,
    text: 'Yogun calisma temposunda bu tur destekleyici urunler cok isime yariyor. Pratik ambalaji sayesinde ofiste de kolayca kullanabiliyorum.',
    date: '2 ay once',
    verified: true,
  },
  {
    name: 'Derya M.',
    location: 'Adana',
    rating: 5,
    text: 'Ilk basta tereddut ettim ama siparisi verdikten sonra cok memnun kaldim. Premium kalite gercekten hissediliyor.',
    date: '1 hafta once',
    verified: true,
  },
]

const stats = [
  { value: '10.000+', label: 'Mutlu Musteri' },
  { value: '4.9/5', label: 'Ortalama Puan' },
  { value: '%95', label: 'Memnuniyet' },
  { value: '%87', label: 'Tekrar Satin Alim' },
]

export default function TestimonialsPage() {
  return (
    <>
      <AdminOverlay slug="yorumlar" />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        {/* Decorative Quotes */}
        <div className="absolute top-20 left-10 opacity-5">
          <Quote className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 rotate-180">
          <Quote className="w-32 h-32 text-primary" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Kullanici Deneyimleri
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Gercek <span className="text-gradient-gold">Yorumlar</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Binlerce kullanicimizin Multilimit Premium Detoks Kompleksi deneyimleri.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 lg:p-8 card-hover"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                      <User className="w-6 h-6 text-primary/70" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                      Dogrulanmis
                    </span>
                  )}
                </div>

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
                <p className="text-foreground mb-4 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Date */}
                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 lg:py-12 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Yukaridaki yorumlar gercek kullaniclara aittir. Bireysel deneyimler farklilik gosterebilir. Bu urun bir gida takviyesidir ve herhangi bir tedavi vaadi icermez.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Siz de <span className="text-gradient-gold">Deneyin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Binlerce mutlu musterimize katilin ve Multilimit farkini kesfkedin.
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
