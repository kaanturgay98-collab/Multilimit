import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { AnalyticsTracker } from '@/components/analytics/tracker'
import { Toaster } from '@/components/ui/toaster'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
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
  icons: {
    icon: '/mltlimit-favicon.ico',
    shortcut: '/mltlimit-favicon.ico',
    apple: '/mltlimit-favicon.ico',
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
    <html lang="tr" className={dmSans.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AnalyticsTracker />
        <Toaster />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
