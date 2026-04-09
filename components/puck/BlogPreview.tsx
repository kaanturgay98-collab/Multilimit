import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import type { ComponentConfig } from "@measured/puck"
import { Reveal } from "@/components/ui/reveal"

export type BlogPostItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export type BlogPreviewProps = {
  badge: string;
  titleLight: string;
  titleHighlight: string;
  buttonText: string;
  buttonLink: string;
  items: BlogPostItem[];
};

export const BlogPreviewConfig: ComponentConfig<BlogPreviewProps> = {
  fields: {
    badge: { type: "text" },
    titleLight: { type: "text" },
    titleHighlight: { type: "text" },
    buttonText: { type: "text" },
    buttonLink: { type: "text" },
    items: {
      type: "array",
      getItemSummary: (item) => item.title || "Blog Yazısı",
      arrayFields: {
        slug: { type: "text" },
        title: { type: "text" },
        excerpt: { type: "textarea" },
        category: { type: "text" },
        date: { type: "text" },
        readTime: { type: "text" },
      },
    },
  },
  defaultProps: {
    badge: "Blog",
    titleLight: "Son",
    titleHighlight: "Yazılar",
    buttonText: "Tüm Yazılar",
    buttonLink: "/blog",
    items: [
      { slug: "sabah-rutini-onerileri", title: "Enerjik Bir Sabah İçin 5 Etkili Öneri", excerpt: "Güne daha dinç ve motive başlamak için uygulayabileceğiniz pratik sabah rutini önerileri.", category: "Sabah Rutini", date: "15 Mar 2026", readTime: "5 dk" },
      { slug: "dogal-takviyeler-rehberi", title: "Doğal Takviyeler Hakkında Bilmeniz Gerekenler", excerpt: "Gıda takviyeleri seçerken dikkat edilmesi gereken önemli noktalar ve doğru kullanım önerileri.", category: "Takviye Ürünler", date: "12 Mar 2026", readTime: "7 dk" },
      { slug: "wellness-trendleri-2026", title: "2026 Yılının Öne Çıkan Wellness Trendleri", excerpt: "Bu yıl sağlıklı yaşam ve wellness alanında dikkat çeken gelişmeler ve trendler.", category: "Wellness", date: "8 Mar 2026", readTime: "6 dk" },
    ]
  },
  render: (props) => (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration (Matching HowItWorks style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{props.badge}</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mt-3">
              {props.titleLight} <span className="text-gradient-gold">{props.titleHighlight}</span>
            </h2>
          </div>
          {props.buttonText && props.buttonLink && (
            <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary w-fit">
              <Link href={props.buttonLink || "#"}>
                {props.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </Reveal>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {props.items?.map((post, index) => (
            <Reveal key={post.slug} delayMs={index * 90}>
              <Link
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-navy-light relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  ),
};
