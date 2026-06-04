import { Metadata } from "next"
import { VoicemailScriptGenerator } from "@/components/tools/voicemail-scripts"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Free Voicemail Script Generator for UK Trades | whoza.ai",
  description: "Generate professional, friendly, or urgent voicemail scripts tailored to your UK trade business. Free tool — no signup required.",
  openGraph: {
    title: "Free Voicemail Script Generator for UK Trades | whoza.ai",
    description: "Generate professional voicemail scripts for your trade business. Friendly, formal, or urgent styles.",
    url: "https://whoza.ai/tools/voicemail-scripts",
    siteName: "Whoza.ai",
    locale: "en_GB",
    type: "website",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Voicemail Script Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "Free Voicemail Script Generator UK Trades | whoza.ai",
    description: "Generate tailored voicemail scripts for your trade business. Free — no signup.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/tools/voicemail-scripts",
  },
}

export default function VoicemailScriptsPage() {
  return <VoicemailScriptGenerator />
}
