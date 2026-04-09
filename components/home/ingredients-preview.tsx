import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Atom, Droplets, Wheat } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'

const ingredients = [
  {
    icon: Atom,
    name: 'Zeolit',
    description: 'Dogal mineral yapisıyla bilinen, geleneksel kullanimlarda tercih edilen ozel bilesen.',
    highlight: 'Dogal Mineral',
  },
  {
    icon: Droplets,
    name: 'L-Sistein',
    description: 'Vucut tarafindan kullanilan onemli bir amino asit. Protein yapitaslarindan biridir.',
    highlight: 'Amino Asit',
  },
  {
    icon: Wheat,
    name: 'Pirinc Kepegi',
    description: 'Pirinc tanesinin dis kabugundan elde edilen, besleyici degerler iceren dogal kaynak.',
    highlight: 'Dogal Kaynak',
  },
]

export function IngredientsPreview() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Iceriklerimiz</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">Premium</span> Formulumuzun Bilesenleri
          </h2>
          <p className="text-muted-foreground text-lg">
            Ozenle secilmis, yuksek kaliteli iceriklerle desteklenen formulumuz.
          </p>
        </Reveal>

        {/* Ingredients Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {ingredients.map((ingredient, index) => (
            <Reveal
              key={ingredient.name}
              delayMs={index * 100}
              className="group relative bg-card border border-border rounded-2xl p-8 card-hover text-center"
            >
              {/* Highlight Badge */}
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-6">
                {ingredient.highlight}
              </span>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ingredient.icon className="w-10 h-10 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                {ingredient.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {ingredient.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center" delayMs={160}>
          <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
            <Link href="/icerikler">
              Tum Icerikleri Incele
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
