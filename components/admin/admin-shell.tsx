"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import { cn } from "@/lib/utils"

const navSections = [
  {
    label: "Genel",
    items: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/site-settings", label: "Site Ayarlari" },
      { href: "/admin/menu", label: "Menu Yonetimi" },
      { href: "/admin/pages", label: "Sayfa Yonetimi" },
      { href: "/admin/home", label: "Ana Sayfa" },
      { href: "/admin/analytics", label: "Analytics" },
    ],
  },
  {
    label: "Urun & Icerik",
    items: [
      { href: "/admin/products", label: "Urunler" },
      { href: "/admin/product-variants", label: "Urun Varyantlari" },
      { href: "/admin/ingredients", label: "Icerikler" },
      { href: "/admin/testimonials", label: "Yorumlar" },
      { href: "/admin/faq", label: "SSS" },
    ],
  },
  {
    label: "Blog & Medya",
    items: [
      { href: "/admin/blog-posts", label: "Blog Yazilari" },
      { href: "/admin/blog-categories", label: "Blog Kategorileri" },
      { href: "/admin/media", label: "Medya Kutuphanesi" },
      { href: "/admin/seo", label: "SEO Yonetimi" },
    ],
  },
  {
    label: "E-ticaret",
    items: [
      { href: "/admin/orders", label: "Siparisler" },
      { href: "/admin/coupons", label: "Kuponlar" },
      { href: "/admin/users", label: "Kullanicilar" },
      { href: "/admin/contact-messages", label: "Iletisim Mesajlari" },
    ],
  },
  {
    label: "Guvenlik",
    items: [
      { href: "/admin/admin-users", label: "Admin Kullanicilar" },
      { href: "/admin/activity-log", label: "Aktivite Loglari" },
    ],
  },
] as const

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#050b1a] text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/60 bg-gradient-to-b from-[#08142f] via-[#050b1a] to-[#050b1a]">
        <div className="h-14 px-4 flex items-center border-b border-border/60">
          <Link href="/admin" className="font-serif text-lg font-semibold text-gradient-gold">
            MULTILIMIT
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80 mb-2">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-primary/10 text-primary border border-primary/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Admin</span>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border/60 bg-background/90 backdrop-blur flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Siteyi Gor
            </Link>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground">Rol: Super Admin</span>
            <Button asChild size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
              <Link href="/admin/orders">Yeni Siparisler</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 bg-gradient-to-br from-[#050b1a] via-[#050b1a] to-[#071534]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

