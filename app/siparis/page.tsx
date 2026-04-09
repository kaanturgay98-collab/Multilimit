import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const TRENDYOL_URL = "https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513"

export default function SiparisPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Siparisler Trendyol Uzerinden</h1>
          <p className="text-muted-foreground mb-8">
            Sitemizden sepet, odeme ve siparis islemi alinmamaktadir. Satin alimi yalnizca resmi Trendyol magazamiz
            uzerinden yapabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-[#f27a1a] hover:bg-[#d66512] text-white">
              <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer">
                Trendyol'a Git
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/urun">Urun Sayfasi</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

