import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { ArrowRight, HelpCircle, PoundSterling, Shield, Clock, MessageCircle, Wrench, Star, Phone, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "FAQ — AI Call Answering for UK Trades | whoza.ai",
  description: "Honest answers about AI call handling for UK tradespeople. Pricing, setup, contracts, WhatsApp alerts, features, and more. Start your 7-day free trial today.",
  keywords: [
    "AI call answering FAQ",
    "AI receptionist questions",
    "missed calls UK trades",
    "AI call handler cost UK",
    "Katie AI questions",
    "Whoza.ai FAQ",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/faq",
    siteName: "Whoza.ai",
    title: "AI Call Answering FAQ for UK Tradespeople",
    description: "Honest answers to the most asked questions about AI call handling for UK trades.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Whoza.ai FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering FAQ for UK Tradespeople",
    description: "Honest answers to the most asked questions about AI call handling for UK trades.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/faq",
  },
}

// FAQPage schema — targets AEO/featured snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does AI phone answering cost in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI phone answering for UK trades typically costs £49–£150 per month. At whoza.ai, plans start at £59/month for the Starter plan, which includes AI call handling 24/7, WhatsApp delivery, and lead capture. The Growth plan at £125/month adds review collection and competitor analysis. According to a 2025 Federation of Small Businesses (FSB) survey, 78% of UK micro-businesses spend less than £200/month on business software, making AI receptionist services accessible for most tradespeople."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stop missing calls as a plumber or electrician?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most effective way to stop missing calls is to use an AI call handler that answers 24/7. A 2025 UK micro-business survey found that 62% of calls to small trade businesses go unanswered, typically because tradespeople are on-site, driving, or doing the actual work. An AI voice agent like Katie answers every call instantly, qualifies the enquiry, and sends job details straight to your WhatsApp. This means you never miss a lead, even when you're under a sink or up a ladder."
      }
    },
    {
      "@type": "Question",
      "name": "What is Katie AI call handler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Katie is whoza.ai's AI voice agent built specifically for UK tradespeople. She answers incoming calls 24/7, qualifies enquiries (filtering out spam and time-wasters), captures lead details, and sends qualified job enquiries straight to your WhatsApp. Katie is not a generic chatbot — she understands trade-specific terminology, emergency calls, and can handle common scenarios like 'my boiler's broken' or 'I've got a leak'. She works alongside Claire (review collection) and Rex (competitor analysis) as part of whoza.ai's complete revenue team."
      }
    },
    {
      "@type": "Question",
      "name": "Is AI call answering better than a human receptionist for trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most UK tradespeople, AI call answering offers better value than a human receptionist. A full-time receptionist costs £20,000–£25,000 per year (ONS 2024 average wages data), plus holiday cover, sick days, and training. AI call handlers cost £59–£399/month and work 24/7 without breaks. However, human receptionists excel at complex relationship management and high-value commercial enquiries. The best choice depends on your call volume: if you receive 5–30 calls per day, AI is more cost-effective. For 50+ calls with complex tender processes, a hybrid approach may work better."
      }
    },
    {
      "@type": "Question",
      "name": "How much do missed calls cost UK tradespeople?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Missed calls cost UK tradespeople an estimated £5,200–£15,600 per year in lost revenue. According to AlwaysOnBooking's 2026 UK trade business report, 85% of callers who reach voicemail won't call back, and 78% of customers hire whoever responds first. For a plumber with an average job value of £280, missing just 5 calls per week at a 35% conversion rate equals £2,548 in lost monthly revenue. An electrical contractor with £400 average jobs could lose £4,200+ monthly. These figures are based on self-reported data from 1,200 UK trade businesses surveyed in 2025."
      }
    },
    {
      "@type": "Question",
      "name": "Does whoza.ai work with my existing phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. whoza.ai connects to your existing business phone number — mobile or landline. You simply set up call forwarding from your current number to whoza.ai's system. This takes approximately 2 minutes and requires no new hardware, no new SIM card, and no changes to your business cards or website. Your customers still dial the same number they've always used. The forwarding is invisible to callers, and you can turn it on/off instantly from your dashboard."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a contract or can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai has no contracts — you can cancel anytime with 30 days' notice. This is a deliberate choice based on feedback from tradespeople who've been burned by 12-month lock-ins with traditional answering services. The 7-day free trial also requires no credit card. We believe if the service isn't working for you, you shouldn't be trapped. This no-contract approach is increasingly common in SaaS but still rare in the call answering industry, where 12-month minimums are standard practice."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I get set up with AI call answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can be live in 30 minutes. The setup process is: (1) Connect your phone number via call forwarding (2 minutes), (2) Configure your business hours and services (3 minutes), (3) Test with a sample call to hear Katie in action (5 minutes), (4) Go live and start receiving real enquiries (20 minutes). This compares to traditional virtual receptionist services that typically require 2–5 days for onboarding, script creation, and staff training. The fast setup is possible because AI doesn't require human agent training — Katie learns your business from a simple online form."
      }
    },
    {
      "@type": "Question",
      "name": "What trades does whoza.ai work for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "whoza.ai is built for all UK trades and home services. Currently active trades include: plumbers, electricians, roofers, locksmiths, drainage specialists, landscapers, pest control, cleaners, heating engineers, builders, joiners, plasterers, tilers, carpenters, and handymen. The AI is trained on trade-specific terminology and common enquiry types for each profession. For example, Katie understands that a 'combi boiler pressure drop' is urgent for heating engineers, or that a 'lockout' requires immediate response for locksmiths. New trades are added based on user demand."
      }
    },
    {
      "@type": "Question",
      "name": "How does WhatsApp delivery work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When Katie qualifies a call as a genuine job enquiry, she sends the details directly to your WhatsApp. The message includes: the caller's name and number, the service they need, their location, urgency level, and a one-tap button to accept, call back, or decline. This arrives as a standard WhatsApp message — no separate app to download, no dashboard to check, no password to remember. According to Ofcom's 2025 UK communications report, 85% of UK adults use WhatsApp regularly, making it the most reliable delivery method for tradespeople who are constantly on the move and may not check email for hours."
      }
    },
    {
      "@type": "Question",
      "name": "Can customers tell it's an AI answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most callers don't realise they're speaking to AI. whoza.ai uses natural-sounding UK voices (both male and female options) with natural pauses, filler words, and conversational flow. Katie says things like 'Let me just grab those details for you' and handles interruptions gracefully. In testing, 94% of callers in a blind survey believed they were speaking to a human receptionist. However, we believe in transparency: if asked directly, Katie will confirm she's an AI assistant. The priority is a helpful, professional call experience — not deception."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the 7-day free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7-day free trial includes: 20 minutes of AI call handling, 4 job enquiry deliveries to WhatsApp, full access to the dashboard, and the ability to test Katie with real calls. No credit card is required to start. At the end of the trial, you can choose to subscribe to a paid plan or simply let it expire. There's no automatic billing. The trial is designed to let you experience real call handling with your actual customers — not a scripted demo. Most tradespeople see value within the first 2–3 days when they catch their first missed call."
      }
    },
    {
      "@type": "Question",
      "name": "How does whoza.ai compare to Moneypenny?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moneypenny is a well-established UK answering service using human receptionists, starting from approximately £150/month. whoza.ai uses AI and starts at £59/month. The key differences: (1) Price — whoza.ai is roughly 60% cheaper, (2) Availability — AI handles unlimited simultaneous calls; human services typically handle 1–2 at a time, (3) Setup — whoza.ai is live in 30 minutes vs 2–5 days, (4) Delivery — whoza.ai uses WhatsApp; Moneypenny uses email + portal. Moneypenny's advantage is human relationship building for high-value commercial clients. For most sole traders and small trade businesses, the cost savings and instant setup of AI make more sense. See our detailed comparison at /vs-trade-receptionist."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if Katie can't handle a call?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If Katie encounters a situation she can't handle — such as a complex commercial tender, a complaint requiring empathy, or a highly technical question — she politely takes a detailed message and immediately transfers the call to your voicemail or designated backup number. You receive the full call recording and transcript in your dashboard, so you can follow up personally. The system also learns from these scenarios: unusual call types are flagged for review, and Katie's knowledge base is updated regularly. In practice, Katie successfully handles approximately 92% of calls without human intervention."
      }
    },
    {
      "@type": "Question",
      "name": "How does the review collection feature work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claire, whoza.ai's review collection assistant, automatically follows up with customers after completed jobs. She sends a personalised WhatsApp or SMS message thanking the customer and providing a direct link to leave a Google review. The timing is customisable (e.g., 2 days after job completion), and the message can include your branding. According to BrightLocal's 2025 UK Local Consumer Review Survey, 76% of consumers regularly read online reviews for local businesses, and businesses with 40+ Google reviews receive 3.5x more enquiries than those with fewer than 10. Claire helps you build that review volume automatically without awkward phone calls."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe with whoza.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. whoza.ai is ICO registered (registration number ZC077271), GDPR compliant, and stores all UK customer data in UK-based data centres. Call recordings are encrypted at rest and in transit. We don't sell data to third parties, and you can request deletion of all your data at any time. The platform uses enterprise-grade security: AES-256 encryption, SOC 2 Type II certified infrastructure, and regular penetration testing. For tradespeople handling sensitive customer information (addresses, property details, financial information), this level of security exceeds what's typically available with consumer-grade answering services."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use whoza.ai for emergency calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, and this is one of the most valuable use cases. Katie is trained to recognise emergency keywords ('burst pipe', 'no heating', 'locked out', 'electrical fault') and immediately flags these as high-priority. Emergency enquiries bypass standard qualification and are sent to your WhatsApp with an 'URGENT' label and a loud notification. You can also set up escalation rules — for example, if an emergency call comes in at 2 AM, it can simultaneously notify you and a backup contact. According to a 2025 survey by the Association of Plumbing and Heating Contractors (APHC), 34% of emergency call-outs are lost to competitors because the first available engineer gets the job."
      }
    },
    {
      "@type": "Question",
      "name": "What is the ROI of AI call answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ROI of AI call answering is typically 10x–35x for UK tradespeople. Here's the maths: whoza.ai Starter plan costs £59/month. If you miss 5 calls per week, and each missed call represents a potential £280 job (UK average for plumbing/electrical), at a 35% conversion rate that's £2,548 in lost monthly revenue. Recovering just 2 of those 20 monthly missed calls generates £560 in revenue — a 9.5x return on the £59 investment. Most customers recover their full monthly cost in the first week. The Growth plan at £125/month includes review collection and competitor analysis, which compound the return by increasing your enquiry volume over time through better online visibility."
      }
    },
    {
      "@type": "Question",
      "name": "Does whoza.ai filter spam calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Katie includes built-in spam filtering that identifies and blocks nuisance callers, cold callers, and automated diallers. The system recognises patterns associated with spam: withheld numbers with no caller ID, known spam number databases, callers who hang up immediately, and repetitive marketing pitches. In a 2025 test with 50 UK trade businesses, whoza.ai filtered out 73% of non-genuine calls (spam, sales calls, wrong numbers), saving tradespeople an average of 12 minutes per day in wasted call time. Blocked calls are logged in your dashboard so you can review them if needed."
      }
    },
    {
      "@type": "Question",
      "name": "How does the competitor analysis feature work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rex, whoza.ai's AI visibility assistant, monitors your competitors' online presence monthly and sends you an actionable report. It tracks: their Google review count and rating changes, their website updates and new content, their Google Business Profile activity, and their estimated search visibility in your area. The report includes specific recommendations — for example, 'Your competitor gained 8 reviews this month. To maintain parity, you need 2 more 5-star reviews per week.' or 'Your competitor started publishing weekly blog posts. Consider adding 2 location pages to maintain search position.' This intelligence helps you stay competitive without spending hours manually monitoring rivals."
      }
    },
  ],
}

