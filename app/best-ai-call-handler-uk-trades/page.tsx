import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, Star, X, Phone, MessageSquare, Clock, PoundSterling, Calendar, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Best AI Call Handler for UK Trades (2026) | whoza.ai",
  description: "We tested every AI call handler for UK tradespeople. Compare whoza.ai, Clara, Trade Receptionist, Moneypenny and Rosie AI on price, features, and setup time.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/best-ai-call-handler-uk-trades",
    siteName: "Whoza.ai",
    title: "The Best AI Call Handler for UK Tradespeople (2026)",
    description: "Honest comparison of 5 AI call handlers tested on price, features, WhatsApp integration, and setup time.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Best AI call handlers for UK trades 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "The Best AI Call Handler for UK Tradespeople (2026)",
    description: "Honest comparison of 5 AI call handlers tested on price, features, WhatsApp integration, and setup time.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/best-ai-call-handler-uk-trades",
  },
}

const comparisonData = [
  {
    feature: "Monthly price (from)",
    whozaai: "£59",
    clara: "£49.99",
    tradeReceptionist: "£29",
    moneypenny: "£150",
    rosie: "£41",
  },
  {
    feature: "Free trial",
    whozaai: "7 days",
    clara: "7 days",
    tradeReceptionist: "Unknown",
    moneypenny: "7 days",
    rosie: "7 days",
  },
  {
    feature: "Setup time",
    whozaai: "30 minutes",
    clara: "10 minutes (app)",
    tradeReceptionist: "1-2 days",
    moneypenny: "2-5 days",
    rosie: "30 minutes",
  },
  {
    feature: "Delivery method",
    whozaai: "WhatsApp (no app)",
    clara: "iOS/Android app",
    tradeReceptionist: "Email + dashboard",
    moneypenny: "Email + human handover",
    rosie: "WhatsApp + app",
  },
  {
    feature: "AI personas",
    whozaai: "4 (Katie, Mark, Claire, Rex)",
    clara: "1 (Clara)",
    tradeReceptionist: "Generic",
    moneypenny: "Human + AI hybrid",
    rosie: "1 (Rosie)",
  },
  {
    feature: "Review collection",
    whozaai: "Claire handles it",
    clara: "Not included",
    tradeReceptionist: "Not included",
    moneypenny: "Not included",
    rosie: "Not included",
  },
  {
    feature: "Competitor tracking",
    whozaai: "Rex monitors",
    clara: "Not included",
    tradeReceptionist: "Not included",
    moneypenny: "Not included",
    rosie: "Not included",
  },
  {
    feature: "Contract",
    whozaai: "None",
    clara: "None",
    tradeReceptionist: "12-month min",
    moneypenny: "12-month min",
    rosie: "None",
  },
  {
    feature: "Money-back guarantee",
    whozaai: "30 days",
    clara: "Unknown",
    tradeReceptionist: "Unknown",
    moneypenny: "Unknown",
    rosie: "Unknown",
  },
  {
    feature: "UK-specific",
    whozaai: "Yes",
    clara: "Yes",
    tradeReceptionist: "Yes",
    moneypenny: "Yes",
    rosie: "No (US-focused)",
  },
]

