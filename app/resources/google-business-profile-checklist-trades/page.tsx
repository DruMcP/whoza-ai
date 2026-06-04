"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import {
  ArrowRight,
  CheckCircle,
  Circle,
  Camera,
  Star,
  MessageSquare,
  Calendar,
  HelpCircle,
  Printer,
  MapPin,
  ChevronRight,
  Search,
  Wrench,
} from "lucide-react"
import Link from "next/link"

type ChecklistState = Record<string, boolean>

const STORAGE_KEY = "whoza-gbp-checklist-v1"

const categoriesByTrade: Record<string, string[]> = {
  Plumber: ["Plumber", "Emergency Plumber", "Drainage Service", "Bathroom Renovator", "Heating Contractor"],
  Electrician: ["Electrician", "Emergency Electrician", "Electrical Contractor", "EV Charging Station Installer"],
  Builder: ["Builder", "Construction Company", "Renovation Contractor", "Extension Builder"],
  Roofer: ["Roofer", "Roofing Contractor", "Flat Roofing Specialist", "Chimney Sweep"],
  "Painter & Decorator": ["Painter", "Decorator", "Wallpaper Installer", "Spray Painting Service"],
  "Heating Engineer": ["Heating Contractor", "Boiler Repair", "Gas Engineer", "HVAC Contractor"],
  Landscaper: ["Landscaper", "Garden Designer", "Tree Surgeon", "Driveway Installer", "Fencing Contractor"],
  Carpenter: ["Carpenter", "Joiner", "Kitchen Fitter", "Staircase Specialist"],
  Tiler: ["Tiler", "Bathroom Tiler", "Floor Tiler", "Stone Mason"],
  Plasterer: ["Plasterer", "Dry Wall Contractor", "Rendering Service"],
  Locksmith: ["Locksmith", "Emergency Locksmith", "Safe Engineer", "Security System Installer"],
  "Drainage Specialist": ["Drainage Service", "Septic Tank Service", "Drain Surveyor"],
  "Pest Control": ["Pest Control Service", "Bird Control Service", "Wildlife Control Service"],
}

const photoGuidelines = [
  { type: "Logo", count: "1", desc: "Clear, square logo (720x720px minimum). No text overlays." },
  { type: "Cover Photo", count: "1", desc: "Showcase your best work. 1332x400px minimum. Bright, well-lit." },
  { type: "Exterior", count: "3-5", desc: "Your van, branded uniform, tools. Helps customers recognise you." },
  { type: "Work Photos", count: "10-15", desc: "Before/during/after shots. Label with short captions." },
  { type: "Team Photos", count: "2-3", desc: "Friendly, professional. Builds trust with homeowners." },
  { type: "Certificates / Insurance", count: "2-3", desc: "Gas Safe, NICEIC, CHAS. Builds authority." },
]

const reviewTemplates: Record<string, { subject: string; body: string }> = {
  Plumber: {
    subject: "Quick feedback on your recent plumbing job",
    body:
      "Hi [Name], thanks for choosing [Business Name] for your plumbing work. If you're happy with the service, a quick Google review would mean the world to us. It helps other homeowners find a reliable plumber. Just click here: [Review Link]",
  },
  Electrician: {
    subject: "Was your electrical work up to standard?",
    body:
      "Hi [Name], hope the electrical work we completed is working perfectly for you. If you have a minute, we'd really appreciate a Google review. Your feedback helps other homeowners find a trusted electrician: [Review Link]",
  },
  Builder: {
    subject: "How did your building project go?",
    body:
      "Hi [Name], it was great working on your [project type]. If you're pleased with the result, a Google review helps us grow and shows future clients what we can do. Here's the link: [Review Link]",
  },
  Roofer: {
    subject: "Quick check-in after your roofing work",
    body:
      "Hi [Name], just checking your roof is holding up well after our visit. If everything's dry and solid, a short Google review would help other homeowners find a roofer they can trust: [Review Link]",
  },
  "Painter & Decorator": {
    subject: "Love your new look?",
    body:
      "Hi [Name], hope you're enjoying the fresh finish! If you're happy with the work, a quick Google review would help other homeowners find a decorator they can trust: [Review Link]",
  },
  default: {
    subject: "Quick feedback on your recent job",
    body:
      "Hi [Name], thanks for choosing [Business Name]. If you're happy with the work, a quick Google review would really help us grow. It only takes 30 seconds: [Review Link]",
  },
}

const postStrategy = [
  { frequency: "1x per week", type: "Offer / Promotion", example: '"10% off boiler servicing this month — book now"' },
  { frequency: "1x per week", type: "Completed Job Photo", example: '"Before \u0026 after kitchen rewire for a happy customer in [Area]"' },
  { frequency: "2x per month", type: "Tip / Educational", example: '"3 signs your boiler needs a service before winter"' },
  { frequency: "1x per month", type: "Team / Behind the Scenes", example: '"Meet Dave — our senior sparky with 15 years experience"' },
]

