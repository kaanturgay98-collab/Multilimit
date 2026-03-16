"use client"

import { useState } from "react"
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AdminOverlay } from "@/components/public/admin-overlay"

const faqCategories = [
  {
    name: "Urun Bilgileri",
    faqs: [
      {
        question: "Multilimit Premium Detoks Kompleksi nedir?",
        answer: "Multilimit Premium Detoks Kompleksi, vucut detoksifikasyonu ve genel saglik icin ozenle formule edilmis premium bir takviye urunudur. Karaciger sagligi, sindirim sistemi destegi ve antioksidan koruma icin 15+ dogal bileseni icerir.",
      },
      {
        question: "Urunde hangi icerikler bulunuyor?",
        answer: "Urunumuz Deve Dikeni Ekstresi, Karahindiba Koku, Enginar Ekstresi, NAC (N-Asetil Sistein), Zerdeçal Ekstresi, Alpha Lipoik Asit ve daha bircok bilimsel olarak arastilmis bileseni icerir. Tum icerikler yuksek kalite standartlarinda uretilmektedir.",
      },
      {
        question: "Urun guvenli mi?",
        answer: "Evet, urunumuz GMP sertifikali tesislerde uretilmektedir ve tum icerikler FDA onayli kaynaklardan temin edilmektedir. Ancak herhangi bir saglik sorununuz varsa veya ilac kullaniyorsaniz, kullanmadan once doktorunuza danisin.",
      },
      {
        question: "Urun vegan/vejetaryen mi?",
        answer: "Evet, Multilimit Premium Detoks Kompleksi %100 bitkisel kaynaklardan elde edilen iceriklerle formule edilmistir ve vegan/vejetaryen beslenme programina uygundur.",
      },
    ],
  },
  {
    name: "Kullanim",
    faqs: [
      {
        question: "Urunu nasil kullanmaliyim?",
        answer: "Gunluk onerilen doz 2 kapsuldur. Sabah kahvaltidan sonra bol su ile birlikte alin. En iyi sonuclar icin duzenly kullanim onerilir.",
      },
      {
        question: "Ne kadar surede sonuc gorulur?",
        answer: "Cogu kullanici 2-4 hafta icinde enerji seviyesinde artis ve genel iyilesme hisseder. Tam detoks etkileri icin 8-12 haftalik duzenly kullanim onerilir.",
      },
      {
        question: "Yan etkileri var mi?",
        answer: "Urunumuz dogal iceriklerden olustugundan yan etki riski minimumdur. Ancak baslangicta hafif sindirim degisiklikleri yasanabilir. Bu normaldir ve genellikle birkaç gun icinde gecer.",
      },
      {
        question: "Diger ilaclarla birlikte kullanilabilir mi?",
        answer: "Urunumuz dogal olsa da, ilac kullanan kisilerin kullanmadan once mutlaka doktorlarina danismalarini oneririz. Ozellikle kan sulandiricilari, diyabet ilaclari veya karaciger ilaclari kullaniyorsaniz dikkatli olun.",
      },
    ],
  },
  {
    name: "Siparis ve Teslimat",
    faqs: [
      {
        question: "Kargo ucretsiz mi?",
        answer: "Evet! Turkiye genelinde tum siparisleriniz icin kargo ucretsidir.",
      },
      {
        question: "Teslimat suresi ne kadar?",
        answer: "Siparisler ayni gun kargoya verilir ve genellikle 1-3 is gunu icinde teslim edilir. Istanbul icindeki siparisler cogunlukla ertesi gun teslim edilir.",
      },
      {
        question: "Kapida odeme yapabilir miyim?",
        answer: "Evet, kapida nakit veya kredi karti ile odeme seceneklerimiz mevcuttur.",
      },
      {
        question: "Siparisimi nasil takip edebilirim?",
        answer: "Siparis onay e-postasinda kargo takip numarasi yer almaktadir. Bu numara ile kargo sirketinin web sitesinden siparisizin durumunu takip edebilirsiniz.",
      },
    ],
  },
  {
    name: "Iade ve Degisim",
    faqs: [
      {
        question: "Iade politikaniz nedir?",
        answer: "30 gunluk koşulsuz iade garantisi sunuyoruz. Urundan memnun kalmazsaniz, acilamis bile olsa tam para iadesi yapiyoruz.",
      },
      {
        question: "Iade icin ne yapmaliyim?",
        answer: "Iade talebinizi iletisim sayfamizdan veya WhatsApp hattimizdan iletebilirsiniz. Urunun kullanilmamis kismini kargoya vermenizi ve kargo takip numarasini bizimle paylasmanizi rica ediyoruz.",
      },
      {
        question: "Iade sureci ne kadar suruyor?",
        answer: "Urun bize ulastiktan sonra 3-5 is gunu icinde para iadeniz gerceklestirilir. Bankaniza bagli olarak yansima suresi 2-7 gun arasinda degisebilir.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0)

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <AdminOverlay slug="sss" />
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sikca Sorulan <span className="text-primary">Sorular</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Aklinizdaki sorularin cevaplarini buradan bulabilirsiniz. Aradiginizi bulamadiysaniz bizimle iletisime gecmekten cekinmeyin.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Soru ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-card border-border h-12"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aradiginiz kriterlere uygun soru bulunamadi.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Tum Sorulari Goster
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{category.name}</h2>
                  <div className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => {
                      const itemId = `${categoryIndex}-${faqIndex}`
                      const isOpen = openItems.includes(itemId)
                      return (
                        <div
                          key={faqIndex}
                          className="bg-card border border-border rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-medium text-foreground pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-0">
                              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Hala Sorunuz mu Var?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Uzman ekibimiz sorularinizi cevaplamak icin hazir. Bize ulasmanin en hizli yollarini asagida bulabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="https://wa.me/905321234567">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile Yazin
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iletisim">
                <Mail className="mr-2 h-5 w-5" />
                Iletisim Formu
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="tel:+902121234567">
                <Phone className="mr-2 h-5 w-5" />
                Bizi Arayin
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
