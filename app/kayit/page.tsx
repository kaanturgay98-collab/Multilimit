"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const passwordRequirements = [
    { label: "En az 8 karakter", met: formData.password.length >= 8 },
    { label: "En az bir buyuk harf", met: /[A-Z]/.test(formData.password) },
    { label: "En az bir rakam", met: /[0-9]/.test(formData.password) },
  ]

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-primary">MULTILIMIT</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hesap Olustur</h1>
          <p className="text-muted-foreground">Multilimit ailesine katil</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="bg-background border-border pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>

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
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background border-border pl-10"
                  placeholder="05XX XXX XX XX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-background border-border pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="space-y-1 mt-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-muted'}`}>
                      {req.met && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={req.met ? 'text-green-500' : 'text-muted-foreground'}>{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  <Link href="/kullanim-kosullari" className="text-primary hover:underline">Kullanim Kosullari</Link>
                  {" "}ve{" "}
                  <Link href="/gizlilik-politikasi" className="text-primary hover:underline">Gizlilik Politikasi</Link>
                  ni okudum ve kabul ediyorum.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketing"
                  checked={acceptMarketing}
                  onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="marketing" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Kampanya ve firsatlardan haberdar olmak istiyorum.
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Kayit Yapiliyor..." : "Kayit Ol"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Zaten hesabiniz var mi?{" "}
              <Link href="/giris" className="text-primary hover:underline font-medium">
                Giris Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
