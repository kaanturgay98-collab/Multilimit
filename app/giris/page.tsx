"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { setPublicSession } from "@/lib/public-session"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const sp = useSearchParams()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Mock "logged-in" public session (for checkout prefilling)
    setPublicSession({
      firstName: "Musteri",
      lastName: "Kullanici",
      email: formData.email.trim(),
    })
    const next = sp.get("next") || "/checkout"
    router.push(next)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-primary">MULTILIMIT</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hos Geldiniz</h1>
          <p className="text-muted-foreground">Hesabiniza giris yapin</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border pl-10"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Sifre</Label>
                <Link href="/sifremi-unuttum" className="text-sm text-primary hover:underline">
                  Sifremi Unuttum
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-background border-border pl-10 pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Giris Yapiliyor..." : "Giris Yap"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Hesabiniz yok mu?{" "}
              <Link href="/kayit" className="text-primary hover:underline font-medium">
                Kayit Ol
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Giris yaparak{" "}
          <Link href="/kullanim-kosullari" className="text-primary hover:underline">
            Kullanim Kosullari
          </Link>
          {" "}ve{" "}
          <Link href="/gizlilik-politikasi" className="text-primary hover:underline">
            Gizlilik Politikasi
          </Link>
          ni kabul etmis olursunuz.
        </p>
      </div>
    </main>
  )
}
