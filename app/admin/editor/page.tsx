"use client"

import { useEffect, useState, Suspense } from "react"
import { Puck, Render } from "@measured/puck"
import { useSearchParams } from "next/navigation"
import "@measured/puck/puck.css"
import { config } from "@/lib/puck.config"

// Initial empty state for Puck
const initialData = {
  content: [],
  root: {},
}

function Editor() {
  const searchParams = useSearchParams()
  const slug = searchParams.get("slug") || "home"

  const [data, setData] = useState<any>(initialData)
  const [isEditMode, setIsEditMode] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // 1. On page load: Fetch data using dynamic slug
  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true)
        const res = await fetch(`/api/pages?slug=${slug}`)
        const json = await res.json()
        if (json.success && json.data) {
          setData(json.data.content)
        } else {
          // Reset to default if no data exists for this slug
          setData(initialData)
        }
      } catch (error) {
        console.error("Failed to load page data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPage()
  }, [slug])

  // 2. Save function: POST using current slug
  const handleSave = async (puckData: any) => {
    setSaving(true)
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug,
          content: puckData,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setData(puckData)
        console.log("Page saved successfully")
      } else {
        console.error("Save failed:", json.error)
      }
    } catch (error) {
      console.error("Error saving page:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium tracking-wide">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Top Bar for Mode Toggle & Save */}
      <div className="h-16 px-6  border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-slate-800">Puck Sayfa Editörü</h1>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">
            Editing: {slug}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">
            {isEditMode ? "Düzenleme Modu" : "Önizleme Modu"}
          </span>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
          >
            {isEditMode ? "Önizlemeyi Göster" : "Editöre Geri Dön"}
          </button>
          <button
            onClick={() => handleSave(data)}
            disabled={saving}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {/* Editor or Preview Area */}
      <div className="flex-1 flex flex-col">
        {isEditMode ? (
          <div className="flex-1 h-[calc(100vh-64px)] overflow-hidden">
            <Puck
              config={config}
              data={data}
              iframe={{ enabled: false }}
              onPublish={(newData) => {
                handleSave(newData)
              }}
              onChange={(newData) => {
                setData(newData)
              }}
            />
          </div>
        ) : (
          <div className="flex-1 p-0 overflow-auto">
            <div className="w-full min-h-screen relative">
              {data.content.length === 0 ? (
                <div className="h-full min-h-[400px] flex items-center justify-center text-slate-400">
                  Şu an gösterilecek içerik yok. Editör moduna geçip ekleyin.
                </div>
              ) : (
                <Render config={config} data={data} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Editor />
    </Suspense>
  )
}
