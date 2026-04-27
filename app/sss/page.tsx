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
    question: "Multilimit nedir ve ne için kullanılır?",
    answer:
      "Multilimit, gece tüketimi sonrası oluşabilecek yorgunluk ve halsizlik hissine karşı vücudun toparlanma sürecini desteklemeye yardımcı olan takviye edici gıdadır.",
  },
  {
    question: "Multilimit ne zaman kullanılmalıdır?",
    answer:
      "Ürün, gece tüketimi sonrası oluşabilecek etkiler için destek amacıyla tercih edilir. Kullanıma dair en doğru bilgi için ambalaj üzerindeki yönlendirmeler takip edilmelidir.",
  },
  {
    question: "Multilimit'in içeriğinde hangi bileşenler bulunur?",
    answer:
      "Multilimit formülünde zeolit ve L-sistein gibi bileşenler yer alır. Bu içerik, vücut dengesinin korunmasına ve toparlanma sürecinin desteklenmesine yardımcı olur.",
  },
  {
    question: "Multilimit ilaç mıdır?",
    answer:
      "Hayır. Multilimit bir ilaç değil, takviye edici gıdadır. Hastalıkları teşhis etme, tedavi etme veya önleme amacıyla kullanılmaz.",
  },
  {
    question: "Multilimit kimler için uygundur?",
    answer:
      "Ürün yetişkin kullanıcılar için geliştirilmiştir. Özel durumlar (hamilelik, emzirme, kronik rahatsızlık veya düzenli ilaç kullanımı) varsa sağlık uzmanına danışılması önerilir.",
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

function mergeFaqEntriesIntoPuckData(data: any, extraEntries: ReadonlyArray<{ question: string; answer: string }>) {
  if (!data || !Array.isArray(data.content)) {
    return { data, hasFaqComponent: false }
  }

  let hasFaqComponent = false

  const mergedContent = data.content.map((block: any) => {
    if (block?.type !== "FAQ") {
      return block
    }

    hasFaqComponent = true
    const currentItems = Array.isArray(block?.props?.items) ? block.props.items : []
    const existingQuestions = new Set(
      currentItems
        .map((item: any) => (typeof item?.question === "string" ? item.question.trim().toLocaleLowerCase("tr-TR") : ""))
        .filter(Boolean)
    )

    const nonDuplicateExtras = extraEntries.filter(
      (entry) => !existingQuestions.has(entry.question.trim().toLocaleLowerCase("tr-TR"))
    )

    return {
      ...block,
      props: {
        ...block.props,
        items: [...currentItems, ...nonDuplicateExtras],
      },
    }
  })

  return {
    data: {
      ...data,
      content: mergedContent,
    },
    hasFaqComponent,
  }
}

function FAQAccordion() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Sıkça Sorulan Sorular</h2>
      <Accordion type="single" collapsible className="w-full rounded-xl border border-slate-200 bg-white px-4 sm:px-6">
        {faqEntries.map((entry, index) => (
          <AccordionItem key={entry.question} value={`item-${index}`} className="border-slate-200">
            <AccordionTrigger className="text-base leading-6 text-slate-900 hover:text-slate-900">
              {entry.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-slate-700 sm:text-base">
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
  const { data: pageDataWithMergedFaq, hasFaqComponent } = mergeFaqEntriesIntoPuckData(pageData, faqEntries)

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
      <PuckRender data={pageDataWithMergedFaq} />
      {!hasFaqComponent && <FAQAccordion />}
    </main>
  )
}
