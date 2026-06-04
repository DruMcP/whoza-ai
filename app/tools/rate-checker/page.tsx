import { Metadata } from "next"
import { RateChecker } from "@/components/tools/rate-checker"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Hourly Rate Checker UK Trades | Compare Your Rate | whoza.ai",
  description: "Free rate checker for UK tradespeople. Compare your hourly rate against regional averages and top 10% earners in your trade.",
  openGraph: {
    title: "Hourly Rate Checker UK Trades | Compare Your Rate | whoza.ai",
    description: "Free rate checker for UK tradespeople. Compare your hourly rate against regional averages and top 10% earners.",
    url: "https://whoza.ai/tools/rate-checker",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Rate Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Hourly Rate Checker UK Trades | whoza.ai",
    description: "Free rate checker. See how your hourly rate compares to regional averages and top earners.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/rate-checker",
  },
}

export default function RateCheckerPage() {
  return <RateChecker />
}
