import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getBlogPostBySlugPublished, listLatestPublishedPosts } from '@/lib/blog-db'
import { Calendar, ArrowLeft, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function getPostFromDb(slug: string) {
  return getBlogPostBySlugPublished(slug)
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostFromDb(slug)
  
  if (!post) {
    return {
      title: 'Yazı Bulunamadı | Multilimit Blog',
    }
  }

  return {
    title: `${post.title} | Multilimit Blog`,
    description: post.excerpt,
    keywords: (post.tags && post.tags.length > 0) ? post.tags.join(', ') : '',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostFromDb(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = listLatestPublishedPosts(4, post.id)
  const filteredRelated = relatedPosts.slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog'a Dön
            </Link>

            {/* Title */}
            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.authorName || 'Multilimit'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : new Date(post.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-navy-light rounded-2xl border border-border mb-8 overflow-hidden">
              {post.coverImage ? (
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="absolute inset-0 bg-primary/5 opacity-50" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-invert prose-gold max-w-none 
              prose-headings:font-serif prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gold
              prose-h1:text-5xl prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/20
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-white prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-li:text-white prose-li:mb-2 prose-strong:text-gold
              prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-10
              prose-a:text-gold prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
              <div className="space-y-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-border">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Share */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-muted-foreground text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Paylaş:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
              İlgili <span className="text-gradient-gold">Yazılar</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {filteredRelated.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                    <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-navy-light relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Premium Formülü <span className="text-gradient-gold">Deneyin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Multilimit Premium Detoks Kompleksi ile günlük rutininize destek verin.
          </p>
          <Button asChild size="lg" className="bg-[#f27a1a] hover:bg-[#d66512] text-white font-semibold px-8 h-14">
            <a href="https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513" target="_blank" rel="noopener noreferrer">
              Trendyol'dan Siparis Ver
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
