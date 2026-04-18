"use client"

import Link from 'next/link'
import { MessageCircle, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { trackClick } from '@/components/analytics/tracker'
import { MOCK_SITE_SETTINGS } from '@/lib/mock-site-settings'

const quickLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Ürün', href: '/urun' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
]

const productLinks = [
  { name: 'Nasıl Kullanılır', href: '/nasil-kullanilir' },
  { name: 'Kimler İçin Uygun', href: '/kimler-icin-uygun' },
  { name: 'İçerikler', href: '/icerikler' },
  { name: 'Sıkça Sorulan Sorular', href: '/sss' },
  { name: 'Kullanıcı Yorumları', href: '/yorumlar' },
]

const legalLinks = [
  { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  { name: 'Mesafeli Satış Sözleşmesi', href: '/mesafeli-satis-sozlesmesi' },
  { name: 'İade Koşulları', href: '/iade-kosullari' },
  { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
]

export function Footer() {
  const [footer, setFooter] = useState<{ label: string; href: string | null; external: boolean; group: string | null }[] | null>(null)
  const [settings, setSettings] = useState<any>(null)
  const pathname = usePathname()

  const socialLinks = useMemo(() => {
    return [
      { name: 'Instagram', href: settings?.instagramUrl || MOCK_SITE_SETTINGS.instagramUrl, icon: Instagram },
      { name: 'Facebook', href: settings?.facebookUrl || MOCK_SITE_SETTINGS.facebookUrl, icon: Facebook },

    ].filter((s) => s.href && s.href !== '#')
  }, [settings])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      // Menu fetch
      const menuRes = await fetch('/api/menu?location=footer', { cache: 'no-store' })
      const menuData = (await menuRes.json().catch(() => null)) as { ok: boolean; rows?: any[] }
      
      // Settings fetch
      const settingsRes = await fetch('/api/admin/site-settings', { cache: 'no-store' })
      const settingsData = await settingsRes.json().catch(() => null)

      if (cancelled) return
      if (menuData?.ok && (menuData.rows?.length ?? 0) > 0) {
        setFooter(
          menuData.rows!.map((r) => ({
            label: String(r.label),
            href: r.href ? String(r.href) : null,
            external: Boolean(r.external),
            group: r.group ? String(r.group) : null,
          }))
        )
      } else {
        setFooter(null)
      }

      if (settingsData?.ok && settingsData.row) {
        setSettings(settingsData.row)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const whatsappLink = useMemo(() => {
    const num = settings?.whatsapp || MOCK_SITE_SETTINGS.whatsapp
    const msg = encodeURIComponent('Merhaba, Multilimit Premium Detoks Kompleksi hakkında bilgi almak istiyorum.')
    return `https://wa.me/${num}?text=${msg}`
  }, [settings])

  const footerQuick = useMemo(() => {
    if (footer && footer.length) {
      return footer.filter((m) => (m.group ?? 'quick') === 'quick' && m.href).map((m) => ({ name: m.label, href: m.href as string, external: m.external }))
    }
    return quickLinks.map((m) => ({ ...m, external: false }))
  }, [footer])

  const footerProduct = useMemo(() => {
    if (footer && footer.length) {
      const rows = footer.filter((m) => (m.group ?? 'quick') === 'product' && m.href).map((m) => ({ name: m.label, href: m.href as string, external: m.external }))
      return rows.length ? rows : productLinks.map((m) => ({ ...m, external: false }))
    }
    return productLinks.map((m) => ({ ...m, external: false }))
  }, [footer])

  const footerLegal = useMemo(() => {
    if (footer && footer.length) {
      const rows = footer.filter((m) => (m.group ?? 'quick') === 'legal' && m.href).map((m) => ({ name: m.label, href: m.href as string, external: m.external }))
      return rows.length ? rows : legalLinks.map((m) => ({ ...m, external: false }))
    }
    return legalLinks.map((m) => ({ ...m, external: false }))
  }, [footer])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-navy-dark border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                E-Posta Bültenimize Kayıt Olun
              </h3>
              <p className="text-muted-foreground">
                Özel fırsatlardan ve yeni içeriklerden haberdar olun.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="min-w-[280px] bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                onClick={() => {
                  trackClick("footer_newsletter_submit")
                }}
              >
                Abone Ol
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img
                src={settings?.logoUrl || "/multilimit-logo.png"}
                alt={settings?.siteName || "Multilimit"}
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {settings?.footerText || "Günlük yaşam temposuna destek veren premium formül ile sabah daha zinde başlayın."}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              {settings?.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  {settings.phone}
                </a>
              )}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  {settings.email}
                </a>
              )}
              {(settings?.address || MOCK_SITE_SETTINGS.address) && (
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>{settings?.address || MOCK_SITE_SETTINGS.address}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hızlı Erişim</h4>
            <ul className="space-y-3">
              {footerQuick.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ürün</h4>
            <ul className="space-y-3">
              {footerProduct.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Yasal</h4>
            <ul className="space-y-3">
              {footerLegal.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* WhatsApp Support */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("footer_whatsapp")}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Destek
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              {settings?.copyright || `© ${new Date().getFullYear()} Multilimit. Tüm hakları saklıdır.`}
            </p>
            <p>
              Bu ürün bir gıda takviyesidir. Hastalıkları tedavi etmek veya önlemek için kullanılmaz.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
