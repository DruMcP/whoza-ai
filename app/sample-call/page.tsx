import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sample AI Call — Hear Katie Answer | whoza.ai",
  description: "Hear Katie answer a real trade call in 60 seconds. AI receptionist captures enquiries, sends details to WhatsApp. See the whoza.ai demo. Free 7-day trial.",
  alternates: {
    canonical: "https://whoza.ai/sample-call",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/sample-call",
    siteName: "Whoza.ai",
    title: "Sample AI Call — Hear Katie Answer | whoza.ai",
    description: "Hear Katie answer a real trade call in 60 seconds. AI receptionist captures enquiries, sends details to WhatsApp. See the whoza.ai demo. Free 7-day trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Hear Katie answer a sample call" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Sample AI Call — Hear Katie Answer | whoza.ai",
    description: "Hear Katie answer a real trade call in 60 seconds. AI receptionist captures enquiries, sends details to WhatsApp. See the whoza.ai demo. Free 7-day trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 3600

export default function SampleCallPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--navy-900)] text-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Sample AI Call</h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Hear Katie, whoza.ai's AI voice agent, answer a real trade enquiry in 64 seconds. 
            She captures all the details and sends them to your WhatsApp instantly. 
            Watch the demo on our homepage to see Katie in action.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 rounded-lg transition-all hover:scale-[1.02]"
          >
            Watch the Demo on Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
