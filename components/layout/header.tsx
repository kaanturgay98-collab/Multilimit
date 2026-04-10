"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, MessageCircle, ShoppingBag } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { trackClick } from '@/components/analytics/tracker'

const fallbackNavigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Ürün', href: '/urun' },
  { name: 'Nasıl Kullanılır', href: '/nasil-kullanilir' },
  { name: 'İçerikler', href: '/icerikler' },
  { name: 'SSS', href: '/sss' },
  { name: 'Yorumlar', href: '/yorumlar' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/iletisim' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState<{ label: string; href: string | null; external: boolean }[] | null>(null)
  const [settings, setSettings] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      // Menu fetch
      const menuRes = await fetch('/api/menu?location=header', { cache: 'no-store' })
      const menuData = (await menuRes.json().catch(() => null)) as { ok: boolean; rows?: any[] }
      
      // Settings fetch
      const settingsRes = await fetch('/api/admin/site-settings', { cache: 'no-store' })
      const settingsData = await settingsRes.json().catch(() => null)

      if (cancelled) return
      
      if (menuData?.ok && (menuData.rows?.length ?? 0) > 0) {
        setMenu(menuData.rows!.map((r) => ({ label: String(r.label), href: r.href ? String(r.href) : null, external: Boolean(r.external) })))
      } else {
        setMenu(null)
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
    const num = settings?.whatsapp || "905444575629"
    const msg = encodeURIComponent('Merhaba, Multilimit Premium Detoks Kompleksi hakkında bilgi almak istiyorum.')
    return `https://wa.me/${num}?text=${msg}`
  }, [settings])

  const navigation = useMemo(() => {
    if (menu && menu.length) {
      return menu
        .filter((m) => m.href)
        .map((m) => ({ name: m.label, href: m.href as string, external: m.external }))
    }
    return fallbackNavigation.map((m) => ({ ...m, external: false }))
  }, [menu])

  const socialLinks = useMemo(
    () => [
      {
        name: 'Instagram',
        href: settings?.instagramUrl || 'https://www.instagram.com/multi.limit/',
        icon: FaInstagram,
        colorClass: '!text-[#E4405F] hover:!text-[#E4405F] focus-visible:!text-[#E4405F]',
      },
      {
        name: 'Facebook',
        href: settings?.facebookUrl || 'https://www.facebook.com/multi.limit/',
        icon: FaFacebookF,
        colorClass: '!text-[#1877F2] hover:!text-[#1877F2] focus-visible:!text-[#1877F2]',
      },
      {
        name: 'WhatsApp',
        href: whatsappLink,
        icon: FaWhatsapp,
        colorClass: '!text-[#25D366] hover:!text-[#25D366] focus-visible:!text-[#25D366]',
      },
    ],
    [settings, whatsappLink]
  )

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={settings?.logoUrl || "/multilimit-logo.png"}
            alt={settings?.siteName || "Multilimit"}
            className="h-24 lg:h-28 w-auto max-w-[400px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Social + Trendyol - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                aria-label={social.name}
              >
                <Button variant="ghost" size="icon" className={cn('hover:bg-secondary/80', social.colorClass)}>
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </Button>
              </a>
            ))}
            <a
              href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 rounded-md bg-[#F27A1A] px-2.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              aria-label="Trendyol'da Siparis Ver"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Trendyol
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-border">
              <SheetTitle className="sr-only">Navigasyon Menusu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <img
                    src={settings?.logoUrl || "/multilimit-logo.png"}
                    alt={settings?.siteName || "Multilimit"}
                    className="h-12 w-auto max-w-[220px] object-contain"
                  />
                </Link>
                
                <nav className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    item.external ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        aria-label={social.name}
                      >
                        <Button variant="ghost" size="icon" className={cn('hover:bg-secondary/80', social.colorClass)}>
                          <social.icon className="h-4 w-4" />
                          <span className="sr-only">{social.name}</span>
                        </Button>
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F27A1A] hover:opacity-90 text-white rounded-lg transition-opacity font-semibold"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Trendyol'da Siparis Ver
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Destek
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
