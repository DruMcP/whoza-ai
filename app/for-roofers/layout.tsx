import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Call Handling for Roofers UK — Never Miss a Lead",
  description: "Katie answers 24/7 for roofers. Captures storm damage, leaks, guttering & emergency repair enquiries. WhatsApp alerts in 3 seconds. Free trial.",
  alternates: {
    canonical: "https://whoza.ai/for-roofers",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/for-roofers",
    siteName: "Whoza.ai",
    title: "AI Call Handling for Roofers UK — Never Miss a Lead",
    description: "Katie answers 24/7 for roofers. Captures storm damage, leaks, guttering & emergency repair enquiries. WhatsApp alerts in 3 seconds. Free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai for Roofers" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Handling for Roofers UK — Never Miss a Lead",
    description: "Katie answers 24/7 for roofers. Captures storm damage, leaks, guttering & emergency repair enquiries. WhatsApp alerts in 3 seconds. Free trial.",
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
