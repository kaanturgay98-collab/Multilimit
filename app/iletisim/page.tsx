import { Render } from "@measured/puck"
import "@measured/puck/puck.css"
import { config } from "@/lib/puck.config"
import { AdminOverlay } from '@/components/public/admin-overlay'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi ile iletişime geçin.',
}

export default async function ContactPage() {
  const slug = "iletisim";
  let pageData = null;

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${appUrl}/api/pages?slug=${slug}`, {
      cache: "no-store",
    });

    const json = await res.json();
    if (json.success && json.data && json.data.content) {
      pageData = json.data.content;
    }
  } catch (error) {
    console.error(`Failed to fetch Puck page data for slug: ${slug}`, error);
  }

  if (!pageData || !pageData.content || pageData.content.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50">
        <AdminOverlay slug={slug} />
        <div className="text-center p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg bg-white">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Düzenleme Gerekli</h2>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Bu sayfa henüz tasarlanmamış.</h3>
          <p className="text-slate-500 mb-6">Lütfen admin panelinden bu sayfayı Puck editörü ile düzenleyin.</p>
          <a href={`/admin/editor?slug=${slug}`} className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all">
            Editöre Git
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <AdminOverlay slug={slug} />
      <Render config={config} data={pageData} />
    </main>
  )
}
