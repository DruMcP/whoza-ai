"use client"

import { Header } from "@/components/whoza/header"
import { Hero } from "@/components/whoza/hero"
import { SocialProofBand, StatsBand } from "@/components/whoza/social-proof"
import { HowWhozaWorks } from "@/components/whoza/how-whoza-works"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
import { WhatsAppDelivery } from "@/components/whoza/whatsapp-delivery"
import { PreLaunchProof } from "@/components/whoza/pre-launch-proof"
import { ControlSection } from "@/components/whoza/control-section"
import { ReviewsEngine } from "@/components/whoza/reviews-engine"
import { GrowthEngine } from "@/components/whoza/growth-engine"
import { DashboardPreview } from "@/components/whoza/dashboard-preview"
import { LostRevenueCalculator } from "@/components/whoza/lost-revenue-calculator"
import { AudioDemo } from "@/components/whoza/audio-demo"
import { TrialExplanation } from "@/components/whoza/trial-explanation"
import { TestimonialCarousel } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { TrilletVoiceWidget } from "@/components/whoza/trillet-voice-widget"
import { ClaireDashboard } from "@/components/whoza/claire-dashboard"

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content" role="main">
        {/* HOOK - Financial urgency */}
        <Hero />
        <SocialProofBand />

        {/* DOMINANT MOMENT - Pain → Solution sequence */}
        <LostRevenueCalculator />
        <WhatsAppDelivery />

        {/* PRE-LAUNCH PROOF - Example scenario */}
        <PreLaunchProof />

        {/* HOW IT WORKS - Full visual flow */}
        <HowWhozaWorks />

        {/* TRIAL EXPLANATION - Risk-free trial steps */}
        <TrialExplanation />

        {/* CALL CAPTURE - Choose your voice */}
        <MeetTheTeam />
        <AudioDemo />

        {/* VOICE AGENT DEMO - Talk to Katie live */}
        <section className="py-12 bg-[var(--navy-900)]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm mb-4">Try it now - no signup needed</p>
            <TrilletVoiceWidget buttonLabel="Talk to Katie" />
          </div>
        </section>

        {/* CONTROL - You stay in control */}
        <ControlSection />

        {/* GROWTH ENGINE - Win more jobs */}
        <ReviewsEngine />
        <GrowthEngine />

        {/* DASHBOARD — See your ROI + Claire Reviews */}
        <DashboardPreview />
        <ClaireDashboard />
        
        {/* STATS — Key metrics */}
        <StatsBand />

        {/* PROOF - Social proof */}
        <TestimonialCarousel />
        <GoogleReviews />

        {/* WHY US - Comparison */}
        <ComparisonTable />

        {/* OFFER - Pricing (no-brainer) */}
        <Pricing />

        {/* OBJECTIONS - FAQ */}
        <FAQ />

        {/* CLOSE - Hard close */}
        <FinalCTA />
      </main>

      <Footer />
      <FloatingChatWidget />
      <StickyCTA />
    </>
  )
}
