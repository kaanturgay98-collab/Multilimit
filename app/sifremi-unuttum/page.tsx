"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold text-primary">MULTILIMIT</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sifremi Unuttum</h1>
          <p className="text-muted-foreground">
            {isSubmitted 
              ? "Sifre sifirlama baglantisi gonderildi" 
              : "E-posta adresinizi girin, size sifre sifirlama baglantisi gonderelim"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">{email}</strong> adresine sifre sifirlama baglantisi gonderildi.
                Lutfen e-posta kutunuzu kontrol edin.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                E-posta gelmediyse spam/gereksiz klasorunu kontrol edin.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Tekrar Gonder
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-border pl-10"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Gonderiliyor..." : "Sifirlama Baglantisi Gonder"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/giris" className="inline-flex items-center text-primary hover:underline font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Girise Don
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
