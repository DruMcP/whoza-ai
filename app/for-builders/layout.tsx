import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Call Handling for Builders UK — Never Miss a Job",
  description: "Stop losing building enquiries to missed calls. Katie answers 24/7 for extensions, renovations & emergency structural work. WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-builders",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-builders",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Builders UK — Never Miss a Job",
    description: "Stop losing building enquiries to missed calls. Katie answers 24/7 for extensions, renovations & emergency structural work. WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Builders" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handling for Builders UK — Never Miss a Job",
    description: "Stop losing building enquiries to missed calls. Katie answers 24/7 for extensions, renovations & emergency structural work. WhatsApp alerts in 3 seconds. 7-day free trial.",
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
