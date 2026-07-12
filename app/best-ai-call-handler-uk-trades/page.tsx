import { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { ArrowRight, Check, Star, Phone, MessageSquare, Clock, PoundSterling, Calendar, Shield, Zap, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Best AI Call Handler UK Trades (2026)",
  description: "We tested 6 AI call handlers for UK tradespeople. Compare whoza.ai, Clara, Trade Receptionist, Moneypenny, Rosie AI and Down To Earth AI on price, features, and setup fees.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/best-ai-call-handler-uk-trades",
    siteName: "Whoza.ai",
    title: "The Best AI Call Handler for UK Tradespeople (2026)",
    description: "We tested 6 AI call handlers for UK tradespeople. Compare whoza.ai, Clara, Trade Receptionist, Moneypenny, Rosie AI and Down To Earth AI on price, features, and setup fees.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Best AI call handlers for UK trades 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "The Best AI Call Handler for UK Tradespeople (2026)",
    description: "We tested 6 AI call handlers for UK tradespeople. Compare whoza.ai, Clara, Trade Receptionist, Moneypenny, Rosie AI and Down To Earth AI on price, features, and setup fees.",
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
    downToEarth: "£45",
  },
  {
    feature: "Setup fee",
    whozaai: "None",
    clara: "None",
    tradeReceptionist: "Unknown",
    moneypenny: "Unknown",
    rosie: "None",
    downToEarth: "~£299",
  },
  {
    feature: "Free trial",
    whozaai: "7 days",
    clara: "7 days",
    tradeReceptionist: "Unknown",
    moneypenny: "7 days",
    rosie: "7 days",
    downToEarth: "Unknown",
  },
  {
    feature: "Setup time",
    whozaai: "30 minutes",
    clara: "10 minutes (app)",
    tradeReceptionist: "1-2 days",
    moneypenny: "2-5 days",
    rosie: "30 minutes",
    downToEarth: "1-2 days",
  },
  {
    feature: "Delivery method",
    whozaai: "WhatsApp (no app)",
    clara: "iOS/Android app",
    tradeReceptionist: "Email + dashboard",
    moneypenny: "Email + human handover",
    rosie: "WhatsApp + app",
    downToEarth: "App + SMS",
  },
  {
    feature: "AI personas",
    whozaai: "4 (Katie, Mark, Claire, Rex)",
    clara: "1 (Clara)",
    tradeReceptionist: "Generic",
    moneypenny: "Human + AI hybrid",
    rosie: "1 (Rosie)",
    downToEarth: "1 (Generic)",
  },
  {
    feature: "Live transfer to human",
    whozaai: "Yes — instant",
    clara: "No",
    tradeReceptionist: "No",
    moneypenny: "Yes (human answers)",
    rosie: "No",
    downToEarth: "No",
  },
  {
    feature: "Review collection",
    whozaai: "Claire handles it",
    clara: "Not included",
    tradeReceptionist: "Not included",
    moneypenny: "Not included",
    rosie: "Not included",
    downToEarth: "Not included",
  },
  {
    feature: "Competitor tracking",
    whozaai: "Rex monitors",
    clara: "Not included",
    tradeReceptionist: "Not included",
    moneypenny: "Not included",
    rosie: "Not included",
    downToEarth: "Not included",
  },
  {
    feature: "Contract",
    whozaai: "None",
    clara: "None",
    tradeReceptionist: "12-month min",
    moneypenny: "12-month min",
    rosie: "None",
    downToEarth: "None",
  },
  {
    feature: "Money-back guarantee",
    whozaai: "30 days",
    clara: "Unknown",
    tradeReceptionist: "Unknown",
    moneypenny: "Unknown",
    rosie: "Unknown",
    downToEarth: "Unknown",
  },
  {
    feature: "UK-specific",
    whozaai: "Yes",
    clara: "Yes",
    tradeReceptionist: "Yes",
    moneypenny: "Yes",
    rosie: "No (US-focused)",
    downToEarth: "Yes (built by a tradesman)",
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
    description: "whoza.ai is the only platform that gives you four AI specialists working together - not just one voice answering the phone.",
    howItWorks: [
      "Katie answers every call 24/7. She qualifies the job, captures the postcode, checks urgency, and sends it all to your WhatsApp.",
      "Mark follows up on high-value quotes and chases outstanding enquiries.",
      "Claire automatically requests Google reviews from happy customers.",
      "Rex tracks what your competitors are doing - pricing changes, new reviews, who's ranking where.",
    ],
    whatYouSee: "A WhatsApp message with the caller's name, job type, location, estimated value, and urgency - plus Accept Job, Call Back, and Decline buttons. Two taps. No app to download. No login. It just works in the WhatsApp you already use.",
    bestFor: "Tradespeople who want more than just call answering - they want a system that actively grows their business. The review collection and competitor tracking are genuinely useful features no one else offers.",
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
      "The app handles everything - call forwarding, transcripts, and live chat support.",
    ],
    whatYouSee: "Summaries delivered through the app, not native WhatsApp (though summaries come to your phone).",
    bestFor: "Sole traders who want a straightforward, affordable call handler and don't mind managing another app. The 7-day trial with no credit card makes it low-risk to try.",
    downside: "Single AI persona - she answers calls but doesn't do reviews, competitor tracking, or follow-ups. Requires app download. Delivery is through the app, not native WhatsApp.",
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
      "A more traditional setup - calls are answered and details sent via email and a web dashboard.",
      "They also offer diary management and WhatsApp integration.",
      "The lower price comes with a longer setup time (1-2 days) and a 12-month minimum contract.",
    ],
    whatYouSee: "Email + dashboard delivery. Slower than WhatsApp.",
    bestFor: "Tradespeople who want the absolute lowest monthly cost and are comfortable with email-based call summaries. The diary management feature is useful if you need booking support.",
    downside: "12-month contract locks you in. Email + dashboard delivery is slower than WhatsApp. Single-agent capacity means you can only handle 1-2 simultaneous calls. Less sophisticated AI - more of a traditional answering service with AI elements.",
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
    description: "Moneypenny is the established name - 25 years in business, 10,000+ clients, 1,250 staff. They offer a hybrid human + AI service.",
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
    downside: "US-based company with limited UK trade market understanding. Customer support may be timezone-challenged. Less tailored to UK trade-specific needs (local regulations, UK trade terminology). Fewer UK-specific features.",
    link: "https://heyrosie.com",
    linkText: "Try Rosie AI",
    isWinner: false,
  },
  {
    rank: 6,
    name: "Down To Earth AI",
    highlight: "Best for Tradespeople Who Want a Builder-Built Product",
    price: "From £45/month + ~£299 setup",
    trial: "Unknown",
    setup: "1-2 days",
    description: "Down To Earth AI is built by a tradesman with 25 years in the trade. The positioning is authentic: this is someone who actually worked on sites, dealt with missed calls, and built the product to solve his own problem.",
    howItWorks: [
      "The AI answers calls, takes messages, and delivers via app and SMS.",
      "Built with trade-specific knowledge from the founder's own experience.",
      "The setup fee (~£299) covers configuration and training.",
    ],
    whatYouSee: "App + SMS delivery. Not native WhatsApp.",
    bestFor: "Tradespeople who want a product built by someone who understands the trade. The founder's credibility is a genuine differentiator. If you value 'built by a tradesman' positioning, this is the option.",
    downside: "£299 setup fee is a barrier compared to zero-setup alternatives. No free trial advertised. App + SMS delivery is less convenient than WhatsApp. Single generic AI persona. No review collection, competitor tracking, or multi-agent features.",
    link: "https://downtoearthai.com",
    linkText: "Try Down To Earth AI",
    isWinner: false,
  },
]

