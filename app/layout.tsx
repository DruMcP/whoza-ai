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
  title: 'AI Call Answering for UK Trades | Whoza.ai',
  description: 'AI voice agents answer your trade business calls 24/7, built in Scotland for UK plumbers, electricians and builders. Plans from £59/month. 7-day free trial.',
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
    title: 'AI Call Answering for UK Trades | Whoza.ai',
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
    title: 'AI Call Answering for UK Trades | Whoza.ai',
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
    // bing: handled via raw <meta> tag in <head> — Next.js metadata.verification.bing doesn't render msvalidate.01
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
      {/* Schema.org SoftwareApplication structured data */}
      <Script
        id="schema-softwareapplication"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Whoza.ai",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "softwareVersion": "2026.06",
            "offers": {
              "@type": "Offer",
              "price": "59",
              "priceCurrency": "GBP",
              "priceValidUntil": "2026-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "47",
              "bestRating": "5"
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
            ],
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Gary",
                  "jobTitle": "Plumber",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Clapham, London"
                  }
                },
                "datePublished": "2026-05-15",
                "reviewBody": "47 calls captured in 3 weeks. £6,800 recovered. One emergency job pays for the entire year.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              }
            ]
          })
        }}
      />
      {/* Schema.org Organization structured data */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://whoza.ai/#organization",
            "name": "Whoza.ai",
            "alternateName": "WHOZA AI LTD",
            "url": "https://whoza.ai",
            "logo": {
              "@type": "ImageObject",
              "url": "https://whoza.ai/og-image.webp",
              "width": 512,
              "height": 512
            },
            "image": "https://whoza.ai/og-image.webp",
            "description": "AI call answering service built in Scotland for UK tradespeople. Katie answers every missed call 24/7, qualifies jobs, and sends details to WhatsApp.",
            "slogan": "While you work, we book. Job done.",
            "foundingDate": "2025",
            "founders": [
              {
                "@type": "Person",
                "name": "Dru Shannon",
                "jobTitle": "Founder & CEO"
              }
            ],
            "numberOfEmployees": {
              "@type": "QuantitativeValue",
              "value": "5-10"
            },
            "knowsAbout": [
              "AI Voice Agents",
              "Call Answering Services",
              "UK Trade Businesses",
              "Plumbing",
              "Electrical Services",
              "Building and Construction",
              "Emergency Call Handling",
              "WhatsApp Business Integration"
            ],
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "6 Atholl Crescent",
              "addressLocality": "Perth",
              "addressRegion": "Scotland",
              "postalCode": "PH1 5JN",
              "addressCountry": "GB"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "support@whoza.ai",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/whoza/",
              "https://twitter.com/whozaai",
              "https://www.facebook.com/whozaai",
              "https://www.youtube.com/@whozaai",
              "https://www.instagram.com/whozaai",
              "https://www.tiktok.com/@whozaai",
              "https://www.crunchbase.com/organization/whoza-ai",
              "https://www.trustpilot.com/review/whoza.ai"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "47",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Gary",
                  "jobTitle": "Self-employed Plumber",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Clapham, London"
                  }
                },
                "datePublished": "2026-05-15",
                "reviewBody": "I was missing 5 emergency calls a week. Katie captured 47 calls in 3 weeks and recovered £6,800 in jobs I'd have lost.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Dave",
                  "jobTitle": "Self-employed Electrician",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Lewisham, London"
                  }
                },
                "datePublished": "2026-05-22",
                "reviewBody": "I lost 3 emergency callouts a day before whoza.ai. In 3 weeks, Katie recovered £4,200 in work.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                }
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Whoza.ai Plans",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Starter Plan",
                    "description": "AI call answering for sole traders — 8 jobs/month"
                  },
                  "price": "59",
                  "priceCurrency": "GBP",
                  "priceValidUntil": "2026-12-31"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Growth Plan",
                    "description": "AI call answering for growing teams — 16 jobs/month"
                  },
                  "price": "125",
                  "priceCurrency": "GBP",
                  "priceValidUntil": "2026-12-31"
                }
              ]
            }
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
          <RevealObserver />
          <WebVitals />
        </LocaleProvider>
      </body>
    </html>
  )
}
