import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { WaitlistForm } from "@/components/whoza/waitlist-form"
import { Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Start Your Free Trial | Whoza",
  description:
    "Sign up for Whoza — the AI phone receptionist for UK trades. Katie answers every call 24/7 and books real jobs to your WhatsApp. 7-day free trial, no card, live in 30 minutes.",
  alternates: {
    canonical: "https://whoza.ai/signup",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/signup",
    siteName: "Whoza.ai",
    title: "Start Your Free Trial | Whoza",
    description:
      "Sign up for Whoza — the AI phone receptionist for UK trades. Katie answers every call 24/7 and books real jobs to your WhatsApp. 7-day free trial, no card, live in 30 minutes.",
    images: [
      { url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Start your free trial with Whoza.ai" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Start Your Free Trial | Whoza",
    description:
      "Sign up for Whoza — the AI phone receptionist for UK trades. Katie answers every call 24/7 and books real jobs to your WhatsApp. 7-day free trial, no card, live in 30 minutes.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="w-4 h-4" />
            Limited to 50 tradespeople — early access
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Start your free trial
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Limited to the first 50 tradespeople — get early access.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[#1E2229] rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
          <WaitlistForm source="signup-page" variant="page" />
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-slate-500">
            🔒 No credit card required · Cancel anytime · Live in 30 minutes
          </p>
          <p className="text-xs text-slate-600">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-emerald-400 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-emerald-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
