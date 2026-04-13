"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import { cn } from "@/lib/utils"

interface NavSection {
  label: string
  href?: string
  items: readonly { href: string; label: string }[]
}

const navSections: readonly NavSection[] = [
  {
    label: "Ana Sayfa",
    href: "/admin/editor?slug=home",
    items: [
      { href: "/admin/editor?slug=home", label: "Sayfa Tasarımı (Puck)" },
      { href: "/admin/home", label: "Eski Sayfa Bölümleri" },
      { href: "/admin/analytics", label: "Analytics" },
    ],
  },
  {
    label: "Hakkımızda",
    href: "/admin/editor?slug=about",
    items: [
      { href: "/admin/editor?slug=about", label: "Sayfa Tasarımı (Puck)" },
      { href: "/admin/about", label: "Hakkımızda İçeriği" },
    ],
  },
  {
    label: "Ürün",
    href: "/admin/editor?slug=urun",
    items: [
      { href: "/admin/editor?slug=urun", label: "Sayfa Tasarımı (Puck)" },
      { href: "/admin/products", label: "Ürün Listesi" },
      { href: "/admin/product-variants", label: "Varyantlar" },
      { href: "/admin/ingredients", label: "İçerikler (Ham maddeler)" },
    ],
  },
  {
    label: "Nasıl Kullanılır",
    href: "/admin/editor?slug=nasil-calisir",
    items: [
      { href: "/admin/editor?slug=nasil-calisir", label: "Sayfa Tasarımı (Puck)" },
    ],
  },
  {
    label: "İçerikler",
    href: "/admin/editor?slug=icerikler",
    items: [
      { href: "/admin/editor?slug=icerikler", label: "Sayfa Tasarımı (Puck)" },
      // { href: "/admin/menu", label: "Menü Yönetimi" },
    ],
  },
  {
    label: "SSS",
    href: "/admin/editor?slug=sss",
    items: [
      { href: "/admin/editor?slug=sss", label: "Sayfa Tasarımı (Puck)" },
    ],
  },
  {
    label: "Yorumlar",
    href: "/admin/editor?slug=yorumlar",
    items: [
      { href: "/admin/editor?slug=yorumlar", label: "Sayfa Tasarımı (Puck)" },
    ],
  },
  {
    label: "Blog",
    items: [
      { href: "/admin/blog-posts", label: "Blog Yazıları" },
    ],
  },
  {
    label: "İletişim",
    href: "/admin/editor?slug=iletisim",
    items: [
      { href: "/admin/editor?slug=iletisim", label: "Sayfa Tasarımı (Puck)" },
      { href: "/admin/contact-messages", label: "Mesajlar" },
      { href: "/admin/site-settings", label: "İletişim Bilgileri" },
    ],
  },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const isEditor = pathname?.startsWith('/admin/editor')

  return (
    <div
      className="min-h-screen text-slate-900 flex flex-col selection:bg-primary/20"
      style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
    >
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-sans font-black">
                  M
                </div>
                MULTILIMIT
              </Link>

              {/* Navigation Items */}
              <div className="hidden lg:flex items-center gap-1">
                {navSections.map((section) => (
                  <div key={section.label} className="relative group px-1">
                    <Link
                      href={section.href || "#"}
                      className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors flex items-center h-16"
                    >
                      <span>{section.label}</span>
                    </Link>

                    {/* Megamenu / Dropdown */}
                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block w-56 p-2 bg-white border border-slate-200 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
                      {section.items.map((item) => {
                        const active = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition-all group/item",
                              active
                                ? "bg-primary text-white shadow-md"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            )}
                          >
                            <span>{item.label}</span>
                            {!active && (
                              <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xs font-medium text-slate-400 hover:text-primary transition-colors hidden sm:block">
                Siteyi Gör
              </Link>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                SÜPER ADMİN
              </div>
              <AdminLogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Area */}
      <main className={cn(
        "flex-1 flex flex-col bg-slate-50/30",
        isEditor ? "" : "px-6 lg:px-10 py-8"
      )}>
        <div className={cn(
          "w-full animate-in fade-in slide-in-from-bottom-2 duration-500",
          isEditor ? "" : "max-w-7xl mx-auto"
        )}>
          {children}
        </div>
      </main>
    </div>
  )
}

