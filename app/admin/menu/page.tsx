"use client"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AdminTable } from "@/components/admin/admin-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useEffect, useMemo, useState } from "react"
import { adminFetchJson } from "@/lib/admin/admin-fetch"

export default function AdminMenuPage() {
  const [rows, setRows] = useState<
    {
      id: string
      label: string
      href: string | null
      external: boolean
      location: "header" | "footer"
      group: "quick" | "product" | "legal" | null
      sortOrder: number
      isActive: boolean
    }[]
  >([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    label: "",
    href: "",
    external: false,
    location: "header" as "header" | "footer",
    group: "quick" as "quick" | "product" | "legal",
    isActive: true,
  })

  const byLocation = useMemo(() => {
    const header = rows.filter((r) => r.location === "header").sort((a, b) => a.sortOrder - b.sortOrder)
    const footer = rows.filter((r) => r.location === "footer").sort((a, b) => a.sortOrder - b.sortOrder)
    return { header, footer }
  }, [rows])

  async function refresh() {
    setLoading(true)
    try {
      const data = await adminFetchJson<{ ok: boolean; rows?: any[]; error?: string }>("/api/admin/menu-items")
      if (data?.ok) setRows((data.rows ?? []) as any)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  async function create() {
    const maxSort =
      (rows
        .filter((r) => r.location === form.location && (form.location === "header" ? true : r.group === form.group))
        .reduce((m, r) => Math.max(m, r.sortOrder ?? 0), 0) ?? 0) + 10

    await fetch("/api/admin/menu-items", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        label: form.label.trim(),
        href: form.href.trim() ? form.href.trim() : null,
        external: form.external,
        location: form.location,
        group: form.location === "footer" ? form.group : null,
        isActive: form.isActive,
        sortOrder: maxSort,
      }),
    })
    setForm({ label: "", href: "", external: false, location: form.location, group: form.group, isActive: true })
    await refresh()
  }

  async function remove(id: string) {
    await fetch(`/api/admin/menu-items/${encodeURIComponent(id)}`, { method: "DELETE" })
    await refresh()
  }

  async function update(id: string, patch: any) {
    await fetch(`/api/admin/menu-items/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    })
    await refresh()
  }

  async function move(id: string, dir: -1 | 1) {
    const row = rows.find((r) => r.id === id)
    if (!row) return
    const group = rows
      .filter((r) => r.location === row.location && (row.location === "header" ? true : r.group === row.group))
      .sort((a, b) => a.sortOrder - b.sortOrder)
    const idx = group.findIndex((r) => r.id === id)
    const other = group[idx + dir]
    if (!other) return
    await Promise.all([
      update(row.id, { sortOrder: other.sortOrder }),
      update(other.id, { sortOrder: row.sortOrder }),
    ])
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Menu Yonetimi" description="Header ve footer menu linklerini sirala, aktif/pasif yap." />

      <Card className="border-border/70 bg-card/80 p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-6">
          <div className="space-y-1 md:col-span-2">
            <div className="text-xs text-muted-foreground">Etiket</div>
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="bg-background/60 border-border/60" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <div className="text-xs text-muted-foreground">Link (href)</div>
            <Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className="bg-background/60 border-border/60" placeholder="/urun veya https://..." />
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Konum</div>
            <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v as any })}>
              <SelectTrigger className="bg-background/60 border-border/60">
                <SelectValue placeholder="Sec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Footer Grubu</div>
            <Select
              value={form.group}
              onValueChange={(v) => setForm({ ...form, group: v as any })}
              disabled={form.location !== "footer"}
            >
              <SelectTrigger className="bg-background/60 border-border/60">
                <SelectValue placeholder="Sec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Hizli Erisim</SelectItem>
                <SelectItem value="product">Urun</SelectItem>
                <SelectItem value="legal">Yasal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={form.external} onCheckedChange={(v) => setForm({ ...form, external: v })} />
            <div className="text-sm text-muted-foreground">Dis link</div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            <div className="text-sm text-muted-foreground">Aktif</div>
          </div>
          <div className="flex-1" />
          <Button
            className="bg-primary text-primary-foreground"
            disabled={!form.label.trim()}
            onClick={() => void create()}
          >
            Link Ekle
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {(["header", "footer"] as const).map((loc) => {
          const list = loc === "header" ? byLocation.header : byLocation.footer
          return (
            <Card key={loc} className="border-border/70 bg-card/80 p-4 space-y-3">
              <div className="text-sm font-medium">{loc === "header" ? "Header" : "Footer"} Linkleri</div>
              {loading ? (
                <div className="text-sm text-muted-foreground">Yukleniyor...</div>
              ) : (
                <AdminTable
                  columns={[
                    { key: "label", header: "Etiket" },
                    { key: "href", header: "Href" },
                    ...(loc === "footer" ? [{ key: "group", header: "Grup" } as const] : []),
                    { key: "isActive", header: "Aktif" },
                    { key: "actions", header: "" },
                  ]}
                  rows={list.map((r) => ({
                    id: r.id,
                    label: (
                      <Input
                        defaultValue={r.label}
                        className="bg-background/60 border-border/60 h-9"
                        onBlur={(e) => {
                          const v = e.currentTarget.value.trim()
                          if (v && v !== r.label) void update(r.id, { label: v })
                        }}
                      />
                    ),
                    href: (
                      <Input
                        defaultValue={r.href ?? ""}
                        className="bg-background/60 border-border/60 h-9"
                        onBlur={(e) => {
                          const v = e.currentTarget.value.trim()
                          const next = v ? v : null
                          if (next !== r.href) void update(r.id, { href: next })
                        }}
                      />
                    ),
                    ...(loc === "footer"
                      ? {
                          group: (
                            <Select
                              value={(r.group ?? "quick") as any}
                              onValueChange={(v) => void update(r.id, { group: v })}
                            >
                              <SelectTrigger className="bg-background/60 border-border/60 h-9">
                                <SelectValue placeholder="Sec" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="quick">Hizli</SelectItem>
                                <SelectItem value="product">Urun</SelectItem>
                                <SelectItem value="legal">Yasal</SelectItem>
                              </SelectContent>
                            </Select>
                          ),
                        }
                      : {}),
                    isActive: (
                      <div className="flex items-center gap-2">
                        <Switch checked={r.isActive} onCheckedChange={(v) => void update(r.id, { isActive: v })} />
                        <span className="text-xs text-muted-foreground">{r.isActive ? "Acik" : "Kapali"}</span>
                      </div>
                    ),
                    actions: (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => void move(r.id, -1)}>
                          ↑
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => void move(r.id, 1)}>
                          ↓
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => void remove(r.id)}>
                          Sil
                        </Button>
                      </div>
                    ),
                  }))}
                  emptyText="Link yok."
                />
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

