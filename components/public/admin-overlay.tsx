"use client"

import { useEffect, useState } from "react"

type Page = { data: unknown }

function getAdminHtml(data: unknown): string | null {
  if (!data || typeof data !== "object") return null
  const anyData = data as Record<string, unknown>
  const html = anyData.adminHtml
  if (typeof html === "string" && html.trim()) return html
  return null
}

export function AdminOverlay({ slug }: { slug: string }) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const res = await fetch(`/api/pages/${encodeURIComponent(slug)}`, { cache: "no-store" })
      if (!res.ok) return
      const data = (await res.json().catch(() => null)) as { ok: boolean; page?: Page } | null
      if (!data?.ok || !data.page) return
      const h = getAdminHtml(data.page.data)
      if (!cancelled) setHtml(h)
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!html) return null

  return (
    <section className="container mx-auto px-4 lg:px-8 mt-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  )
}

