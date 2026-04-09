import { MessageCircle, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'

const whatsappMessage = encodeURIComponent('Merhaba, Multilimit Premium Detoks Kompleksi hakkinda bilgi almak istiyorum.')
const whatsappLink = `https://wa.me/905551234567?text=${whatsappMessage}`

export function WhatsappSupport() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-green-900/20 via-green-800/10 to-green-900/20 border-y border-green-800/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <Reveal className="text-center lg:text-left" y={18}>
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  WhatsApp Destek Hatti
                </h2>
                <p className="text-muted-foreground text-sm">Sorularınız icin bize ulasin</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pazartesi - Cumartesi: 09:00 - 18:00
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0850 123 45 67
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@multilimit.com
              </span>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delayMs={120} y={18}>
            <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-600/25"
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp ile Yazin
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
