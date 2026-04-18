import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AnalyticsTracker } from '@/components/analytics/tracker'
import { MetaPixelPageViews } from '@/components/analytics/meta-pixel-pageviews'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { Toaster } from '@/components/ui/toaster'

const isVercelDeployment = process.env.VERCEL === '1'

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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '35100142942932601');
fbq('track', 'PageView');
`}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=35100142942932601&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <AnalyticsTracker />
        <MetaPixelPageViews />
        <Toaster />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatbotWidget />
        {isVercelDeployment ? <Analytics /> : null}
      </body>
    </html>
  )
}
