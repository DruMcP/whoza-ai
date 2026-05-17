import { Metadata } from "next"
import { LostJobsCalculator } from "@/components/tools/lost-jobs-calculator"

export const metadata: Metadata = {
  title: "Lost Jobs Calculator UK | See What Missed Calls Cost You | whoza.ai",
  description: "Free calculator for UK tradespeople. Enter your missed calls per week and see exactly how much revenue you're losing. ONS data backed.",
  openGraph: {
    title: "Lost Jobs Calculator UK | See What Missed Calls Cost You | whoza.ai",
    description: "Free calculator for UK tradespeople. Enter your missed calls per week and see exactly how much revenue you're losing. ONS data backed.",
    url: "https://whoza.ai/tools/lost-jobs-calculator",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lost Jobs Calculator UK | whoza.ai",
    description: "Free calculator for UK tradespeople. See what missed calls cost you.",
  },
  alternates: {
    canonical: "https://whoza.ai/tools/lost-jobs-calculator",
  },
}

export default function LostJobsCalculatorPage() {
  return <LostJobsCalculator />
}
