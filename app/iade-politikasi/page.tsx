import { Metadata } from "next"
import { Check, Package, Truck, CreditCard, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Iade Politikasi | Multilimit",
  description: "Multilimit 30 gun kosulsuz iade garantisi ve iade sureci hakkinda bilgiler.",
}

export default function ReturnPolicyPage() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Iletisime Gecin",
      description: "WhatsApp, e-posta veya telefon ile musteri hizmetlerimize ulasin ve iade talebinizi iletin.",
    },
    {
      icon: Package,
      title: "Urunu Paketleyin",
      description: "Urunu orijinal ambalajinda veya uygun bir sekilde paketleyin. Kullanilmis urunler de iade edilebilir.",
    },
    {
      icon: Truck,
      title: "Kargoya Verin",
      description: "Size iletilen kargo kodunu kullanarak urunu ucretsiz olarak kargoya verin.",
    },
    {
      icon: CreditCard,
      title: "Para Iadesini Alin",
      description: "Urun bize ulastiktan sonra 3-5 is gunu icinde odemeniz iade edilir.",
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            30 Gun <span className="text-primary">Kosulsuz</span> Iade Garantisi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Urunlerimizden %100 memnun kalacaginizdan eminiz. Kalmazsaniz, soru sormadan paranizi iade ediyoruz.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Iade Sureci Nasil Isliyor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Iade Politikasi Detaylari</h2>

            <div className="space-y-6">
              <div className="bg-background border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Iade Kosullari</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Satin alma tarihinden itibaren 30 gun icinde iade talebinde bulunabilirsiniz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Acilamis ve kullanilmis urunler de iade edilebilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Iade nedeni belirtmeniz gerekmez - soru sormuyoruz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Kargo masrafi tarafimizca karsilanir</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Para Iadesi</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Urun bize ulastiktan sonra 3-5 is gunu icinde iade islemi baslatilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Odeme yaptaginiz yonteme gore para iadesi yapilir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Kredi karti iadeleri bankanıza baglı olarak 2-7 gun icinde hesabiniza yansır</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Kapida odeme ile alinan siparislerde banka havalesi ile iade yapılır</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Degisim</h3>
                <p className="text-muted-foreground mb-4">
                  Urun değişimi yapılmamaktadır. Farklı bir ürün istiyorsanız, mevcut ürünü iade edip yeni sipariş verebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Sıkça Sorulan Sorular</h2>

            <div className="space-y-4">
              {[
                {
                  q: "Acilamis urunu iade edebilir miyim?",
                  a: "Evet, acilamis ve hatta kullanilmis urunleri de iade edebilirsiniz. Urunumuzun kalitatisine guveniyoruz."
                },
                {
                  q: "Iade kargo ucretini kim karsilar?",
                  a: "Iade kargo ucreti tamamen tarafimizca karsilanir. Size ozel kargo kodu gonderilecektir."
                },
                {
                  q: "Ne kadar surede paramı geri alirim?",
                  a: "Urun bize ulastiktan sonra 3-5 is gunu icinde iade islemi baslatilir. Bankaniza bagli olarak 2-7 gun icinde hesabiniza yansir."
                },
                {
                  q: "Hediye olarak alinan urunu iade edebilir miyim?",
                  a: "Evet, hediye olarak alinan urunler de iade edilebilir. Ancak para iadesi satin alan kisinin odeme yontemine yapilir."
                },
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Iade Talebi Oluşturun</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Iade sureci hakkinda sorularınız  mı var veya iade talebinde bulunmak mı istiyorsunuz?
            Musteri hizmetlerimiz size yardimci olmaya hazir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="https://wa.me/905321234567">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile İletişime Geç
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iletisim">İletişim Formu</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
