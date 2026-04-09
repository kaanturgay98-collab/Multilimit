import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Font deneme | Multilimit",
  robots: { index: false, follow: false },
}

export default function FontTestPage() {
  return (
    <div className="min-h-[70vh] bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-12 lg:py-16">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Font deneme — sadece /test
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">DM Sans (site geneli)</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Bu sayfa artık kök layout ile aynı fontu kullanır: DM Sans — geometrik, sade. Türkçe: ğüşıöç İstanbul,
          şeker, özet.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground sm:text-3xl">Alt başlık</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Hiyerarşi boyut ve ağırlık (400–700) ile kurulur. Kök layout ve globals.css tema değişkenleri tüm siteye
          DM Sans uygular.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90"
          >
            Birincil buton
          </button>
          <button
            type="button"
            className="rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground"
          >
            İkincil buton
          </button>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-card-foreground">Kart başlığı</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Yerel font yükü yok; tekrarlayan indirme olmaz.
          </p>
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Referans: kök layout DM Sans (--font-dm-sans); Tailwind font-sans tüm metinlerde aynı aileyi kullanır.
        </p>
      </div>
    </div>
  )
}
