"use client"

import { Header } from "@/components/whoza/header"
import { Hero } from "@/components/whoza/hero"
import { SocialProofBar } from "@/components/whoza/social-proof-bar"
import { SocialProofBand, StatsBand } from "@/components/whoza/social-proof"
import { AudioDemo } from "@/components/whoza/audio-demo"
import { VideoExplainer } from "@/components/whoza/video-explainer"
import { HowWhozaWorks } from "@/components/whoza/how-whoza-works"
import { MeetTheTeam } from "@/components/whoza/meet-the-team"
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
import { HomepageSchema, VideoSchema } from "@/components/whoza/schema-markup"
import { FAQPageSchema } from "@/components/whoza/faq-schema"
import { ExitIntentModal } from "@/components/whoza/exit-intent-modal"


export default function Home() {
  return (
    <>
      <VideoSchema
        name="Whoza.ai 60-Second Demo — Katie Answers Every Call"
        description="Watch Katie, Whoza's AI call handler, capture a missed enquiry in under 60 seconds. The call is answered instantly, the enquiry lands in WhatsApp, Claire requests a review, and Rex delivers growth insights. Built for UK tradespeople."
        embedUrl="https://whoza.ai"
      />
      <Header />
      <BreadcrumbSchema items={[{ name: "Home", item: "https://whoza.ai" }]} />
      <FAQPageSchema
        items={[
          { question: "How much does Whoza cost in total?", answer: "You pay a monthly plan fee (Starter £59, Growth £125, Pro £230, Scale £399). Each plan includes a set number of call handling minutes and booked enquiries. Additional enquiries beyond your included amount are charged per booking. Overage minutes are billed at £0.26 per minute. There are no hidden setup fees or long-term contracts." },
          { question: "Is there a free trial?", answer: "Yes — the 7-day free trial is available on the Starter plan only. Your trial includes 20 minutes of call handling and up to 4 booked enquiries at no charge. No credit card required to start." },
          { question: "How quickly can I get set up?", answer: "Most tradespeople are fully set up in under 30 minutes. You'll forward your existing business number to your new whoza.ai number, customize your agent's greeting, connect your calendar, and you're live. No technical knowledge required." },
          { question: "What trades do you support?", answer: "We support all UK trades including plumbers, electricians, builders, roofers, painters, landscapers, heating engineers, carpenters, tilers, plasterers, locksmiths, drainage specialists, and pest control. Our agents are trained on trade-specific terminology and common customer queries for each profession." },
          { question: "What happens if Katie can't handle a call?", answer: "Katie is trained to recognize when she needs to transfer to a human. For complex queries, emergencies, or if the customer specifically requests you, she'll take a message and notify you immediately via SMS and email. You can call them back within seconds." },
          { question: "Is my data safe and compliant?", answer: "Absolutely. We're fully compliant with all relevant data protection regulations. All call recordings and customer data are encrypted, stored in secure local data centers, and you maintain full control." },
          { question: "Does it work with my existing phone number?", answer: "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number they always have — they just get answered every time instead of hitting voicemail. Setup takes 30 minutes with your phone provider." },
          { question: "Is there a contract?", answer: "No. whoza.ai has no contracts. You're free to cancel anytime with no penalties. We also offer a 30-day money-back guarantee on all plans." },
          { question: "Can I search through my past calls?", answer: "Yes. Katie writes detailed text notes for every call, which you can search by keyword, job type, location, or date in your dashboard. Type 'boiler' to find all boiler-related calls, or 'Bristol' to find all calls from that area. Call notes are stored for 30 days on Starter, 90 days on Growth, and 1 year on Pro." },
          { question: "Can I choose a different voice for my AI?", answer: "Absolutely. We offer 12 different voices with a range of UK accents and tones — from Scottish to Welsh to London. You can preview and change your voice anytime in your dashboard." },
          { question: "What happens if someone leaves a voicemail?", answer: "Our AI detects voicemails, transcribes them to text, and sends the message to your WhatsApp within 60 seconds. If the voicemail mentions an emergency, it's flagged as urgent so you see it immediately. No audio is stored — only text transcripts." },
          { question: "Can I export my call data?", answer: "Yes, on Growth and above. You can export your call logs as CSV or Excel files, filter by date range, job type, and more. We can also automatically email you a monthly export." },
          { question: "Does whoza work with my other business tools?", answer: "Yes. On Growth and above, whoza connects with Zapier and Make, letting you sync enquiries with Google Sheets, Google Calendar, Xero, Mailchimp, and 8,000+ other apps." },
          { question: "What if I want to cancel?", answer: "Cancel anytime — no contracts, no cancellation fees, no hassle. We're confident you'll stay because the system pays for itself many times over, but if it's not right for your business, you can cancel with one click from your dashboard." },
          { question: "What does the free trial include?", answer: "The 7-day free trial is on the Starter plan only. It includes: 20 minutes of AI call handling, up to 4 booked enquiries, full access to the WhatsApp delivery system, and the complete dashboard." },
          { question: "What happens to my data if I cancel?", answer: "You can cancel anytime with one click. Your call recordings, customer data, and enquiry history are yours. We can export your data on request, and all stored data is deleted in line with GDPR requirements after cancellation." },
        ]}
      />

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

        {/* SHOW - Video explainer + Audio demo */}
        <div className="section-divider" />
        <VideoExplainer />
        <AudioDemo />

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
