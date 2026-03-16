import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Atom, Droplets, Wheat, Sparkles, ArrowRight, Shield, Beaker, Leaf } from 'lucide-react'
import { AdminOverlay } from '@/components/public/admin-overlay'

export const metadata: Metadata = {
  title: 'Icerikler | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi icerikleri: Zeolit, L-Sistein ve Pirinc Kepegi hakkinda detayli bilgi.',
}

const ingredients = [
  {
    icon: Atom,
    name: 'Zeolit',
    tagline: 'Dogal Mineral',
    description: 'Zeolit, dogada olusean kristalin bir mineral yapisdir. Volkanik kayalarin su ile etkilesimi sonucu oluşur ve gozeneekli yapıya sahiptir.',
    details: [
      'Dogal volkanik mineral',
      'Kristal yapilar',
      'Gozeneekli yuzey alani',
      'Geleneksel kullanimda tercih edilen bilesen',
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Droplets,
    name: 'L-Sistein',
    tagline: 'Amino Asit',
    description: 'L-Sistein, vucut tarafindan kullanilan yari esansiyel bir amino asittir. Protein yapilarinin onemli bir bileşenidir.',
    details: [
      'Yari esansiyel amino asit',
      'Protein yapitasi',
      'Kufur iceren amino asit',
      'Vucut tarafindan kullanilir',
    ],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Wheat,
    name: 'Pirinc Kepegi',
    tagline: 'Dogal Kaynak',
    description: 'Pirinc kepegi, pirinc tanesinin dis kabugundan elde edilir. Lif ve cesitli besin ogelerini iceren dogal bir kaynaktir.',
    details: [
      'Pirinc dis kabugundan elde edilir',
      'Dogal lif kaynagi',
      'Besin ogeleri icerir',
      'Geleneksel kullanim alani',
    ],
    color: 'from-amber-500/20 to-yellow-500/20',
  },
]

const synergy = [
  {
    icon: Beaker,
    title: 'Formul Uyumu',
    description: 'Her bilesen, birbirleriyle uyumlu calismak uzere ozenle secilmistir.',
  },
  {
    icon: Shield,
    title: 'Kalite Kontrolu',
    description: 'Tum icerikler, kalite standartlarina uygunluk acisindan test edilir.',
  },
  {
    icon: Leaf,
    title: 'Dogal Kaynaklar',
    description: 'Dogal kaynaklardan elde edilen, ozenle secilmis bileşenler.',
  },
]

export default function IngredientsPage() {
  return (
    <>
      <AdminOverlay slug="icerikler" />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Formulumuz
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Premium <span className="text-gradient-gold">Icerikler</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Multilimit Premium Detoks Kompleksi&apos;nin ozenle secilmis bileşenleri hakkinda detayli bilgi edinin.
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients Detail */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-12 lg:space-y-20">
            {ingredients.map((ingredient, index) => (
              <div
                key={ingredient.name}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`relative aspect-square max-w-md mx-auto bg-gradient-to-br ${ingredient.color} rounded-3xl border border-border overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6">
                        <ingredient.icon className="w-12 h-12 text-primary" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-foreground mb-2">{ingredient.name}</span>
                      <span className="text-primary font-medium">{ingredient.tagline}</span>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-8 right-8 w-3 h-3 bg-primary/30 rounded-full" />
                    <div className="absolute bottom-12 left-8 w-2 h-2 bg-primary/20 rounded-full" />
                    <div className="absolute top-1/3 left-12 w-4 h-4 bg-primary/10 rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-4">
                    {ingredient.tagline}
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {ingredient.name}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {ingredient.description}
                  </p>
                  
                  <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-4">Onemli Bilgiler</h3>
                    <ul className="space-y-3">
                      {ingredient.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
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

      {/* Formula Synergy */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Formul Birligi</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              <span className="text-gradient-gold">Birlikte</span> Daha Guclu
            </h2>
            <p className="text-muted-foreground">
              Formulumuzdeki her bilesen, birbirleriyle uyum icinde calismak uzere ozenle secilmistir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {synergy.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center card-hover">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-secondary/50 border border-border rounded-2xl p-6 lg:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Onemli Not:</strong> Bu sayfadaki bilgiler genel bilgilendirme amaçlidir ve tibbi tavsiye niteliginde degildir. Herhangi bir saglik sorununuz varsa, urunleri kullanmadan once mutlaka bir saglik uzmanina danisiniz. Bu urun bir gida takviyesidir ve hastaliklari tedavi etmek, onlemek veya iyilestirmek icin kullanilmaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Premium Formulu <span className="text-gradient-gold">Deneyin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Ozenle secilmis iceriklerimizle tanisın ve gunluk rutininize dahil edin.
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
                Urun Detayi
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
