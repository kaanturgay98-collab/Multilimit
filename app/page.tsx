import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import db from "@/lib/puck-db"
import { SchemaOrg } from "@/components/SchemaOrg"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Multilimit",
    description:
      "Multilimit, gece tüketim sonrası oluşabilecek yorgunluk ve halsizlik hissine karşı vücudun toparlanma sürecini desteklemeye yardımcı olan takviye edici gıdadır. İçeriğindeki zeolit ve L-sistein ile vücut dengesinin korunmasına katkı sağlar.",
    brand: {
      "@type": "Brand",
      name: "Multilimit",
    },
    image: "https://mltlimit.com/paket-multilimit.webp",
    offers: {
      "@type": "Offer",
      price: "656.25",
      priceCurrency: "TRY",
      url: "https://www.trendyol.com/multilimit/alkol-sonrasi-aksamdan-kalma-hangover-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "3",
    },
    inLanguage: "tr-TR",
  } as const

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
        <SchemaOrg schema={productSchema} id="product-schema" />
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
      <SchemaOrg schema={productSchema} id="product-schema" />
      <PuckRender data={pageData} />
    </main>
  )
}
