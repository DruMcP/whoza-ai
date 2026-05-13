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
import { AudioDemo } from "@/components/whoza/audio-demo"
import { TrialExplanation } from "@/components/whoza/trial-explanation"
import { Testimonials } from "@/components/whoza/testimonials"
import { GoogleReviews } from "@/components/whoza/google-reviews"
import { ComparisonTable } from "@/components/whoza/comparison-table"
import { Pricing } from "@/components/whoza/pricing"
import { FAQ } from "@/components/whoza/faq"
import { FinalCTA } from "@/components/whoza/final-cta"
import { Footer } from "@/components/whoza/footer"
import { StickyCTA, FloatingChatWidget } from "@/components/whoza/sticky-cta"
import { TrilletVoiceWidget } from "@/components/whoza/trillet-voice-widget"
import { ClaireDashboard } from "@/components/whoza/claire-dashboard"
import { HomepageSchema } from "@/components/whoza/schema-markup"

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* HOOK - Financial urgency */}
        <Hero />
        <SocialProofBar />
        <SocialProofBand />

        {/* DOMINANT MOMENT - Pain → Solution sequence */}
        <div className="section-divider" />
        <LostRevenueCalculator />

        {/* VIDEO EXPLAINER - See Whoza in action */}
        <div className="section-divider" />
        <VideoExplainer />

        {/* AUDIO DEMO - Hear Katie handle a customer enquiry */}
        <div className="section-divider" />
        <AudioDemo />

        <WhatsAppDelivery />

        {/* PRE-LAUNCH PROOF - Example scenario */}
        <div className="section-divider" />
        <PreLaunchProof />

        {/* HOW IT WORKS - Full visual flow */}
        <div className="section-divider" />
        <HowWhozaWorks />

        {/* EARLY ACCESS - How it works */}
        <div className="section-divider" />
        <TrialExplanation />

        {/* CALL CAPTURE - Choose your voice */}
        <div className="section-divider" />
        <MeetTheTeam />

        {/* VOICE AGENT DEMO - Experience Katie */}
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

        {/* GROWTH ENGINE - Win more jobs */}
        <div className="section-divider" />
        <ReviewsEngine />
        <GrowthEngine />

        {/* DASHBOARD — See your ROI + Claire Reviews */}
        <div className="section-divider" />
        <DashboardPreview />
        <ClaireDashboard />
        
        {/* STATS — Key metrics */}
        <div className="section-divider" />
        <StatsBand />

        {/* PROOF - Social proof */}
        <div className="section-divider" />
        <Testimonials />
        <GoogleReviews />

        {/* WHY US - Comparison */}
        <div className="section-divider" />
        <ComparisonTable />

        {/* OFFER - Pricing (no-brainer) */}
        <div className="section-divider" />
        <Pricing />

        {/* OBJECTIONS - FAQ */}
        <div className="section-divider" />
        <FAQ />

        {/* CLOSE - Hard close */}
        <div className="section-divider" />
        <FinalCTA />
      </main>

      <Footer />
      <HomepageSchema />
      <FloatingChatWidget />
    </>
  )
}
