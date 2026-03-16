"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Package, MapPin, CreditCard, Bell, LogOut, ChevronRight, Edit2 } from "lucide-react"
import Link from "next/link"

type Tab = "profile" | "orders" | "addresses" | "payment" | "notifications"

const mockOrders = [
  {
    id: "ML-12345678",
    date: "15 Mart 2024",
    status: "Teslim Edildi",
    total: 599,
    items: [{ name: "Premium Detoks Kompleksi", quantity: 1 }],
  },
  {
    id: "ML-12345679",
    date: "1 Subat 2024",
    status: "Teslim Edildi",
    total: 1098,
    items: [{ name: "Premium Detoks Kompleksi", quantity: 2 }],
  },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [isEditing, setIsEditing] = useState(false)

  const tabs = [
    { id: "profile" as Tab, label: "Profil", icon: User },
    { id: "orders" as Tab, label: "Siparislerim", icon: Package },
    { id: "addresses" as Tab, label: "Adreslerim", icon: MapPin },
    { id: "payment" as Tab, label: "Odeme Yontemleri", icon: CreditCard },
    { id: "notifications" as Tab, label: "Bildirimler", icon: Bell },
  ]

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Hesabim</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
                <hr className="border-border my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Cikis Yap</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Profil Bilgileri</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditing ? "Iptal" : "Duzenle"}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ad</Label>
                    <Input
                      defaultValue="Ahmet"
                      disabled={!isEditing}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Soyad</Label>
                    <Input
                      defaultValue="Yilmaz"
                      disabled={!isEditing}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-posta</Label>
                    <Input
                      type="email"
                      defaultValue="ahmet@email.com"
                      disabled={!isEditing}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefon</Label>
                    <Input
                      defaultValue="0532 123 45 67"
                      disabled={!isEditing}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 mt-6 pt-6 border-t border-border">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Degisiklikleri Kaydet
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Iptal
                    </Button>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Sifre Degistir</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Mevcut Sifre</Label>
                      <Input type="password" className="bg-background border-border" />
                    </div>
                    <div />
                    <div className="space-y-2">
                      <Label>Yeni Sifre</Label>
                      <Input type="password" className="bg-background border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Yeni Sifre Tekrar</Label>
                      <Input type="password" className="bg-background border-border" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sifreyi Guncelle
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Siparislerim</h2>
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Siparis No</p>
                        <p className="font-bold text-foreground">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tarih</p>
                        <p className="font-medium text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Durum</p>
                        <span className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toplam</p>
                        <p className="font-bold text-primary">{order.total.toLocaleString("tr-TR")} TL</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-muted-foreground">
                          {item.name} x {item.quantity}
                        </p>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Siparis Detayi
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Kayitli Adreslerim</h2>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Yeni Adres Ekle
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Ev</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Varsayilan</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Ahmet Yilmaz<br />
                      Ataturk Mah. Cumhuriyet Cad. No:123 D:4<br />
                      Kadikoy, Istanbul 34710<br />
                      0532 123 45 67
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Duzenle</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Sil</Button>
                    </div>
                  </div>
                  <div className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center min-h-[150px]">
                    <Button variant="ghost" className="text-muted-foreground">
                      + Yeni Adres Ekle
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Odeme Yontemleri</h2>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Kart Ekle
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">**** **** **** 4567</p>
                        <p className="text-sm text-muted-foreground">Son Kullanma: 12/26</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Sil</Button>
                    </div>
                  </div>
                  <div className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center min-h-[100px]">
                    <Button variant="ghost" className="text-muted-foreground">
                      + Yeni Kart Ekle
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Bildirim Tercihleri</h2>
                <div className="space-y-4">
                  {[
                    { label: "Siparis Guncellemeleri", desc: "Siparis durumu degisikliklerinden haberdar ol" },
                    { label: "Kampanya ve Indirimler", desc: "Ozel firsatlar ve indirimlerden haberdar ol" },
                    { label: "Yeni Urunler", desc: "Yeni urun ve iceriklerden haberdar ol" },
                    { label: "Blog Yazilari", desc: "Yeni blog yazilari yayinlandiginda bildirim al" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={index < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
