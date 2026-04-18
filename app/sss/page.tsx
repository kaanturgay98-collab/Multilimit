import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import { AdminOverlay } from '@/components/public/admin-overlay'
import { Metadata } from 'next'
import db from "@/lib/puck-db"

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi hakkında merak edilenler ve sıkça sorulan sorular.',
}

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const slug = "sss";
  let pageData = null;

  try {
    const stmt = db.prepare("SELECT * FROM pages WHERE slug = ?");
    const page = stmt.get(slug) as any;
    if (page && page.content) {
      try {
        pageData = JSON.parse(page.content);
      } catch (e) {
        console.error("Failed to parse page content JSON", e);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch Puck page data for slug: ${slug}`, error);
  }

  // Check if data is valid and has content array
  const hasValidContent = pageData && Array.isArray(pageData.content) && pageData.content.length > 0;

  if (!hasValidContent) {
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
      <PuckRender data={pageData} />
    </main>
  )
}
