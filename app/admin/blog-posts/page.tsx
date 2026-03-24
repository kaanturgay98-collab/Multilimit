"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { adminFetchJson } from "@/lib/admin/admin-fetch"
import { Plus, Search, Edit, Trash2, Calendar, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type BlogPostRow = {
  id: string
  title: string
  slug: string
  status: "draft" | "published"
  isFeatured: boolean
  updatedAt: string
}

export default function AdminBlogPostsPage() {
  const [query, setQuery] = useState("")
  const [rows, setRows] = useState<BlogPostRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; rows?: BlogPostRow[] }>("/api/admin/blog-posts")
      if (data?.ok) setRows(data.rows || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filtered = rows.filter((p) => {
    const q = query.toLowerCase()
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
  })

  const removePost = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğine emin misin?")) return
    try {
      await adminFetchJson(`/api/admin/blog-posts/${encodeURIComponent(id)}`, { method: "DELETE" })
      fetchData()
    } catch (err) {
      alert("Silme hatası oluştu.")
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Blog Yazıları"
        description="İçeriklerinizi, SEO ayarlarını ve yayın durumlarını buradan yönetebilirsiniz."
        actions={
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-6 shadow-lg shadow-primary/20">
            <Link href="/admin/blog-posts/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Yazı Oluştur
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Başlık veya URL ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus:ring-2 ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
          <FileText className="w-4 h-4" />
          Toplam {rows.length} yazı
        </div>
      </div>

      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase tracking-widest">Durum</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase tracking-widest">Başlık</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase tracking-widest">Güncelleme</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-600 uppercase tracking-widest text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-6 h-16" />
                    </tr>
                  ))
                ) : filtered.length > 0 ? (
                  filtered.map((post) => (
                    <tr key={post.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                      <td className="px-6 py-4">
                        {post.status === "published" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-200/50 shadow-none gap-1 py-1 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" />
                            YAYINDA
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none shadow-none gap-1 py-1 font-bold text-[10px]">
                            <AlertCircle className="w-3 h-3" />
                            TASLAK
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col max-w-md">
                          <span className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate text-sm">
                            {post.title}
                          </span>
                          <span className="text-[11px] text-slate-500 font-bold font-mono truncate mt-0.5">
                            multilimit.com/blog/{post.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString("tr-TR") : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
                            <Link href={`/admin/blog-posts/${post.id}`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8"
                            onClick={() => removePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">
                      {query ? "Aramanızla eşleşen yazı bulunamadı." : "Henüz blog yazısı eklenmemiş."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

