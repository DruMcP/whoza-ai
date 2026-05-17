import { Metadata } from "next"
import { QuoteGenerator } from "@/components/tools/quote-generator"

export const metadata: Metadata = {
  title: "Free Quote Generator for UK Trades | whoza.ai",
  description: "Create professional, VAT-compliant quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output.",
  openGraph: {
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional, VAT-compliant quotes for UK trade jobs in 60 seconds. Free quote generator with branded PDF output.",
    url: "https://whoza.ai/tools/quote-generator",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quote Generator for UK Trades | whoza.ai",
    description: "Create professional, VAT-compliant quotes for UK trade jobs in 60 seconds.",
  },
  alternates: {
    canonical: "https://whoza.ai/tools/quote-generator",
  },
}

export default function QuoteGeneratorPage() {
  return <QuoteGenerator />
}
