import { Metadata } from "next"
import { LostJobsCalculator } from "@/components/tools/lost-jobs-calculator"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Lost Jobs Calculator UK | See Your Costs",
  description: "Free missed jobs calculator for UK tradespeople. Calculate revenue lost to unanswered calls using ONS data. See your weekly and yearly cost instantly. Try now.",
  openGraph: {
    title: "Lost Jobs Calculator UK | See What Missed Calls Cost You | whoza.ai",
    description: "Free calculator for UK tradespeople. Enter your missed calls per week and see exactly how much revenue you're losing. ONS data backed.",
    url: "https://whoza.ai/tools/lost-jobs-calculator",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Lost Jobs Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Lost Jobs Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. See what missed calls cost you.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/lost-jobs-calculator",
  },
}

export const revalidate = 3600

export default function LostJobsCalculatorPage() {
  return <LostJobsCalculator />
}
