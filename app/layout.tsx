import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import './hero-widget-fix.css'
import '@/components/whoza/styles/premium-v8.module.css'
import { LocaleProvider } from '@/lib/locale-context'
import { CookieBanner } from '@/components/whoza/cookie-banner'
import { RevealObserver } from '@/components/whoza/reveal-observer'
import { ScrollProgress } from '@/components/whoza/scroll-progress'

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
        url: 'https://whoza.ai/og-image.webp',
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
    images: ['https://whoza.ai/og-image.webp'],
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
    google: 'HcL1Z5FshVtABkMZHyWoQMPp9Qyd7raEUoWi3_15S3U',
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
    <html lang="en-GB" className={inter.variable}>
      <head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    {/* Preconnect to critical origins — reduces TTFB by establishing early connections */}
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://whoza.ai" crossOrigin="anonymous" />
        {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WBCCZVB4');`,
        }}
      />
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VCQND9WPW9"
        strategy="afterInteractive"
      />
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VCQND9WPW9');`,
        }}
      />
      {/* Meta Pixel — disabled until pixel ID configured */}
      {/*
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', 'PLACEHOLDER_PIXEL_ID'); fbq('track', 'PageView');`,
        }}
      />
      */}
      {/* End Google Tag Manager */}
    </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WBCCZVB4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Skip link — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[10000] focus:bg-[#1A1A2E] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded-br-lg focus:no-underline"
        >
          Skip to main content
        </a>
        <LocaleProvider>
          <ScrollProgress />
          {children}
          <CookieBanner />
          <RevealObserver />
        </LocaleProvider>
      </body>
    </html>
  )
}
