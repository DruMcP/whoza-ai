import { Metadata } from "next"
import { EmergencyPricingCalculator } from "@/components/tools/emergency-pricing"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Emergency Callout Pricing Calculator UK | whoza.ai",
  description: "Free calculator for UK tradespeople. Price emergency callouts by trade, region, time of day, and job complexity. Real UK market rate data.",
  openGraph: {
    title: "Emergency Callout Pricing Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. Price emergency callouts by trade, region, time of day, and job complexity.",
    url: "https://whoza.ai/tools/emergency-pricing",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Emergency Pricing Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Emergency Callout Pricing Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. Price emergency callouts with real market data.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/emergency-pricing",
  },
}

export const revalidate = 3600

export default function EmergencyPricingPage() {
  return <EmergencyPricingCalculator />
}