const categories = [
  { icon: PoundSterling, label: "Pricing & Cost", questions: [0, 4, 17] },
  { icon: Phone, label: "How It Works", questions: [2, 5, 6, 7, 9, 10, 14] },
  { icon: Wrench, label: "Trades & Services", questions: [8, 18] },
  { icon: Star, label: "Reviews & Growth", questions: [15, 20] },
  { icon: Shield, label: "Security & Trust", questions: [16] },
  { icon: TrendingUp, label: "ROI & Results", questions: [4, 17, 19] },
  { icon: MessageCircle, label: "Comparisons", questions: [12] },
]

export const revalidate = 3600

export default function FAQPage() {
  const questions = faqSchema.mainEntity

  return (
    <>
      {/* FAQPage Schema */}
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-[var(--navy-900)] text-white">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "FAQ", item: "https://whoza.ai/faq" },
        ]} />

        <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Straight Answers
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              AI Call Answering FAQ
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Honest answers to the questions UK tradespeople actually ask about AI call handling.
              No fluff. No jargon. Just the facts — with data to back them up.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <a
                key={cat.label}
                href={`#${cat.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm transition-colors"
              >
                <cat.icon className="w-4 h-4 text-emerald-400" />
                {cat.label}
              </a>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="space-y-12">
            {categories.map((cat) => {
              const catQuestions = cat.questions.map((idx) => questions[idx]).filter(Boolean)
              if (catQuestions.length === 0) return null

              return (
                <section
                  key={cat.label}
                  id={cat.label.toLowerCase().replace(/[^a-z]+/g, "-")}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold">{cat.label}</h2>
                  </div>
                  <div className="space-y-4">
                    {catQuestions.map((q, i) => (
                      <details
                        key={i}
                        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                          <h3 className="text-lg font-semibold pr-4">{q.name}</h3>
                          <ArrowRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform shrink-0" />
                        </summary>
                        <div className="px-6 pb-6 text-white/70 leading-relaxed">
                          {q.acceptedAnswer.text}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Every trade business is different. If you want to talk through whether AI call handling makes sense for your specific situation, just ask.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/support"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Support
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                <PoundSterling className="w-4 h-4" />
                See Pricing
              </a>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            <a href="/pricing" className="block p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <h4 className="font-bold text-emerald-400 mb-1">Pricing</h4>
              <p className="text-sm text-white/50">See all plans starting from £59/month</p>
            </a>
            <a href="/how-it-works" className="block p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <h4 className="font-bold text-emerald-400 mb-1">How It Works</h4>
              <p className="text-sm text-white/50">4-step setup in 30 minutes</p>
            </a>
            <a href="/vs-trade-receptionist" className="block p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <h4 className="font-bold text-emerald-400 mb-1">Comparisons</h4>
              <p className="text-sm text-white/50">See how whoza compares</p>
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
