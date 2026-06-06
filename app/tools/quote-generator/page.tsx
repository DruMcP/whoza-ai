import { Metadata } from "next"
import { QuoteGenerator } from "@/components/tools/quote-generator"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Free Quote Generator for UK Trades | whoza.ai",
  description: "Create professional quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output.",
  openGraph: {
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output.",
    url: "https://whoza.ai/tools/quote-generator",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Quote Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional quotes for UK trade jobs in 60 seconds.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/quote-generator",
  },
}

export const revalidate = 3600

export default function QuoteGeneratorPage() {
  return <QuoteGenerator />
}
