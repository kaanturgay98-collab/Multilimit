import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import db from "@/lib/puck-db"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let pageData = null;

  try {
    const stmt = db.prepare("SELECT * FROM pages WHERE slug = ?");
    const page = stmt.get("home") as any;
    if (page && page.content) {
      pageData = JSON.parse(page.content);
    }
  } catch (error) {
    console.error("Failed to fetch Puck page data:", error);
  }

  // Check if data is valid and has content array
  const hasValidContent = pageData && Array.isArray(pageData.content) && pageData.content.length > 0;

  // Fallback if no data or fetch fails
  if (!hasValidContent) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No content yet</h2>
          <p className="text-slate-500">Go to the admin panel (/admin/editor) to add content to the homepage.</p>
        </div>
      </main>
    )
  }

  // Render the Puck data
  return (
    <main className="min-h-screen ">
      <PuckRender data={pageData} />
    </main>
  )
}
