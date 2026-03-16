"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Check } from "lucide-react"
import Link from "next/link"
import { AdminOverlay } from "@/components/public/admin-overlay"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      value: "+90 (212) 123 45 67",
      link: "tel:+902121234567",
    },
    {
      icon: Mail,
      title: "E-posta",
      value: "info@multilimit.com.tr",
      link: "mailto:info@multilimit.com.tr",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+90 (532) 123 45 67",
      link: "https://wa.me/905321234567",
    },
    {
      icon: MapPin,
      title: "Adres",
      value: "Levent, Istanbul, Turkiye",
      link: "#",
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <AdminOverlay slug="iletisim" />
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Bizimle <span className="text-primary">Iletisime</span> Gecin
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sorulariniz, oneriniz veya destege ihtiyaciniz mi var? Uzman ekibimiz size yardimci olmak icin burada.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </Link>
            ))}

            <div className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Calisma Saatleri</span>
              </div>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                <p>Cumartesi: 10:00 - 14:00</p>
                <p>Pazar: Kapali</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Mesajiniz Alindi!</h2>
                  <p className="text-muted-foreground mb-6">
                    En kisa surede sizinle iletisime gececegiz. Tesekkur ederiz.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Yeni Mesaj Gonder
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Mesaj Gonderin</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Adiniz Soyadiniz</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-background border-border"
                          placeholder="05XX XXX XX XX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Konu</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajiniz</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="bg-background border-border min-h-[150px]"
                        placeholder="Mesajinizi buraya yazin..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Gonderiliyor..." : "Mesaj Gonder"}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-16">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.042074892089!2d29.0108!3d41.0821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzU1LjYiTiAyOcKwMDAnMzguOSJF!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Multilimit Konum"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
