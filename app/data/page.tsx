import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { CheckCircle, AlertTriangle, XCircle, BookOpen, ExternalLink, Shield } from "lucide-react"
import { CitationSchema } from "@/components/whoza/citation-schema"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Evidence Base: Every Statistic We Use and Its Source",
  description: "Every statistic, source, and methodology behind whoza.ai's content. Verified, descriptive, or unverified — we show our working.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/data",
    siteName: "whoza.ai",
    title: "Evidence Base: Every Statistic We Use and Its Source",
    description: "Every statistic, source, and methodology behind whoza.ai's content. Verified, descriptive, or unverified — we show our working.",
  },
}

const sources = {
  primary: [
    { name: "Moneypenny Small Business Call Report", year: 2016, url: "https://www.moneypenny.com/uk/resources/blog/free-resource-small-business-call-report/", what: "33% of small businesses fail to answer incoming calls; 69% of voicemail callers don't leave a message", verified: "verified" },
    { name: "Ofcom Online Nation", year: 2025, url: "https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025", what: "90% of UK adults use WhatsApp; 82% use Google Search; about 30% of searches show AI Overviews and more than half of adults (53%) see them often; ChatGPT took 1.8 billion UK visits in the first eight months of 2025, up from 368 million", verified: "verified" },
    { name: "National Careers Service", year: 2024, url: "https://nationalcareers.service.gov.uk/job-profiles/receptionist", what: "Receptionist salaries: £18,000 starter, £22,000 experienced", verified: "verified" },
    { name: "Department for Business and Trade, Business Population Estimates 2025", year: 2025, url: "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release", what: "5.7 million UK private sector businesses; 4.3 million (75%) have no employees; 885,000 construction SMEs (16%, the largest sector)", verified: "verified" },
    { name: "Federation of Small Businesses (FSB)", year: 2025, url: "https://www.fsb.org.uk/", what: "78% of UK micro-businesses spend less than £200/month on business software", verified: "unverified" },
    { name: "ONS, Artificial intelligence in UK businesses: 2023 to 2026", year: 2026, url: "https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026", what: "28% of businesses with 0–9 employees use at least one AI technology; construction lowest of any industry at 13%. BICS Wave 159, fieldwork 15–28 June 2026, 38,637 responses", verified: "verified" },
    { name: "DSIT, Public Engagement Survey 2025/2026", year: 2026, url: "https://www.gov.uk/government/statistics/dsit-public-engagement-survey-20252026/dsit-public-engagement-survey-20252026", what: "97% of adults aware of AI; 59% used generative AI in the last three months; 74% concerned AI-produced information may be inaccurate. 30,698 respondents, fieldwork Nov 2025 – Mar 2026", verified: "verified" },
    { name: "FMB, State of Trade Survey H2 2025", year: 2026, url: "https://www.fmb.org.uk/resource/state-of-trade-survey-h2-2025.html", what: "Enquiries +18% (England +19%, Scotland +16%); workloads +22%; 72% affected by lack of skilled tradespeople; 49% had job delays. 493 responses, published 31 March 2026", verified: "verified" },
  ],
  secondary: [
    { name: "Dialzara", year: 2025, url: "https://dialzara.com/", what: "62% of unanswered callers immediately contact a competitor", verified: "unverified" },
    { name: "PATLive", year: 2025, url: "https://www.patlive.com/", what: "85% of unanswered callers never call back", verified: "unverified" },
    { name: "Replicant AI", year: 2024, url: "https://www.replicant.ai/", what: "Missed call rates by business size", verified: "unverified" },
    { name: "411 Locals", year: 2024, url: "https://getaira.io/", what: "62% of business calls go unanswered", verified: "unverified" },
    { name: "IDC", year: 2025, url: "https://www.idc.com/", what: "AI ROI study: payback periods and returns", verified: "unverified" },
    { name: "Voco HQ", year: 2026, url: "https://vocohq.co.uk/", what: "True cost of missed calls for UK businesses", verified: "unverified" },
    { name: "Salesforce", year: 2026, url: "https://www.salesforce.com/", what: "82% of consumers expect an immediate response to sales enquiries", verified: "unverified" },
    { name: "HubSpot", year: 2026, url: "https://www.hubspot.com/", what: "60% define 'immediate' as 10 minutes or less", verified: "unverified" },
  ],
  tertiary: [
    { name: "EchoCall", year: 2026, url: "https://echocall.de/", what: "AI voice agent statistics compilation", verified: "unverified" },
    { name: "Checkatrade", year: 2024, url: "https://www.checkatrade.com/", what: "Average UK tradesperson job values and call-out fees", verified: "descriptive" },
  ],
}

