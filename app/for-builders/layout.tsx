import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Call Answering Service for Builders | From £59",
  description: "24/7 call answering for UK builders. Every extension, renovation and new build enquiry captured and sent to your WhatsApp in 3 seconds. Plans from £59.",
  alternates: {
    canonical: "https://whoza.ai/for-builders",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-builders",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Builders UK — Never Miss a Job",
    description: "Katie answers 24/7 for builders. Captures extensions, renovations and emergency structural enquiries. WhatsApp alerts in 3 seconds. Start free trial today.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Builders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Handling for Builders UK — Never Miss a Job",
    description: "Katie answers 24/7 for builders. Captures extensions, renovations and emergency structural enquiries. WhatsApp alerts in 3 seconds. Start free trial today.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
