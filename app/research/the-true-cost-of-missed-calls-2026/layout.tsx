import { Metadata } from "next"

export const metadata: Metadata = {
  keywords: [
    "missed calls cost UK trades",
    "missed call financial impact 2026",
    "UK trade business revenue loss",
    "AI call answering ROI",
    "missed call statistics UK",
  ],
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
                description: "Research report examining the financial impact of missed calls on UK trade businesses, drawing on data from Replicant AI, BT Business, the Federation of Small Businesses, and other independent sources.",
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
                    url: "https://whoza.ai/og-image.webp",
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