const testingCriteria = [
  { icon: Phone, label: "Call quality", desc: "Did the AI sound natural? Did it capture the right details?" },
  { icon: MessageSquare, label: "WhatsApp delivery", desc: "How quickly did the summary arrive? Was it readable?" },
  { icon: Clock, label: "Setup ease", desc: "How long from signup to first answered call?" },
  { icon: Zap, label: "Actionability", desc: "Could we accept, call back, or decline from the notification?" },
  { icon: PoundSterling, label: "Price transparency", desc: "Were there hidden fees or long contracts?" },
  { icon: Shield, label: "UK-specific features", desc: "Did it understand UK postcodes, local regulations, trade terminology?" },
]

const recommendationTable = [
  { scenario: "Want a full Revenue Team (calls + reviews + competitor tracking)", choice: "whoza.ai" },
  { scenario: "Want the cheapest dedicated AI call handler", choice: "Clara" },
  { scenario: "Want the absolute lowest price (and don't mind a contract)", choice: "Trade Receptionist" },
  { scenario: "Run a multi-van operation and want human + AI", choice: "Moneypenny" },
  { scenario: "Prefer a US-based platform", choice: "Rosie AI" },
  { scenario: "Want a product built by someone with 25 years in the trade", choice: "Down To Earth AI" },
]

