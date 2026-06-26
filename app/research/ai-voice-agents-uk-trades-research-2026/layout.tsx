import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Voice Agents & Customer Satisfaction | whoza.ai",
  description: "Research-backed analysis of AI voice agents for UK trades. Customer satisfaction data, adoption rates, and ROI insights from 2026 field studies.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
