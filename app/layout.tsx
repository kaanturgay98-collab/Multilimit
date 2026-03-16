import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { CartProvider } from '@/lib/cart-context'
import { AnalyticsTracker } from '@/components/analytics/tracker'
import { Toaster } from '@/components/ui/toaster'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Multilimit Premium Detoks Kompleksi | Sabah Daha Zinde Baslayin',
  description: 'Multilimit Premium Detoks Kompleksi ile gunluk yasam temposuna destek veren premium formul. Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel formulumuzla tanisın.',
  keywords: 'detoks, premium detoks, zeolit, l-sistein, pirinc kepegi, saglikli yasam, wellness, takviye',
  authors: [{ name: 'Multilimit' }],
  creator: 'Multilimit',
  publisher: 'Multilimit',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://multilimit.com',
    siteName: 'Multilimit Premium Detoks Kompleksi',
    title: 'Multilimit Premium Detoks Kompleksi | Sabah Daha Zinde Baslayin',
    description: 'Gunluk yasam temposuna destek veren premium formul',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multilimit Premium Detoks Kompleksi',
    description: 'Gunluk yasam temposuna destek veren premium formul',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1f3a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AnalyticsTracker />
          <Toaster />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