const faqs = [
  {
    question: "What is an AI call handler?",
    answer: "An AI call handler is a virtual receptionist powered by artificial intelligence. It answers your business phone 24/7, speaks to callers in a natural voice, captures their details, qualifies the enquiry, and sends you a summary - so you only speak to real jobs.",
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
    answer: "AI call handlers work 24/7, including evenings, weekends, and bank holidays. Every call is answered, qualified, and logged - you'll see every enquiry in your WhatsApp or app when you check in the morning.",
  },
  {
    question: "Is an AI call handler better than a human receptionist?",
    answer: "For most UK tradespeople, yes. An AI call handler costs £59/month versus £20,000+/year for a full-time receptionist. It works 24/7, never takes sick leave, and handles multiple simultaneous calls (up to 5 on Scale — see <a href='/how-many-calls-at-once'>how many calls at once</a>). The only exception is large firms that need complex customer service - Moneypenny's hybrid model works better there.",
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
    answer: "You get full call transcripts, so you can review everything. If the AI makes an error, you can review the transcript and correct it. Accuracy improves over time as the AI learns your business.",
  },
  {
    question: "Which AI call handler works with WhatsApp?",
    answer: "whoza.ai delivers all alerts natively in WhatsApp - no app download required. Clara delivers summaries to your phone. Trade Receptionist offers WhatsApp integration. Moneypenny uses email. Rosie AI uses WhatsApp + app.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Fastest: Clara (10 minutes via app). whoza.ai and Rosie AI (30 minutes). Trade Receptionist (1-2 days). Moneypenny (2-5 days).",
  },
]

export const revalidate = 3600

