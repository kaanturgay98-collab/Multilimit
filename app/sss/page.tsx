import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import { AdminOverlay } from '@/components/public/admin-overlay'
import { Metadata } from 'next'
import db from "@/lib/puck-db"
import { SchemaOrg } from "@/components/SchemaOrg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi hakkında merak edilenler ve sıkça sorulan sorular.',
}

export const dynamic = "force-dynamic";

const faqEntries = [
  {
    question: "Alkol sonrası baş ağrısı için ne yapılabilir?",
    answer:
      "Dinlenme, su tüketimi ve vücudu yormayan bir süreç önerilir. Multilimit, gece sonrası oluşan yorgunluk hissine karşı vücudun toparlanma sürecini desteklemek amacıyla kullanılabilir.",
  },
  {
    question: "Hangover nasıl daha rahat atlatılır?",
    answer:
      "Bu süreçte dinlenmek ve vücudu desteklemek önemlidir. Multilimit, içeriği sayesinde ertesi gün daha dengeli hissetmeye yardımcı olabilir.",
  },
  {
    question: "İçki sonrası mide hassasiyeti için ne yapılabilir?",
    answer:
      "Hafif beslenme ve dinlenme önerilir. Multilimit, genel toparlanma sürecini destekleyerek bu sürecin daha konforlu geçmesine yardımcı olabilir.",
  },
  {
    question: "Alkol vücuttan ne kadar sürede atılır?",
    answer:
      "Bu süre kişisel faktörlere göre değişir. Vücudun bu süreci doğal şekilde yönetmesi önemlidir. Multilimit, bu süreçte destekleyici bir takviye olarak kullanılabilir.",
  },
  {
    question: "Hangover etkisi ne kadar sürer?",
    answer:
      "Genellikle 6–24 saat sürebilir. Kişiden kişiye değişir. Multilimit, ertesi gün daha toparlanmış hissetmeye yardımcı olabilir.",
  },
] as const

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "tr-TR",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
} as const

function FAQAccordion() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Sikca Sorulan Sorular</h2>
      <Accordion type="single" collapsible className="w-full rounded-xl border bg-white px-4 sm:px-6">
        {faqEntries.map((entry, index) => (
          <AccordionItem key={entry.question} value={`item-${index}`}>
            <AccordionTrigger className="text-base leading-6">
              {entry.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-slate-600 sm:text-base">
              {entry.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

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
        <SchemaOrg schema={faqSchema} id="faq-schema" />
        <AdminOverlay slug={slug} />
        <div className="text-center p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg bg-white">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Düzenleme Gerekli</h2>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Bu sayfa henüz tasarlanmamış.</h3>
          <p className="text-slate-500 mb-6">Lütfen admin panelinden bu sayfayı Puck editörü ile düzenleyin.</p>
          <a href={`/admin/editor?slug=${slug}`} className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all">
            Editöre Git
          </a>
        </div>
        <FAQAccordion />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <SchemaOrg schema={faqSchema} id="faq-schema" />
      <AdminOverlay slug={slug} />
      <PuckRender data={pageData} />
      <FAQAccordion />
    </main>
  )
}
