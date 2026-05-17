import { Metadata } from "next"
import { EmergencyPricingCalculator } from "@/components/tools/emergency-pricing"

export const metadata: Metadata = {
  title: "Emergency Callout Pricing Calculator UK | whoza.ai",
  description: "Free calculator for UK tradespeople. Price emergency callouts by trade, region, time of day, and job complexity. Real UK market rate data.",
  openGraph: {
    title: "Emergency Callout Pricing Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. Price emergency callouts by trade, region, time of day, and job complexity.",
    url: "https://whoza.ai/tools/emergency-pricing",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Callout Pricing Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. Price emergency callouts with real market data.",
  },
  alternates: {
    canonical: "https://whoza.ai/tools/emergency-pricing",
  },
}

export default function EmergencyPricingPage() {
  return <EmergencyPricingCalculator />
}
