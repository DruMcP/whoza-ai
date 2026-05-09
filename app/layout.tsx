import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import { CookieBanner } from '@/components/whoza/cookie-banner'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://whoza.ai'),
  title: 'Whoza.ai — AI Voice Agents for UK Tradespeople',
  description: 'AI voice agents Katie & Mark answer your trade business calls 24/7. Claire collects reviews, Rex tracks competitors. Plans from £59/month. 7-day free trial.',
  // Keywords meta tag removed per SEO best practices — can be spam signal
  authors: [{ name: 'whoza.ai' }],
  creator: 'whoza.ai',
  publisher: 'whoza.ai',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://whoza.ai',
    siteName: 'Whoza.ai',
    title: 'Whoza.ai — AI Voice Agents for UK Tradespeople',
    description: 'AI voice agents that answer your trade business calls 24/7. Never miss a job again.',
    images: [
      {
        url: 'https://whoza.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'whoza.ai — AI Voice Agents for UK Tradespeople',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@whozaai',
    creator: '@whozaai',
    title: 'Whoza.ai — AI Voice Agents for UK Tradespeople',
    description: 'AI voice agents that answer your trade business calls 24/7. Never miss a job again.',
    images: ['https://whoza.ai/og-image.png'],
  },
  alternates: {
    canonical: 'https://whoza.ai',
    languages: {
      'x-default': 'https://whoza.ai',
      'en-GB': 'https://whoza.ai',
      'en-US': 'https://whoza.ai',
    },
  },
  verification: {
    // TODO: Replace with actual Google Search Console verification code from https://search.google.com/search-console
    google: 'google-site-verification-code',
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'United Kingdom',
    'geo.position': '51.5074;-0.1278',
    'ICBM': '51.5074, -0.1278',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          {children}
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  )
}
