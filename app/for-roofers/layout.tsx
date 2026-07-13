import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI for Roofers | Never Miss a Storm Season Call — Whoza.ai",
  description: "Whoza.ai answers roofing calls 24/7. Qualifies tile repairs, leak emergencies & gutter jobs. Details to WhatsApp. 23 calls = £8K recovered. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-roofers",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-roofers",
    siteName: "Whoza.ai",
    title: "AI for Roofers | Never Miss a Storm Season Call — Whoza.ai",
    description: "Whoza.ai answers roofing calls 24/7. Qualifies tile repairs, leak emergencies & gutter jobs. Details to WhatsApp. 23 calls = £8K recovered. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Roofers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI for Roofers | Never Miss a Storm Season Call — Whoza.ai",
    description: "Whoza.ai answers roofing calls 24/7. Qualifies tile repairs, leak emergencies & gutter jobs. Details to WhatsApp. 23 calls = £8K recovered. Free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
