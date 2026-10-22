import { Metadata } from "next"
import { EARLY_ACCESS_CAP } from "@/lib/data/company"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { APP_SIGNUP_URL } from "@/lib/signup"
import { ArrowRight, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Start Your Free Trial | Whoza",
  description:
    "Sign up for Whoza — the AI phone receptionist for UK trades. Katie answers every call 24/7 and books real jobs to your WhatsApp. 7-day free trial, no.",
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
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Sign Up", item: "https://whoza.ai/signup" },
        ]}
      />

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-10">
          <div className="v2-eyebrow inline-flex items-center gap-2 mb-6">
            <Phone className="w-4 h-4" />
            Limited to {EARLY_ACCESS_CAP} tradespeople — early access
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Start your free trial
          </h1>
          <p className="text-[var(--v2-muted)] text-lg max-w-md mx-auto">
            Limited to the first {EARLY_ACCESS_CAP} tradespeople — get early access.
          </p>
        </div>

        {/* Signup is open, and accounts live in the app, so this is a way in rather than a
            waitlist form. */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--v2-line)] text-center">
          <p className="text-[var(--v2-body)] mb-6">
            Seven days free on Starter, with a real UK number, 100 call minutes and 10 booked jobs.
            Setup takes about half an hour.
          </p>
          <a
            href={APP_SIGNUP_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--v2-green)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[var(--v2-green-hover)]"
          >
            Create your account
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-slate-500">
            Already have an account?{" "}
            <a href="https://app.whoza.ai/login" className="text-[var(--v2-green)] hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-slate-500">
            🔒 No credit card required · Cancel anytime · Live in 30 minutes
          </p>
          <p className="text-xs text-slate-600">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-[var(--v2-green)] hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[var(--v2-green)] hover:underline">
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