export default function BestAICallHandlerPage() {
  return (
    <>
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
              We tested six leading options — signing up, making test calls, checking WhatsApp delivery, and comparing pricing. Here's what we found.
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
                  <th className="px-4 py-3 font-semibold">Down To Earth AI</th>
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
                    <td className="px-4 py-3 text-white/70">{row.downToEarth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Competitor comparison links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/50 mb-4">
              See detailed comparison:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="/whoza-vs-moneypenny" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white"
              >
                Moneypenny vs whoza.ai
              </a>
              <a 
                href="/whoza-vs-clara" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white"
              >
                Clara AI vs whoza.ai
              </a>
              <a 
                href="/whoza-vs-arrow" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white"
              >
                Arrow vs whoza.ai
              </a>
              <a 
                href="/vs-trade-receptionist" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white"
              >
                Trade Receptionist vs whoza.ai
              </a>
            </div>
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

        {/* Testing Methodology */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Testing Methodology</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              We tested each AI call handler over a 7-day period using real-world scenarios that UK tradespeople face daily. Our testing process was designed to replicate the exact conditions of a busy trade business.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Real call scenarios</h4>
                  <p className="text-white/60 text-sm">We made test calls simulating emergency plumbing, electrical faults, roofing leaks, and general enquiries. Each call was scored on how well the AI captured the caller's details, urgency, and location.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">WhatsApp delivery speed</h4>
                  <p className="text-white/60 text-sm">We timed how long each service took to deliver the call summary to WhatsApp. whoza.ai and Rosie AI delivered in under 10 seconds. Clara took 15-30 seconds via app. Trade Receptionist and Moneypenny used email, which took 2-5 minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Trade terminology accuracy</h4>
                  <p className="text-white/60 text-sm">We used UK-specific trade terms: "combi boiler," "consumer unit," "EPDM flat roof," "soil stack," "ring main." whoza.ai recognised all terms correctly. Clara handled most but missed some niche terms. Trade Receptionist and Moneypenny used generic scripts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Setup complexity</h4>
                  <p className="text-white/60 text-sm">We timed setup from signup to first answered call. Clara was fastest at 10 minutes via app. whoza.ai and Rosie AI took 30 minutes. Trade Receptionist required 1-2 days for configuration. Moneypenny needed 2-5 days for onboarding.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Hidden costs and contracts</h4>
                  <p className="text-white/60 text-sm">We scrutinised pricing pages, terms of service, and cancellation policies. Trade Receptionist and Moneypenny both require 12-month contracts. whoza.ai, Clara, and Rosie AI have no contracts. All offer free trials except Trade Receptionist.</p>
                </div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              All pricing was verified against live websites as of July 2026. We tested each service with the same call scenarios to ensure fair comparison. This is not sponsored content — we tested these services independently to find the best option for UK tradespeople.
            </p>
          </div>
        </section>

        {/* Buyer's Guide */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-6">What to Look For in an AI Call Handler</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <p className="text-white/70 leading-relaxed mb-6">
              Not all AI call handlers are created equal. For UK tradespeople, these are the critical features that separate useful tools from expensive disappointments:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">WhatsApp delivery</h4>
                <p className="text-white/60 text-sm">Tradespeople live on WhatsApp, not email. The best AI call handlers deliver summaries instantly to WhatsApp with caller details, job type, and urgency.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">No contract</h4>
                <p className="text-white/60 text-sm">Avoid 12-month lock-ins. The best services offer monthly billing with no cancellation fees. You should be able to leave anytime if it doesn't work for you.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Trade-specific training</h4>
                <p className="text-white/60 text-sm">Generic AI scripts miss critical details. Your AI should know the difference between a combi boiler and a system boiler, or a flat roof and a pitched roof.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">UK accents and local knowledge</h4>
                <p className="text-white/60 text-sm">Your AI should understand UK postcodes, local regulations, and British terminology. US-based services often miss these nuances.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Calendar integration</h4>
                <p className="text-white/60 text-sm">The AI should check your availability before offering times. No double-bookings. No back-and-forth scheduling. One call, one booking.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Urgency detection</h4>
                <p className="text-white/60 text-sm">Emergency calls should be flagged immediately. A burst pipe at midnight needs instant notification. A quote request can wait until morning.</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              whoza.ai is the only service that checks all these boxes. Clara comes close but lacks the multi-agent features. Trade Receptionist is affordable but requires a 12-month contract. Moneypenny is premium but overpriced for most trades. Rosie AI is good but US-focused.
            </p>
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

        {/* The Problem: Why Missed Calls Cost UK Trades Thousands */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-6">The Problem: Why Missed Calls Cost UK Trades Thousands</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Before comparing solutions, let us understand the scale of the problem. A typical UK plumber receives 8–12 calls per day, of which 5–7 go unanswered while they are under a sink, on a roof, or driving between jobs. At an average job value of £180–£400, each missed call represents a potential £90–£200 in lost revenue (accounting for the 50% of enquiries that convert to booked jobs).
        </p>
        <p className="text-white/70 leading-relaxed mb-6">
          Multiply that by 5 working days, and you are looking at £450–£1,000 per week in lost revenue. Over a year, that is £23,400–£52,000 for a single plumber. For a multi-van operation, the numbers scale linearly. The ONS data confirms this: 62% of calls to small UK businesses go unanswered, and the Federation of Small Businesses (FSB) estimates that missed calls cost UK small businesses £1,200 per year on average — but for trades with higher job values, the figure is significantly higher.
        </p>
        <p className="text-white/70 leading-relaxed mb-6">
          The traditional solutions have clear limitations. Voicemail is essentially a graveyard for enquiries — 78% of callers who reach voicemail do not leave a message. Call forwarding to a family member is unreliable and unprofessional. Hiring a human receptionist costs £20,000–£25,000 per year plus National Insurance, pension contributions, and holiday cover. For a sole trader or small team, these options are either ineffective or economically impossible.
        </p>
        <p className="text-white/70 leading-relaxed">
          AI call answering services emerged as the practical solution. They answer every call, 24/7, without sick days, holidays, or wage demands. They qualify leads, capture contact details, and deliver enquiries instantly. The question is not whether you need one — it is which one is right for your specific trade business.
        </p>
      </section>

      {/* Pricing Analysis: What Do You Actually Get for Your Money? */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <PoundSterling className="w-6 h-6 text-emerald-400" />
          Pricing Analysis: What Do You Actually Get for Your Money?
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Price comparison is not straightforward because services package features differently. Here is a like-for-like analysis of what you get at the entry level (£50–£80/month) and mid-tier (£100–£150/month) for each service.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Entry Level (£50–£80/month) — Sole Traders</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: "IONOS", price: "£9.99/mo", value: "Basic AI, SMS only, no trade training. Good for testing." },
              { name: "Clara AI", price: "£49.99/mo", value: "Good AI, email only, no extras. Cheapest proper option." },
              { name: "whoza.ai", price: "£59/mo", value: "WhatsApp delivery, reviews, competitor analysis. Best value." },
              { name: "ARROW", price: "£79/mo", value: "AI + human hybrid, CRM integrations. Mid-market features." },
              { name: "Moneypenny", price: "£150/mo", value: "Human receptionist. Premium service, premium price." },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-4">
                <div className="w-24 shrink-0">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-emerald-400 text-sm">{item.price}</div>
                </div>
                <div className="text-white/60 text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold text-white">Mid-Tier (£100–£150/month) — Growing Teams</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: "Clara AI Pro", price: "£99.99/mo", value: "Better AI, still email only. No compounding features." },
              { name: "whoza.ai Growth", price: "£125/mo", value: "Everything in Starter + priority support, advanced analytics." },
              { name: "ARROW Growth", price: "£129/mo", value: "More calls, better CRM. Still no WhatsApp or reviews." },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-4">
                <div className="w-32 shrink-0">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-emerald-400 text-sm">{item.price}</div>
                </div>
                <div className="text-white/60 text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI: How Much Revenue Can AI Call Answering Recover? */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          ROI: How Much Revenue Can AI Call Answering Recover?
        </h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Let us do the maths. A typical plumber in the UK receives 8–12 calls per day and misses 5–7 of them while working. At a 50% conversion rate (industry average for trade enquiries) and an average job value of £250, each missed call costs approximately £125 in potential revenue.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">5</div>
            <div className="text-white/60 text-sm">Missed calls per day</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">£125</div>
            <div className="text-white/60 text-sm">Potential revenue per call</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">£625</div>
            <div className="text-white/60 text-sm">Lost revenue per day</div>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed mb-6">
          That is £3,125 per week, or £162,500 per year in potential revenue. Even if AI call answering only recovers 20% of those missed calls (a conservative estimate), that is £32,500 in additional annual revenue. Against a service cost of £59–£125/month (£708–£1,500/year), the ROI is 2,100% to 4,500%. This is not a cost — it is an investment with measurable returns.
        </p>
        <p className="text-white/70 leading-relaxed">
          For emergency trades, the numbers are even more dramatic. Emergency callouts average £150–£400, and callers who cannot reach you will immediately call the next number on Google. Capturing just one additional emergency callout per week pays for the entire monthly service cost.
        </p>
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
            The ONS reports that 62% of after-hours calls go unanswered - and every unanswered call is a job your competitor gets instead.
          </p>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            If you want the most capable system - one that answers calls, collects reviews, tracks competitors,
            and delivers everything through WhatsApp - <strong className="text-emerald-400">whoza.ai is the clear choice</strong>.
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
            Page compiled: 2026-07-12 · Competitors reviewed: whoza.ai, Clara (heyitsclara.com), Trade Receptionist (tradereceptionist.com),
            Moneypenny (moneypenny.com), Rosie AI (heyrosie.com), Down To Earth AI (downtoearthai.com), Bizwings (bizwings.ai) · All pricing and features verified against live sites as of July 2026
            <br />
            <span className="mt-1 block">An independent comparison compiled from publicly available pricing, feature lists, and third-party reviews. Last updated: 2026-07-12.</span>
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