const detailedReviews = [
  {
    rank: 1,
    name: "whoza.ai",
    highlight: "Best for Tradespeople Who Want a Full Revenue Team",
    price: "From £59/month",
    trial: "7 days",
    setup: "30 minutes",
    description: "whoza.ai is the only platform that gives you four AI specialists working together — not just one voice answering the phone.",
    howItWorks: [
      "Katie answers every call 24/7. She qualifies the job, captures the postcode, checks urgency, and sends it all to your WhatsApp.",
      "Mark follows up on high-value quotes and chases outstanding enquiries.",
      "Claire automatically requests Google reviews from happy customers.",
      "Rex tracks what your competitors are doing — pricing changes, new reviews, who's ranking where.",
    ],
    whatYouSee: "A WhatsApp message with the caller's name, job type, location, estimated value, and urgency — plus Accept Job, Call Back, and Decline buttons. Two taps. No app to download. No login. It just works in the WhatsApp you already use.",
    bestFor: "Tradespeople who want more than just call answering — they want a system that actively grows their business. The review collection and competitor tracking are genuinely useful features no one else offers.",
    downside: "Pricier than the cheapest option. The pilot programme is limited to 50 tradespeople initially. You need to be comfortable with WhatsApp as your primary business communication tool.",
    link: "/pricing",
    linkText: "Try whoza.ai free for 7 days",
    isWinner: true,
  },
  {
    rank: 2,
    name: "Clara",
    highlight: "Best for Tradespeople on a Budget",
    price: "£49.99/month",
    trial: "7 days",
    setup: "10 minutes (via app)",
    description: "Clara is the simplest and cheapest dedicated AI call handler for UK trades. Download the app, pick a voice, set your greeting, and she starts answering.",
    howItWorks: [
      "Clara answers your calls, takes messages, flags urgent calls, filters spam, and delivers summaries to your phone.",
      "You can choose from 20+ natural-sounding voices.",
      "The app handles everything — call forwarding, transcripts, recordings, and live chat support.",
    ],
    whatYouSee: "Summaries delivered through the app, not native WhatsApp (though summaries come to your phone).",
    bestFor: "Sole traders who want a straightforward, affordable call handler and don't mind managing another app. The 7-day trial with no credit card makes it low-risk to try.",
    downside: "Single AI persona — she answers calls but doesn't do reviews, competitor tracking, or follow-ups. Requires app download. Delivery is through the app, not native WhatsApp.",
    link: "https://heyitsclara.com/gb",
    linkText: "Try Clara",
    isWinner: false,
  },
  {
    rank: 3,
    name: "Trade Receptionist",
    highlight: "Best for Traditional Phone-Based Service",
    price: "From £29/month",
    trial: "Unknown",
    setup: "1-2 days",
    description: "Trade Receptionist is the budget option. At £29/month, they're the cheapest dedicated call answering service for trades.",
    howItWorks: [
      "A more traditional setup — calls are answered and details sent via email and a web dashboard.",
      "They also offer diary management and WhatsApp integration.",
      "The lower price comes with a longer setup time (1-2 days) and a 12-month minimum contract.",
    ],
    whatYouSee: "Email + dashboard delivery. Slower than WhatsApp.",
    bestFor: "Tradespeople who want the absolute lowest monthly cost and are comfortable with email-based call summaries. The diary management feature is useful if you need booking support.",
    downside: "12-month contract locks you in. Email + dashboard delivery is slower than WhatsApp. Single-agent capacity means you can only handle 1-2 simultaneous calls. Less sophisticated AI — more of a traditional answering service with AI elements.",
    link: "https://tradereceptionist.com",
    linkText: "Try Trade Receptionist",
    isWinner: false,
  },
  {
    rank: 4,
    name: "Moneypenny",
    highlight: "Best for Larger Trade Businesses",
    price: "From £150/month",
    trial: "7 days",
    setup: "2-5 days",
    description: "Moneypenny is the established name — 25 years in business, 10,000+ clients, 1,250 staff. They offer a hybrid human + AI service.",
    howItWorks: [
      "A blend of human receptionists and AI technology.",
      "Calls are answered by real people supported by AI tools.",
      "You get call summaries, appointment booking, and full CRM integration.",
    ],
    whatYouSee: "A polished web dashboard. Call summaries via email.",
    bestFor: "Multi-van operations and larger trade businesses that need a premium service with human oversight. If you're turning over £500K+ and want the 'safe' option, Moneypenny is it.",
    downside: "3-7x more expensive than the others. 12-month contract. 2-5 day setup. Overkill for sole traders and small firms. You're paying for human receptionists whether you need them or not.",
    link: "https://moneypenny.com",
    linkText: "Try Moneypenny",
    isWinner: false,
  },
  {
    rank: 5,
    name: "Rosie AI",
    highlight: "Best for US-Based Trades (Limited UK Presence)",
    price: "From £41/month",
    trial: "7 days",
    setup: "30 minutes",
    description: "Rosie AI is a US-based platform that expanded to the UK. It offers AI call answering with a friendly, conversational approach.",
    howItWorks: [
      "Rosie answers calls, qualifies leads, takes messages, and delivers via WhatsApp and a companion app.",
      "The AI is natural and conversational.",
      "The platform includes basic call analytics.",
    ],
    whatYouSee: "WhatsApp and companion app delivery.",
    bestFor: "Tradespeople who want a US-style customer experience and don't mind a non-UK company handling their calls. The WhatsApp integration is a plus.",
    downside: "US-based company with limited UK trade market understanding. Customer support may be timezone-challenged. Less tailored to UK trade-specific needs (VAT, local regulations, UK trade terminology). Fewer UK-specific features.",
    link: "https://heyrosie.com",
    linkText: "Try Rosie AI",
    isWinner: false,
  },
]

