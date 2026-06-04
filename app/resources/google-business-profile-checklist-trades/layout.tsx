import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Google Business Profile Checklist for UK Trades | whoza.ai",
  description: "Complete interactive checklist to optimise your Google Business Profile. Category recommendations, photo guidelines, review templates, post strategy, and Q&A for UK tradespeople.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/resources/google-business-profile-checklist-trades",
    siteName: "Whoza.ai",
    title: "Google Business Profile Checklist for UK Trades | whoza.ai",
    description: "Complete interactive checklist to optimise your Google Business Profile. Category recommendations, photo guidelines, review templates, post strategy, and Q&A.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Google Business Profile Checklist for UK Trades" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Google Business Profile Checklist for UK Trades | whoza.ai",
    description: "Complete interactive checklist to optimise your Google Business Profile for UK tradespeople.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/resources/google-business-profile-checklist-trades",
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
                "headline": "Google Business Profile Checklist for UK Trades",
                "description": "Interactive checklist with category recommendations, photo guidelines, review templates, post strategy, and Q&A to optimise your Google Business Profile.",
                "url": "https://whoza.ai/resources/google-business-profile-checklist-trades",
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
                    "name": "How do I choose the right Google Business Profile category?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Pick the category that most accurately describes your primary service. You can add up to 9 additional categories. For example, a plumber should use 'Plumber' as primary, then add 'Emergency Plumber', 'Drainage Service', and 'Bathroom Renovator' as secondary categories." },
                  },
                  {
                    "@type": "Question",
                    "name": "How many photos should I upload to my Google Business Profile?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Google recommends at least 10 photos, but businesses with 20+ photos get significantly more engagement. Aim for: 1 logo, 1 cover photo, 3-5 exterior/van shots, 10-15 work photos, 2-3 team photos, and 2-3 certificate shots." },
                  },
                  {
                    "@type": "Question",
                    "name": "How often should I post on my Google Business Profile?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Post at least once per week. Google favours active profiles. Mix offers, completed job photos, tips, and behind-the-scenes content. Posts expire after 7 days, so consistency matters more than perfection." },
                  },
                  {
                    "@type": "Question",
                    "name": "What's the best way to ask customers for Google reviews?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Ask immediately after job completion when the customer is happiest. Send a follow-up text or email with a direct review link. Include in your request: what you did, how long it took, and a direct link. Response rate doubles when you include a link." },
                  },
                  {
                    "@type": "Question",
                    "name": "Should I respond to every review?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes — especially negative ones. Responding to reviews shows you care and can turn a 1-star review into a positive impression for future customers. Keep responses professional, thank the reviewer, and address any issues raised." },
                  },
                  {
                    "@type": "Question",
                    "name": "What Q&A should I pre-populate on my profile?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Pre-populate questions about: emergency callout availability, pricing estimates, areas you cover, insurance details, qualifications/certifications, and typical response times. Use your own Google account to ask and your business account to answer." },
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
                  { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://whoza.ai/resources" },
                  { "@type": "ListItem", "position": 3, "name": "GBP Checklist", "item": "https://whoza.ai/resources/google-business-profile-checklist-trades" },
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