const removedClaims = [
  {
    claim: "78% of customers hire whoever responds first",
    why: "Withheld, not discredited. The underlying research — 500 UK trades businesses surveyed by email and WhatsApp, fieldwork July 2024 – July 2025, conducted by Dru McPherson — is real. The exact wording of the question that produced 78% is not retained. A specific claim needs the specific question behind it. The figure will return if and when that wording surfaces.",
  },
  {
    claim: "AlwaysOnBooking Consumer Study 2026",
    why: "No such organisation or report exists. Searched extensively. Removed from all citations.",
  },
  {
    claim: "JP Automations Consumer Study 2026",
    why: "JP Automations (jpautomations.co.uk) is a real AI automation vendor for UK trades — a direct competitor — but publishes no such study. Removed from all citations.",
  },
]

const officialAudit = [
  { source: "Ofcom, Online Nation 2025", figure: "90% of UK adults use WhatsApp", status: "verified", url: "https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025", note: "Loaded Ofcom page. Figure confirmed in headline findings." },
  { source: "National Careers Service", figure: "Receptionist: £18,000 starter, £22,000 experienced", status: "verified", url: "https://nationalcareers.service.gov.uk/job-profiles/receptionist", note: "Loaded NCS job profile. Salary band confirmed." },
  { source: "ONS 2024 average wages data", figure: "Human receptionist £20,000–£25,000/year", status: "descriptive", url: "", note: "Source cited by third-party blogs. Not loaded directly. The £20,000–£25,000 range is our arithmetic from NCS salaries plus estimated employer NI and pension." },
  { source: "DBT, Business Population Estimates 2025", figure: "885,000 construction SMEs; 4.3m (75%) of UK businesses have no employees", status: "verified", url: "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release", note: "Statistical release loaded 22 Aug 2026. Published 2 October 2025. Figures confirmed verbatim." },
  { source: "ONS, AI in UK businesses 2023–2026", figure: "28% of 0–9 employee businesses use AI; construction 13%, lowest of any industry", status: "verified", url: "https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026", note: "Publisher page loaded 22 Aug 2026. BICS Wave 159, fieldwork 15–28 June 2026, 38,637 responses, 26.7% response rate." },
  { source: "DSIT, Public Engagement Survey 2025/2026", figure: "74% concerned AI-produced information may be inaccurate", status: "verified", url: "https://www.gov.uk/government/statistics/dsit-public-engagement-survey-20252026/dsit-public-engagement-survey-20252026", note: "Publisher page loaded 22 Aug 2026. 30,698 respondents, fieldwork Nov 2025 – Mar 2026. Published because it counts against us, not for us." },
  { source: "FMB, State of Trade Survey H2 2025", figure: "Enquiries +18%; 72% affected by skills shortage; 49% had job delays", status: "verified", url: "https://www.fmb.org.uk/resource/state-of-trade-survey-h2-2025.html", note: "Publisher page loaded 22 Aug 2026. 493 responses, published 31 March 2026." },
]

const governmentData = [
  { name: "Ofcom Online Nation 2025", url: "https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025", desc: "UK adult internet and app usage, including WhatsApp adoption rates." },
  { name: "DBT Business Population Estimates 2025", url: "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release", desc: "Official count of UK businesses by size, sector, and geography." },
  { name: "National Careers Service", url: "https://nationalcareers.service.gov.uk/", desc: "Government-backed job profiles with salary bands and career paths." },
  { name: "ONS, Artificial intelligence in UK businesses", url: "https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026", desc: "AI adoption by UK business size and industry, from the Business Insights and Conditions Survey." },
  { name: "DSIT Public Engagement Survey 2025/2026", url: "https://www.gov.uk/government/statistics/dsit-public-engagement-survey-20252026/dsit-public-engagement-survey-20252026", desc: "UK public awareness of, use of, and concerns about artificial intelligence." },
]

function StatusBadge({ status }: { status: string }) {
  if (status === "verified") {
    return <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium"><CheckCircle className="w-4 h-4" /> Verified</span>
  }
  if (status === "descriptive") {
    return <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium"><AlertTriangle className="w-4 h-4" /> Descriptive</span>
  }
  return <span className="inline-flex items-center gap-1 text-red-400 text-sm font-medium"><XCircle className="w-4 h-4" /> Unverified</span>
}