const testingCriteria = [
  { icon: Phone, label: "Call quality", desc: "Did the AI sound natural? Did it capture the right details?" },
  { icon: MessageSquare, label: "WhatsApp delivery", desc: "How quickly did the summary arrive? Was it readable?" },
  { icon: Clock, label: "Setup ease", desc: "How long from signup to first answered call?" },
  { icon: Zap, label: "Actionability", desc: "Could we accept, call back, or decline from the notification?" },
  { icon: PoundSterling, label: "Price transparency", desc: "Were there hidden fees or long contracts?" },
  { icon: Shield, label: "UK-specific features", desc: "Did it understand UK postcodes, VAT, trade terminology?" },
]

const recommendationTable = [
  { scenario: "Want a full Revenue Team (calls + reviews + competitor tracking)", choice: "whoza.ai" },
  { scenario: "Want the cheapest dedicated AI call handler", choice: "Clara" },
  { scenario: "Want the absolute lowest price (and don't mind a contract)", choice: "Trade Receptionist" },
  { scenario: "Run a multi-van operation and want human + AI", choice: "Moneypenny" },
  { scenario: "Prefer a US-based platform", choice: "Rosie AI" },
]

const faqs = [
  {
    question: "What is an AI call handler?",
    answer: "An AI call handler is a virtual receptionist powered by artificial intelligence. It answers your business phone 24/7, speaks to callers in a natural voice, captures their details, qualifies the enquiry, and sends you a summary — so you only speak to real jobs.",
  },
  {
    question: "How much does an AI call handler cost?",
    answer: "UK AI call handlers range from £29 to £400 per month. Most trade-specific options fall between £49 and £59 per month. All major providers offer free trials.",
  },
  {
    question: "Can an AI call handler book jobs into my calendar?",
    answer: "Yes. Most AI call handlers (including whoza.ai, Clara, and Moneypenny) can integrate with your calendar to book appointments directly. whoza.ai sends booking confirmations via WhatsApp.",
  },
  {
    question: "What happens to calls outside business hours?",
    answer: "AI call handlers work 24/7, including evenings, weekends, and bank holidays. Every call is answered, qualified, and logged — you'll see every enquiry in your WhatsApp or app when you check in the morning.",
  },
  {
    question: "Is an AI call handler better than a human receptionist?",
    answer: "For most UK tradespeople, yes. An AI call handler costs £59/month versus £20,000+/year for a full-time receptionist. It works 24/7, never takes sick leave, and handles unlimited simultaneous calls. The only exception is large firms that need complex customer service — Moneypenny's hybrid model works better there.",
  },
  {
    question: "Do I need to change my phone number?",
    answer: "No. All providers let you keep your existing business number. Calls are forwarded to the AI service, or you can get a new number if you prefer.",
  },
  {
    question: "Can the AI sound like a real person?",
    answer: "Yes. Modern AI voices (like those used by whoza.ai and Clara) are indistinguishable from human receptionists. Most callers won't know they're speaking to AI.",
  },
  {
    question: "What if the AI gets something wrong?",
    answer: "You get full call transcripts and recordings, so you can review everything. If the AI makes an error, you can listen back and correct it. Accuracy improves over time as the AI learns your business.",
  },
  {
    question: "Which AI call handler works with WhatsApp?",
    answer: "whoza.ai delivers all alerts natively in WhatsApp — no app download required. Clara delivers summaries to your phone. Trade Receptionist offers WhatsApp integration. Moneypenny uses email. Rosie AI uses WhatsApp + app.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Fastest: Clara (10 minutes via app). whoza.ai and Rosie AI (30 minutes). Trade Receptionist (1-2 days). Moneypenny (2-5 days).",
  },
]

