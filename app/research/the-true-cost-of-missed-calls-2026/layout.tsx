import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "The True Cost of Missed Calls: UK Trades Industry Financial Impact Report 2026 | Whoza",
  description: "Independent research on missed calls impact for UK trades. 34-62% missed, costing £50,000-£80,000 per business yearly.",
  keywords: [
    "missed calls cost UK trades",
    "missed call financial impact 2026",
    "UK trade business revenue loss",
    "AI call answering ROI",
    "missed call statistics UK",
  ],
  alternates: {
    canonical: "https://whoza.ai/research/the-true-cost-of-missed-calls-2026",
  },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/research/the-true-cost-of-missed-calls-2026",
    siteName: "Whoza.ai",
    title: "The True Cost of Missed Calls: UK Trades Industry Financial Impact Report 2026",
    description: "Independent research: UK trades businesses miss 34-62% of calls, costing £50,000-£80,000 annually per business.",
    images: [{ url: "https://whoza.ai/og/research-missed-calls-2026.jpg", width: 1200, height: 630, alt: "The True Cost of Missed Calls UK Trades Research Report 2026" }],
    publishedTime: "2026-06-25T00:00:00+00:00",
    modifiedTime: "2026-06-25T00:00:00+00:00",
    authors: [{ name: "Whoza" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "The True Cost of Missed Calls — UK Trades Research 2026",
    description: "UK trades miss 34-62% of calls. Cost: £50,000-£80,000/year per business. Download the independent research report.",
    images: ["https://whoza.ai/og/research-missed-calls-2026.jpg"],
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
                "@type": "ScholarlyArticle",
                headline: "The True Cost of Missed Calls: UK Trades Industry Financial Impact Report 2026",
                description: "Independent research report examining the financial impact of missed calls on UK trade businesses, drawing on data from Replicant AI, BT Business, the Federation of Small Businesses, and other independent sources.",
                author: {
                  "@type": "Organization",
                  name: "Whoza",
                  url: "https://whoza.ai",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Whoza",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://whoza.ai/logo.png",
                  },
                },
                datePublished: "2026-06-25",
                dateModified: "2026-06-25",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://whoza.ai/research/the-true-cost-of-missed-calls-2026",
                },
                about: {
                  "@type": "Thing",
                  name: "Missed Call Impact on UK Trade Businesses",
                },
                citation: [
                  "Replicant AI (2024). State of Customer Service: Missed Call Rates by Business Size.",
                  "BT/Avaya (2025). Cost of Missed Calls to UK Businesses.",
                  "EchoCall (2026). AI Voice Agent & Conversational AI Statistics 2026.",
                  "IDC (2025). AI ROI Study: Payback Periods and Returns.",
                  "Federation of Small Businesses (2025). True Cost of Employment for UK Small Businesses.",
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://whoza.ai/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Research",
                    item: "https://whoza.ai/research",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "The True Cost of Missed Calls 2026",
                    item: "https://whoza.ai/research/the-true-cost-of-missed-calls-2026",
                  },
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