const faqItems = [
  {
    q: "How do I choose the right Google Business Profile category?",
    a: "Pick the category that most accurately describes your primary service. You can add up to 9 additional categories. For example, a plumber should use 'Plumber' as primary, then add 'Emergency Plumber', 'Drainage Service', and 'Bathroom Renovator' as secondary categories.",
  },
  {
    q: "How many photos should I upload to my Google Business Profile?",
    a: "Google recommends at least 10 photos, but businesses with 20+ photos get significantly more engagement. Aim for: 1 logo, 1 cover photo, 3-5 exterior/van shots, 10-15 work photos, 2-3 team photos, and 2-3 certificate shots.",
  },
  {
    q: "How often should I post on my Google Business Profile?",
    a: "Post at least once per week. Google favours active profiles. Mix offers, completed job photos, tips, and behind-the-scenes content. Posts expire after 7 days, so consistency matters more than perfection.",
  },
  {
    q: "What's the best way to ask customers for Google reviews?",
    a: "Ask immediately after job completion when the customer is happiest. Send a follow-up text or email with a direct review link. Include in your request: what you did, how long it took, and a direct link. Response rate doubles when you include a link.",
  },
  {
    q: "Should I respond to every review?",
    a: "Yes — especially negative ones. Responding to reviews shows you care and can turn a 1-star review into a positive impression for future customers. Keep responses professional, thank the reviewer, and address any issues raised.",
  },
  {
    q: "What Q&A should I pre-populate on my profile?",
    a: "Pre-populate questions about: emergency callout availability, pricing estimates, areas you cover, insurance details, qualifications/certifications, and typical response times. Use your own Google account to ask and your business account to answer.",
  },
]

const checklistSections = [
  {
    title: "Profile Basics",
    items: [
      "Business name matches your registered trading name",
      "Address is accurate and verified ( postcard or phone )",
      "Primary phone number is correct and monitored",
      "Business hours are accurate ( including emergency hours )",
      "Website URL links to your active website",
      "Business description is 750 characters, keyword-rich",
      "Primary category is accurate and specific",
      "Secondary categories cover all services offered",
      "Attributes are filled ( women-led, veteran-led, etc. )",
    ],
  },
  {
    title: "Photos & Media",
    items: [
      "Logo uploaded ( 720x720px, no text overlays )",
      "Cover photo showcases best work ( 1332x400px )",
      "At least 3 exterior/van photos uploaded",
      "10-15 work photos with before/after shots",
      "2-3 team photos showing friendly, professional staff",
      "Certificate/insurance photos uploaded ( Gas Safe, NICEIC, etc. )",
      "All photos are well-lit and high resolution",
      "Photo captions include location and service keywords",
    ],
  },
  {
    title: "Reviews & Reputation",
    items: [
      "Review request system in place ( text/email after job )",
      "Direct review link saved and ready to send",
      "Template messages prepared for review requests",
      "System to respond to all new reviews within 24 hours",
      "Negative review response template prepared",
      "Target: 10+ reviews for new profiles, 50+ for established",
      "Reviews mention specific services and locations",
    ],
  },
  {
    title: "Posts & Content",
    items: [
      "Posting schedule: at least 1x per week",
      "Offer/promotion posts planned monthly",
      "Completed job photo posts with location tags",
      "Educational/tip posts to build authority",
      "Behind-the-scenes team posts monthly",
      "Holiday/seasonal posts prepared in advance",
    ],
  },
  {
    title: "Q&A & Engagement",
    items: [
      "Pre-populated 5-10 common questions and answers",
      "Q&A covers: pricing, areas, emergency hours, insurance",
      "Monitoring system for new customer questions",
      "Response time target: under 2 hours for new questions",
      "Products/services list is complete and up-to-date",
    ],
  },
  {
    title: "Advanced Optimisation",
    items: [
      "Google Business Profile app installed on phone",
      "Notifications enabled for new reviews and questions",
      "Google Messages enabled for customer chat",
      "Booking link connected ( if applicable )",
      "Service areas defined ( if you don't list a fixed address )",
      "Holiday hours updated before bank holidays",
      "Regular monthly audit scheduled ( first Monday )",
    ],
  },
]

function getAllChecklistIds(): string[] {
  const ids: string[] = []
  checklistSections.forEach((section, si) => {
    section.items.forEach((item, ii) => {
      ids.push(`${si}-${ii}`)
    })
  })
  return ids
}