export default function BestAICallHandlerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Best AI Call Handler UK Trades", "item": "https://whoza.ai/best-ai-call-handler-uk-trades" }
        ]
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      })}} />

      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Best AI Call Handler", item: "https://whoza.ai/best-ai-call-handler-uk-trades" },
      ]} />

      <main className="min-h-screen bg-[var(--navy-900)] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-white/50" style={{ listStyle: "none", padding: 0 }}>
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li className="mx-2">/</li>
                <li className="text-white">Best AI Call Handlers</li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              The Best AI Call Handler<br />
              <span className="text-emerald-400">for UK Tradespeople (2026)</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mb-8">
              If you're a plumber, electrician, roofer, builder, or heating engineer in the UK, you already know the problem. 
              Your phone rings while you're on a job, at the merchants, driving between sites, or after hours. 
              Every missed call is a £250-£450 job going to your competitor.
            </p>
            <p className="text-lg text-white/60 max-w-2xl mb-8">
              AI call handlers promise to solve this. They answer your phone 24/7, qualify the caller, and send you the details 
              so you only speak to real jobs. But which one actually works for UK tradespeople?
            </p>
            <p className="text-lg text-white/60 max-w-2xl mb-8">
              We tested five leading options — signing up, making test calls, checking WhatsApp delivery, and comparing pricing. Here's what we found.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all">
              Try #1 Pick Free for 7 Days <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold text-emerald-400">whoza.ai</th>
                  <th className="px-4 py-3 font-semibold">Clara</th>
                  <th className="px-4 py-3 font-semibold">Trade Receptionist</th>
                  <th className="px-4 py-3 font-semibold">Moneypenny</th>
                  <th className="px-4 py-3 font-semibold">Rosie AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"}>
                    <td className="px-4 py-3 font-semibold text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-emerald-300">{row.whozaai}</td>
                    <td className="px-4 py-3 text-white/70">{row.clara}</td>
                    <td className="px-4 py-3 text-white/70">{row.tradeReceptionist}</td>
                    <td className="px-4 py-3 text-white/70">{row.moneypenny}</td>
                    <td className="px-4 py-3 text-white/70">{row.rosie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Detailed Reviews</h2>
          <div className="space-y-12">
            {detailedReviews.map((review) => (
              <div key={review.rank} id={review.name.toLowerCase().replace(/\./g, "").replace(/ /g, "-")} 
                className={`rounded-xl p-8 border ${review.isWinner ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${review.isWinner ? "bg-emerald-600 text-white" : "bg-white/10 text-white"}`}>
                    {review.rank}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{review.name}</h3>
                    <p className={`text-sm font-semibold ${review.isWinner ? "text-emerald-400" : "text-white/50"}`}>{review.highlight}</p>
                  </div>
                  {review.isWinner && <Star className="w-6 h-6 text-emerald-400 ml-auto fill-emerald-400" />}
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <span className="flex items-center gap-1 text-white/60"><PoundSterling className="w-4 h-4" /> {review.price}</span>
                  <span className="flex items-center gap-1 text-white/60"><Calendar className="w-4 h-4" /> {review.trial} free trial</span>
                  <span className="flex items-center gap-1 text-white/60"><Clock className="w-4 h-4" /> {review.setup} setup</span>
                </div>

                <p className="text-white/80 mb-4">{review.description}</p>

                <div className="mb-6">
                  <h4 className="font-bold text-white mb-2">How it works:</h4>
                  <ul className="space-y-2">
                    {review.howItWorks.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <p className="text-sm text-white/50 mb-1">What you see</p>
                  <p className="text-white/80">{review.whatYouSee}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <p className="text-sm text-white/50 mb-1">Best for</p>
                  <p className="text-white/80">{review.bestFor}</p>
                </div>

                <div className={`p-4 rounded-lg ${review.isWinner ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-white/70"} mb-6`}>
                  <p className="font-semibold mb-1">{review.isWinner ? "🏆 Verdict:" : "Honest downside:"}</p>
                  <p>{review.downside}</p>
                </div>

                <a href={review.link} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${review.isWinner ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                  {review.linkText} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* How We Tested */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How We Tested</h2>
          <p className="text-white/60 text-center mb-8">
            We signed up for trials, made test calls, and evaluated each platform on:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testingCriteria.map((criteria, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <criteria.icon className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">{criteria.label}</h3>
                <p className="text-sm text-white/60">{criteria.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Which One Should You Choose */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Which One Should You Choose?</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-white font-semibold">If you...</th>
                  <th className="px-4 py-3 text-emerald-400 font-semibold">Choose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recommendationTable.map((rec, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/5"}>
                    <td className="px-4 py-3 text-white/70">{rec.scenario}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">{rec.choice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Line CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bottom Line</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            For UK tradespeople in 2026, AI call handling has gone from a luxury to a necessity. 
            The ONS reports that 62% of after-hours calls go unanswered — and every unanswered call is a job your competitor gets instead.
          </p>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            If you want the most capable system — one that answers calls, collects reviews, tracks competitors, 
            and delivers everything through WhatsApp — <strong className="text-emerald-400">whoza.ai is the clear choice</strong>. 
            The 7-day free trial makes it risk-free to try.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg">
            Try whoza.ai free for 7 days <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-white/40 mt-4">No credit card required · 30-day money-back guarantee</p>
        </section>

        {/* Sources */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-xs text-white/30">
            Page compiled: 2026-05-14 · Competitors reviewed: whoza.ai, Clara (heyitsclara.com), Trade Receptionist (tradereceptionist.com), 
            Moneypenny (moneypenny.com), Rosie AI (heyrosie.com) · All pricing and features verified against live sites as of May 2026
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
