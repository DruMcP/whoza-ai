"use client"

import { Header } from "@/components/whoza/header"
import { Hero } from "@/components/whoza/hero"
import { SocialProofBar } from "@/components/whoza/social-proof-bar"
import { SocialProofBand, StatsBand } from "@/components/whoza/social-proof"
import { VideoExplainer } from "@/components/whoza/video-explainer"
import { HowWhozaWorks } from "@/components/whoza/how-whoza-works"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
import { WhatsAppDelivery } from "@/components/whoza/whatsapp-delivery"
import { PreLaunchProof } from "@/components/whoza/pre-launch-proof"
import { ControlSection } from "@/components/whoza/control-section"
import { ReviewsEngine } from "@/components/whoza/reviews-engine"
import { GrowthEngine } from "@/components/whoza/growth-engine"
import { DashboardPreview } from "@/components/whoza/dashboard-preview"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
// import { AudioDemo } from "@/components/whoza/audio-demo" // removed for soft launch
import { TrialExplanation } from "@/components/whoza/trial-explanation"
import { Testimonials } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
import dynamic from "next/dynamic"

const TrilletVoiceWidget = dynamic(
  () => import("@/components/whoza/trillet-voice-widget").then((mod) => mod.TrilletVoiceWidget),
  { ssr: false, loading: () => <p className="text-white/60 text-sm">Loading demo...</p> }
)

import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ClaireDashboard } from "@/components/whoza/claire-dashboard"
import { HomepageSchema } from "@/components/whoza/schema-markup"
import { ExitIntentModal } from "@/components/whoza/exit-intent-modal"

export default function Home() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[{ name: "Home", item: "https://whoza.ai" }]} />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HOOK - Hero with clean hierarchy */}
        <Hero />
        <SocialProofBar />
        <SocialProofBand />

        {/* EDUCATE - How the system works */}
        <div className="section-divider" />
        <HowWhozaWorks />

        {/* HOW IT WORKS - Setup process */}
        <div className="section-divider" />
        <TrialExplanation />

        {/* DIFFERENTIATE - Meet the team */}
        <div className="section-divider" />
        <MeetTheTeam />

        {/* SHOW - Video explainer + demos */}
        <div className="section-divider" />
        <VideoExplainer />
        <WhatsAppDelivery />

        {/* EXAMPLE SCENARIO - Day in the life */}
        <div className="section-divider" />
        <PreLaunchProof />

        {/* LIVE DEMO */}
        <div className="section-divider" />
        <section className="py-12 bg-[var(--navy-900)] dark-section">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm mb-4">Experience the demo — no signup needed</p>
            <TrilletVoiceWidget buttonLabel="Talk to Katie" />
          </div>
        </section>

        {/* CONTROL - You stay in control */}
        <div className="section-divider" />
        <ControlSection />

        {/* FEATURES - Reviews + Growth */}
        <div className="section-divider" />
        <ReviewsEngine />
        <GrowthEngine />

        {/* DASHBOARD — See your ROI + Claire Reviews */}
        <div className="section-divider" />
        <DashboardPreview />
        <ClaireDashboard />

        {/* URGENCY - Lost revenue + Stats */}
        <div className="section-divider" />
        <LostRevenueCalculator />
        <div className="section-divider" />
        <StatsBand />

        {/* COMPARE - Why Whoza Wins */}
        <div className="section-divider" />
        <ComparisonTable />

        {/* DECIDE - Pricing */}
        <div className="section-divider" />
        <Pricing />

        {/* OBJECTIONS - FAQ (with Pricing) */}
        <div className="section-divider" />
        <FAQ />

        {/* VALIDATE - Social proof */}
        <div className="section-divider" />
        <Testimonials />
        <GoogleReviews />

        {/* CLOSE - Hard close */}
        <div className="section-divider" />
        <FinalCTA />
      </main>

      <Footer />
      <HomepageSchema />
      <FloatingChatWidget />
      <ExitIntentModal />
    </>
  )
}
