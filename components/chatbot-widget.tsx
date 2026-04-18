"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, ShoppingCart, HelpCircle, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

function ChatbotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 20L4.5 21.5L5.7 18.2C4.6 16.9 4 15.2 4 13.4C4 8.8 7.6 5 12 5C16.4 5 20 8.8 20 13.4C20 18 16.4 21.8 12 21.8C10.6 21.8 9.2 21.4 8 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="13.1" r="1" fill="currentColor" />
      <circle cx="14.8" cy="13.1" r="1" fill="currentColor" />
      <path d="M9 16C9.8 16.7 10.8 17.1 12 17.1C13.2 17.1 14.2 16.7 15 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.4 8.7H14.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const quickActions = [
  { label: 'Ürünü Keşfet', href: '/urun', icon: Package },
  { label: "Trendyol'da Sipariş", href: 'https://www.trendyol.com/multilimit/alkol-sonrasi-detoks-destegi-saglayan-gida-takviyesi-p-1116265098?boutiqueId=61&merchantId=1239513', icon: ShoppingCart, external: true },
  { label: 'WhatsApp Destek', href: 'https://wa.me/905551234567?text=Merhaba%2C%20Multilimit%20Premium%20Detoks%20Kompleksi%20hakkinda%20bilgi%20almak%20istiyorum.', icon: MessageCircle, external: true },
  { label: 'Sıkça Sorulan Sorular', href: '/sss', icon: HelpCircle },
]

const chatMessages = [
  {
    type: 'bot',
    message: 'Merhaba! Multilimit Premium Detoks Kompleksi hakkında size nasıl yardımcı olabilirim?',
  },
]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(chatMessages)
  const [inputValue, setInputValue] = useState('')
  const pathname = usePathname()

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    setMessages((prev) => [
      ...prev,
      { type: 'user', message: inputValue },
      { 
        type: 'bot', 
        message: 'Teşekkür ederiz! Ekibimiz en kısa sürede sizinle iletişime geçecek. Dilerseniz WhatsApp üzerinden de bize ulaşabilirsiniz.' 
      },
    ])
    setInputValue('')
  }

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/20 hover:bg-primary/90 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Canlı Destek"
      >
        <ChatbotIcon className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <ChatbotIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Multilimit Destek</h3>
              <p className="text-xs text-muted-foreground">Genellikle anında yanıt verir</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Kapat</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="h-[280px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary text-foreground rounded-bl-md'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-3">
          <p className="text-xs text-muted-foreground mb-2">Hızlı Erişim</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              action.external ? (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-xs font-medium text-foreground transition-colors"
                >
                  <action.icon className="w-4 h-4 text-primary" />
                  {action.label}
                </a>
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-xs font-medium text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <action.icon className="w-4 h-4 text-primary" />
                  {action.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Mesajinizi yazin..."
              className="flex-1 bg-secondary border-border text-foreground placeholder:text-muted-foreground text-sm"
            />
            <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="w-4 h-4" />
              <span className="sr-only">Gönder</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
