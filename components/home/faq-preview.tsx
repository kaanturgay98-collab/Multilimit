"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/ui/reveal'

const faqs = [
  {
    question: 'Multilimit Premium Detoks Kompleksi nasıl kullanilir?',
    answer: 'Gunluk onerilen dozaj talimatlarina uygun sekilde, tercihen sabah kahvaltisiyla birlikte kullanmanizi oneririz. Detayli bilgi icin "Nasil Kullanilir" sayfamizi ziyaret edebilirsiniz.',
  },
  {
    question: 'Urun ne kadar surede teslim edilir?',
    answer: 'Siparisleriniz genellikle 1-3 is gunu icerisinde kargoya verilir. Turkiye genelinde ortalama 2-5 is gunu icinde teslimat saglanmaktadir.',
  },
  {
    question: 'Iade yapabilir miyim?',
    answer: 'Evet, acilmamis ve hasar gormemis urunler icin 14 gun icerisinde iade talebinde bulunabilirsiniz. Detayli bilgi icin iade kosullari sayfamizi inceleyebilirsiniz.',
  },
  {
    question: 'Urun icerigi hakkinda detayli bilgi alabilir miyim?',
    answer: 'Elbette! "Icerikler" sayfamizda her bir bilesen hakkinda detayli bilgilere ulasabilirsiniz. Ayrica urun ambalajinda tam icerik listesi yer almaktadir.',
  },
]

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <Reveal className="lg:sticky lg:top-24" y={20}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">SSS</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
              Sik Sorulan <span className="text-gradient-gold">Sorular</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              En cok merak edilen sorularin yanitlari burada. Daha fazla bilgi icin SSS sayfamizi ziyaret edebilir veya bize ulasabilirsiniz.
            </p>
            <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
              <Link href="/sss">
                Tum Sorulari Gor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal
                key={index}
                delayMs={index * 80}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
