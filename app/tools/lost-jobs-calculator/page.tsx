import { Metadata } from "next"
import { LostJobsCalculator } from "@/components/tools/lost-jobs-calculator"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Lost Jobs Calculator UK | See Your Costs",
  description: "Free missed jobs calculator for UK tradespeople. Calculate revenue lost to unanswered calls using ONS data. See your cost weekly and yearly. Try it now.",
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
  return (
    <>
      <LostJobsCalculator />
      <section
        aria-labelledby="lost-jobs-more"
        className="mx-auto w-full max-w-3xl px-4 py-12 border-t border-white/10"
      >
        <h2 id="lost-jobs-more" className="text-xl font-semibold mb-3">
          How the lost jobs figure is calculated
        </h2>
        <p className="mb-4 text-sm leading-relaxed opacity-80">
          This calculator estimates the revenue a UK trade business loses each week and each
          year to unanswered phone calls. It multiplies your missed calls by the share of
          callers who never ring back and by your average job value. Roughly 33% of small
          trade firms fail to answer incoming calls, and for a typical one-van business that works out
          at around &pound;12,000 of lost work a year. Plumbers, electricians, roofers,
          heating engineers and locksmiths lose the most, because the phone rings while they
          are on a job and cannot answer it.
        </p>
        <h2 className="text-xl font-semibold mb-3">Related tools and research</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <a href="/resources/missed-call-cost-calculator" className="underline">
              Missed call cost calculator
            </a>{" "}
            &mdash; a fuller model including seasonal call peaks.
          </li>
          <li>
            <a href="/research/cost-of-missed-calls-uk-trades-2026" className="underline">
              The cost of missed calls to UK trades (2026 research)
            </a>{" "}
            &mdash; the sourced data behind these figures.
          </li>
          <li>
            <a href="/research/ai-voice-agents-uk-trades-2026" className="underline">
              AI voice agents for UK trades (2026)
            </a>
          </li>
          <li>
            <a href="/tools/quote-generator" className="underline">
              Quote generator
            </a>{" "}
            and{" "}
            <a href="/tools/voicemail-scripts" className="underline">
              voicemail scripts
            </a>{" "}
            for tradespeople.
          </li>
          <li>
            <a href="/for-plumbers" className="underline">
              Call answering for plumbers
            </a>{" "}
            &middot;{" "}
            <a href="/for-electricians" className="underline">
              for electricians
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}
