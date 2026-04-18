import { PuckRender } from "@/components/puck/PuckRender"
import db from "@/lib/puck-db"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let pageData = null;

  try {
    const stmt = db.prepare("SELECT * FROM pages WHERE slug = ?");
    const page = stmt.get(slug) as any;
    if (page && page.content) {
      pageData = JSON.parse(page.content);
    }
  } catch (error) {
    console.error(`Failed to fetch Puck page data for slug: ${slug}`, error);
  }

  // Fallback if no data or fetch fails
  if (!pageData || pageData.content?.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50">
        <div className="text-center p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">404</h2>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Page not found</h3>
          <p className="text-slate-500">Aradığınız sayfa henüz oluşturulmamış veya silinmiş olabilir.</p>
        </div>
      </main>
    )
  }

  // Render the Puck data
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PuckRender data={pageData} />
    </main>
  )
}
