"use client"

import { useState } from 'react'
import { MessageCircle, X, Send, ShoppingCart, HelpCircle, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const quickActions = [
  { label: 'Urunu Kesfet', href: '/urun', icon: Package },
  { label: 'Siparise Gec', href: '/siparis', icon: ShoppingCart },
  { label: 'WhatsApp Destek', href: 'https://wa.me/905551234567?text=Merhaba%2C%20Multilimit%20Premium%20Detoks%20Kompleksi%20hakkinda%20bilgi%20almak%20istiyorum.', icon: MessageCircle, external: true },
  { label: 'Sik Sorulan Sorular', href: '/sss', icon: HelpCircle },
]

const chatMessages = [
  {
    type: 'bot',
    message: 'Merhaba! Multilimit Premium Detoks Kompleksi hakkinda size nasil yardimci olabilirim?',
  },
]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(chatMessages)
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    setMessages((prev) => [
      ...prev,
      { type: 'user', message: inputValue },
      { 
        type: 'bot', 
        message: 'Tesekkur ederiz! Ekibimiz en kisa surede sizinle iletisime gececek. Dilerseniz WhatsApp uzerinden de bize ulasabilirsiniz.' 
      },
    ])
    setInputValue('')
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Canli Destek"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
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
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Multilimit Destek</h3>
              <p className="text-xs text-muted-foreground">Genellikle aninda yanit verir</p>
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
          <p className="text-xs text-muted-foreground mb-2">Hizli Erisim</p>
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
              <span className="sr-only">Gonder</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
