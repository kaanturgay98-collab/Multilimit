import { Metadata } from 'next'
import { Award, Target, Eye, Heart, Shield, Sparkles, Users, Building } from 'lucide-react'
import { AdminOverlay } from '@/components/public/admin-overlay'

export const metadata: Metadata = {
  title: 'Hakkimizda | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit markasi ve premium detoks formulumuz hakkinda bilgi edinin. Misyonumuz, vizyonumuz ve kalite anlayisimiz.',
}

const values = [
  {
    icon: Shield,
    title: 'Guvenilirlik',
    description: 'Her urunumuz titizlikle test edilir ve en yuksek kalite standartlarinda uretilir.',
  },
  {
    icon: Sparkles,
    title: 'Kalite',
    description: 'Premium hammaddeler ve modern uretim teknikleriyle ustun kalite sunuyoruz.',
  },
  {
    icon: Heart,
    title: 'Musteri Odaklilik',
    description: 'Musterilerimizin memnuniyeti ve guveni her zaman oncelikimizdir.',
  },
  {
    icon: Eye,
    title: 'Seffaflik',
    description: 'Iceriklerimiz ve uretim sureclerimiz hakkinda acik ve net bilgi sunuyoruz.',
  },
]

const stats = [
  { value: '10.000+', label: 'Mutlu Musteri' },
  { value: '4.9/5', label: 'Musteri Puani' },
  { value: '%100', label: 'Dogal Icerik' },
  { value: '2+ Yil', label: 'Tecrube' },
]

export default function AboutPage() {
  return (
    <>
      <AdminOverlay slug="hakkimizda" />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Hakkimizda
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Kalite ve Guvenin <span className="text-gradient-gold">Adresi</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Multilimit olarak, premium detoks formullerimizle saglikli yasam yolculugunuzda yaninizda olmak icin calisiyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hikayemiz</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
                Marka <span className="text-gradient-gold">Hikayemiz</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Multilimit, modern yasamin getirdigi yorgunluk ve strese karsi dogal cozumler sunmak amaciyla kuruldu. Kurucularimiz, yillar boyunca saglik ve wellness alaninda edindikleri deneyimi, premium kalitede urunler olusturmak icin bir araya getirdi.
                </p>
                <p>
                  Premium Detoks Kompleksimiz, ozenle secilmis dogal iceriklerle formule edilmistir. Zeolit, L-Sistein ve Pirinc Kepegi gibi bilesen iceren formulumuz, gunluk rutininize kolayca dahil edilebilecek sekilde tasarlandi.
                </p>
                <p>
                  Bugün, binlerce kullanicimiza ulasmanin gururuyla, kalite standartlarimizdan odun vermeden buyumeye devam ediyoruz. Her urun, ayni titizlik ve ozene sahip olarak sizlere ulastiriliyor.
                </p>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="w-24 h-24 text-primary/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold text-primary">2+ Yil</p>
                <p className="text-sm text-muted-foreground">Kaliteli Hizmet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Misyonumuz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dogal ve yuksek kaliteli iceriklerle formule edilmis premium urunler sunarak, kullanicilarimizin gunluk yasam rutinlerini desteklemek ve saglikli yasam yolculuklarinda guvenilir bir partner olmak.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Vizyonumuz</h3>
              <p className="text-muted-foreground leading-relaxed">
                Turkiye&apos;nin ve bolgenin lider premium wellness markasi olmak. Yenilikci formuller ve musteri odakli yaklasimimizla, saglikli yasamin herkes icin erislebilir olmasini saglamak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Degerlerimiz</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Bizi <span className="text-gradient-gold">Farkli Kilan</span> Degerler
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center card-hover"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 border-y border-border">
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

      {/* Quality Approach */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Placeholder */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-navy-light to-secondary rounded-3xl border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Kalite Anlayisi</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
                Kalite <span className="text-gradient-gold">Taahhutumuz</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Multilimit olarak, her urunumuzde en yuksek kalite standartlarini hedefliyoruz. Hammadde seciminden ambalajlamaya kadar her asamada titiz kalite kontrol sureclerinden gecirilir.
                </p>
                <p>
                  GMP (Iyi Uretim Uygulamalari) sertifikali tesislerde uretilen urunlerimiz, uluslararasi kalite standartlarina uygun sekilde hazirlanir. Her parti urun, guvenlik ve etkinlik acisindan test edilir.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">GMP Sertifikali</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">ISO Standartlari</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Ekibimiz</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              <span className="text-gradient-gold">Uzman</span> Ekibimiz
            </h2>
            <p className="text-muted-foreground">
              Deneyimli ekibimiz, sizlere en iyi hizmeti sunmak icin calisıyor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: 'Dr. Ahmet Yilmaz', role: 'Formul Uzmani' },
              { name: 'Elif Demir', role: 'Kalite Guvence Muduru' },
              { name: 'Can Ozturk', role: 'Urun Gelistirme' },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary border border-border flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-primary/50" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
