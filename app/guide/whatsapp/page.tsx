import type { Metadata } from "next"
import { GuideShell } from "@/components/whoza/guide-shell"
import { getGuidePage } from "@/lib/guide-content"

const guidePage = getGuidePage("whatsapp")
const url = `https://whoza.ai${guidePage.path}`

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: guidePage.metaTitle,
  description: guidePage.metaDescription,
  openGraph: {
    title: guidePage.metaTitle,
    description: guidePage.metaDescription,
    url,
    images: [
      {
        url: "https://whoza.ai/og-image.webp",
        width: 1200,
        height: 630,
        alt: "The Whoza.ai system guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: guidePage.metaTitle,
    description: guidePage.metaDescription,
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 3600

export default function GuideWhatsAppPage() {
  return <GuideShell page={guidePage} />
}
