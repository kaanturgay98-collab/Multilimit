import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import db from "@/lib/puck-db"
import { SchemaOrg } from "@/components/SchemaOrg"
import { listLatestPublishedPosts } from "@/lib/blog-db"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteUrl = "https://multilimit.com"
  const latestBlogPosts = listLatestPublishedPosts(24)
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
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "tr-TR",
    mainEntity: [
      {
        "@type": "Question",
        name: "Alkol sonrası baş ağrısına ne iyi gelir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alkol sonrası baş ağrısında su tüketimi, dinlenme ve dengeli beslenme önemlidir; Multilimit ise toparlanma sürecini desteklemek için tercih edilen takviye seçeneklerinden biridir.",
        },
      },
      {
        "@type": "Question",
        name: "Alkol sonrası baş ağrısı için ne yapılmalı?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alkol sonrası baş ağrısı için öncelikle sıvı desteği ve istirahat önerilir; Multilimit, gece sonrası yorgunluk ve halsizlik hissine karşı günlük rutinde destek amacıyla kullanılabilir.",
        },
      },
      {
        "@type": "Question",
        name: "Aksamdan kalma baş ağrısına ne iyi gelir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aksamdan kalma baş ağrısında yeterli su içmek ve vücudu dinlendirmek faydalıdır; Multilimit, toparlanma döneminde destekleyici bir takviye olarak öne çıkar.",
        },
      },
      {
        "@type": "Question",
        name: "Hangover nedir ve hangover etkisi nasil azaltilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hangover, gece sonrasi olusan yorgunluk, halsizlik ve bas agrisi gibi belirtileri tanimlar; su tuketimi, dinlenme ve Multilimit kullanimi toparlanma surecine destek olabilir.",
        },
      },
      {
        "@type": "Question",
        name: "Hangover sabahinda toparlanmak icin ne onerilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hangover sabahinda su ve elektrolit destegi, hafif beslenme ve istirahat onceliklidir; Multilimit de bu surecte vucudun dengeyi yeniden kurmasina destek amaciyla kullanilabilir.",
        },
      },
      {
        "@type": "Question",
        name: "Hangover belirtilerinde Multilimit ne ise yarar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hangover belirtilerinde Multilimit, icerigindeki bilesenlerle gece sonrasi yorgunluk ve halsizlik hissine karsi toparlanma surecini desteklemeyi hedefleyen bir gida takviyesidir.",
        },
      },
    ],
  }
  const blogPagesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Multilimit Blog",
    url: `${siteUrl}/blog`,
    inLanguage: "tr-TR",
    isPartOf: {
      "@type": "WebSite",
      name: "Multilimit",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: latestBlogPosts.length,
      itemListElement: latestBlogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

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
        <SchemaOrg schema={faqSchema} id="faq-schema" />
        <SchemaOrg schema={blogPagesSchema} id="blog-pages-schema" />
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
      <SchemaOrg schema={faqSchema} id="faq-schema" />
      <SchemaOrg schema={blogPagesSchema} id="blog-pages-schema" />
      <PuckRender data={pageData} />
    </main>
  )
}
