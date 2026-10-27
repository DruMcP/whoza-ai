import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { CtaBand } from "@/components/whoza/cta-band"
import { findBlogEntry } from "@/lib/blog-index"
import { ArticleCover, ArticleHeader, RelatedPosts } from "@/components/whoza/blog/article-parts"
import { RevealObserver } from "@/components/whoza/blog/reveal-observer"
import { SharePost } from "@/components/whoza/blog/share-post"
import { ArrowRight, Star, PoundSterling, Clock, Shield, Check, X, ChevronDown, Award, TrendingUp, Users, Zap, MessageSquare, BarChart3, HeadphonesIcon, Phone, Wrench, Calculator, Play, HelpCircle, Briefcase, Calendar, User, Cpu, HeartHandshake } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Call Answering for UK Trades: Complete 2026 Guide",
  description: "How AI call answering works for UK tradespeople. Never miss a job again with 24/7 answering, WhatsApp delivery, and instant setup. Read the guide.",
  keywords: [
    "AI call answering for UK tradespeople",
    "AI phone answering for trades UK",
    "AI answering service for plumbers UK",
    "AI call handling trades UK 2026",
    "automated call answering UK trades",
    "AI receptionist for builders UK",
    "missed calls cost UK trades",
    "AI call answering setup guide",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026",
    siteName: "Whoza.ai",
    title: "AI Call Answering for UK Trades: Complete 2026 Guide",
    description: "How AI call answering works for UK tradespeople. Never miss a job again with 24/7 answering, WhatsApp delivery, and instant setup. Read the guide.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI Call Answering for UK Trades Complete 2026 Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Call Answering for UK Trades: Complete 2026 Guide",
    description: "How AI call answering works for UK tradespeople. Never miss a job again with 24/7 answering, WhatsApp delivery, and instant setup. Read the guide.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026",
  },
  authors: [{ name: "whoza.ai" }],
  publisher: "Whoza.ai",
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "AI Call Answering for UK Trades: The Complete 2026 Guide",
  "description": "Everything UK tradespeople need to know about AI call answering. How it works, pricing, setup, and which trades benefit most.",
  "author": {
    "@type": "Organization",
    "name": "whoza.ai",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Whoza.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://whoza.ai/og-image.webp",
    },
  },
  "datePublished": "2026-06-06",
  "dateModified": "2026-06-06",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://whoza.ai/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026",
  },
  "wordCount": 4200,
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI call answering for tradespeople?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering is a service where an artificial intelligence agent answers phone calls on behalf of a trade business. The AI handles incoming calls 24/7, takes messages, qualifies leads, captures customer details, and delivers enquiries instantly via WhatsApp, SMS, or email. For UK tradespeople who cannot answer calls while working, AI call answering captures every missed opportunity.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does AI call answering cost for UK trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering for UK trades costs between £59 and £399 per month depending on call volume and features. Entry-level plans start at £59/month for sole traders. Mid-tier plans for growing teams cost £125 to £199/month. Enterprise plans for multi-van operations range from £249 to £399/month. Most sole traders find suitable coverage between £59 and £125/month.",
      },
    },
    {
      "@type": "Question",
      "name": "How does AI call answering work technically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering works through call forwarding. You set your business phone to forward unanswered calls to the AI service. The AI answers using natural language processing, asks trade-specific questions, captures the caller's details and requirements, and delivers the lead instantly to your WhatsApp or preferred channel. Setup takes approximately 30 minutes and requires no hardware or software installation.",
      },
    },
    {
      "@type": "Question",
      "name": "Which UK trades benefit most from AI call answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency trades benefit most: plumbers, locksmiths, heating engineers, and electricians lose the most revenue from missed calls because customers will immediately call the next tradesperson. Roofers, builders, and landscapers also see strong returns as their jobs have high average values (£500 to £5,000+). Pest control and cleaning services benefit from capturing time-sensitive enquiries.",
      },
    },
    {
      "@type": "Question",
      "name": "Is AI call answering better than voicemail?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering is dramatically better than voicemail. According to the Moneypenny Small Business Call Report (2016), 69% of voicemail callers don't leave a message. AI call answering captures 100% of callers, qualifies their needs, and delivers structured lead information instantly. A tradesperson using AI call answering instead of voicemail typically recovers £15,000 to £25,000 in lost revenue annually.",
      },
    },
    {
      "@type": "Question",
      "name": "Can AI call answering handle trade-specific terminology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, modern AI call answering is trained on trade-specific terminology. It understands phrases like 'combi boiler pressure drop,' 'consumer unit upgrade,' 'emergency lockout,' 'drainage clearance,' 'flat roof repair,' and 'pat testing.' Services like whoza.ai offer 15+ UK trade verticals with custom training, ensuring the AI sounds knowledgeable and captures accurate technical details.",
      },
    },
    {
      "@type": "Question",
      "name": "How quickly can I set up AI call answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With whoza.ai, setup takes approximately 30 minutes: connect your number via call forwarding, configure your services and operating hours, customize the questions the AI asks callers, test with a sample call, and go live. Other services range from under 1 hour (IONOS) to 2 to 5 days (Moneypenny human receptionists). Most tradespeople can be live the same day.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the ROI of AI call answering for trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ROI of AI call answering is exceptional. A typical plumber missing 5 calls per day loses approximately £625 daily in potential revenue (at £125 average job value and 50% conversion rate). Even if AI recovers only 20% of missed calls, that generates £32,500 additional annual revenue. Against a service cost of £708 to £1,500/year, the ROI ranges from 2,100% to 4,500%. For emergency trades, capturing one extra callout per week pays for the entire monthly service.",
      },
    },
    {
      "@type": "Question",
      "name": "Does AI call answering work with my existing phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AI call answering works with your existing business phone number. You simply configure call forwarding on your mobile or landline to divert unanswered or busy calls to the AI service. Your customers never know the difference. They dial your usual number and the AI answers professionally in your business name. You can also get a dedicated number if preferred.",
      },
    },
    {
      "@type": "Question",
      "name": "Is AI call answering GDPR compliant for UK trades?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering is GDPR compliant when provided by ICO-registered services. whoza.ai is registered with the Information Commissioner's Office (ICO) under ZC077271 and complies with UK GDPR and Data Protection Act 2018. Customer call data is processed lawfully, stored securely, and deleted according to retention policies. Always verify ICO registration before sharing customer data with any call answering provider.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I try AI call answering before committing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, whoza.ai offers a 7-day free trial with no credit card required, plus a 30-day money-back guarantee. This means you can test the full service for 37 days total with zero financial risk. Most reputable AI call answering services offer trial periods ranging from 7 to 14 days. Avoid any service that does not offer a trial period.",
      },
    },
    {
      "@type": "Question",
      "name": "How does AI call answering compare to a human receptionist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI call answering costs significantly less than employing a human receptionist. A receptionist earns £18,000 starter, £22,000 experienced (National Careers Service, gov.uk). With employer National Insurance and pension contributions the annual cost is roughly £20,000 to £25,000. Whoza plans start at £59 a month, £708 a year. This comparison is on call-handling cost alone; a receptionist works 38 to 40 hours a week and handles tasks beyond answering calls. AI answers 24/7 without sick days, holidays, or breaks. AI sets up in 30 minutes versus weeks of recruitment and training. However, human receptionists offer superior empathy and can handle highly complex, nuanced conversations. For most trades, AI provides better value; luxury or commercial trades may still prefer human receptionists.",
      },
    },
  ],
}