export default function GoogleBusinessProfileChecklistPage() {
  const [checked, setChecked] = useState<ChecklistState>({})
  const [selectedTrade, setSelectedTrade] = useState("Plumber")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showPrintVersion, setShowPrintVersion] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setChecked(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      // ignore
    }
  }, [checked])

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const progress = getAllChecklistIds()
  const completed = progress.filter((id) => checked[id]).length
  const total = progress.length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const handlePrint = useCallback(() => {
    setShowPrintVersion(true)
    setTimeout(() => {
      window.print()
      setShowPrintVersion(false)
    }, 300)
  }, [])

  const currentTemplate = reviewTemplates[selectedTrade] || reviewTemplates.default

  if (showPrintVersion) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white text-slate-900 print:p-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Google Business Profile Checklist for UK Trades</h1>
          <p className="text-slate-600">A complete optimisation checklist from whoza.ai</p>
        </div>
        {checklistSections.map((section, si) => (
          <div key={si} className="mb-8 break-inside-avoid">
            <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-slate-400 rounded mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-8 pt-4 border-t border-slate-300 text-sm text-slate-500">
          <p>Checklist provided by whoza.ai — AI Voice Agents for UK Tradespeople</p>
          <p>https://whoza.ai/resources/google-business-profile-checklist-trades</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Resources", item: "https://whoza.ai/resources" },
          { name: "GBP Checklist", item: "https://whoza.ai/resources/google-business-profile-checklist-trades" },
        ]}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0">
        {/* Hero */}
        <section
          className="dark-section relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%)" }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center text-sm text-slate-400" style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li className="mx-2">
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white">GBP Checklist</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                Interactive Checklist
              </div>
              <h1
                className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Google Business Profile
                <br />
                <span className="text-emerald-400">Checklist for UK Trades</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mb-8">
                A complete, step-by-step checklist to optimise your Google Business Profile and rank higher in local
                search. Tick items off as you go — your progress saves automatically.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#checklist"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
                >
                  Start the Checklist <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  <Printer className="w-4 h-4" />
                  Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Progress bar */}
        <section className="bg-emerald-50 border-b border-emerald-100 sticky top-[56px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-emerald-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-emerald-700 whitespace-nowrap">
                {completed}/{total} complete ({percent}%)
              </span>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main checklist */}
            <div className="lg:col-span-2 space-y-8">
              {checklistSections.map((section, si) => (
                <div key={si} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h2 className="font-bold text-slate-900 flex items-center gap-2">
                      <Search className="w-5 h-5 text-emerald-600" />
                      {section.title}
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {section.items.map((item, ii) => {
                      const id = `${si}-${ii}`
                      const isChecked = !!checked[id]
                      return (
                        <button
                          key={ii}
                          onClick={() => toggleItem(id)}
                          className={`w-full flex items-start gap-3 px-6 py-4 text-left transition-colors hover:bg-slate-50 ${
                            isChecked ? "bg-emerald-50/50" : ""
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <span className={`text-sm ${isChecked ? "text-slate-500 line-through" : "text-slate-700"}`}>
                            {item}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category picker */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-600" />
                  Category Recommendations
                </h3>
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white mb-4 text-sm"
                >
                  {Object.keys(categoriesByTrade).map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Primary</div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-sm font-medium text-emerald-800">
                    {categoriesByTrade[selectedTrade]?.[0]}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-3">Secondary</div>
                  {categoriesByTrade[selectedTrade]?.slice(1).map((cat, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo guidelines */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  Photo Guidelines
                </h3>
                <div className="space-y-3">
                  {photoGuidelines.map((g, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-600">
                        {g.count}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{g.type}</div>
                        <div className="text-xs text-slate-500">{g.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review template */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-600" />
                  Review Request Template
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Subject</div>
                    <div className="text-slate-800 font-medium">{currentTemplate.subject}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Body</div>
                    <div className="text-slate-700 leading-relaxed">{currentTemplate.body}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Post strategy */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            Post Strategy for Trades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postStrategy.map((post, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {post.frequency}
                  </span>
                  <span className="text-sm font-medium text-slate-800">{post.type}</span>
                </div>
                <p className="text-sm text-slate-600 italic">{post.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Q&A Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-600" />
            Pre-Populated Q&A for Your Profile
          </h2>
          <p className="text-slate-600 mb-6">
            Ask these questions from a personal Google account, then answer them from your business profile. This saves
            customers time and ranks you for common search queries.
          </p>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === i ? "rotate-90" : ""}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related resources */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/how-much-do-missed-calls-cost-uk-trades"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Google Business Profile for Trades</div>
                <div className="text-sm text-slate-500">Complete setup guide</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
            <Link
              href="/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Search className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Local SEO for Trades</div>
                <div className="text-sm text-slate-500">Complete 2026 guide</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get more calls from your Google profile</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            whoza.ai answers every call that comes through your Google Business Profile — even at 2am. Start your 7-day
            free trial today.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Try whoza.ai Free for 7 Days <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
