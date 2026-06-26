import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Free Trade Business Growth Toolkit | whoza.ai",
  description: "Download the free Trade Business Growth Toolkit. Quoting calculator, enquiry templates, follow-up emails, missed call recovery checklist. Start growing.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/resources/trade-business-growth-toolkit",
    siteName: "Whoza.ai",
    title: "Free Trade Business Growth Toolkit | whoza.ai",
    description: "Download the free Trade Business Growth Toolkit. Quoting calculator, enquiry form templates, follow-up emails, and missed call recovery checklist.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Free Trade Business Growth Toolkit" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Free Trade Business Growth Toolkit | whoza.ai",
    description: "Download the free Trade Business Growth Toolkit for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/resources/trade-business-growth-toolkit",
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
                "headline": "Free Trade Business Growth Toolkit",
                "description": "Downloadable toolkit for UK tradespeople including quoting calculator, enquiry forms, follow-up emails, and missed call recovery checklist.",
                "url": "https://whoza.ai/resources/trade-business-growth-toolkit",
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
                    "name": "Is this toolkit really free?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% free. No credit card required. We just ask for your email so we can send you the download link and occasional trade business tips." },
                  },
                  {
                    "@type": "Question",
                    "name": "What format are the files in?",
                    "acceptedAnswer": { "@type": "Answer", "text": "The Quoting Calculator is a Google Sheets / Excel spreadsheet. The templates and checklists are PDF and editable Word formats." },
                  },
                  {
                    "@type": "Question",
                    "name": "Will you spam my inbox?",
                    "acceptedAnswer": { "@type": "Answer", "text": "No. We send one email with your toolkit, plus a weekly trade business tip if you opt in. You can unsubscribe anytime with one click." },
                  },
                  {
                    "@type": "Question",
                    "name": "Can I share this with my team?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Once downloaded, the toolkit is yours to use across your entire business." },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
                  { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://whoza.ai/resources" },
                  { "@type": "ListItem", "position": 3, "name": "Growth Toolkit", "item": "https://whoza.ai/resources/trade-business-growth-toolkit" },
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