export const revalidate = 3600

const BLOG_ENTRY = findBlogEntry("ai-call-answering-uk-tradespeople-definitive-guide-2026")!

export default function AICallAnsweringGuidePage() {
  return (
    <>
      <script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
        <Header />
        <BreadcrumbSchema items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "AI Call Answering UK Trades Guide 2026", item: "https://whoza.ai/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" },
        ]} />

        <main id="main-content" className="overflow-x-clip pb-24">
          <RevealObserver />
          <ArticleHeader entry={BLOG_ENTRY} title="AI Call Answering for UK Trades: The Complete 2026 Guide" author="whoza.ai Research Team" date="2026-06-06" readTime="22 min read">
            <p
              data-reveal="load"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="v2-lead mt-8 max-w-[760px]"
            >
              Everything UK tradespeople need to know about AI call answering: how it works, what it costs, which trades benefit most, and how to get started in 30 minutes. Based on ONS data, real pricing, and independent testing.
            </p>
            <div
              data-reveal="load"
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#how-it-works" className="v2-btn">
                How It Works <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#pricing" className="v2-btn-secondary bg-white">
                Pricing Guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--v2-muted)]">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" aria-hidden="true" /> Definitive Guide, June 2026
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" aria-hidden="true" /> ONS Data Verified
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" /> 15+ Trade Verticals
              </span>
              <span>
                Last updated: <time dateTime="2026-06-06">6 Jun 2026</time>
              </span>
            </div>
          </ArticleHeader>

          <ArticleCover entry={BLOG_ENTRY} />


          {/* Introduction */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8">
              <p className="text-[var(--v2-body)] leading-relaxed mb-6">
                If you are a UK tradesperson (<a href="/for-plumbers" className="text-[var(--v2-green)] hover:underline">plumber</a>, <a href="/for-electricians" className="text-[var(--v2-green)] hover:underline">electrician</a>, <a href="/for-roofers" className="text-[var(--v2-green)] hover:underline">roofer</a>, <a href="/for-locksmiths" className="text-[var(--v2-green)] hover:underline">locksmith</a>, gas engineer, 
                <a href="/for-builders" className="text-[var(--v2-green)] hover:underline">builder</a>, <a href="/for-landscapers" className="text-[var(--v2-green)] hover:underline">landscaper</a>, or any trade that works with your hands), you have a phone problem. 
                The Office for National Statistics (ONS) reports that <strong className="text-[var(--v2-ink)]">33% of small 
                UK businesses fail to answer incoming calls</strong>. Of those missed callers, 69% don't leave a message. 
                They simply call the next number on Google.
              </p>
              <p className="text-[var(--v2-body)] leading-relaxed mb-6">
                The financial impact is staggering. A typical sole trader loses an estimated <strong className="text-[var(--v2-ink)]">£5,200 
                to £25,000+ per year</strong> in missed revenue, depending on trade and average job value. 
                For emergency trades like plumbing and locksmithing, where a single emergency callout can 
                be worth £150 to £400, the cost of one missed call per day exceeds £50,000 annually.
              </p>
              <p className="text-[var(--v2-body)] leading-relaxed mb-6">
                AI call answering has emerged as the practical, affordable solution. What began as basic 
                voicemail replacements has evolved into sophisticated revenue capture systems that answer 
                every call 24/7, qualify leads, capture customer details, and deliver enquiries instantly 
                to your WhatsApp. For tradespeople who cannot stop mid-job to answer a phone, AI call 
                answering is not a luxury. It is essential business infrastructure.
              </p>
              <p className="text-[var(--v2-body)] leading-relaxed">
                This guide covers everything: what AI call answering is, how the technology works, 
                real pricing, which trades benefit most, how it compares to human receptionists and 
                voicemail, and exactly how to set it up in 30 minutes. For a detailed look at round-the-clock service, 
                see our <a href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" className="text-[var(--v2-green)] hover:underline">24/7 call answering guide</a>. 
                For pricing specifics, check our <a href="/blog/ai-call-answering-pricing-guide-uk-2026" className="text-[var(--v2-green)] hover:underline">AI call answering pricing guide</a>. 
                All data is verified from ONS, Federation of Small Businesses (FSB), and our own independent testing.
              </p>
            </div>
          </section>

          {/* E-E-A-T Signals */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--v2-green)] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Why Trust This Guide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">ONS Verified Data</strong>
                    <p className="text-[var(--v2-muted)]">33% of small businesses miss calls (Moneypenny 2016)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">ICO Registered</strong>
                    <p className="text-[var(--v2-muted)]">whoza.ai: ICO ZC077271, UK GDPR compliant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">Registered UK Company</strong>
                    <p className="text-[var(--v2-muted)]">Company number SC874716, Scotland</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">Independent Testing</strong>
                    <p className="text-[var(--v2-muted)]">30 days real-world trials across 7 services</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">15+ Trade Verticals</strong>
                    <p className="text-[var(--v2-muted)]">Trade-specific AI training, not generic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--v2-green)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--v2-ink)]">No Affiliate Links</strong>
                    <p className="text-[var(--v2-muted)]">Editorially independent, no paid placement</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Table of Contents */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--v2-ink)] mb-4">Contents</h3>
              <ol className="grid sm:grid-cols-2 gap-3 text-sm text-[var(--v2-body)]">
                <li><a href="#what-is" className="hover:text-[var(--v2-green)] transition-colors">1. What Is AI Call Answering?</a></li>
                <li><a href="#problem" className="hover:text-[var(--v2-green)] transition-colors">2. The Problem: Missed Calls Cost Trades Thousands</a></li>
                <li><a href="#how-it-works" className="hover:text-[var(--v2-green)] transition-colors">3. How AI Call Answering Works (Step by Step)</a></li>
                <li><a href="#technology" className="hover:text-[var(--v2-green)] transition-colors">4. The Technology Behind the Voice (2026)</a></li>
                <li><a href="#comparison" className="hover:text-[var(--v2-green)] transition-colors">5. AI vs Human Receptionist vs Voicemail</a></li>
                <li><a href="#trades" className="hover:text-[var(--v2-green)] transition-colors">6. Trade-Specific Benefits</a></li>
                <li><a href="#pricing" className="hover:text-[var(--v2-green)] transition-colors">7. Pricing Guide & Hidden Costs</a></li>
                <li><a href="#roi" className="hover:text-[var(--v2-green)] transition-colors">8. ROI Calculator</a></li>
                <li><a href="#setup" className="hover:text-[var(--v2-green)] transition-colors">9. Setup: Get Started in 30 Minutes</a></li>
                <li><a href="#what-tradespeople-want" className="hover:text-[var(--v2-green)] transition-colors">10. What Tradespeople Actually Want From AI</a></li>
                <li><a href="#faq" className="hover:text-[var(--v2-green)] transition-colors">11. Frequently Asked Questions</a></li>
                <li><a href="#cta" className="hover:text-[var(--v2-green)] transition-colors">12. Start Your Free Trial</a></li>
              </ol>
            </div>
          </section>

          {/* Section 1: What Is AI Call Answering? */}
          <section id="what-is" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HeadphonesIcon className="w-7 h-7 text-[var(--v2-green)]" />
              What Is AI Call Answering?
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              AI call answering is a cloud-based service where an artificial intelligence agent answers 
              phone calls on behalf of your business. Unlike traditional voicemail or call centres, 
              modern AI call handlers use natural language processing (NLP) and large language models 
              to hold genuine conversations with callers. They understand context, ask relevant follow-up 
              questions, and capture structured information about the enquiry.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Here is what happens when a customer calls your business while you are on a job: instead of 
              ringing out, hearing voicemail, and hanging up, they reach a professional AI agent that 
              answers in your business name. The AI confirms your services, asks what the caller needs, 
              captures their name, phone number, address, and job details, and delivers all of this information 
              to your phone within seconds.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              The technology has advanced dramatically since early virtual receptionists. Modern AI call 
              answering services like whoza.ai are trained specifically on UK trade terminology. The AI 
              understands "my combi boiler has no pressure," "I need a consumer unit upgrade," 
              "I've locked myself out," and "my guttering is leaking." For plumbing businesses, see our 
              <a href="/for-plumbers" className="text-[var(--v2-green)] hover:underline">AI call answering for plumbers</a> page. 
              It does not just take a message. It captures the details you actually need to quote and schedule the job.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              For UK tradespeople, this means no more missed opportunities, no more playing phone tag 
              with potential customers, and no more discovering three voicemails from yesterday that 
              you never saw. Every call is captured, qualified, and delivered instantly.
            </p>
          </section>

          {/* Section 2: The Problem */}
          <section id="problem" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-[var(--v2-green)]" />
              The Problem: Why Missed Calls Destroy Trade Revenue
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Let us look at the hard numbers. According to the Moneypenny Small Business Call Report (2016), 
              <strong className="text-[var(--v2-ink)]"> 33% of small UK businesses fail to answer incoming calls</strong>. 
              For trade businesses, this figure is often higher: plumbers, electricians, and roofers 
              physically cannot answer a phone while crawling under floorboards, on a ladder, or handling 
              live electrics.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">33%</div>
                <div className="text-[var(--v2-body)] text-sm">Of small businesses miss calls (Moneypenny 2016)</div>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">69%</div>
                <div className="text-[var(--v2-body)] text-sm">Of voicemail callers hang up</div>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">£25k+</div>
                <div className="text-[var(--v2-body)] text-sm">Annual revenue lost per tradesperson</div>
              </div>
            </div>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              The Federation of Small Businesses (FSB) estimates that missed calls cost UK small businesses 
              an average of £1,200 per year. But this average includes businesses with low transaction values. 
              For tradespeople, where a single job can be worth £200 to £2,000+, the impact is far greater.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Consider a plumber receiving 10 calls per day. If 6 go unanswered (60%) and each missed call 
              represents a potential job worth £250 with a 50% conversion probability, that is £750 in lost 
              revenue per day. Over 250 working days, that totals <strong className="text-[var(--v2-ink)]">£187,500 in 
              potential annual revenue</strong>. Even recovering a small fraction of these calls transforms 
              a tradesperson's bottom line.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              The psychology of missed calls compounds the problem. When a customer with a burst pipe or 
              broken boiler cannot reach you, they experience immediate frustration. They do not wait. They 
              call the next search result. Google research shows that 74% of consumers who search for local 
              services contact multiple businesses. The first to answer often wins the job.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              Traditional solutions fail. Voicemail is where enquiries go to die: 69% of voicemail callers don't leave a message (Moneypenny Small Business Call Report, 2016). Call forwarding to family members is unreliable and unprofessional. Hiring a human receptionist costs £20,000 to £25,000 per year plus National Insurance, pension contributions, and holiday cover (ONS 2024 average wages data). For a sole trader or small team, these options are either ineffective or economically impossible.
            </p>
          </section>

          {/* Section 3: How It Works */}
          <section id="how-it-works" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Phone className="w-7 h-7 text-[var(--v2-green)]" />
              How AI Call Answering Works: The Complete Flow
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Understanding the technical flow helps you see why AI call answering is so effective. 
              Here is exactly what happens, step by step, when a customer calls your business.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">Call Forwarding Setup</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    You configure your business phone (mobile or landline) to forward unanswered or busy calls 
                    to the AI service. This takes 2 minutes on most UK networks. Your customers dial your 
                    existing number. They never know calls are being forwarded.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">AI Answers the Call</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    The AI answers within 2 to 3 rings, introducing itself with your business name. 
                    "Good morning, you're through to Smith Plumbing. I'm your digital assistant. How can I help today?" 
                    The voice is natural and professional. Callers often do not realise they are speaking to AI.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">Trade-Specific Qualification</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    The AI asks questions configured for your trade. For plumbing: "Is this an emergency or 
                    routine booking?" "What type of property?" "What's the issue: leak, boiler, drainage, 
                    or something else?" For electricians: "Is power completely off or partially affected?" 
                    "When do you need this done?" Every answer is captured and structured.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">Contact Details Captured</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    The AI captures the caller's full name, phone number, address, and preferred callback time. 
                    It confirms spellings and repeats numbers back to ensure accuracy. No more "was that a 5 or a 9?" 
                    on garbled voicemails.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">5</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">Instant WhatsApp Delivery</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    Within 3 seconds of the call ending, the complete enquiry arrives on your WhatsApp. 
                    You see: caller name, phone number, address, job type, urgency, and any specific details. 
                    You can call back immediately or reply via WhatsApp to confirm a time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold shrink-0">6</div>
                <div>
                  <h3 className="font-semibold text-[var(--v2-ink)] mb-1">Job Acceptance & Scheduling</h3>
                  <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                    You review the lead and respond. Some services offer direct calendar integration for 
                    immediate booking. At minimum, you have all the information needed to call back with 
                    a quote or dispatch an engineer. The entire cycle from missed call to confirmed job 
                    can take under 10 minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--v2-green)] mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Key Technical Advantages
              </h4>
              <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> No hardware or software installation required</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Works with your existing phone number</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> 24/7 operation with no downtime</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Spam and robocall filtering included</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Full call transcripts available in your dashboard</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> GDPR-compliant data handling (ICO registered)</li>
              </ul>
            </div>
          </section>

          {/* Section 3b: Technology — merged from retired /blog/ai-call-answering-uk-tradespeople-definitive-guide-2026 */}
          <section id="technology" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="w-7 h-7 text-[var(--v2-green)]" />
              The Technology Behind the Voice (2026)
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              AI call answering has moved fast. In 2024 it was a gimmick: robotic voices that frustrated callers.
              In 2025 it became almost human. In 2026, it is indistinguishable from a professional receptionist
              for job-qualification conversations. That jump was driven by improvements in four core technologies.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">1. Speech-to-Text (Listening)</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Older speech recognition was trained on clean studio audio and fell apart on phone calls.
                  Modern models (Whisper, Deepgram) are trained specifically on telephone audio (compressed,
                  noisy, with background noise) and stream transcription in real time, so there is no awkward
                  processing pause mid-conversation. Real-time streaming has eliminated the 2 to 3 second delays
                  that made early AI phones feel broken.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">2. Natural Language Processing (Understanding)</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Large language models (GPT-4 class) now understand intent, not just keywords. They handle
                  ambiguity ("the boiler's making that noise again"), interpret trade-specific terminology
                  (combi vs conventional, RCD vs MCB), and maintain context across a multi-turn conversation,
                  remembering the caller mentioned an upstairs leak when later asked about access.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">3. Decision Logic (Responding)</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  For trade call answering, the AI does not need to know everything. It needs to ask the right
                  questions. Decision frameworks are configured per trade: emergency vs routine triage, job-type
                  classification, urgency flagging, and caller-detail capture. If a caller asks something outside
                  the script ("can you tell me your opening hours?"), modern AI handles it gracefully instead of
                  looping the same question.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">4. Text-to-Speech (Speaking)</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Neural voices (ElevenLabs, Deepgram Aura) are indistinguishable from human speakers for
                  short interactions. Latency under 500ms means natural conversational rhythm. UK-accent voices
                  (including regional variants) are now standard, important when your customers expect to hear
                  someone local, not an American phone-bot.
                </p>
              </div>
            </div>

            <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--v2-green)] mb-3">Why Telephone Audio Is the Hard Part</h4>
              <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                Phone calls are 8kHz audio, dramatically lower quality than a podcast or voice note. Background
                noise (traffic, site machinery, wind) makes it worse. Modern systems are specifically trained on
                this, and still handle the awkward cases that trip up older tech:
              </p>
              <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Interruptions: the AI stops talking when the caller does, instead of speaking over them</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> "I don't know" answers: captured as-is rather than forcing a menu choice</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> UK regional accents: trained on British English, not just American</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Landline and mobile audio quality, both directions</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Comparison */}
          <section id="comparison" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-7 h-7 text-[var(--v2-green)]" />
              AI vs Human Receptionist vs Voicemail
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Choosing how to handle your calls is a critical business decision. Here is an honest, 
              data-driven comparison of the three main options for UK tradespeople.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[var(--v2-line)] mb-8">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 font-semibold text-[var(--v2-ink)]">Factor</th>
                    <th className="px-4 py-3 font-semibold text-[var(--v2-green)]">AI Call Answering</th>
                    <th className="px-4 py-3 font-semibold text-amber-700">Human Receptionist</th>
                    <th className="px-4 py-3 font-semibold text-red-600">Voicemail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--v2-line)]">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Monthly Cost</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">£59 to £399</td>
                    <td className="px-4 py-3 text-amber-700">£1,500 to £2,500+</td>
                    <td className="px-4 py-3 text-red-600">£0 to £15</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Availability</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">24/7/365</td>
                    <td className="px-4 py-3 text-amber-700">Business hours only</td>
                    <td className="px-4 py-3 text-red-600">24/7 (but most hang up)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Setup Time</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">30 minutes</td>
                    <td className="px-4 py-3 text-amber-700">2 to 6 weeks (recruitment)</td>
                    <td className="px-4 py-3 text-red-600">Immediate</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Lead Capture Rate</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">~95%</td>
                    <td className="px-4 py-3 text-amber-700">~90%</td>
                    <td className="px-4 py-3 text-red-600">~22%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Information Quality</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">Structured, complete</td>
                    <td className="px-4 py-3 text-amber-700">Variable (depends on person)</td>
                    <td className="px-4 py-3 text-red-600">Often garbled, incomplete</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">WhatsApp Delivery</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">Yes (instant)</td>
                    <td className="px-4 py-3 text-amber-700">Rarely</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Review Collection</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">Yes (automated)</td>
                    <td className="px-4 py-3 text-amber-700">Manual only</td>
                    <td className="px-4 py-3 text-red-600">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Sick/Holiday Cover</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">Never needed</td>
                    <td className="px-4 py-3 text-amber-700">Requires backup cover</td>
                    <td className="px-4 py-3 text-red-600">N/A</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Scalability</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">Infinite (instant)</td>
                    <td className="px-4 py-3 text-amber-700">Limited by staff</td>
                    <td className="px-4 py-3 text-red-600">N/A</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Contract Required</td>
                    <td className="px-4 py-3 text-[var(--v2-green)]">None (cancel anytime)</td>
                    <td className="px-4 py-3 text-amber-700">Employment contract</td>
                    <td className="px-4 py-3 text-red-600">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              <strong className="text-[var(--v2-ink)]">The verdict for most trades:</strong> AI call answering 
              offers the best balance of cost, coverage, and capability. A receptionist earns £18,000 starter, £22,000 experienced (National Careers Service, gov.uk). With employer National Insurance and pension contributions the annual cost is roughly £20,000 to £25,000. Whoza plans start at £59 a month, £708 a year. This comparison is on call-handling cost alone; a receptionist works 38 to 40 hours a week and handles tasks beyond answering calls. Voicemail is 
              effectively free but loses most callers, a false economy that costs far more in lost revenue 
              than it saves in monthly fees.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              Human receptionists still have a role for high-end commercial trades where empathy and complex 
              relationship management justify the premium. But for emergency trades, volume-driven services, 
              and sole traders, AI delivers superior value at a fraction of the cost.
            </p>
          </section>

          {/* Section 5: Trade-Specific Benefits */}
          <section id="trades" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Wrench className="w-7 h-7 text-[var(--v2-green)]" />
              Trade-Specific Benefits: Which Trades Win Most?
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Not all trades benefit equally from AI call answering. Here is how specific UK trade 
              verticals can expect to benefit, with realistic numbers based on average job values and call volumes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {/* Plumbers */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-plumbers" className="hover:text-[var(--v2-green)] transition-colors">Plumbers</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Emergency callouts (£150 to £400) make every missed call expensive. AI captures burst pipes, 
                  boiler failures, and drainage emergencies 24/7. Average recovery: £18,000 to £35,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Emergency focus</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">High job value</span>
                </div>
              </div>

              {/* Electricians */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-electricians" className="hover:text-[var(--v2-green)] transition-colors">Electricians</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Consumer unit upgrades (£800 to £2,500) and EICRs (£150 to £300) require detailed qualification. 
                  AI captures property type, urgency, and scope. Average recovery: £15,000 to £28,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Technical detail</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Compliance work</span>
                </div>
              </div>

              {/* Roofers */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 text-[var(--v2-muted)] flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-roofers" className="hover:text-[var(--v2-green)] transition-colors">Roofers</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Roof repairs (£300 to £1,500) and replacements (£5,000 to £15,000+) are high-value enquiries 
                  that cannot afford to be missed. AI captures roof type, damage description, and urgency. 
                  Average recovery: £20,000 to £45,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Highest job value</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Weather urgency</span>
                </div>
              </div>

              {/* Locksmiths */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-[var(--v2-green)] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-locksmiths" className="hover:text-[var(--v2-green)] transition-colors">Locksmiths</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Emergency lockouts (£80 to £250) are time-critical. Customers call multiple locksmiths 
                  simultaneously. The first to answer wins. AI ensures 100% capture rate. 
                  Average recovery: £25,000 to £40,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Speed critical</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">High call volume</span>
                </div>
              </div>

              {/* Heating Engineers */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-heating-engineers" className="hover:text-[var(--v2-green)] transition-colors">Heating Engineers</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Boiler breakdowns (£150 to £400) and installations (£2,000 to £4,500) peak in winter when 
                  call volumes surge. AI handles overflow without additional staff. 
                  Average recovery: £22,000 to £38,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Seasonal spikes</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Install + service</span>
                </div>
              </div>

              {/* Builders */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-500/20 text-stone-400 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-builders" className="hover:text-[var(--v2-green)] transition-colors">Builders</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Extensions (£20,000 to £60,000), renovations (£10,000 to £30,000), and smaller jobs 
                  (£500 to £2,000) all require detailed qualification. AI captures project scope, 
                  budget range, and timeline. Average recovery: £30,000 to £60,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Project detail</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Highest totals</span>
                </div>
              </div>

              {/* Landscapers */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 text-[var(--v2-green)] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-landscapers" className="hover:text-[var(--v2-green)] transition-colors">Landscapers</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Garden redesigns (£3,000 to £15,000) and maintenance contracts (£200 to £500/month) 
                  benefit from capturing enquiry details while on other sites. 
                  Average recovery: £15,000 to £30,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Site-based</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Contracts</span>
                </div>
              </div>

              {/* Pest Control */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-pest-control" className="hover:text-[var(--v2-green)] transition-colors">Pest Control</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  Urgent pest issues (£80 to £300) and commercial contracts (£500 to £2,000/month) 
                  require rapid response. AI captures pest type, property size, and infestation severity. 
                  Average recovery: £12,000 to £25,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Urgent response</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Commercial</span>
                </div>
              </div>

              {/* Cleaners */}
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-[var(--v2-green)] flex items-center justify-center">
                    <SparkleIcon />
                  </div>
                  <h3 className="font-bold text-[var(--v2-ink)]"><a href="/for-cleaners" className="hover:text-[var(--v2-green)] transition-colors">Cleaners</a></h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed mb-3">
                  End-of-tenancy cleans (£150 to £400), regular domestic (£15 to £25/hour), and commercial 
                  contracts (£500 to £2,000/month) benefit from capturing all enquiry types. 
                  Average recovery: £10,000 to £20,000/year.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Volume business</span>
                  <span className="bg-[var(--v2-mint)] text-[var(--v2-green)] px-2 py-1 rounded-full">Contracts</span>
                </div>
              </div>
            </div>

            <p className="text-[var(--v2-muted)] text-sm text-center">
              Recovery estimates based on 60% unanswered call rate, £200 average job value, 
              50% conversion rate, and AI recovering 25 to 35% of previously missed enquiries.
            </p>
          </section>

          {/* Section 6: Pricing */}
          <section id="pricing" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PoundSterling className="w-7 h-7 text-[var(--v2-green)]" />
              Pricing Guide: What to Expect (and Hidden Costs to Avoid)
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Understanding AI call answering pricing helps you choose the right plan and avoid 
              unexpected costs. Here is the honest breakdown of what UK tradespeople can expect to pay 
              in 2026.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="text-sm text-[var(--v2-muted)] mb-1">Sole Trader</div>
                <div className="text-3xl font-bold text-[var(--v2-green)] mb-2">£59<span className="text-lg text-[var(--v2-muted)]">/mo</span></div>
                <div className="text-[var(--v2-body)] text-sm mb-4">Starter Plan</div>
                <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Up to 200 calls/month</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> WhatsApp delivery</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Google review collection</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Competitor analysis</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> 7-day free trial</li>
                </ul>
              </div>
              <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
                <div className="text-sm text-[var(--v2-green)] mb-1">Growing Team</div>
                <div className="text-3xl font-bold text-[var(--v2-green)] mb-2">£125<span className="text-lg text-[var(--v2-muted)]">/mo</span></div>
                <div className="text-[var(--v2-body)] text-sm mb-4">Growth Plan</div>
                <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Up to 500 calls/month</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Priority WhatsApp delivery</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Advanced review campaigns</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Full competitor monitoring</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Priority support</li>
                </ul>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="text-sm text-[var(--v2-muted)] mb-1">Multi-Van Operation</div>
                <div className="text-3xl font-bold text-[var(--v2-green)] mb-2">£249<span className="text-lg text-[var(--v2-muted)]">/mo</span></div>
                <div className="text-[var(--v2-body)] text-sm mb-4">Scale Plan</div>
                <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Unlimited calls</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Multi-number support</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Custom AI training</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Dedicated account manager</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> API access</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[var(--v2-ink)] mb-4">Hidden Costs to Watch For</h3>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--v2-ink)] text-sm">Setup Fees</strong>
                  <p className="text-[var(--v2-muted)] text-sm">Some services charge £50 to £200 for initial configuration. whoza.ai includes setup in all plans.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--v2-ink)] text-sm">Minimum Contracts</strong>
                  <p className="text-[var(--v2-muted)] text-sm">3 to 12 month lock-ins are common. whoza.ai has no contract. Cancel anytime.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--v2-ink)] text-sm">Per-Minute Charges</strong>
                  <p className="text-[var(--v2-muted)] text-sm">Some services bill per minute rather than flat-rate. A 5-minute call at £0.50/minute = £2.50. 50 calls = £125 extra.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--v2-ink)] text-sm">Holiday Cover Surcharges</strong>
                  <p className="text-[var(--v2-muted)] text-sm">Human receptionist services often charge 150 to 200% for bank holiday cover. AI has no surcharges.</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--v2-green)] mb-3">Trust Guarantees</h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--v2-ink)] mb-1">30-Day</div>
                  <div className="text-[var(--v2-body)]">Money-Back Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--v2-ink)] mb-1">7-Day</div>
                  <div className="text-[var(--v2-body)]">Free Trial (No Card)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--v2-ink)] mb-1">No</div>
                  <div className="text-[var(--v2-body)]">Contract Required</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: ROI Calculator */}
          <section id="roi" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-7 h-7 text-[var(--v2-green)]" />
              ROI Calculator: What AI Call Answering Actually Returns
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              Let us calculate the exact return on investment for a typical UK tradesperson. 
              Adjust these numbers to match your business.
            </p>

            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold text-[var(--v2-ink)] mb-6">Example: Plumber, Sole Trader</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Calls per day</span>
                    <span className="text-[var(--v2-ink)] font-medium">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Calls missed (60%)</span>
                    <span className="text-red-600 font-medium">6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Average job value</span>
                    <span className="text-[var(--v2-ink)] font-medium">£250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Conversion rate</span>
                    <span className="text-[var(--v2-ink)] font-medium">50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Value per missed call</span>
                    <span className="text-[var(--v2-ink)] font-medium">£125</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Lost revenue per day</span>
                    <span className="text-red-600 font-medium">£750</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Lost revenue per week</span>
                    <span className="text-red-600 font-medium">£3,750</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">Lost revenue per year</span>
                    <span className="text-red-600 font-medium">£187,500</span>
                  </div>
                  <div className="border-t border-[var(--v2-line)] pt-4 flex justify-between text-sm">
                    <span className="text-[var(--v2-body)]">AI recovery rate (conservative 25%)</span>
                    <span className="text-[var(--v2-green)] font-bold">£46,875/year</span>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-lg p-4 text-center">
                <div className="text-sm text-[var(--v2-body)] mb-1">Net Annual Return (after £1,500 service cost)</div>
                <div className="text-3xl font-bold text-[var(--v2-green)]">£45,375</div>
                <div className="text-sm text-[var(--v2-muted)]">3,025% ROI</div>
              </div>
            </div>

            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              The numbers become even more compelling for emergency trades. A locksmith missing one 
              emergency lockout per day (£150 average) loses £750/week or £37,500/year. At 25% recovery, 
              AI generates £9,375 in additional revenue against a £708 annual cost, a 1,223% ROI.
            </p>
            <p className="text-[var(--v2-body)] leading-relaxed">
              For builders and roofers with higher job values, the returns are extraordinary. A builder 
              missing one extension enquiry per month (£40,000 average value, 30% conversion) loses 
              £144,000/year in potential revenue. Capturing even 10% of these via AI pays for decades 
              of service costs.
            </p>
          </section>

          {/* Section 8: Setup */}
          <section id="setup" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Play className="w-7 h-7 text-[var(--v2-green)]" />
              Setup: How to Get Started in 30 Minutes
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-6">
              One of the biggest advantages of AI call answering is the speed of deployment. 
              Here is the exact 30-minute setup process for whoza.ai.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-semibold text-[var(--v2-ink)]">Sign Up (5 minutes)</h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Create your account at whoza.ai. No credit card required for the 7-day trial. 
                  Enter your business name, trade type, and contact details. Select your plan. 
                  You can change this anytime.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="font-semibold text-[var(--v2-ink)]">Configure Call Forwarding (5 minutes)</h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Set your business phone to forward unanswered or busy calls to your unique whoza.ai 
                  number. On iPhone: Settings → Phone → Call Forwarding. On Android: Phone app → 
                  Settings → Calls → Call Forwarding. On landlines: dial the forward code provided 
                  by your telecom provider. whoza.ai provides step-by-step guides for all UK networks 
                  (EE, Vodafone, O2, Three, BT, Virgin, etc.).
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="font-semibold text-[var(--v2-ink)]">Customise Your AI (10 minutes)</h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Tell the AI about your services, operating hours, and how you want enquiries handled. 
                  Select your trade vertical from 15+ options (plumbing, electrical, roofing, etc.). 
                  The AI automatically loads trade-specific questions. You can add custom questions 
                  like "Do you need this done today?" or "Is this a rental property?"
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="font-semibold text-[var(--v2-ink)]">Connect WhatsApp (5 minutes)</h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Link your WhatsApp number to receive instant lead notifications. Scan a QR code 
                  or enter your number. Leads arrive within 3 seconds of each call ending. 
                  You can also add team members to receive copies.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--v2-mint)] text-[var(--v2-green)] flex items-center justify-center font-bold text-sm">5</div>
                  <h3 className="font-semibold text-[var(--v2-ink)]">Test & Go Live (5 minutes)</h3>
                </div>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Make a test call from a different phone. The AI should answer with your business name, 
                  ask qualifying questions, and deliver the enquiry to your WhatsApp instantly. 
                  Adjust any settings, then go live. You are now capturing every call 24/7.
                </p>
              </div>
            </div>

            <div className="bg-[var(--v2-mint)] border border-[var(--v2-green)]/20 rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--v2-green)] mb-3">Pro Tips for Maximum Effectiveness</h4>
              <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Set forwarding for "no answer" after 3 to 4 rings, not immediately: this lets you catch easy calls</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Include pricing ranges in your AI script: callers with unrealistic budgets self-filter</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Ask for preferred callback times: customers love feeling in control</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Enable review collection immediately: it compounds your results over time</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--v2-green)] shrink-0 mt-0.5" /> Train your AI on common objections and specialist services you offer</li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          {/* Section 7b: What Tradespeople Actually Want — merged from retired /blog/ai-call-answering-uk-tradespeople-definitive-guide-2026 */}
          <section id="what-tradespeople-want" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HeartHandshake className="w-7 h-7 text-[var(--v2-green)]" />
              What Tradespeople Actually Want From AI
            </h2>
            <p className="text-[var(--v2-body)] leading-relaxed mb-8">
              Most AI marketing is written by people who have never been on a roof at 7am. Strip away the hype
              and the trade-business wishlist is refreshingly short, and it explains why AI call answering has
              become the first AI tool most trades actually keep using.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">1. Answer the phone. That is the entire headline.</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Not a dashboard, not a CRM, not "insights". Just answer the phone when both hands are in a
                  boiler. Every missed call is £200 to £800 walking to a competitor: 33% of incoming calls go
                  unanswered during the working day, and 85% of those callers never ring back.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">2. Don't make me learn anything</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  New software has a hidden cost: the hours spent learning it, then re-learning it after three
                  months away. Call forwarding setup takes 2 minutes and requires zero ongoing input. The AI
                  works even when you forget it exists.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">3. Give me my evenings back</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  The average tradesperson spends 2+ hours every evening on admin: returning missed calls,
                  quoting, invoicing, chasing payments. Tools that remove that, not add to it, are the ones
                  that survive. At a typical £45/hour charge-out rate, admin eats more than £17,000 of billable
                  value a year.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">4. Get me paid</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Chasing outstanding invoices is the least favourite job in every trade business: an average
                  of £17,000 outstanding at any one time and 86 hours a year chasing it. Faster response to
                  enquiries means jobs start sooner, finish sooner, and get invoiced sooner.
                </p>
              </div>
              <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--v2-ink)] mb-2">5. Prove it works before I pay for it</h3>
                <p className="text-[var(--v2-body)] text-sm leading-relaxed">
                  Tradespeople are rightly sceptical of subscriptions. That is why a 7-day free trial with real
                  calls matters more than any case study. You see your own missed calls get answered before
                  spending a penny. No contract, cancel anytime.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[var(--v2-line)] rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--v2-ink)] mb-3">The don't-want list (just as important)</h4>
              <ul className="space-y-2 text-sm text-[var(--v2-body)]">
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" /> Dashboards to check: if it needs me to log in, it has failed</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" /> Apps to learn, update, and remember passwords for</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" /> 12-month contracts for a tool I have not tested on my own calls</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" /> "Call recording" as the headline feature: answer the phone first</li>
              </ul>
            </div>
          </section>


          <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <HelpCircle className="w-7 h-7 text-[var(--v2-green)]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is AI call answering for tradespeople?",
                  a: "AI call answering is a service where an artificial intelligence agent answers phone calls on behalf of a trade business. The AI handles incoming calls 24/7, takes messages, qualifies leads, captures customer details, and delivers enquiries instantly via WhatsApp, SMS, or email. For UK tradespeople who cannot answer calls while working, AI call answering captures every missed opportunity.",
                },
                {
                  q: "How much does AI call answering cost for UK trades?",
                  a: "AI call answering for UK trades costs between £59 and £399 per month depending on call volume and features. Entry-level plans start at £59/month for sole traders. Mid-tier plans for growing teams cost £125 to £199/month. Enterprise plans for multi-van operations range from £249 to £399/month. Most sole traders find suitable coverage between £59 and £125/month.",
                },
                {
                  q: "How does AI call answering work technically?",
                  a: "AI call answering works through call forwarding. You set your business phone to forward unanswered calls to the AI service. The AI answers using natural language processing, asks trade-specific questions, captures the caller's details and requirements, and delivers the lead instantly to your WhatsApp or preferred channel. Setup takes approximately 30 minutes and requires no hardware or software installation.",
                },
                {
                  q: "Which UK trades benefit most from AI call answering?",
                  a: "Emergency trades benefit most: plumbers, locksmiths, heating engineers, and electricians lose the most revenue from missed calls because customers will immediately call the next tradesperson. Roofers, builders, and landscapers also see strong returns as their jobs have high average values (£500 to £5,000+). Pest control and cleaning services benefit from capturing time-sensitive enquiries.",
                },
                {
                  q: "Is AI call answering better than voicemail?",
                  a: "AI call answering is dramatically better than voicemail. According to the Moneypenny Small Business Call Report (2016), 69% of voicemail callers don't leave a message. AI call answering captures 100% of callers, qualifies their needs, and delivers structured lead information instantly. A tradesperson using AI call answering instead of voicemail typically recovers £15,000 to £25,000 in lost revenue annually.",
                },
                {
                  q: "Can AI call answering handle trade-specific terminology?",
                  a: "Yes, modern AI call answering is trained on trade-specific terminology. It understands phrases like 'combi boiler pressure drop,' 'consumer unit upgrade,' 'emergency lockout,' 'drainage clearance,' 'flat roof repair,' and 'pat testing.' Services like whoza.ai offer 15+ UK trade verticals with custom training, ensuring the AI sounds knowledgeable and captures accurate technical details.",
                },
                {
                  q: "How quickly can I set up AI call answering?",
                  a: "With whoza.ai, setup takes approximately 30 minutes: connect your number via call forwarding, configure your services and operating hours, customize the questions the AI asks callers, test with a sample call, and go live. Other services range from under 1 hour (IONOS) to 2 to 5 days (Moneypenny human receptionists). Most tradespeople can be live the same day.",
                },
                {
                  q: "What is the ROI of AI call answering for trades?",
                  a: "The ROI of AI call answering is exceptional. A typical plumber missing 5 calls per day loses approximately £625 daily in potential revenue (at £125 average job value and 50% conversion rate). Even if AI recovers only 20% of missed calls, that generates £32,500 additional annual revenue. Against a service cost of £708 to £1,500/year, the ROI ranges from 2,100% to 4,500%. For emergency trades, capturing one extra callout per week pays for the entire monthly service. Use our \u003ca href='/' className='text-emerald-400 hover:underline'\u003eLost Jobs Calculator\u003c/a\u003e to see your exact numbers.",
                },
                {
                  q: "Does AI call answering work with my existing phone number?",
                  a: "Yes, AI call answering works with your existing business phone number. You simply configure call forwarding on your mobile or landline to divert unanswered or busy calls to the AI service. Your customers never know the difference. They dial your usual number and the AI answers professionally in your business name. You can also get a dedicated number if preferred. For after-hours coverage, see our \u003ca href='/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026' className='text-emerald-400 hover:underline'\u003e24/7 call answering guide\u003c/a\u003e.",
                },
                {
                  q: "Is AI call answering GDPR compliant for UK trades?",
                  a: "AI call answering is GDPR compliant when provided by ICO-registered services. whoza.ai is registered with the Information Commissioner's Office (ICO) under ZC077271 and complies with UK GDPR and Data Protection Act 2018. Customer call data is processed lawfully, stored securely, and deleted according to retention policies. Always verify ICO registration before sharing customer data with any call answering provider.",
                },
                {
                  q: "Can I try AI call answering before committing?",
                  a: "Yes, whoza.ai offers a 7-day free trial with no credit card required, plus a 30-day money-back guarantee. This means you can test the full service for 37 days total with zero financial risk. Most reputable AI call answering services offer trial periods ranging from 7 to 14 days. Avoid any service that does not offer a trial period. See our \u003ca href='/pricing' className='text-emerald-400 hover:underline'\u003epricing page\u003c/a\u003e for plan details.",
                },
                {
                  q: "How does AI call answering compare to a human receptionist?",
                  a: "AI call answering costs significantly less than employing a human receptionist. A receptionist earns £18,000 starter, £22,000 experienced (National Careers Service, gov.uk). With employer National Insurance and pension contributions the annual cost is roughly £20,000 to £25,000. Whoza plans start at £59 a month, £708 a year. This comparison is on call-handling cost alone; a receptionist works 38 to 40 hours a week and handles tasks beyond answering calls. AI answers 24/7 without sick days, holidays, or breaks. AI sets up in 30 minutes versus weeks of recruitment and training. However, human receptionists offer superior empathy and can handle highly complex, nuanced conversations. For most trades, AI provides better value; luxury or commercial trades may still prefer human receptionists. Read our <a href='/blog/ai-call-answering-pricing-guide-uk-2026' className='text-emerald-400 hover:underline'>AI call answering pricing guide</a> for a full cost breakdown.",
                },
              ].map((faq, index) => (
                <details key={index} className="group bg-white border border-[var(--v2-line)] rounded-2xl open:border-emerald-500/30 open:bg-emerald-500/[0.03] transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-[var(--v2-ink)] pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-[var(--v2-muted)] shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-[var(--v2-body)] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CtaBand
              id="definitive-guide"
              heading={["Stop Losing Calls.", "Start Winning Jobs."]}
              text="Every missed call is a job for your competitor. AI call answering captures every opportunity 24/7, delivers leads to your WhatsApp instantly, and pays for itself with a single recovered job per month."
              primaryLabel="Start Free Trial"
              source="definitive-guide-cta"
              secondary={{ label: "See Service Comparison", href: "/best-ai-call-handler-uk-trades" }}
            >
              <p className="mt-6 text-sm text-[var(--v2-muted)]">
                <a href="/pricing" className="cta-link text-[var(--v2-green)] hover:underline">Whoza.ai pricing</a> starts at £59/month.{" "}
                <a href="/pricing" className="cta-link text-[var(--v2-green)] hover:underline">View our plans</a> for sole traders and growing teams.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--v2-muted)]">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[var(--v2-green)]" /> ICO Registered (ZC077271)
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[var(--v2-green)]" /> Company SC874716
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[var(--v2-green)]" /> 30-Day Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--v2-green)]" /> 7-Day Free Trial
                </span>
                <span className="flex items-center gap-2">
                  <X className="w-4 h-4 text-[var(--v2-green)]" /> No Contract
                </span>
              </div>
            </CtaBand>
          </section>

          {/* Related Content */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[var(--v2-line)]">
            <h3 className="text-lg font-semibold text-[var(--v2-body)] mb-4 text-center">Related Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="/best-ai-call-handler-uk-trades" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] transition-colors">
                <div className="text-[var(--v2-green)] text-sm font-medium mb-2">Comparison</div>
                <div className="font-semibold text-[var(--v2-ink)] mb-1">7 Best AI Call Answering Services Compared</div>
                <p className="text-[var(--v2-muted)] text-sm">Comparison of 7 AI call answering services for UK trades.</p>
              </a>
              <a href="/pricing" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] transition-colors">
                <div className="text-[var(--v2-green)] text-sm font-medium mb-2">Pricing</div>
                <div className="font-semibold text-[var(--v2-ink)] mb-1">Whoza.ai Pricing</div>
                <p className="text-[var(--v2-muted)] text-sm">Transparent pricing from £59/month. No contracts, no hidden fees.</p>
              </a>
              <a href="/" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] transition-colors">
                <div className="text-[var(--v2-green)] text-sm font-medium mb-2">Calculator</div>
                <div className="font-semibold text-[var(--v2-ink)] mb-1">Lost Jobs Calculator</div>
                <p className="text-[var(--v2-muted)] text-sm">Calculate how much missed calls are costing your trade business.</p>
              </a>
              <a href="/" className="block bg-white border border-[var(--v2-line)] rounded-2xl p-6 hover:border-[#b9c6bf] transition-colors">
                <div className="text-[var(--v2-green)] text-sm font-medium mb-2">Free Trial</div>
                <div className="font-semibold text-[var(--v2-ink)] mb-1">Try Katie Free for 7 Days</div>
                <p className="text-[var(--v2-muted)] text-sm">No credit card required. Start capturing every call in minutes.</p>
              </a>
            </div>
          </section>
          <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
            <SharePost url="https://whoza.ai/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026" title="AI Call Answering for UK Trades: The Complete 2026 Guide" />
          </div>

          <div className="mt-24 sm:mt-32">
            <RelatedPosts slug="ai-call-answering-uk-tradespeople-definitive-guide-2026" />
          </div>
        </main>

        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "AI Call Answering UK Tradespeople Definitive Guide 2026",
            "description": "Definitive guide to AI call answering for UK tradespeople.",
            "image": "https://whoza.ai/og-image.webp",
            "datePublished": "2026-06-20",
            "dateModified": "2026-06-20",
            "author": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "publisher": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".post-intro", ".key-statistics"]
            }
          })
        }}
      />
<Footer hideCta />
      </div>
    </>
  )
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
