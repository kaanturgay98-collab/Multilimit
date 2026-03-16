"use client"

import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blogPosts, categories } from '@/lib/blog-data'
import { AdminOverlay } from '@/components/public/admin-overlay'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || 
      post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <AdminOverlay slug="blog" />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-navy-light" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-primary mb-6">
              Blog
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Saglikli Yasam <span className="text-gradient-gold">Rehberi</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Saglikli yasam, wellness ve gunluk rutinler hakkinda faydali icerikler.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 lg:py-12 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Yazi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
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
                      <h2 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Aramanizla eslesen yazi bulunamadi.</p>
              <Button variant="outline" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Yeni Iceriklerden <span className="text-gradient-gold">Haberdar Olun</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              E-posta bultenimize kayit olarak en son yazilarimizdan haberdar olabilirsiniz.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-card border-border"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                Abone Ol
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
