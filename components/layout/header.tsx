"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Menu, X, ShoppingCart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'
import { trackClick } from '@/components/analytics/tracker'

const fallbackNavigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkimizda', href: '/hakkimizda' },
  { name: 'Urun', href: '/urun' },
  { name: 'Nasil Kullanilir', href: '/nasil-kullanilir' },
  { name: 'Icerikler', href: '/icerikler' },
  { name: 'SSS', href: '/sss' },
  { name: 'Yorumlar', href: '/yorumlar' },
  { name: 'Blog', href: '/blog' },
  { name: 'Iletisim', href: '/iletisim' },
]

const whatsappMessage = encodeURIComponent('Merhaba, Multilimit Premium Detoks Kompleksi hakkinda bilgi almak istiyorum.')
const whatsappLink = `https://wa.me/905551234567?text=${whatsappMessage}`

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems, setIsOpen: setCartOpen } = useCart()
  const [menu, setMenu] = useState<{ label: string; href: string | null; external: boolean }[] | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const res = await fetch('/api/menu?location=header', { cache: 'no-store' })
      const data = (await res.json().catch(() => null)) as { ok: boolean; rows?: any[] }
      if (cancelled) return
      if (data?.ok && (data.rows?.length ?? 0) > 0) {
        setMenu(data.rows.map((r) => ({ label: String(r.label), href: r.href ? String(r.href) : null, external: Boolean(r.external) })))
      } else {
        setMenu(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const navigation = useMemo(() => {
    if (menu && menu.length) {
      return menu
        .filter((m) => m.href)
        .map((m) => ({ name: m.label, href: m.href as string, external: m.external }))
    }
    return fallbackNavigation.map((m) => ({ ...m, external: false }))
  }, [menu])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <span className="font-serif text-xl font-bold text-gradient-gold tracking-wide">
              MULTILIMIT
            </span>
            <span className="block text-[10px] text-muted-foreground tracking-widest uppercase">
              Premium Detoks
            </span>
          </div>
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
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Button - Desktop */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("header_whatsapp")}
            className="hidden md:flex"
          >
            <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400 hover:bg-green-500/10">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp Destek</span>
            </Button>
          </a>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
            asChild
          >
            <Link href="/sepet">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Sepet</span>
            </Link>
          </Button>

          {/* Order CTA - Desktop */}
          <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            <Link
              href="/siparis"
              onClick={() => {
                trackClick("header_order_cta")
              }}
            >
              Siparis Ver
            </Link>
          </Button>

          {/* Login Button - Desktop */}
          <Button asChild variant="ghost" className="hidden lg:flex text-muted-foreground hover:text-foreground">
            <Link href="/giris">
              Giris Yap
            </Link>
          </Button>

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
                  <span className="font-serif text-xl font-bold text-gradient-gold">
                    MULTILIMIT
                  </span>
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
                        className="px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link
                      href="/siparis"
                      onClick={() => {
                        setIsOpen(false)
                        trackClick("header_order_cta")
                      }}
                    >
                      Siparis Ver
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/giris" onClick={() => setIsOpen(false)}>
                      Giris Yap
                    </Link>
                  </Button>
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
