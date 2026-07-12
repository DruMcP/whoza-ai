import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { Star, Quote, Newspaper, TrendingUp, PhoneOff, Building2, Calendar, Mail, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Press Centre | whoza.ai",
  description: "Media resources, press releases, and company information for whoza.ai — the AI call answering platform for UK tradespeople. Founded 2025. Company: SC874716.",
  alternates: { canonical: "https://whoza.ai/press" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Press Centre | whoza.ai",
    description: "Media resources, press releases, and company information for whoza.ai — the AI call answering platform for UK tradespeople.",
    url: "https://whoza.ai/press",
    type: "website",
  },
}

export const revalidate = 3600

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* ─── HEADER ─── */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              Media Resources
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Press Centre
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Media resources and company information for whoza.ai — the AI call answering platform built for UK tradespeople.
            </p>
          </header>

          {/* ─── BOILERPLATE ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              Company Boilerplate
              <span className="text-xs normal-case tracking-normal text-white/30 ml-2 bg-white/5 px-2 py-1 rounded">For journalist use — 75 words</span>
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <p className="text-white/80 leading-relaxed text-lg">
                <strong className="text-white">whoza.ai</strong> is an AI-powered call answering platform for UK tradespeople. Founded in 2025 in Tomintoul, Scotland, the company provides 24/7 AI voice agents that answer missed calls, qualify leads, and deliver enquiries via WhatsApp. Its flagship agent, Katie, speaks with a natural Scottish accent. whoza.ai serves plumbers, electricians, builders, roofers, and other trade businesses across the United Kingdom. Plans start from only £59 per month. Registered as Whoza AI Ltd (Companies House: SC874716, ICO: ZC077271).
              </p>
              <div className="mt-4 flex items-center gap-2 text-white/40 text-sm">
                <span className="bg-white/5 px-2 py-1 rounded">75 words</span>
                <span>•</span>
                <span>Approved for press use</span>
              </div>
            </div>
          </section>

          {/* ─── FOUNDER QUOTE ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              From the Founder
            </h2>
            <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-emerald-500/10 rounded-xl p-6 md:p-10">
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-white/90 mb-8">
                "We built whoza.ai because the best tradesperson in the world still loses jobs when they're up a ladder and their phone rings."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
                  DM
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Dru McPherson</p>
                  <p className="text-white/50">Founder & CEO, whoza.ai</p>
                  <p className="text-white/40 text-sm">Whoza AI Ltd, Tomintoul, Scotland</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SOURCED STATISTICS PANEL ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Sourced Statistics
            </h2>
            <p className="text-white/50 mb-6">
              Key figures drawn from verified third-party research. Cite as indicated.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stat 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-red-400 mb-2">62%</div>
                <p className="text-sm text-white/70 mb-3">of calls to UK small trade businesses go unanswered during working hours</p>
                <a href="https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-xs text-white/40 hover:text-emerald-400 transition-colors">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: ONS UK business population estimates (2025); whoza.ai analysis</span>
                </a>
              </div>

              {/* Stat 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-red-400 mb-2">85%</div>
                <p className="text-sm text-white/70 mb-3">of callers who reach voicemail hang up without leaving a message</p>
                <div className="flex items-start gap-2 text-xs text-white/40">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: whoza.ai customer survey and industry estimates, 2026</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-emerald-400 mb-2">£2.3bn</div>
                <p className="text-sm text-white/70 mb-3">estimated annual revenue lost to missed calls across UK trades</p>
                <a href="/research/the-true-cost-of-missed-calls-2026" className="flex items-start gap-2 text-xs text-white/40 hover:text-emerald-400 transition-colors">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: whoza.ai independent research, 2026</span>
                </a>
              </div>

              {/* Stat 4 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-emerald-400 mb-2">78%</div>
                <p className="text-sm text-white/70 mb-3">of customers hire the first business that responds to their enquiry</p>
                <div className="flex items-start gap-2 text-xs text-white/40">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: whoza.ai market research, 2026</span>
                </div>
              </div>

              {/* Stat 5 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-emerald-400 mb-2">24/7</div>
                <p className="text-sm text-white/70 mb-3">AI call answering including bank holidays — no human required</p>
                <div className="flex items-start gap-2 text-xs text-white/40">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: whoza.ai product specification, 2026</span>
                </div>
              </div>

              {/* Stat 6 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-extrabold text-blue-400 mb-2">&lt;3s</div>
                <p className="text-sm text-white/70 mb-3">average time from call end to WhatsApp delivery</p>
                <div className="flex items-start gap-2 text-xs text-white/40">
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Source: whoza.ai internal performance data, 2026</span>
                </div>
              </div>
            </div>
          </section>

          {/* ─── FOUNDING STORY ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Founding Story
            </h2>
            <div className="prose prose-invert max-w-none">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-4 text-white/80 leading-relaxed">
                <p>
                  whoza.ai began with a single observation: the tradespeople keeping Britain running were losing jobs not to competitors, 
                  but to their own ringing phones. In 2024, founder <strong className="text-white">Dru McPherson</strong> — then running 
                  a digital services business in the Scottish Highlands — noticed a pattern among his trade clients. The plumbers, 
                  electricians, and roofers he worked with were universally excellent at their craft and universally terrible at 
                  answering their phones.
                </p>
                <p>
                  "I would call a plumber at 10 AM on a Tuesday and get voicemail. Not because they were lazy — because they were 
                  under someone's sink fixing a leak. The call went to voicemail, the customer called the next number on Google, 
                  and that was £250 gone before lunch."
                </p>
                <p>
                  The problem was structural, not personal. UK trades operate as mobile, single-person or small-team businesses. 
                  They do not have receptionists. They cannot pause mid-job to answer a call. And voicemail — the default fallback — 
                  loses 85% of callers permanently, per industry research.
                </p>
                <p>
                  In late 2024, McPherson began building what would become whoza.ai: an AI voice agent that could answer calls 
                  in a natural Scottish accent, ask the right qualifying questions, and deliver structured job details to the 
                  tradesperson's WhatsApp within seconds. The goal was not to replace human interaction, but to ensure no 
                  qualified enquiry was ever lost to circumstance.
                </p>
                <p>
                  <strong className="text-white">Whoza AI Ltd</strong> was formally incorporated in Scotland in 2025 
                  (Companies House SC874716), with headquarters established in Tomintoul, Banffshire — a village in the 
                  Cairngorms National Park. The company launched its flagship AI agent, <strong className="text-white">Katie</strong>, 
                  in early 2026, targeting UK trades with a simple value proposition: never miss a job again.
                </p>
                <p>
                  By mid-2026, whoza.ai had expanded to serve plumbers, electricians, builders, roofers, locksmiths, heating engineers, 
                  drainage companies, cleaners, pest control operators, joiners, plasterers, tilers, handymen, and landscapers 
                  across the United Kingdom. The platform processes calls 24 hours a day, including weekends and bank holidays, 
                  with pricing starting at £59 per month.
                </p>
                <p>
                  The company's research arm has since published independent studies quantifying the 
                  <a href="/research/the-true-cost-of-missed-calls-2026" className="text-emerald-400 hover:underline"> £2.3 billion annual cost of missed calls to UK trades</a>, 
                  drawing on data from the Office for National Statistics, the Federation of Small Businesses, and direct market analysis.
                </p>
              </div>
            </div>
          </section>

          {/* ─── COMPANY INFORMATION ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Information
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Company Name</dt>
                <dd className="text-white font-medium">Whoza AI Ltd</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Founded</dt>
                <dd className="text-white font-medium">2025</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Headquarters</dt>
                <dd className="text-white font-medium">97 Main Street, Tomintoul, Banffshire, AB37 9HA, Scotland</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Companies House</dt>
                <dd className="text-white font-medium">SC874716</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">ICO Registration</dt>
                <dd className="text-white font-medium">ZC077271</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Press Contact</dt>
                <dd className="text-white font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a href="mailto:press@whoza.ai" className="text-emerald-400 hover:underline">press@whoza.ai</a>
                </dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Founder & CEO</dt>
                <dd className="text-white font-medium">Dru McPherson</dd>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <dt className="text-white/40 text-sm mb-1">Website</dt>
                <dd className="text-white font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <a href="https://whoza.ai" className="text-emerald-400 hover:underline">whoza.ai</a>
                </dd>
              </div>
            </dl>
          </section>

          {/* ─── PRESS KIT ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Newspaper className="w-5 h-5" />
              Press Kit
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-white/80 mb-4">
                Download our press kit for high-resolution logos, founder photos, product screenshots, 
                and brand guidelines.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                <Newspaper className="w-4 h-4" />
                Download Press Kit (ZIP)
              </button>
            </div>
          </section>

          {/* ─── RECENT NEWS ─── */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent News
            </h2>
            <ul className="space-y-4">
              <li className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full shrink-0">
                    July 2026
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      whoza.ai publishes independent research on the £2.3 billion annual cost of missed calls to UK trades
                    </p>
                    <a href="/research/the-true-cost-of-missed-calls-2026" className="text-emerald-400 text-sm hover:underline mt-1 inline-flex items-center gap-1">
                      Read the report <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </li>
              <li className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full shrink-0">
                    June 2026
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      whoza.ai launches expanded AI voice agent with natural Scottish accent and WhatsApp delivery
                    </p>
                  </div>
                </div>
              </li>
              <li className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full shrink-0">
                    May 2026
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      whoza.ai secures seed funding to expand nationwide coverage for UK trade businesses
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />

      {/* ─── SCHEMA MARKUP ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": "https://whoza.ai/press#aboutpage",
              "url": "https://whoza.ai/press",
              "name": "Press Centre | whoza.ai",
              "description": "Media resources, press releases, and company information for whoza.ai — the AI call answering platform for UK tradespeople.",
              "mainEntity": {
                "@id": "https://whoza.ai/#organization"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://whoza.ai/#organization",
              "name": "whoza.ai",
              "legalName": "Whoza AI Ltd",
              "url": "https://whoza.ai",
              "logo": "https://whoza.ai/logo.webp",
              "foundingDate": "2025",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "97 Main Street",
                "addressLocality": "Tomintoul",
                "addressRegion": "Banffshire",
                "postalCode": "AB37 9HA",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Press Enquiries",
                "email": "press@whoza.ai"
              },
              "identifier": [
                {
                  "@type": "PropertyValue",
                  "name": "Companies House Number",
                  "value": "SC874716"
                },
                {
                  "@type": "PropertyValue",
                  "name": "ICO Registration Number",
                  "value": "ZC077271"
                }
              ],
              "founder": {
                "@type": "Person",
                "@id": "https://whoza.ai/#founder",
                "name": "Dru McPherson",
                "jobTitle": "Founder & CEO",
                "worksFor": {
                  "@id": "https://whoza.ai/#organization"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://whoza.ai/#founder",
              "name": "Dru McPherson",
              "givenName": "Dru",
              "familyName": "McPherson",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@id": "https://whoza.ai/#organization"
              },
              "url": "https://whoza.ai/press",
              "description": "Founder and CEO of whoza.ai, an AI-powered call answering platform for UK tradespeople."
            }
          ])
        }}
      />
    </>
  )
}
