import { Metadata } from "next"
import { getDb } from "@/lib/db"
import { Mail, MessageCircle, Phone, ArrowUpRight, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim | Multilimit Premium Detoks Kompleksi",
  description: "Multilimit Premium Detoks Kompleksi ile iletişime geçin.",
}

export const dynamic = "force-dynamic"

export default async function ContactPage() {
  type SiteSettings = {
    phone: string | null
    email: string | null
    whatsapp: string | null
    instagramUrl: string | null
    facebookUrl: string | null
    youtubeUrl: string | null
    xUrl: string | null
  }

  try {
    const ds = await getDb()
    const rows = (await ds.query(
      `SELECT phone, email, whatsapp, instagramUrl, facebookUrl, youtubeUrl, xUrl
       FROM "SiteSetting" ORDER BY "createdAt" ASC LIMIT 1`
    )) as SiteSettings[]

    const settings = rows[0] ?? null
    const socialLinks = [
      { label: "Instagram", href: settings?.instagramUrl || null },
      { label: "Facebook", href: settings?.facebookUrl || null },
      { label: "YouTube", href: settings?.youtubeUrl || null },
      { label: "X", href: settings?.xUrl || null },
    ].filter((s) => !!s.href)

    return (
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_55%)]" />
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Hemen bizimle bağlantıya gecin
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              İletişimde kalalim, sorularinizi hızlıca çözelim.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              İletişim, destek ve iş birliği talepleriniz için en uygun kanaldan bize ulaşabilirsiniz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {settings?.whatsapp ? (
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp ile yazın
                </a>
              ) : null}
              {settings?.email ? (
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  <Mail className="h-4 w-4" />
                  E-posta gönderin
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-12">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                <Phone className="h-4 w-4" />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Telefon</p>
              <div className="mt-2 text-sm">
                {settings?.phone ? (
                  <a href={`tel:${settings.phone}`} className="font-medium text-foreground hover:text-primary">
                    {settings.phone}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Henüz tanımlanmamış.</span>
                )}
              </div>
            </article>

            <article className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">E-posta</p>
              <div className="mt-2 text-sm">
                {settings?.email ? (
                  <a href={`mailto:${settings.email}`} className="font-medium text-foreground hover:text-primary">
                    {settings.email}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Henüz tanımlanmadı.</span>
                )}
              </div>
            </article>

            <article className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 inline-flex rounded-lg bg-green-600/15 p-2 text-green-600">
                <MessageCircle className="h-4 w-4" />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">WhatsApp</p>
              <div className="mt-2 text-sm">
                {settings?.whatsapp ? (
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    {settings.whatsapp}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">Henüz tanımlanmadı.</span>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Sosyal medya</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.length ? (
                  socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      {s.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Henüz tanımlanmadı.</span>
                )}
              </div>
            </article>
          </div>
        </section>
      </main>
    )
  } catch {
    return (
      <main className="min-h-screen bg-slate-50/30">
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <div className="rounded-xl border bg-white p-6">
            <h1 className="text-2xl font-bold text-foreground">İletişim</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              İletişim bilgileri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
        </section>
      </main>
    )
  }
}
