import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
  description: "Free interactive calculator for UK tradespeople. Calculate how much missed calls cost your trade business weekly, monthly, and yearly. Based on ONS data.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/resources/missed-call-cost-calculator",
    siteName: "Whoza.ai",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Free interactive calculator for UK tradespeople. Calculate how much missed calls cost your trade business weekly, monthly, and yearly.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Missed call cost calculator for UK trades" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Missed Call Cost Calculator | How Much Revenue Are You Losing?",
    description: "Free interactive calculator for UK tradespeople. Calculate how much missed calls cost your trade business.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/resources/missed-call-cost-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": "Missed Call Cost Calculator for UK Trades",
                "description": "Free interactive calculator showing how much revenue UK tradespeople lose to missed calls.",
                "url": "https://whoza.ai/resources/missed-call-cost-calculator",
                "author": { "@type": "Organization", "name": "whoza.ai" },
                "publisher": { "@type": "Organization", "name": "whoza.ai", "logo": { "@type": "ImageObject", "url": "https://whoza.ai/og-image.webp" } },
                "datePublished": "2026-06-05",
                "dateModified": "2026-06-05",
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How much do missed calls cost UK tradespeople?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Missed calls cost UK tradespeople £3,000-£12,000 per year on average. Based on ONS data, 62% of calls to small trade businesses go unanswered. With an average job value of £280 and 35% conversion rate, 10 missed calls per week = £5,096 in lost annual revenue." },
                  },
                  {
                    "@type": "Question",
                    "name": "What percentage of calls do trade businesses miss?",
                    "acceptedAnswer": { "@type": "Answer", "text": "62% of calls to small UK trade businesses go unanswered, according to ONS Business Population Estimates 2025. Plumbers miss the most calls (68%) because they're often working in areas with poor phone signal." },
                  },
                  {
                    "@type": "Question",
                    "name": "What is the average job value for UK trades?",
                    "acceptedAnswer": { "@type": "Answer", "text": "The average job value varies by trade: Plumbing (£180-350), Electrical (£150-400), Roofing (£500-2,000), Heating (£200-600), Building (£1,000-5,000). The UK average across all trades is approximately £280 per job." },
                  },
                  {
                    "@type": "Question",
                    "name": "How many missed calls turn into actual jobs?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Approximately 35% of answered calls convert into booked jobs for UK tradespeople. This means if you miss 10 calls per week, you're losing 3-4 potential jobs — worth £840-£1,120 per week." },
                  },
                  {
                    "@type": "Question",
                    "name": "Can an AI call handler recover lost revenue?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes. AI call handlers like whoza.ai answer 100% of missed calls, qualify leads, and deliver them via WhatsApp. Tradespeople using AI call handling report recovering 2-5 additional jobs per month, worth £560-£1,400 monthly." },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
                  { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://whoza.ai/resources" },
                  { "@type": "ListItem", "position": 3, "name": "Missed Call Cost Calculator", "item": "https://whoza.ai/resources/missed-call-cost-calculator" },
                ],
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
