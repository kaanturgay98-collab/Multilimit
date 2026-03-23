import { PuckRender } from "@/components/puck/PuckRender"
import "@measured/puck/puck.css"
import { AdminOverlay } from '@/components/public/admin-overlay'
import { Metadata } from 'next'
import { listActiveProducts, listProductMedia } from "@/lib/products-db"
import { Button } from "@/components/ui/button"
import { ProductImageSlider } from "@/components/public/product-image-slider"
import db from "@/lib/puck-db"

export const metadata: Metadata = {
  title: 'Ürünlerimiz | Multilimit Premium Detoks Kompleksi',
  description: 'Multilimit Premium Detoks Kompleksi özelliklerini ve paket seçeneklerini inceleyin.',
}

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const slug = "urun";
  let pageData = null;
  let products: any[] = [];

  try {
    const rawProducts = listActiveProducts()
    
    // Plain object transformation to avoid Date/Class objects in props
    products = rawProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      price: p.price,
      salePrice: p.salePrice,
      badge: p.badge,
      trendyolLink: p.trendyolLink,
      media: listProductMedia(p.id).map((m) => ({
        id: m.id,
        url: m.url,
        alt: m.alt,
      })),
    }));
  } catch (error) {
    console.error("Failed to fetch products from db", error);
  }

  try {
    const stmt = db.prepare("SELECT * FROM pages WHERE slug = ?");
    const page = stmt.get(slug) as any;
    if (page && page.content) {
      pageData = JSON.parse(page.content);
    }
  } catch (error) {
    console.error(`Failed to fetch Puck page data for slug: ${slug}`, error);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminOverlay slug={slug} />

      {/* Render Products */}
      {products.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Ürünlerimiz</h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative p-6 flex flex-col">
                  {product.badge && (
                    <span className="absolute top-4 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wider z-10">
                      {product.badge === "bestseller" ? "Çok Satan" : product.badge === "premium" ? "Premium" : "Yeni"}
                    </span>
                  )}
                  
                  {/* Product Image Display */}
                  <div className="aspect-square bg-gradient-to-br from-navy-light to-background rounded-xl mb-6 flex items-center justify-center border border-border/50 overflow-hidden relative group">
                    {product.media && product.media.length > 0 ? (
                      <ProductImageSlider images={product.media} title={product.name} />
                    ) : (
                      <span className="font-serif text-2xl font-bold text-gradient-gold opacity-50">{product.name}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-6">{product.shortDescription}</p>
                  
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      {product.salePrice ? (
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-primary">{product.salePrice} TL</span>
                          <span className="text-sm line-through text-muted-foreground">{product.price} TL</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-primary">{product.price} TL</span>
                      )}
                    </div>
                  </div>
                  
                  {product.trendyolLink ? (
                    <Button asChild className="w-full bg-[#f27a1a] hover:bg-[#d66512] text-white">
                      <a href={product.trendyolLink} target="_blank" rel="noopener noreferrer">
                        Trendyol'dan Satın Al
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full opacity-50">
                      Yakında Satışta
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Render Puck Editor Content */}
      {pageData && pageData.content && pageData.content.length > 0 ? (
        <PuckRender data={pageData} />
      ) : (
        <div className="text-center p-12 m-8 rounded-2xl border border-slate-100 max-w-lg mx-auto bg-white/5">
          <h2 className="text-4xl font-bold text-muted-foreground mb-4">Düzenleme Gerekli</h2>
          <h3 className="text-xl font-semibold text-muted-foreground mb-4">Buranın alt kısmı henüz Puck editörü ile tasarlanmamış.</h3>
          <a href={`/admin/editor?slug=${slug}`} className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all">
            Editöre Git
          </a>
        </div>
      )}
    </main>
  )
}