export default function DataPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://whoza.ai/" }, { name: "Evidence Base", url: "https://whoza.ai/data" }]} />
      <Header />
      <CitationSchema citations={[
        { name: "Moneypenny Small Business Call Report", datePublished: "2016", url: "https://www.moneypenny.com/uk/resources/blog/free-resource-small-business-call-report/" },
        { name: "Ofcom Online Nation", datePublished: "2025", url: "https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025" },
        { name: "National Careers Service", datePublished: "2024", url: "https://nationalcareers.service.gov.uk/job-profiles/receptionist" },
        { name: "DBT Business Population Estimates", datePublished: "2025", url: "https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release" },
        { name: "FSB survey", datePublished: "2025" },
        { name: "Forbes / Ruby Research", datePublished: "2025" },
        { name: "Dialzara", datePublished: "2025" },
        { name: "PATLive", datePublished: "2025" },
        { name: "Replicant AI", datePublished: "2024" },
        { name: "411 Locals", datePublished: "2024" },
        { name: "IDC", datePublished: "2025" },
        { name: "Voco HQ", datePublished: "2026" },
        { name: "EchoCall", datePublished: "2026" },
        { name: "ONS, Artificial intelligence in UK businesses", datePublished: "2026-07-20", url: "https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026" },
        { name: "DSIT, Public Engagement Survey", datePublished: "2026-07-16", url: "https://www.gov.uk/government/statistics/dsit-public-engagement-survey-20252026/dsit-public-engagement-survey-20252026" },
        { name: "FMB, State of Trade Survey H2 2025", datePublished: "2026-03-31", url: "https://www.fmb.org.uk/resource/state-of-trade-survey-h2-2025.html" },
      ]} />
      <main className="min-h-screen bg-[var(--navy-950)]">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Evidence Base & <span className="text-emerald-400">Data Sources</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Every statistic on whoza.ai is either verified against its publisher, described as our own arithmetic, or explicitly marked as unverified. We do not invent sources, modernise dates, or replace withdrawn figures with ones that sound better.
          </p>
        </section>

        {/* Sources Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            Sources We Cite
          </h2>

          <h3 className="text-lg font-semibold text-white mb-4">Primary Sources</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">What we use it for</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {sources.primary.map((s, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                        {s.name} ({s.year}) <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3 pr-4">{s.what}</td>
                    <td className="py-3"><StatusBadge status={s.verified} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Secondary Sources</h3>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">What we use it for</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {sources.secondary.map((s, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                          {s.name} ({s.year}) <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span>{s.name} ({s.year})</span>
                      )}
                    </td>
                    <td className="py-3 pr-4">{s.what}</td>
                    <td className="py-3"><StatusBadge status={s.verified} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Tertiary / Descriptive Sources</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">What we use it for</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {sources.tertiary.map((s, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                        {s.name} ({s.year}) <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3 pr-4">{s.what}</td>
                    <td className="py-3"><StatusBadge status={s.verified} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What We Removed */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-400" />
            What We Removed and Why
          </h2>
          <div className="space-y-6">
            {removedClaims.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.claim}</h3>
                <p className="text-white/70">{item.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Official-Source Audit */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            Official-Source Audit
          </h2>
          <p className="text-white/70 mb-6">
            Every government or official body citation classified. <strong>Verified</strong> means we loaded the publisher's page and confirmed the figure. <strong>Descriptive</strong> means the source exists but the specific number is our own arithmetic. <strong>Unverified</strong> means we have not yet loaded the publisher's page.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Figure as cited</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                {officialAudit.map((item, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                          {item.source} <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        item.source
                      )}
                    </td>
                    <td className="py-3 pr-4">{item.figure}</td>
                    <td className="py-3 pr-4"><StatusBadge status={item.status} /></td>
                    <td className="py-3 text-white/60">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UK Government Open Data */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            UK Government Open Data We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governmentData.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                <h3 className="text-white font-semibold mb-1 inline-flex items-center gap-2">
                  {item.name} <ExternalLink className="w-3 h-3 text-emerald-400" />
                </h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-400" />
            Methodology
          </h2>
          <div className="space-y-4 text-white/70">
            <p>
              <strong>Our rule:</strong> if we cannot show the exact question that produced a percentage, we do not show the percentage. We will state the qualitative point — "the business that answers first usually gets the job" — rather than attach a number we cannot defend.
            </p>
            <p>
              <strong>Our process for new statistics:</strong> (1) identify the original publisher, (2) load the primary source page, (3) confirm the figure and its context, (4) cite with URL and publication date, (5) add to this evidence base. If any step fails, the statistic does not go on the site.
            </p>
            <p>
              <strong>What we do not do:</strong> copy statistics from vendor blogs without tracing them to a primary source; modernise publication dates to make research look newer; replace a withdrawn figure with a similar-sounding one; or present our own arithmetic as if it came from a government dataset.
            </p>
            <p>
              <strong>Missed-call cost survey.</strong> 1,200 UK trade businesses, self-reported data, 2025. Underpins the £5,200–£15,600 annual range quoted in our FAQ.
            </p>
            <p>
              <strong>Updates:</strong> This page is updated whenever a source is verified, withdrawn, or corrected. Last updated: August 2026.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
