import { Render } from "@measured/puck"
import "@measured/puck/puck.css"
import { config } from "@/lib/puck.config"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function DynamicPage({ params }: PageProps) {
  let pageData = null;

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${appUrl}/api/pages?slug=${params.slug}`, {
      cache: "no-store", // to ensure dynamic rendering for editor updates
    });

    const json = await res.json();
    if (json.success && json.data && json.data.content) {
      pageData = json.data.content;
    }
  } catch (error) {
    console.error(`Failed to fetch Puck page data for slug: ${params.slug}`, error);
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
    <main className="min-h-screen">
      <Render config={config} data={pageData} />
    </main>
  )
}
