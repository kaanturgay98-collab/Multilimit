"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { adminFetchJson } from "@/lib/admin/admin-fetch"
import { ArrowLeft, Save, Trash2, Tag, Upload } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  authorName: string
  status: "draft" | "published"
  isFeatured: boolean
  isActive: boolean
}

export default function AdminBlogPostEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === "new"

  const [row, setRow] = useState<BlogPost | null>(
    isNew
      ? {
        id: "new",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: null,
        tags: [],
        authorName: "Multilimit",
        status: "draft",
        isFeatured: false,
        isActive: true,
      }
      : null
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew) return
    let cancelled = false
      ; (async () => {
        try {
          const data = await adminFetchJson<{ ok: boolean; row?: BlogPost }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`)
          if (!cancelled && data?.ok && data.row) setRow(data.row)
        } catch (err) {
          console.error("Fetch error:", err)
        }
      })()
    return () => {
      cancelled = true
    }
  }, [id, isNew])

  const slugify = (text: string) => {
    const trMap: Record<string, string> = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };
    let str = text;
    for (const key in trMap) {
      str = str.replace(new RegExp(key, 'g'), trMap[key]);
    }
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  const handleTitleChange = (val: string) => {
    if (!row) return
    setRow({
      ...row,
      title: val,
      slug: slugify(val)
    })
  }

  const canSave = useMemo(() => {
    if (!row) return false
    return row.title.trim().length >= 3 && row.slug.trim().length >= 3
  }, [row])

  async function save() {
    if (!row || !canSave) return
    setSaving(true)
    try {
      const payload = { ...row }
      if (isNew) {
        const created = await adminFetchJson<{ ok: boolean; row?: { id: string }; error?: string }>("/api/admin/blog-posts", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (created?.ok && created.row?.id) {
          router.replace(`/admin/blog-posts/${created.row.id}`)
        } else {
          alert("Hata: " + (created?.error || "Kayıt sırasında bir problem oluştu."))
        }
      } else {
        const updated = await adminFetchJson<{ ok: boolean; error?: string }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!updated?.ok) {
          alert("Hata: " + (updated?.error || "Güncelleme sırasında bir problem oluştu."))
        }
      }
      router.refresh()
    } catch (err: any) {
      alert("Sistem Hatası: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (isNew) return
    if (!confirm("Bu blog yazısını silmek istediğine emin misin?")) return
    try {
      await adminFetchJson<{ ok: boolean }>(`/api/admin/blog-posts/${encodeURIComponent(id)}`, { method: "DELETE" })
      router.replace("/admin/blog-posts")
      router.refresh()
    } catch (err: any) {
      alert("Silme hatası: " + err.message)
    }
  }

  if (!row) return <div className="flex items-center justify-center min-h-[400px] text-muted-foreground animate-pulse">Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gold selection:text-navy">
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
          <div className="space-y-1">
            <Link href="/admin/blog-posts" className="inline-flex items-center text-sm text-gray-500 hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Geri Dön
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-black">{isNew ? "Yeni Blog Yazısı" : "Yazıyı Düzenle"}</h1>
          </div>
          <div className="flex items-center gap-3">
            {!isNew && (
              <Button
                variant="ghost"
                onClick={() => void remove()}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Sil
              </Button>
            )}
            <Button
              onClick={() => void save()}
              disabled={!canSave || saving}
              className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 h-11"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold text-gold">İçerik Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Başlık</label>
                  <Input
                    value={row.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Blog başlığını buraya girin..."
                    className="text-2xl font-bold h-14 border-gray-200 focus:border-gold focus:ring-gold/20 text-black"
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">İçerik (Markdown)</label>
                      <span className="text-[10px] text-gray-400 font-mono">MD DESTEKLENİR</span>
                    </div>
                    <Textarea 
                      value={row.content} 
                      onChange={(e) => setRow({ ...row, content: e.target.value })} 
                      placeholder="Blog içeriğini markdown olarak buraya yazın..." 
                      className="min-h-[600px] text-base leading-relaxed border-gray-200 focus:border-gold focus:ring-gold/20 resize-none p-4 font-mono text-black" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700">Önizleme</label>
                    <div className="min-h-[600px] p-10 border border-gray-100 rounded-md bg-navy-dark overflow-auto max-h-[800px]">
                      <article className="prose prose-sm prose-invert prose-gold max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gold
                        prose-h1:text-4xl prose-h1:mb-6
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-gold/10
                        prose-h3:text-xl prose-h2:mt-6
                        prose-p:text-white prose-p:leading-relaxed prose-p:mb-4">
                        <div className="space-y-4">
                          {row.content ? (
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                               {row.content}
                             </ReactMarkdown>
                          ) : (
                            <p className="text-gray-400 italic">Henüz içerik yazılmadı...</p>
                          )}
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-transparent pt-4 border-t border-gray-100">
              <CardHeader className="px-0">
                <CardTitle className="text-xl font-bold text-gold">SEO Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kısa Özet (Excerpt)</label>
                  <Textarea
                    value={row.excerpt}
                    onChange={(e) => setRow({ ...row, excerpt: e.target.value })}
                    placeholder="Arama sonuçlarında görünecek kısa açıklama..."
                    className="text-black min-h-32 border-gray-200 focus:border-gold focus:ring-gold/20 p-4"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:border-l lg:border-gray-100 lg:pl-10">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold text-gold">Kapak Görseli</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div 
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 hover:border-gold transition-all cursor-pointer flex items-center justify-center flex-col gap-2"
                  onClick={() => document.getElementById('cover-upload')?.click()}
                >
                  {row.coverImage ? (
                    <>
                      <img 
                        src={row.coverImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Değiştirmek için tıkla</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Görsel Yükle</p>
                      <p className="text-xs text-gray-400 mt-1">Sürükle bırak veya tıkla</p>
                    </div>
                  )}
                  <input 
                    id="cover-upload"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      
                      const formData = new FormData()
                      formData.append("file", file)
                      formData.append("collection", "blog")

                      try {
                        const res = await fetch("/api/admin/media", {
                          method: "POST",
                          body: formData
                        })
                        const data = await res.json()
                        if (data.ok && data.asset?.url) {
                          setRow({ ...row, coverImage: data.asset.url })
                        } else {
                          alert(`Yükleme hatası: ${data.error || "Bilinmeyen hata"}`)
                        }
                      } catch (err: any) {
                        alert(`Bağlantı hatası: ${err.message || "Sunucuya erişilemedi"}`)
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Veya Görsel URL</label>
                  <Input 
                    value={row.coverImage || ""} 
                    onChange={(e) => setRow({ ...row, coverImage: e.target.value })} 
                    placeholder="https://..." 
                    className="border-gray-200 focus:border-gold focus:ring-gold/20 text-black h-10"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-transparent pt-4 border-t border-gray-100">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold text-gold">Yayınlama</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">URL (SLUG)</label>
                  <div className="flex items-center gap-1 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                    <span className="text-gray-400">/blog/</span>
                    <input
                      className="bg-transparent border-none focus:ring-0 p-0 w-full outline-none text-black font-medium"
                      value={row.slug}
                      onChange={(e) => setRow({ ...row, slug: slugify(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-black">Durum</span>
                  <select
                    value={row.status}
                    onChange={(e) => setRow({ ...row, status: e.target.value as any })}
                    className="text-sm font-semibold px-3 py-1.5 bg-white border text-black rounded-md outline-none cursor-pointer hover:border-gold transition-colors"
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayında</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">Öne Çıkar</span>
                  <button
                    onClick={() => setRow({ ...row, isFeatured: !row.isFeatured })}
                    className={cn(
                      "w-11 h-6 rounded-full relative transition-all duration-200",
                      row.isFeatured ? "bg-gold" : "bg-gray-200"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 shadow-sm",
                      row.isFeatured ? "translate-x-6" : "translate-x-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">Aktif</span>
                  <button
                    onClick={() => setRow({ ...row, isActive: !row.isActive })}
                    className={cn(
                      "w-11 h-6 rounded-full relative transition-all duration-200",
                      row.isActive ? "bg-black" : "bg-gray-200"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 shadow-sm",
                      row.isActive ? "translate-x-6" : "translate-x-1"
                    )} />
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-transparent pt-4 border-t border-gray-100">
              <CardHeader className="px-0">
                <CardTitle className="text-xl font-bold text-gold">Yazar ve Etiketler</CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Yazar</label>
                  <Input
                    value={row.authorName}
                    onChange={(e) => setRow({ ...row, authorName: e.target.value })}
                    className="border-gray-200 focus:border-gold focus:ring-gold/20 text-black"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-gray-700">Etiketler</label>
                  <div className="relative">
                    <Tag className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      className="pl-10 border-gray-200 focus:border-gold focus:ring-gold/20 text-sm text-black"
                      placeholder="virgül ile ayırın..."
                      value={Array.isArray(row.tags) ? row.tags.join(", ") : ""}
                      onChange={(e) => setRow({ ...row, tags: e.target.value.split(",").map(t => t.trim()) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
