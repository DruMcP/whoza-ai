import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ReferralClient } from "@/components/whoza/referral-client"

export const metadata: Metadata = {
  title: "Refer a Trade — Get Free Months | Whoza.ai",
  description: "Refer a fellow tradesperson to Whoza.ai and get a free month for every friend who signs up. No limits. Stack your rewards.",
  openGraph: {
    title: "Refer a Trade — Get Free Months | Whoza.ai",
    description: "Refer a fellow tradesperson to Whoza.ai and get a free month for every friend who signs up. No limits. Stack your rewards.",
    url: "https://whoza.ai/refer",
  },
  alternates: {
    canonical: "https://whoza.ai/refer",
  },
}

export default function ReferPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Refer a Trade", item: "https://whoza.ai/refer" },
      ]} />
      <Header />
      <main id="main-content" role="main">
        <ReferralClient />
      </main>
      <Footer />
    </>
  )
}
