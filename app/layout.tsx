import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './hero-widget-fix.css'
import '@/components/whoza/styles/premium-v8.module.css'
import { LocaleProvider } from '@/lib/locale-context'
import { Analytics } from "@/components/whoza/analytics"
import { CookieBanner } from '@/components/whoza/cookie-banner'
import { ScrollProgress } from '@/components/whoza/scroll-progress'
import { BackToTop } from '@/components/whoza/back-to-top'

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
  title: 'AI Receptionist for UK Trades | 24/7 | From £59 | Whoza.ai',
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
    title: 'AI Receptionist for UK Trades | 24/7 | From £59 | Whoza.ai',
    description: "Stop losing £12,000/year to missed calls. Whoza.ai's AI receptionist answers 24/7, captures leads, and grows your visibility. Start free.",
    images: [
      {
        url: 'https://whoza.ai/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'whoza.ai: AI Voice Agents for UK Tradespeople',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Receptionist for UK Trades | 24/7 | From £59 | Whoza.ai',
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
    // suppressHydrationWarning: the inline script below sets data-v2-seen on
    // <html> before React hydrates, which is intentional.
    <html lang="en-GB" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* First-visit entrance: mark the session as seen before first paint, so
            the CSS entrance animation (globals.css, "First-visit entrance") runs
            on the first page of a session only. Fails safe: no storage, no animation. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=window.sessionStorage;if(s.getItem('v2-seen')){document.documentElement.setAttribute('data-v2-seen','')}else{s.setItem('v2-seen','1')}}catch(e){document.documentElement.setAttribute('data-v2-seen','')}",
          }}
        />
        {/* Offer bar above the nav: once dismissed it stays hidden, applied before
            first paint so the page does not jump (globals.css, "Offer bar"). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.localStorage.getItem('whoza-promo-closed')==='1'){document.documentElement.setAttribute('data-promo-closed','')}}catch(e){}",
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="msvalidate.01" content="B6D3ACF2F126930811E983EEE49699D0" />
    <meta name="deploy-id" content="2026-06-07" />
    {/* Preload LCP image — hero phone mockup */}
    {/* NOTE: Next.js Image with priority=true auto-injects preload; manual redundant */}
    {/* <link rel="preload" as="image" href="/images/hero-phone-3d.webp" type="image/webp" fetchPriority="high" /> */}
        {/* Google tag stub. Calls are queued in dataLayer with consent denied;
            nothing is requested from Google until the visitor accepts analytics
            cookies, then components/whoza/analytics.tsx loads GTM + GA4. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});",
          }}
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
                "@id": "https://whoza.ai/#software",
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
                  "No contract, cancel anytime",
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
        {/* Skip link — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[10000] focus:bg-[#1A1A2E] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded-br-lg focus:no-underline"
        >
          Skip to main content
        </a>
        <LocaleProvider>
          <ScrollProgress />
          <BackToTop />
          {children}
          <CookieBanner />
          <Analytics />
          <WebVitals />
        </LocaleProvider>
      </body>
    </html>
  )
}
