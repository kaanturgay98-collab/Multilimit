import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { blogPosts, getBlogPost } from '@/lib/blog-data'
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Yazi Bulunamadi | Multilimit Blog',
    }
  }

  return {
    title: `${post.title} | Multilimit Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

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
              Blog&apos;a Don
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} okuma
              </span>
            </div>

            {/* Featured Image Placeholder */}
            <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-navy-light rounded-2xl border border-border mb-8" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-invert prose-gold max-w-none">
              <div 
                className="text-muted-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/^# (.+)$/gm, '<h1 class="font-serif text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl font-bold text-foreground mt-8 mb-4">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="font-semibold text-xl text-foreground mt-6 mb-3">$1</h3>')
                    .replace(/^\*\*(.+)\*\*$/gm, '<strong class="text-foreground">$1</strong>')
                    .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
                    .replace(/^---$/gm, '<hr class="my-8 border-border" />')
                    .replace(/^\*(.+)\*$/gm, '<em class="text-muted-foreground italic">$1</em>')
                    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed">')
                }}
              />
            </article>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-border">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-muted-foreground text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Paylas:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook'ta paylas"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter'da paylas"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn'de paylas"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
              Ilgili <span className="text-gradient-gold">Yazilar</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
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
            Premium Formulu <span className="text-gradient-gold">Deneyin</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Multilimit Premium Detoks Kompleksi ile gunluk rutininize destek verin.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14">
            <Link href="/siparis">
              Siparis Ver
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
