import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import './hero-widget-fix.css'
import '@/components/whoza/styles/premium-v8.module.css'
import { LocaleProvider } from '@/lib/locale-context'
import { CookieBanner } from '@/components/whoza/cookie-banner'
import { ScrollProgress } from '@/components/whoza/scroll-progress'

import { organizationSchemaObject } from "@/components/whoza/organization-schema"
import { WebVitals } from '@/components/whoza/web-vitals'

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
  title: 'AI Receptionist for UK Trades | 24/7 | From £59 — Whoza.ai',
  description: "Stop losing £12,000/year to missed calls. Whoza.ai's AI receptionist answers 24/7, captures leads, and grows your visibility. Start free.",
  // Keywords meta tag removed per SEO best practices — can be spam signal
  authors: [{ name: 'whoza.ai' }],
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
    title: 'AI Receptionist for UK Trades | 24/7 | From £59 — Whoza.ai',
    description: "Stop losing £12,000/year to missed calls. Whoza.ai's AI receptionist answers 24/7, captures leads, and grows your visibility. Start free.",
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
    title: 'AI Receptionist for UK Trades | 24/7 | From £59 — Whoza.ai',
    description: "Stop losing £12,000/year to missed calls. Whoza.ai's AI receptionist answers 24/7, captures leads, and grows your visibility. Start free.",
    images: ['https://whoza.ai/og-image.webp'],
  },
  alternates: {
    canonical: 'https://whoza.ai',
  },
  verification: {
    google: 'HcL1Z5FshVtABkMZHyWoQMPp9Qyd7raEUoWi3_15S3U',
    // bing: handled via raw <meta> tag in <head> — Next.js metadata.verification.bing doesn't render msvalidate.01
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'Tomintoul, Scotland',
    'geo.position': '57.254141;-3.38239',
    'ICBM': '57.254141, -3.38239',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cache-busting comment v2 — force fresh chunk hash
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msvalidate.01" content="7E719E4A5C3E8A3A7E8B9F6C4D2E1A0B" />
    <meta name="deploy-id" content="2026-06-07" />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://www.google-analytics.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* Preload LCP image — hero phone mockup */}
    <link rel="preload" as="image" href="/images/hero-phone-3d.webp" type="image/webp" fetchPriority="high" />
        {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WBCCZVB4');`,
        }}
      />
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VCQND9WPW9"
        strategy="lazyOnload"
      />
      <Script
        id="ga4-script"
        strategy="lazyOnload"
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
      {/* Google Preferred Sources — R12 */}
      <Script
        id="google-preferred-source"
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="lazyOnload"
      />
      {/* Schema.org consolidated @graph — Organization + WebSite + SoftwareApplication */}
      <script
        id="schema-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              organizationSchemaObject,
              {
                "@type": "WebSite",
                "@id": "https://whoza.ai/#website",
                "url": "https://whoza.ai",
                "name": "whoza.ai",
                "publisher": {
                  "@id": "https://whoza.ai/#organization"
                }
              },
              {
                "@type": "SoftwareApplication",
                "name": "Whoza.ai",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Any",
                "softwareVersion": "2026.07",
                "offers": {
                  "@type": "Offer",
                  "price": "59",
                  "priceCurrency": "GBP",
                  "priceValidUntil": "2026-12-31"
                },
                "featureList": [
                  "24/7 AI call answering with UK-accented voices",
                  "Instant WhatsApp alerts with full call details",
                  "Google Calendar and Outlook integration",
                  "Automated Google review requests",
                  "Competitor analysis and tracking",
                  "Unlimited simultaneous calls",
                  "Keep your existing business number",
                  "No contract — cancel anytime",
                  "30-day money-back guarantee"
                ]
              }
            ]
          })
        }}
      />
    </head>
      <body className="font-sans antialiased">
        {/* Cache-busting deploy 2026-06-07 */}
        <div data-deploy="2026-06-07" style={{display:'none'}} />
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
          <WebVitals />
        </LocaleProvider>
      </body>
    </html>
  )
}
